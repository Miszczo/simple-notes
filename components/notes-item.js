class NotesItem extends HTMLElement {
    constructor() {
        super();
    }

    set note(newNote) {
        this._note = newNote;
    }

    connectedCallback() {
        customElements.whenDefined('notes-item').then(() => {
            this.render();
            this.setupEventListeners();
        });
    }

    disconnectedCallback() {
        this.removeEventListeners();
    }

    render() {
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
                        <button class="delete-note-btn">
                            <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.25 14.25H9.75V4.25H2.25V14.25ZM0.375 2.58333V1.33333H3.16667L4 0.5H8L8.83333 1.33333H11.625V2.58333H0.375ZM2.25 15.5C1.91667 15.5 1.625 15.375 1.375 15.125C1.125 14.875 1 14.5833 1 14.25V3H11V14.25C11 14.5833 10.875 14.875 10.625 15.125C10.375 15.375 10.0833 15.5 9.75 15.5H2.25ZM2.25 14.25H9.75H2.25Z" fill="#3B3C3E"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="note-body">${this._note.description}</div>
                <div class="note-date">${this._note.date}</div>
            </div>
        `;
    }

    setupEventListeners() {
        this.deleteBtn = this.querySelector('.note-item .delete-note-btn');
        this.editBtn = this.querySelector('.note-item .edit-note-btn');

        if (this.deleteBtn) {
            this.deleteBtn.addEventListener('click', () =>
                this.showDeleteModal()
            );
        }

        if (this.editBtn) {
            this.editBtn.addEventListener('click', () => this.showEditNote());
        }
    }

    removeEventListeners() {
        if (this.deleteBtn) {
            this.deleteBtn.removeEventListener('click', () =>
                this.showDeleteModal()
            );
        }

        if (this.editBtn) {
            this.editBtn.removeEventListener('click', () =>
                this.showEditNote()
            );
        }
    }

    showDeleteModal() {
        const modal = document.createElement('delete-modal');
        modal.noteId = this._note.id;
        modal.openModal('.app-wrapper');
    }

    showEditNote() {
        const notesForm = document.createElement('notes-form');
        notesForm.openNotesForm('edit', this._note);
    }
}

customElements.define('notes-item', NotesItem);
