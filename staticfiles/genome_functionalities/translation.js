function Translate(seq) {
    this.seq = seq;
    this.position = 0;
    this.n = undefined;
    if (this.seq.length > 2){
        this.n = this.seq.length;
    }
    this.map = {"UUU": "F", "UUC": "F", "UUA": "L", "UUG": "L",
                "UCU": "S", "UCC": "S", "UCA": "S", "UCG": "S",
                "UAU": "Y", "UAC": "Y", "UAA": "",  "UAG": "",
                "UGU": "C", "UGC": "C", "UGA": "",  "UGG": "W",
                "CUU": "L", "CUC": "L", "CUA": "L", "CUG": "L",
                "CCU": "P", "CCC": "P", "CCA": "P", "CCG": "P",
                "CAU": "H", "CAC": "H", "CAA": "Q", "CAG": "Q",
                "CGU": "R", "CGC": "R", "CGA": "R", "CGG": "R",
                "AUU": "I", "AUC": "I", "AUA": "I", "AUG": "M",
                "ACU": "T", "ACC": "T", "ACA": "T", "ACG": "T",
                "AAU": "N", "AAC": "N", "AAA": "K", "AAG": "K",
                "AGU": "S", "AGC": "S", "AGA": "R", "AGG": "R",
                "GUU": "V", "GUC": "V", "GUA": "V", "GUG": "V",
                "GCU": "A", "GCC": "A", "GCA": "A", "GCG": "A",
                "GAU": "D", "GAC": "D", "GAA": "E", "GAG": "E",
                "GGU": "G", "GGC": "G", "GGA": "G", "GGG": "G"}
}

Translate.prototype.findAUG = function () {
    if (this.n) {
        let k = this.n;
        for (let i = 0; i < k - 2; ++i) {
            if (this.seq[i].toUpperCase() === 'A') {
                if (this.seq[i+1].toUpperCase() === 'U' && this.seq[i+2].toUpperCase() === 'G') {
                    this.position = i;
                    return i;
                }
            }
        }
    }
}

Translate.prototype.findStopCodon = function(){
    let idx = this.findAUG();
    if (idx !== undefined) {
        let k = this.n;
        let c = 0;
        for (let i=idx+3; i<k-2; ++i) {
            if (!(c % 3)) {
                if (this.seq[i].toUpperCase() === 'U') {
                    if ((this.seq[i+1].toUpperCase() === 'A' || this.seq[i+1].toUpperCase() === 'G') && (this.seq[i+2].toUpperCase() === 'A' || this.seq[i+2].toUpperCase() === 'G')) {
                        this.n = i;
                        return i;
                    }
                }
            }
            c++;
        }
    }
};

Translate.prototype.getCodonList = function(){
    if (this.n) {
        let temp = '';
        let k = this.n;
        let p = this.position;
        let l = 0;
        let ch;
        for (i = p; i < k; ++i) {
            ch = this.seq[i];
            if (l > 0 && l % 3 === 0) {
                temp += ',';
            }
            temp += ch.toUpperCase();
            l++;
        }
        return temp.split(',');
    }
};

Translate.prototype.translate = function(){
    let codons = this.getCodonList();
    if (codons) {
        let protein = '';
        for (let codon of codons) {
            if (codon in this.map) {
                if (this.map[codon]) {
                    protein += this.map[codon];
                } else {
                    protein += 'stop';
                }
            } else {
                protein += '-';
            }
        }
        this.n = this.seq.length;
        this.position = 0;
        return protein;
    }
    return ''
};

const form = document.getElementById('seq-input');
const text = document.querySelector('textarea');
const select = document.querySelector('select');
let ans;

form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const sequence = text.value;
    const obj = new Translate(sequence);
    if (select.value === 'robust') {
        ans = obj.translate();
    } else if (select.value === 'start-codon') {
        obj.findAUG();
        obj.findStopCodon();
        ans = obj.translate();
    }
    makeHTML(ans);
    // console.log(select.value);
})


function makeHTML(message) {
    return text.value = message;
}
