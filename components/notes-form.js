import { formatDate } from '../utilities/formatters';
import { dispatchCustomEvent } from '../utilities/dispatchCustomEvent';

class NotesForm extends HTMLElement {
    constructor() {
        super();
        this.mode = 'add';
        this.note = null;
    }

    get isEditMode() {
        return this.mode === 'edit';
    }

    connectedCallback() {
        customElements.whenDefined('notes-form').then(() => {
            this.render();
            this.setupEventListeners();
        });
    }

    openNotesForm(mode, note = null) {
        const existingForm = document.querySelector('notes-form');
        if (existingForm) {
            existingForm.remove();
        }

        this.createOverlay();
        document.querySelector('.app-wrapper').appendChild(this);
        this.mode = mode;
        this.note = note;
    }

    closeNotesForm() {
        const overlay = document.querySelector('.form-overlay');
        if (overlay) {
            overlay.remove();
        }
        this.remove();
    }

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.classList.add('form-overlay');

        overlay.addEventListener('click', () => {
            this.closeNotesForm();
        });

        document.querySelector('.app-wrapper').appendChild(overlay);
    }

    handleSaveNote() {
        const title = this.querySelector('#noteTitle').value;
        const description = this.querySelector('#noteBody').value;

        this.clearErrors();

        let hasError = false;

        if (!title.trim()) {
            this.showError('#noteTitle', 'Title is required');
            hasError = true;
        }

        if (!description.trim()) {
            this.showError('#noteBody', 'Description is required');
            hasError = true;
        }

        if (hasError) return;

        const noteDetail = {
            mode: this.isEditMode ? 'edit' : 'add',
            note: {
                id: this.isEditMode
                    ? this.note.id
                    : `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                title,
                description,
                date: this.isEditMode ? this.note.date : formatDate(new Date()),
            },
        };

        dispatchCustomEvent(this, 'save-note', noteDetail);
        this.closeNotesForm();
    }

    showError(selector, message) {
        const input = this.querySelector(selector);
        const errorElement = document.createElement('div');
        errorElement.classList.add('error-message');
        errorElement.textContent = message;
        input.after(errorElement);
        input.classList.add("invalid-input")
    }

    clearErrors() {
        const errors = this.querySelectorAll('.error-message');
        errors.forEach((error) => error.remove());
    }

    setupEventListeners() {
        this.querySelector('#cancelBtn').addEventListener('click', () => {
            this.closeNotesForm();
            dispatchCustomEvent(this, 'cancel-form');
        });

        this.querySelector('#saveBtn').addEventListener('click', () => {
            this.handleSaveNote();
        });
    }

    render() {
        this.innerHTML = `
            <div class="title-wrapper">         
                <div class="form-title">${
                    this.isEditMode ? 'Edit note' : 'Add new note'
                }</div>
                <button class="btn btn-cancel" id="cancelBtn">Cancel</button>
            </div>
            <input id="noteTitle" type="text" placeholder="Note title" value="${
                this.isEditMode && this.note ? this.note.title : ''
            }">

            <textarea id="noteBody" rows="10" placeholder="Your note">${
                this.isEditMode && this.note ? this.note.description : ''
            }</textarea>          
            <div class="btn-wrapper">
                <button class="btn btn-primary" id="saveBtn">Save</button>
            </div>
        `;
    }
}

customElements.define('notes-form', NotesForm);
