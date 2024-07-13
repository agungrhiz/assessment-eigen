const sentence = "Saya sangat senang mengerjakan soal algoritma"

function longest(sentence) {
    const words = sentence.split(' ');
    let longest = words[0];
    for (let i = 0; i < words.length; i++) {
        if (words[i].length > longest.length) {
            longest = words[i];
        }
    }
    return `${longest}: ${longest.length} characters`;
}

console.log(longest(sentence))