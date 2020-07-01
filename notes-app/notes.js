const fs = require('fs');
const { default: chalk } = require('chalk');

const getNotes = () => {
    return "some notes ...";
};

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title);
    const duplicateNote = notes.find((note) => note.title === title);

    debugger

    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes)
        console.log(chalk.green.inverse("Saved note"));
    }
    else {
        console.log(chalk.red.inverse("Note always present"));
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);

};

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

const removeNote = (title) => {
    notes = loadNotes();
    foundNote = notes.filter((note) => note.title === title)
    if (foundNote.length === 0) {
        console.log(chalk.red.inverse("No note found with title " + title));
    } else {
        notes.pop(foundNote);
        console.log(chalk.green.inverse("Note deleted:" + title));
        saveNotes(notes);
    }
};

const listNotes = () => {
    console.log(chalk.inverse('Your notes'));
    const notes = loadNotes();
    notes.forEach((note) => {
        console.log(note.title);
    });

    notes.forEach(function(note) {
        console.log(note.title);
    });
};

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('Note not found'));
    }
}


module.exports = { 
    getNotes: getNotes,
    addNote: addNote,
    loadNotes: loadNotes, 
    removeNote: removeNote, 
    listNotes: listNotes,
    readNote: readNote,
};