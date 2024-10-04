class NotesList extends HTMLElement {
    constructor() {
        super();
        this._notes = [];

    }

    connectedCallback() {
        this.render();
    }

    set notes(newNotes) {
        this._notes = newNotes;
        this.render();
    }

    get notes() {
        return this._notes;
    }

    render() {
        this.innerHTML = `<ul class="notes-list"></ul>`;
        const ul = this.querySelector('ul');

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
