type Admin = {
  name: string;
  privilages: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

let user: Admin & Employee;

user = {
  name: "Talha",
  privilages: ["create-server"],
  startDate: new Date(),
};

console.log(user);

type Combinable = string | number;
type numeric = number | boolean;

type Universal = Combinable & numeric; // when using intersection type on union and non-object types, the resultant will get only the common type of the two.

// const universalVariable : Universal = "Talha" //This will throw an error because Universal in of numer type

const universalVariable: Universal = 10; //This will work because Universal is of type number and 10 is number.

//TYPE GUARDS (typeof, in, instanceof)
//Functional Overload
function add(a: string, b: string):string
function add(a: number, b: number):number
function add(a: string, b: number):string
function add(a: number, b: string):string
function add(a: Combinable, b: Combinable){
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
};

type UnknownEmployee = Admin | Employee;

console.log(add(5, 10));
console.log(add("talha", " malik").split(" "));


function printEmployee(emp: UnknownEmployee) {
  console.log("Name: ", emp.name);
  if ("privilages" in emp) {
    console.log("Privileges: ", emp.privilages);
  }
  if ("startDate" in emp) {
    console.log("Start Date: ", emp.startDate);
  }
}

printEmployee(user);
printEmployee({ name: "Talha Malik", privilages: ["Admin"] });
printEmployee({ name: "Talha Malik", startDate: new Date() });

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving Truck...");
  }
  loadCargo(amount: number) {
    console.log("Loading Cargo ", amount);
  }
}

type vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function printVehicle(vehicle: vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(9000);
  }
}

printVehicle(v1);
printVehicle(v2);

//Descriminated Unions
// interface Bird {
//   type: "bird";
//   flyingSpeed: number;
// }

// interface Horse {
//   type: "horse";
//   runningSpeed: number;
// }

// type Animal = Bird | Horse;

// function animalSpeed(animal: Animal) {
//   let speed;
//   switch (animal.type) {
//     case "bird":
//       speed = animal.flyingSpeed;
//       break;
//     case "horse":
//       speed = animal.runningSpeed;
//       break;
//   }
//   console.log("Moving at Speed: ", speed)
// }

// animalSpeed({type: 'bird', flyingSpeed: 50})
// animalSpeed({type: 'horse', runningSpeed: 700})

class Bird {
  constructor(public type: "bird", public flyingSpeed: number) {}
}

class Horse {
  constructor(public type: "horse", public runningSpeed: number) {}
}

const parrot = new Bird('bird', 50)
const cheetah = new Horse('horse', 500)
type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }
  console.log("Moving at speed: ", speed);
}

moveAnimal({ type: "bird", flyingSpeed: 50 });
moveAnimal({ type: "horse", runningSpeed: 700 });

function moveAnimalWithObjects(animal: Animal){
    if(animal instanceof Bird){
        console.log("Flying at speed: ", animal.flyingSpeed)
    } else{
        console.log("Running at speed ", animal.runningSpeed)
    }
}

moveAnimalWithObjects(parrot);
moveAnimalWithObjects(cheetah);

const inputText = document.getElementById("user-text");

(inputText as HTMLInputElement).value = "Hi there";

// Index Type   we Use index type when we are not sure about how many key and values pairs we will have in our interface
interface ErrorContainer{
    [prop : string]: string
}

const error1: ErrorContainer = {
    email: "talha@gmail.com",
    erorr: "Some Error occured",
    username: "talha"
}

console.log(error1)

// Optional Chaning
let obj ={
    name: "Talha",
    job:{
        designation: "React Js Developer",
        Skills: "Full Stack"
    }
}

console.log(obj?.job?.designation)

const varriable = ''        //If the variable is null or undefined then it will return fallback, otherwise it will return variable.
const result = varriable ?? 'Default'
console.log(varriable)