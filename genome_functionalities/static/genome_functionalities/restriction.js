const form = document.getElementById('seq-input');
const text = document.querySelector('textarea');
const select = document.querySelector('select');

let ans;

map = {'AatII': 'GACGTC', 'Acc65I': 'GGTACC', 'AccI': 'GTMKAC', 'AclI': 'AACGTT', 'AfeI': 'AGCGCT', 'AflII': 'CTTAAG', 'AgeI': 'ACCGGT', 'ApaI': 'GGGCCC', 'ApaLI': 'GTGCAC', 'ApoI': 'RAATTY', 'AscI': 'GGCGCGCC', 'AseI': 'ATTAAT', 'AsiSI': 'GCGATCGC', 'AvrII': 'CCTAGG', 'BamHI': 'GGATCC', 'BclI': 'TGATCA', 'BglII': 'AGATCT', 'Bme1580I': 'GKGCMC', 'BmtI': 'GCTAGC', 'BsaHI': 'GRCGYC', 'BsiEI': 'CGRYCG', 'BsiWI': 'CGTACG', 'BspEI': 'TCCGGA', 'BspHI': 'TCATGA', 'BsrGI': 'TGTACA', 'BssHII': 'GCGCGC', 'BstBI': 'TTCGAA', 'BstZ17I': 'GTATAC', 'BtgI': 'CCRYGG', 'ClaI': 'ATCGAT', 'DraI': 'TTTAAA', 'EaeI': 'YGGCCR', 'EagI': 'CGGCCG', 'EcoRI': 'GAATTC', 'EcoRV': 'GATATC', 'FseI': 'GGCCGGCC', 'FspI': 'TGCGCA', 'HaeII': 'RGCGCY', 'HincII': 'GTYRAC', 'HindIII': 'AAGCTT', 'HpaI': 'GTTAAC', 'KasI': 'GGCGCC', 'KpnI': 'GGTACC', 'MfeI': 'CAATTG', 'MluI': 'ACGCGT', 'MscI': 'TGGCCA', 'MspA1I': 'CMGCKG', 'NaeI': 'GCCGGC', 'NarI': 'GGCGCC', 'NcoI': 'CCATGG', 'NdeI': 'CATATG', 'NgoMIV': 'GCCGGC', 'NheI': 'GCTAGC', 'NotI': 'GCGGCCGC', 'NruI': 'TCGCGA', 'NsiI': 'ATGCAT', 'NspI': 'RCATGY', 'PacI': 'TTAATTAA', 'PciI': 'ACATGT', 'PmeI': 'GTTTAAAC', 'PmlI': 'CACGTG', 'PsiI': 'TTATAA', 'PspOMI': 'GGGCCC', 'PstI': 'CTGCAG', 'PvuI': 'CGATCG', 'PvuII': 'CAGCTG', 'SacI': 'GAGCTC', 'SacII': 'CCGCGG', 'SalI': 'GTCGAC', 'SbfI': 'CCTGCAGG', 'ScaI': 'AGTACT', 'SfcI': 'CTRYAG', 'SfoI': 'GGCGCC', 'SgrAI': 'CRCCGGYG', 'SmaI': 'CCCGGG', 'SmlI': 'CTYRAG', 'SnaBI': 'TACGTA', 'SpeI': 'ACTAGT', 'SphI': 'GCATGC', 'SspI': 'AATATT', 'StuI': 'AGGCCT', 'SwaI': 'ATTTAAAT', 'XbaI': 'TCTAGA', 'XhoI': 'CTCGAG', 'XmaI': 'CCCGGG'}


function findMatch(selectValue, seq){
    const newSeq = seq.toUpperCase()
    let target = map[selectValue]
    let startIdx = newSeq.search(target);
    let endIdx;
    let temp = '';
    if (startIdx >= 0) {
        endIdx = startIdx + target.length;
    } else {
        return
    }
    for (let i = 0; i < startIdx; ++i) {
        temp += newSeq[i];
    }
    temp += "<span style='background-color:red;'>"
    for (let i = startIdx; i < endIdx; ++i) {
        temp += newSeq[i];
    }
    temp += '</span>';
    for (let i = endIdx; i < newSeq.length; ++i) {
        temp += newSeq[i];
    }
    return temp;
}

function makeHTML(msg) {
    const tempDiv = document.createElement('div');
    const tempP = document.createElement('p');
    tempP.style.padding = '10px';
    tempP.style.wordBreak = 'break-all';
    tempP.innerHTML = msg;
    tempDiv.appendChild(tempP);
    tempDiv.setAttribute('id', 'tempDiv');
    tempDiv.style.backgroundColor = 'white';
    form.insertAdjacentElement('afterend', tempDiv);
}

form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    let sequence = text.value;
    msg = findMatch(select.value, sequence)
    if (msg) {
        if (document.getElementById('tempDiv')) {
            let element = document.getElementById('tempDiv');
            element.parentNode.removeChild(element);
        }
        makeHTML(msg);
    } else {
        if (document.getElementById('tempDiv')) {
            let element = document.getElementById('tempDiv');
            element.parentNode.removeChild(element);
        }
        text.value = `Could not locate cutting size for ${select.value}`;
    }
})
