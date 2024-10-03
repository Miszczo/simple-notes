class NotesItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set note(newNote) {
        this._note = newNote;
        this.render();
    }

    get note() {
        return this._note;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (!this._note || !this._note.title) {
            return;
        }

        this.shadowRoot.innerHTML = `
            <div class="note-item">
                <div class="note-header">
                    <h6 class="note-title">${this._note.title}</h6>
                    <div class="note-buttons">
                        <button class="edit-note-btn">edit</button>
                        <button class="delete-note-btn">delete</button>
                    </div>
                </div>
                <div class="note-body">${this._note.description}</div>
                <div class="note-date">${this._note.date}</div>
            </div>
        `;
    }
}

customElements.define('notes-item', NotesItem);
