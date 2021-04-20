class Fenetre {
    constructor(id, idModal, title, content) {
        this.id = id;
        this.idModal = idModal;
        this.title = title;
        this.content = content;
        this.creationDiv();
        this.render();
    }

    creationDiv() {
        let panneau = document.querySelector("#panneau");
        this.elementDiv = document.createElement('div');
        this.elementDiv.setAttribute('id', this.id);
        panneau.append(this.elementDiv);
    }


    render() {

        let idElement = document.querySelector(`#${this.id}`);
        console.log(localStorage);
      
        let content = `
        <div class="modal fade" id="${this.idModal}" tabindex="-1" aria-labelledby="${this.idModal}" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${this.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${this.content}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                        <button type="button" class="btn btn-primary">Ok</button>
                    </div>
                </div>
            </div>
        </div>`

        idElement.innerHTML = content;
    }
}