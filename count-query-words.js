const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];

function countQueryWords(input, query) {
    return query.map(q => input.filter(i => i === q).length);
}

console.log(countQueryWords(INPUT, QUERY))