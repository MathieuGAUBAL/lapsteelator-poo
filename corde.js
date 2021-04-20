

class Corde {

    tabCorde = Array.from(tableauNote);

    constructor(note, nbrNotes, gammeMode) {
        this.tableauNoteObjet = [];
        this.gammeMode = gammeMode;
        this.note = note;
        this.tonique = this.gammeMode[0];
        this.nbrNotes = nbrNotes;
        this.creationCorde();
        delete this.tabCorde;
        delete this.nbrNotes;
       
    }

    creationCorde() {

        let fin = 22;

        if (tableauNote.includes(this.note)) {
            let indexNote = tableauNote.indexOf(this.note);

            this.tabCorde.splice(0, indexNote);
            this.tabCorde.splice(fin, this.nbrNotes - fin);
            this.creationObjetNote();
        }
    }

    creationObjetNote() {
        let tabNotes = [];
        let compteur = 0;
        for (let note of this.tabCorde) {
            if (dataNotes.hasOwnProperty(`${this.note}`)) {
                let boolMode = this.verificationModeNote(note);
                let boolNoteSillet = compteur === 0 ? true : false;
                let boolTonique = this.verificationNoteTonique(note);
                tabNotes.push( new Case(dataNotes[`${note}`], boolMode, boolNoteSillet, boolTonique));
            }
            compteur++;
        }
        this.tableauNoteObjet = tabNotes;
    }

    verificationModeNote(note){
        return this.gammeMode.includes(note.substring(0, note.length - 1)) ? true : false;
    }

    verificationNoteTonique(note){
        return  note.substring(0, note.length-1) === this.tonique ? true : false;
    }
}