function add(n1: number, n2: number): number{
    return n1 + n2
}

function printResult(num1: number): void{
    console.log("Result is ", num1)
}

function addAndHandle(num1: number, num2: number, cb: (num: number) => void){
    let result = num1 + num2;
    cb(result)
}

printResult(add(5,10));

let funVariable : (a: number, b: number) => number;

//This is fine because add method perfectly matches the type that we have defined in funVariable;
funVariable = add;
//this will throw an error because printResult does not specifies the type
// funVariable = printResult;

console.log(funVariable(10,10));

addAndHandle(10,100, (res)=>{
    console.log(res)
})