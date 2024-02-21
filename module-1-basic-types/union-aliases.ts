// type aliases
// type aliases should be used with union types
type combinable = string | number;
type resultDescriptor = 'as-number' | 'as-text'


//Example of union type and literal type
//we have already seen literal type, for example if declared any variable with const,
//it will not only infer the type but it will take the specific value as type because const cannot be changed
function add(input1: combinable, input2: combinable, resultConversion: resultDescriptor){
    let result : string;
    if(typeof input1 === 'number' || typeof input2 === 'number' || resultConversion === 'as-number'){
        return result = (+input1 + +input2).toString()
    }
    else{
        return result = input1.toString() + input2.toString()
    }
}

const combineAges = add(23,23, 'as-number');
console.log(combineAges);

const combineStringAges = add('23', '23' , 'as-number');
console.log(combineStringAges)

const combineNames = add("Talha", "Malik", 'as-text')
console.log(combineNames);