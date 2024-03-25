function MyDecorator(str: string) {
  return function (target: Function) {
    console.log(target);
    console.log(str);
  };
}

function WithTemplate(_template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._args: any) {
        super();
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          // hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.innerHTML = this.name;
        }
      }
    };
  }
}

@MyDecorator("Talha's Decorator")
@WithTemplate("<h1>Talha Malik</h1>", "root")
class person {
  name = "Talha";
  constructor() {
    console.log("Constructor");
  }
  hello() {
    console.log("hello");
  }

  hello2() {
    console.log("Hello");
  }

  hello3() {
    console.log("Hello3");
  }
}

const person1 = new person()
console.log(person1)

// @withTemplate('<h1>Talha</h1>', 'root')
// class Template{
//     name= "Talha"
//     constructor(){
//         console.log("Template Class")
//     }
// }

function Log(target: any, propertyName: string) {
  console.log("Property decorator");
  console.log(typeof target);
  console.log(target, propertyName);
}

function Log2(target: any, name: string, property: PropertyDescriptor) {
  console.log("Accessor Descriptor");
  console.log(name);
  console.log(target);
  console.log(property);
}

function Log3(
  target: any,
  name: string | Symbol,
  property: PropertyDescriptor
) {
  console.log("Method Decorator");
  console.log(name);
  console.log(target);
  console.log(property);
}

function Log4(target: any, name: string, positionOfArg: number) {
    console.log("Argument Decorator");
    console.log(name);
    console.log(target);
    console.log(positionOfArg);
}

class Product {
  title: string;
  @Log
  private _price: number;

  @Log2
  set Price(value: number) {
    if (value > 0) {
      this._price = value;
    } else {
      throw new Error("Invalid Price - Cant be zero");
    }
  }

  constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
  hello() {
    console.log("hello");
  }

  hello2() {
    console.log("Hello");
  }

  hello3() {
    console.log("Hello3");
  }
}

const p1 = new Product("Book1", 100);
console.log(p1);
const p2 = new Product("Book2", 200);
console.log(p2);

function AutoBind(
  _target: any,
  _methodName: string | Symbol | number,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  return{
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  }; 
}

class Printer {
  message = "This Works";

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[];
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  console.log(propName)
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["required"],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["positive"],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  console.log(registeredValidators[obj.constructor.name])
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
   title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault(); // preventing "No HTTP requests"
  const titleEl = document.getElementById("course-title") as HTMLInputElement;
  const priceEl = document.getElementById("course-price") as HTMLInputElement;

  const titleVal = titleEl.value;
  const priceVal = +priceEl.value;

  const createdCourse = new Course(titleVal, priceVal);

  if (!validate(createdCourse)) {
    alert("Invalid input, please try again!");
    return;
  }
  console.log(createdCourse);
});

