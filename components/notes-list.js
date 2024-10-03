class NotesList extends HTMLElement {
    constructor() {
        super();
        this._notes = [];
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();

        const event = new CustomEvent('notes-list-ready', {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    set notes(newNotes) {
        this._notes = newNotes;
        this.render();
    }

    get notes() {
        return this._notes;
    }

    render() {
        this.shadowRoot.innerHTML = `<ul></ul>`;
        const ul = this.shadowRoot.querySelector('ul');

        this._notes.forEach((note) => {
            const li = document.createElement('li');
            const noteItem = document.createElement('notes-item');

            customElements.whenDefined('notes-item').then(() => {
                noteItem.note = note;
            });

            li.appendChild(noteItem);
            ul.appendChild(li);
        });
    }
}

customElements.define('notes-list', NotesList);
