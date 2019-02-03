'use strict'

const getSavedNotes = () => {
    const noteJSON = localStorage.getItem('notes');
    try {
    return noteJSON ? JSON.parse(noteJSON) : []; 
    } catch (e) {
        return [];
    }
};

const saveNotes = (notes) => {
    localStorage.setItem('notes',JSON.stringify(notes));
}

//remove note from list
const removeNote = (id) => {
    const noteIndex = notes.findIndex(note =>  note.id === id);
    if (noteIndex > -1) {
        notes.splice(noteIndex,1);
    }
};

//generate note element
const generateNoteDom = element => {
    const container = document.createElement('a');
    const paragraph = document.createElement('p');
    const status = document.createElement('p');

    //setup note text
    paragraph.textContent = element.title.length > 0 ? element.title : 'Unnamed noted'; 
    container.appendChild(paragraph);

    container.href = `/note.html#${element.id}`;
    paragraph.classList.add('list-item__title');
    container.classList.add('list-item');


    //status
    status.textContent =(`Last edited: ${moment(element.updatedAt).fromNow()}`);
    status.classList.add('list-item__subtitle')
    container.appendChild(status);
    return container;
}

let updateLastEditedSpan = () => {
    const span = document.querySelector("#lastEditedSpan");
    span.textContent = `Last edited: ${moment(note.updatedAt).fromNow()}`;
}

const sortNotes = (notes,sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a,b) =>{
            if (a.updatedAt > b.updatedAt)
                return -1;
            else if (a.updatedAt < b.updatedAt) {
                return 1;
            }
            else
                return 0;
        })
    }
    else if (sortBy === 'byCreated') {
        return notes.sort((a,b) =>{
            if (a.createdAt > b.createdAt)
                return -1;
            else if (a.createdAt < b.createdAt) {
                return 1;
            }
            else
                return 0;
        }) 
    }
    else if (sortBy === 'alphabetical'){
         return notes.sort((a,b) =>{
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            }
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            }
            return 0;
        }) 
     }
 }

//renderNotes
const renderNotes = (notes, filter) => {
    const notesEl = document.querySelector('#notes');
    notes = sortNotes(notes,filter.sortBy);
    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(filter.text.toLowerCase())
    );
    notesEl.innerHTML = '';
    
    if (filteredNotes.length > 0) {
        filteredNotes.forEach(element => {
            const newElement = generateNoteDom(element)
            notesEl.appendChild(newElement);
        });
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No notes to show';
        emptyMessage.classList.add('empty-message');
        notesEl.appendChild(emptyMessage);

    }
}