class Main {
    constructor() {
        this.tableauAccordage = [];
        this.nbrNotes = tableauNote.length;
        this.manche = [];
        this.tabNumFrette = [];
        this.content;
        this.activerDetecteur = null;
        this.tabAccordageSelected = null;
        this.numFretRepere = [3, 5, 7, 9, 12, 15, 17, 21];
        this.ctx = new AudioContext();
        this.audio;
        this.frequence = null;
        this.tonique = document.querySelector("#tonique");
        this.mode = document.querySelector("#mode");
        this.mancheGuitare = document.querySelector("#mancheGuitare");
        this.affichageGammeModeId = document.querySelector("#affichageGammeMode");
        this.checkboxGrilleBlues = document.querySelector("#grilleBlues");
        this.classMode = null;
        this.cordes = null;
    }


    genererNotes() {

        for (let note of this.tabAccordageSelected) {
            this.tableauAccordage.push(new Corde(note, this.nbrNotes, main.classMode.gammeMode));
        }
        this.tableauAccordage.reverse();
    }

    genererNotesAfficherManche() {
        this.genererNotes();
        this.affichageManche();
        this.affichageGammeMode();
    }

    affichageNumFrette() {
        let content = "<tr class='text-center'>"
        for (let i = 0; i < this.tableauAccordage[0].tableauNoteObjet.length; i++) {
            this.numFretRepere.includes(i) ? content += `<th class="repere">${i}</th>` : content += `<th>${i}</th>`;
        }
        content += "</tr>";

        return content;
    }


    affichageManche() {
        console.log("affichage manche");

        this.content = '<table>';
        this.content += this.affichageNumFrette();
        for (let corde of this.tableauAccordage) {
            this.content += '<tr>'
            for (let i = 0; i < corde.tableauNoteObjet.length; i++) {

                this.numFretRepere.includes(i) ? this.content += `<td class="repere">${corde.tableauNoteObjet[i].elementDiv.outerHTML}</td>` : this.content += `<td>${corde.tableauNoteObjet[i].elementDiv.outerHTML}</td>`;

            }
            this.content += '</tr>'
        }
        this.content += '</table>';
        this.mancheGuitare.innerHTML = this.content;
        this.tableauAccordage = [];
    }

    affichageGammeMode(){
        let content = "<table><tr>"
       
        for(let note of main.classMode.gammeMode){
            console.log(note);
            
            note !== undefined ? content += `<td>${note}</td>`: "";
        }

        content += "</tr></table>";

        console.log(content);
        this.affichageGammeModeId.innerHTML = content;
    }

    jouerNote() {
        // create web audio api context
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        // create Oscillator node
        var oscillator = audioCtx.createOscillator();

        oscillator.connect(audioCtx.destination);

        oscillator.frequency.value = this.frequence;

        oscillator.start(0);
        oscillator.stop(0.3);
    }

    myFetch(frequence) {
        fetch(frequence)
            .then(data => data.arrayBuffer())
            .then(arrayBuffer => this.ctx.decodeAudioData(arrayBuffer))
            .then(decodeAudio => {
                this.audio = decodeAudio;
            })
    }


    play() {
        const playAudio = this.ctx.createBufferSource();
        playAudio.buffer = this.audio;
        playAudio.connect(this.ctx.destination);
        playAudio.start(this.ctx.currentTime);
        this.audio = null;
        playAudio = null;
    }

    activerModeMenuDeroulant() {
        if (this.tabAccordageSelected === null || this.tabAccordageSelected[0] === "Accordage") {
            this.tonique.disabled = true;
            this.mode.disabled = true;
            this.checkboxGrilleBlues.disabled = true;
        } else {
            this.tonique.disabled = false;
            this.mode.disabled = false;
            this.checkboxGrilleBlues.disabled = false;
        }
    }


    start() {
        let formulaire = `
        <div class="row">
            <div class="col-md-6">
                <label for="formInput" class="form-label">Accordage</label>
                <input class="form-control" type="text" id="formInput">
            </div>
            <div class="col-md-6">
                <button type="button" class="btn btn-primary">Ajouter</button>
            </div>
        </div>
        `
        new Fenetre("fenetreAjoutAccordageId", "fenetreAjoutAccordage", "ajouter un accordage", formulaire);
        this.activerModeMenuDeroulant();
    }
}

let main = null;

window.addEventListener("DOMContentLoaded", () => {
    main = new Main();
    main.start();
});

// selectionner un accordage
noteAccordage.addEventListener("change", function () {
    main.tabAccordageSelected = noteAccordage[this.selectedIndex].value.split(' ');
    main.activerModeMenuDeroulant();
    main.classMode = new Mode(main.tonique[main.tonique.selectedIndex].value, main.mode[main.mode.selectedIndex].value);
    main.genererNotesAfficherManche();
});


mancheGuitare.addEventListener("click", function (event) {
    main.frequence = event.srcElement.dataset.frequence;
    let note = event.srcElement.dataset.note;
    main.jouerNote();
});

tonique.addEventListener("change", function () {
    main.classMode.tonique = main.tonique[main.tonique.selectedIndex].value;
    main.classMode.fonctionsGammeMode();
    main.genererNotesAfficherManche();
});

mode.addEventListener("change", function () {
    main.classMode.intervalNum = main.mode[main.mode.selectedIndex].value;
    main.classMode.fonctionsGammeMode();
    main.genererNotesAfficherManche();
});



/* mancheGuitare.addEventListener("mouseover", (event) => {

    frequence = event.srcElement.dataset.frequence;
    main.myFetch(frequence);
    main.play();
}); */













