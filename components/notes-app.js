class NotesApp extends HTMLElement {
    constructor() {
        super();
        this.notes = [
            {
                title: 'note 1',
                description: 'lorem ipsum dolor sit amet',
                date: 'May 22',
            },
        ];
        this.filteredNotes = [...this.notes];
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
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

    handleEditNoteEvent(event) {
        const notesForm = this.querySelector('notes-form');
        const noteToEdit = event.detail;
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

    addNote() {
        const newNote = {
            title: `note ${this.notes.length + 1}`,
            description: 'random text',
            date: 'December 28',
        };
        this.notes.push(newNote);
        this.filteredNotes = [...this.notes];
        this.updateNotesList();
    }

    setupEventListeners() {
        this.addEventListener('notes-list-ready', () => {
            this.updateNotesList();
        });

        this.addEventListener('save-note', (e) => {
            console.log(e);
            notesForm.style.display = 'none';
        });

        this.addEventListener('edit-note', (e) => {
            this.handleEditNoteEvent(e);
        });

        const input = this.querySelector('#searchInput');
        input.addEventListener('input', (event) => {
            this.handleFilter(event.target.value);
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
