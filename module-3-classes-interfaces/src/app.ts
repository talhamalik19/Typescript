// type addFn = (n1: number, n2: number) => number;

interface addFn {
  (n1: number, n2: number): number;
}

let add: addFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  name?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  constructor(public age: number, public name?: string) {}

  greet(phrase: string) {
    if (this.name) console.log(phrase + this.name + " " + this.age);
    else console.log("hi");
  }
}

let user1: Greetable;

user1 = {
  // name: "Talha",

  greet(phrase: string) {
    if (this.name) console.log(phrase + this.name);
    else console.log("Hi");
  },
};

// user1 = new Person("Talha", 23)

user1.greet("Hello I am ");
