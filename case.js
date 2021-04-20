class Case {
    constructor(note, boolMode, boolNoteSillet, boolTonique) {
       
        this.note = note;
        this.boolTonique = boolTonique;
        this.boolNoteSillet = boolNoteSillet;
        this.boolMode = boolMode;
        this.elementDiv = document.createElement('div');
        this.creationCase();
    }

    creationCase() {
        this.elementDiv.setAttribute('class', this.boolNoteSillet ? 'caseNote notePrincipale' : 'caseNote');

        this.elementDiv.setAttribute('data-note', this.note.note);
        this.elementDiv.setAttribute('data-frequence', this.note.frequence);


        if (this.boolMode) {
            this.elementDiv.innerHTML = `<span class= "mode">${this.note.note}</span>`;
        } 
        
        if (this.boolTonique) {
            this.elementDiv.innerHTML = `<span class= "tonique">${this.note.note}</span>`;
        } 
        
        if(!this.boolMode && !this.boolTonique) {
            this.elementDiv.innerHTML = `<span class="">${this.note.note}</span>`
        }
    }
}

