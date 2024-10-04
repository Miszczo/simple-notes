class NotesApp extends HTMLElement {
    constructor() {
        super();
        this.notes = [
            {
                id: 1,
                title: 'note 1',
                description: 'lorem ipsum dolor sit amet',
                date: 'May 22',
            },
            {
                id: 2,
                title: 'note 2',
                description: 'lorem it amet',
                date: 'June 22',
            },
        ];
        this.filteredNotes = [...this.notes];
        this.currentEditedNote = null;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();

        customElements.whenDefined('notes-list').then(() => {
            this.updateNotesList();
        });
    }

    render() {
        this.innerHTML = `
        <link rel="stylesheet" href="../style.css">
            <h1>Notes</h1>
            <input id="searchInput" type="text" placeholder="Search notes...">
            <button id="addBtn">Add</button>
            <notes-form style="display: none;"></notes-form>
            <notes-list id="notesList"></notes-list>
        `;
    }

    handleEditNoteEvent(e) {
        const notesForm = this.querySelector('notes-form');
        const noteToEdit = e.detail;
        notesForm.setMode('edit', noteToEdit);
        notesForm.style.display = 'block';
    }

    handleFilter(searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        this.filteredNotes = this.notes.filter(
            (note) =>
                note.title.toLowerCase().includes(lowerCaseSearchTerm) ||
                note.description.toLowerCase().includes(lowerCaseSearchTerm)
        );
        this.updateNotesList();
    }

    updateNotesList() {
        const notesList = this.querySelector('#notesList');
        if (notesList) {
            notesList.notes = this.filteredNotes;
        } else {
            console.error('NotesList component not found');
        }
    }

    onAddNote(newNote) {
        this.notes.push(newNote);
        this.filteredNotes = [...this.notes];
        this.updateNotesList();
    }

    onEditNote(editedNote) {
        const noteToEdit = this.filteredNotes.find(
            (note) => note.id === editedNote.id
        );

        const editedNoteIndex = this.filteredNotes.indexOf(noteToEdit);
        this.filteredNotes[editedNoteIndex] = editedNote;
        this.updateNotesList();
    }

    onDeleteNote(noteId) {
        this.filteredNotes = this.filteredNotes.filter(
            (el) => el.id !== noteId
        );
        this.updateNotesList();
    }

    setupEventListeners() {
        this.addEventListener('save-note', (e) => {
            if (e.detail.mode === 'add') {
                this.onAddNote(e.detail.note);
            } else {
                this.onEditNote(e.detail.note);
            }
            notesForm.style.display = 'none';
        });

        this.addEventListener('edit-note', (e) => {
            this.handleEditNoteEvent(e);
        });

        this.addEventListener('delete-note', (e) => {
            this.onDeleteNote(e.detail);
        });

        const input = this.querySelector('#searchInput');
        input.addEventListener('input', (e) => {
            this.handleFilter(e.target.value);
        });

        const addNoteBtn = this.querySelector('#addBtn');
        const notesForm = this.querySelector('notes-form');

        addNoteBtn.addEventListener('click', () => {
            notesForm.setMode('add');
            notesForm.style.display = 'block';
        });
    }
}

customElements.define('notes-app', NotesApp);
