import { dispatchCustomEvent } from '../utilities/dispatchCustomEvent';

class DeleteModal extends HTMLElement {
    constructor() {
        super();
        this._noteId = null;
    }

    set noteId(id) {
        this._noteId = id;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-body">
                    <div class="modal-content">
                        <div class="modal-title">Delete Note</div>
                        <div>Are you sure you want to delete this note?</div>
                    </div>
                    <div class="modal-footer">
                        <button id="closeModalBtn" class="btn btn-secondary">Cancel</button>
                        <button id="deleteNoteBtn" class="btn btn-primary">Delete</button>
                    </div>
                </div>
            </div>
        `;
    }

    openModal(htmlElement) {
        document.querySelector(htmlElement).appendChild(this);
    }

    closeModal() {
        this.remove();
    }

    setupEventListeners() {
        const deleteBtn = this.querySelector('#deleteNoteBtn');
        const cancelBtn = this.querySelector('#closeModalBtn');

        deleteBtn.addEventListener('click', (e) => {
            dispatchCustomEvent(e.target, 'delete-note', this._noteId);
            this.closeModal();
        });

        cancelBtn.addEventListener('click', () => this.closeModal());

        this.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeModal();
            }
        });
    }
}

customElements.define('delete-modal', DeleteModal);
