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
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();

        this.addEventListener('notes-list-ready', () => {
            this.updateNotesList();
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <h1>Notes</h1>
            <button id="addBtn">Add</button>
            <notes-search></notes-search>
            <notes-list id="notesList"></notes-list>
        `;

        const btn = this.shadowRoot.querySelector('#addBtn');
        btn.addEventListener('click', () => this.addNote());
    }

    updateNotesList() {
        const notesList = this.shadowRoot.querySelector('#notesList');
        if (notesList) {
            notesList.notes = this.notes;
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
        this.updateNotesList();
    }
}

customElements.define('notes-app', NotesApp);
