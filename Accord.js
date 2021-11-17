class Accord {
    gammeMode = [];

    constructor(note, mode, bool) {
        this.intervalle = {
            "maj": "2 1.5",
            "min":"1.5 2"
        };
        this.bool = bool;
        this.note = note;

        this.gammeMode = new Mode(note, mode === "maj" ?  this.intervalle.maj :  this.intervalle.min, this.bool);
        console.log(this.gammeMode.gammeMode);
    }


    genererAccordMajeur() {
        let notes = [];
        for (let ecartMaj of this.mode) {
            notes.push(this.gammeMode[ecartMaj - 1]);
        }
        this.objetAccord.notes = notes;
        this.objetAccord.tonique = this.note;
    }

}

let accordMaj = new Accord("A", "min", false);
let accordMin = new Accord("A", "min", true);
let accordMaj1 = new Accord("A", "maj", false);
let accordMin2 = new Accord("A", "maj", true);
