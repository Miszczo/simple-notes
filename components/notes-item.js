class NotesItem extends HTMLElement {
    constructor() {
        super();
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

        this.innerHTML = `
            <div class="note-item">
                <div class="note-header">
                    <p class="note-title">${this._note.title}</p>
                    <div class="note-buttons">
                        <button class="edit-note-btn">
                            <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.875 7.10417L13.3958 5.625L14 5.02083C14.1111 4.90972 14.2569 4.85417 14.4375 4.85417C14.6181 4.85417 14.7639 4.90972 14.875 5.02083L15.4792 5.625C15.5903 5.73611 15.6458 5.88194 15.6458 6.0625C15.6458 6.24305 15.5903 6.38889 15.4792 6.5L14.875 7.10417ZM8 12.5V11.0208L12.5 6.52083L13.9792 8L9.47917 12.5H8ZM0.5 8.125V6.875H6.75V8.125H0.5ZM0.5 4.6875V3.4375H10.2917V4.6875H0.5ZM0.5 1.25V0H10.2917V1.25H0.5Z" fill="#3B3C3E"/>
                            </svg>
                        </button>
                        <a role="button" class="delete-note-btn">delete</a>
                    </div>
                </div>
                <div class="note-body">${this._note.description}</div>
                <div class="note-date">${this._note.date}</div>
            </div>
        `;

        const editBtn = this.querySelector('.edit-note-btn');
        editBtn.addEventListener('click', () => {
            const editEvent = new CustomEvent('edit-note', {
                detail: this._note,
                bubbles: true,
            });
            this.dispatchEvent(editEvent);
        });
    }
}

customElements.define('notes-item', NotesItem);
