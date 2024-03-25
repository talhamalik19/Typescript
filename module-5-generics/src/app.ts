const arr: Array<string> = ['Talhha', "Malik"]  //same as string[]
console.log(arr)

const promise:Promise<string> = new Promise((resolve)=>{
    setTimeout(()=>{
        resolve("Promise is Resolved")
    }, 2000)
})

promise.then((data=>{
    data.split(" ")
}))

function merge<T extends object>(objA: T, objB: T){
   return Object.assign(objA, objB)
}

const mergedObject = merge({name: "Talha", job: "React JS Devevloper"}, {age: 23, privilages: ['Admin']})
console.log(mergedObject.name)
console.log(mergedObject.privilages)
console.log(mergedObject.job)

interface lengthy{
    length: number
}

function CountAndPrint<T extends lengthy>(val: T):[T, string]{
    let des = "Got No Element";
    if(val.length === 1)
    des = "Got 1 Element"
    if(val.length > 1)
    des = "Got " + val.length + " elements"

    return [val, des]
}

console.log(CountAndPrint("Hi There"))
console.log(CountAndPrint(["Talha", "Malik"]))
console.log(CountAndPrint(''))

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U){
    return "value " + obj[key]
}

console.log(extractAndConvert({firstName: "Talha"}, 'firstName'))

class DemoStorage<T extends string | number>{
    private data : T[] = []

    addItem(item: T){
        this.data.push(item)
    }

    removeItem(item: T){
        if(this.data.indexOf(item)=== 1){
            return
        }
        this.data.splice(this.data.indexOf(item, 1))
    }

    getData(){
        return[...this.data]
    }
}

const demo1 = new DemoStorage<string>();
demo1.addItem("Talha")
demo1.addItem("Malik")
demo1.removeItem("Talha")
console.log(demo1.getData())

const demo2 = new DemoStorage<number>();
demo1.addItem("Talha")
demo1.addItem("Malik")
demo1.removeItem("Talha")
console.log(demo1.getData())

interface CourseGoal{
    title: string;
    description: string;
    completeUntill: Date
}

//Partial converts all the properties into optional
function CreateCourseGoal(title: string, description: string, date: Date): CourseGoal{
    let CourseGoal: Partial<CourseGoal> ={};
    CourseGoal.title = title;
    CourseGoal.description= description;
    CourseGoal.completeUntill= date;
    return CourseGoal as CourseGoal;    // we know that till yet we have added all the values in course gaol so we can type cast it as CourseGoal
}

console.log(CreateCourseGoal("Typescript", "Learning Typescript", new Date()))

const arr2: Readonly<string[]> = ["talha", "malik"];
// arr2.push("another element")    //This will throw an error because once a property set to readonly cannot be changed