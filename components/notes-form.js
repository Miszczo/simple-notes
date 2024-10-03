class NotesForm extends HTMLElement {
    constructor() {
        super();
        this.mode = 'add';
        this.note = null;
    }

    connectedCallback() {
        this.render();
    }

    setMode(mode, note = null) {
        this.mode = mode;
        this.note = note;
        this.render();
    }

    render() {
        const isEditMode = this.mode === 'edit';

        this.innerHTML = `
            <div class="note-form">
                <h2>${isEditMode ? 'Edit note' : 'Add new note'}</h2>
                <input id="noteTitle" type="text" placeholder="Note title" value="${
                    isEditMode && this.note ? this.note.title : ''
                }">
                <textarea id="noteBody" placeholder="Your note">${
                    isEditMode && this.note ? this.note.description : ''
                }</textarea>
                <div>
                    <button id="cancelBtn">Cancel</button>
                    <button id="saveBtn">Save</button>
                </div>
            </div>
        `;

        this.querySelector('#cancelBtn').addEventListener('click', () =>
            this.dispatchEvent(new Event('cancel'))
        );

        this.querySelector('#saveBtn').addEventListener('click', () => {
            const title = this.querySelector('#noteTitle').value;
            const description = this.querySelector('#noteBody').value;

            if (isEditMode) {
                this.dispatchEvent(
                    new CustomEvent('save-note', {
                        detail: {
                            mode: 'edit',
                            note: {
                                ...this.note,
                                title,
                                description: description,
                            },
                        },
                        bubbles: true,
                    })
                );
            } else {
                this.dispatchEvent(
                    new CustomEvent('save-note', {
                        detail: {
                            mode: 'add',
                            note: {
                                title,
                                description: description,
                                date: new Date().toLocaleDateString(),
                            },
                        },
                        bubbles: true,
                    })
                );
            }
        });
    }
}

customElements.define('notes-form', NotesForm);
