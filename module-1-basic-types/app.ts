let user: unknown;
let userName: string;

user = 5;
// user = "Talha"

if(typeof user === 'string'){
    userName = user
    console.log(userName)
}


//practice
type User = {name: string, age: number};

const person = {
    name: "Talha",
    age: 23
}

const secondPerson ={
    name: "Talha",
    age: 23,
    hobbies: ['supports']
}

function checkAge(user: User, age: number){
    if(user.age > age){
        console.log("Is Older")
    }
}

checkAge(secondPerson, 19);

