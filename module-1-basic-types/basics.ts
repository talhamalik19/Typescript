console.log("I am learning typescript");

function add(n1: number, n2: number, displayResult: boolean, phrase: string){
    let result = n1+n2;
    if(displayResult){
        console.log(phrase + result)
    }
    else{
        return phrase + result
    }
}

const number1 = 10.65;
const number2 = 20.73;
let showResult = true;
const resultPhrase = "Result is: ";

add(10,5,showResult, resultPhrase)
console.log(add(number1, number2, showResult=false, resultPhrase))