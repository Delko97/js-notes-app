'use strict'

const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find(note => noteId === note.id);

if (!note) {
    location.assign('/index.html');
};

updateLastEditedSpan();

const title = document.querySelector('#note-title');
title.value = note.title;
title.addEventListener('input',(element) => {
    note.title = element.target.value;
    note.updatedAt = moment().valueOf();
    updateLastEditedSpan();
    saveNotes(notes);
});

const body = document.querySelector('#note-body');
body.value = note.body;
body.addEventListener('input',element =>{
    note.body = element.target.value;
    note.updatedAt = moment().valueOf();
    updateLastEditedSpan();
    saveNotes(notes);
});

document.querySelector('#remove').addEventListener('click',() =>{
    removeNote(note.id);
    saveNotes(notes);
    location.assign('/index.html');
});


window.addEventListener('storage',(e) => {
    if (e.key === 'notes') {
        notes ===JSON.parse(e.newValue);
        note = notes.find((note) => note.id === noteId);

        if (!note) {
            location.assign('/index.html');
        }

        title.value = note.title;
        body.value = body.value;
        
    }
})