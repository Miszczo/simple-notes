class NotesSearch extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <input type="text" placeholder="Search notes...">
        `;
    }
}

customElements.define('notes-search', NotesSearch);
