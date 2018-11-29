const form = document.getElementById('seq-input');
const text = document.querySelector('textarea');
const select = document.querySelector('select');
const h1 = document.querySelector('h1');
const dict = {'A':'A', 'T': 'U', 'C': 'C', 'G': 'G'};
let ans;


form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const sequence = text.value;
    const sequence_upper_case = sequence.toUpperCase();
    ans = complement(sequence_upper_case);
    // ans = complement(sequence_upper_case);
    makeHTML(ans);
    // console.log(select.value);
})

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
