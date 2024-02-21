// const person: {
//     name: string,
//     age: number,
//     hobbies: string[],
//     role: [number, string]  //This is a tuple (Array with only two elements where 1st is  number and the second is string)
// } = {
//     name: "Talha",
//     age: 23,
//     hobbies: ['Playing', 'Cooking', 'Coding'],
//     role: [1, "Writer"]
// }

enum Role {ADMIN, IS_READ_ONLY, AUTHOR}

const person = {
  name: "Talha",
  age: 23,
  hobbies: ["Playing", "Cooking", "Coding"],
  role: Role.ADMIN
};


// These lines are for tuples
// person.role[1] = 10;    //This will throw an error because we have defined that the 1st index that is the 2nd element should be string
// person.role.push("Author"); //push is an exception in tuple, we can push an element in tuple


console.log(person);

let array: string[];
let array2: number[];

array = ["Hello", "World"];
array2 = [1, 2, 3, 4];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby);
  console.log(hobby.toUpperCase());
}

if(person.role === Role.ADMIN){
    console.log("Is Admin")
}
