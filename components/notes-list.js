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
        this.shadowRoot.innerHTML = `
         <ul>
            ${this._notes
                .map(
                    (note) => `
                <li>
                    <strong>${note.title}</strong>: ${note.description} (Date: ${note.date})
                </li>
            `
                )
                .join('')}
        </ul>
        `;
    }
}

customElements.define('notes-list', NotesList);
