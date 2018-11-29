const form = document.getElementById('seq-input');
const text = document.querySelector('textarea');
const select = document.querySelector('select');
const h1 = document.querySelector('h1');
const dict = {'A':'T', 'T': 'A', 'C': 'G', 'G': 'C'};
let ans;


form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const sequence = text.value;
    const sequence_upper_case = sequence.toUpperCase();
    if (select.value === 'reverse-complement') {
        ans = reverseComplement(sequence_upper_case);
    } else if (select.value === 'reverse') {
        ans = reverse(sequence_upper_case);
    } else if (select.value === 'complement') {
        ans = complement(sequence_upper_case);
    }
    makeHTML(ans);
    // console.log(select.value);
})

select.addEventListener('change', function() {
    if (select.value === 'reverse' && h1.textContent !== 'Reverse Tool') {
        updateTitle('Reverse Tool');
    }else if (select.value === 'reverse-complement' && h1.textContent !== 'Reverse Complement Tool') {
        updateTitle('Reverse Complement Tool');
    } if (select.value === 'complement' && h1.textContent !== 'Complement Tool') {
        updateTitle('Complement Tool');
    }
})


function reverseComplement(seq) {
    let res = '';
    for (let i=0; i < seq.length; ++i) {
        if (!(seq[i] in dict)) {
            res += seq[i]
        } else {
        res += dict[seq[i]];
        }
    }
    return res.split('').reverse().join('');
}


function reverse(seq) {
    return seq.split('').reverse().join('');
}


function complement(seq) {
    let res = '';
    for (let i=0; i < seq.length; ++i) {
        if (!(seq[i] in dict)) {
            res += seq[i]
        } else {
        res += dict[seq[i]];
        }
    }
    return res
}


function makeHTML(message) {
    return text.value = message;
}


function updateTitle(title) {
    h1.textContent = title;
}
