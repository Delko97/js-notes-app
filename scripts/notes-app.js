'use strict'

const notes = getSavedNotes();

const filterData = {
    text : '',
    sortBy: 'byEdited'
} 

document.querySelector('#search-text').addEventListener('input',e =>{
    filterData.text = e.target.value;
    renderNotes(notes,filterData);
});

renderNotes(notes,filterData);

document.querySelector('#name-form').addEventListener('submit',element => {
    element.preventDefault();
    const id = uuidv4();
    notes.push({
        id: id,
        title : element.target.elements.firstName.value,
        body : 'asdf',
        createdAt: moment().valueOf(),
        updatedAt: moment().valueOf(),
    })
    element.target.elements.firstName.value = '';
    saveNotes(notes);
    location.assign(`/note.html#${id}`);
});

document.querySelector('#filter-by').addEventListener('change',e =>{
    filterData.sortBy = e.target.value;
    renderNotes(notes,filterData);
})
