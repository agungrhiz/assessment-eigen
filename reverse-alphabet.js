const string = "NEGIE1";

function reverse(string) {
    const letters = string.replace(/[^a-zA-Z]/g, '').split('').reverse().join('');
    const numbers = string.replace(/[^0-9]/g, '');
    return letters + numbers;
}

console.log(reverse(string))