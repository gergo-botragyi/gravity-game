class Galaxis{
    constructor(nev){
        this.nev = nev;
        this.egitestei = []
    }

    eltolas(v){
        for (const egitest of this.egitestei) {
            egitest.p.hozzaad(v);
        }
    }
}