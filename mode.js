class Mode {
    constructor(tonique, intervalNum, bool=false) {
        this.tonique = tonique;
        this.bool = bool;
        this.intervalNum = this.bool ? intervalNum.concat(" 1.5") : intervalNum;
        this.numMode = null;
        this.gammeTonique = null;
        this.gammeMode = null;
        this.fonctionsGammeMode();
    }


    fonctionsGammeMode() {
        this.numMode = this.modeCompteur();
        this.construction_gamme_tonique();
        this.constructionGammeMode();
    }


    modeCompteur() {
        return this.intervalNum
            .split(' ')
            .map(item => Number.parseFloat(item) * 2);
    }


    construction_gamme_tonique() {
        let arr = [];

        if (gamme.includes(this.tonique)) {
            let index = gamme.indexOf(this.tonique);
            for (let i = index; i < gamme.length; i++) {
                arr.push(gamme[i]);
            }

            if (gamme.length - index !== gamme.length) {
                for (let i = 0; i < index; i++) {
                    arr.push(gamme[i]);
                }
            }
        }
        this.gammeTonique = arr.join(',').split(',');
    }

    constructionGammeMode() {
        const arr = [];
        console.log(this.numMode);
        let dernierEcart = this.numMode.reduce((num, accu) => {
            arr.push(this.gammeTonique[num]);
            return num + accu
        });

        arr.push(this.gammeTonique[dernierEcart]);
        arr.unshift(this.tonique);

        this.gammeMode = arr;
    }
}