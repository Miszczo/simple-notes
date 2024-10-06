class NotesApp extends HTMLElement {
    constructor() {
        super();
        this.notes = [];
        this.filteredNotes = [...this.notes];
        this.currentEditedNote = null;

        this.handleAddNoteClick = this.handleAddNoteClick.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
    }

    handleAddNoteClick() {
        const notesForm = document.createElement('notes-form');
        notesForm.openNotesForm('add');
    }

    handleSearchInput(e) {
        this.handleFilter(e.target.value);
    }

    connectedCallback() {
        this.render();

        this.setupDOMEventListeners();
        this.setupCustomEventListeners();

        customElements.whenDefined('notes-list').then(() => {
            this.updateNotesList();
        });
    }

    disconnectedCallback() {
        this.removeDOMEventListeners();
        this.addNoteListenerAdded = false;
        this.searchInputListenerAdded = false;
    }

    render() {
        this.innerHTML = `
            <div class="app-wrapper">
                <div class="search-wrapper">
                    <h1 class="main-title">
                       <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.40636 18.6771V19.4101C4.18802 19.1883 4.09595 18.9551 4.09595 18.6771V3.32296C4.09595 3.01928 4.19532 2.77799 4.41482 2.5585C4.63925 2.33407 4.87479 2.23962 5.15636 2.23962H13.1415L17.9272 7.02528V18.6771C17.9272 18.9587 17.8328 19.1942 17.6083 19.4187C17.3888 19.6382 17.1475 19.7375 16.8439 19.7375H5.15636C4.87835 19.7375 4.64522 19.6455 4.42334 19.4271H5.15636H16.8439H17.5939V18.6771V7.58546V6.83546H16.8439H13.2626V3.32296V2.57296H12.5126H5.15636H4.40636V3.32296V7.58546V18.6771Z" fill="#1B1C1E" stroke="#1B1C1E" stroke-width="1.5"/>
                        </svg>
                        Notes    
                    </h1>
                    <div class="input-with-icon">
                        <input id="searchInput" type="text" placeholder="Search notes...">
                    </div>
                </div>
                ${
                    this.notes.length > 0
                        ? `<div class="scrollable-wrapper">
                            <button class="btn btn-primary" id="addNoteBtn">Add New</button>
                            <notes-list id="notesList"></notes-list>
                        </div>`
                        : `<empty-list-info></empty-list-info>`
                }
            </div>
        `;

        this.removeDOMEventListeners();
        this.setupDOMEventListeners();
    }

    updateNotesList() {
        const notesList = this.querySelector('#notesList');
        if (notesList) {
            notesList.notes = this.filteredNotes;
        }
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

    onAddNote(newNote) {
        this.notes.push(newNote);
        this.filteredNotes = [...this.notes];

        if (this.notes.length === 1) {
            this.render();
            this.updateNotesList();
        } else {
            this.updateNotesList();
        }
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
        this.notes = this.notes.filter((note) => note.id !== noteId);
        this.filteredNotes = [...this.notes];

        if (this.notes.length === 0) {
            this.render();
        } else {
            this.updateNotesList();
        }
    }

    setupDOMEventListeners() {
        const addNoteBtn = this.querySelector('#addNoteBtn');
        const input = this.querySelector('#searchInput');

        if (addNoteBtn) {
            addNoteBtn.addEventListener('click', this.handleAddNoteClick);
        }

        if (input) {
            input.addEventListener('input', this.handleSearchInput);
        }
    }

    removeDOMEventListeners() {
        const addNoteBtn = this.querySelector('#addNoteBtn');
        const input = this.querySelector('#searchInput');

        if (addNoteBtn) {
            addNoteBtn.removeEventListener('click', this.handleAddNoteClick);
        }

        if (input) {
            input.removeEventListener('input', this.handleSearchInput);
        }
    }

    setupCustomEventListeners() {
        this.addEventListener('add-first-note', () => {
            const notesForm = document.createElement('notes-form');
            notesForm.openNotesForm('add');
        });

        this.addEventListener('save-note', (e) => {
            const notesForm = e.target;
            if (e.detail.mode === 'add') {
                this.onAddNote(e.detail.note);
            } else {
                this.onEditNote(e.detail.note);
            }
            if (notesForm) {
                notesForm.remove();
            }
        });

        this.addEventListener('edit-note', (e) => {
            this.handleEditNoteEvent(e);
        });

        this.addEventListener('cancel-form', (e) => {
            const notesForm = e.target;
            notesForm.remove();
        });

        this.addEventListener('delete-note', (e) => {
            this.onDeleteNote(e.detail);
        });
    }
}

customElements.define('notes-app', NotesApp);
