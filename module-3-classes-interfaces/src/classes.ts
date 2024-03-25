class Department {
    // name: string;
    private employees: string[] = [];
    constructor(protected readonly id: string, public name : string){     
        //readonly cannot be changed, it can be assigned only once, after assigning it can never be changed 
        // this.name = n
    }

    describe(): void{
        console.log(`Department ${this.id}: ${this.name}`)
        // this.id = 'D2' //this will give an error because id is readonly and can only be defined in constructor after that it cannot be changed
    }

    addEmployee(emp: string){
        this.employees.push(emp)
    }

    printEmployees(){
        console.log(this.employees.length)
        console.log(this.employees)
    }
}

abstract class ITDepartment extends Department{
    constructor(id: string, public admin : string[]){
        super(id, "IT Department")
    }

    addAdmin(admin: string){
        this.admin.push(admin)
    }

    printAdmin(): void {
        console.log(this.admin,length)
        console.log(this.admin)
    }

    abstract describe(): void 
}

class AccountingDepartment extends ITDepartment{
    constructor(public id: string, admin: string [], public name : string){
        super(id, admin)
    }
    describe(): void {
        console.log(`Department ${this.id}: ${this.name}`)
    }
}

// It Department
// console.log("IT Department")
// const it = new ITDepartment("D2", ['Talha', 'Malik'])
// console.log("IT Department", it)
// it.describe()

// Accounting Department
console.log("Accounting department")
const acc = new AccountingDepartment("d3", ['Talha'], "Accounting Department")
acc.addEmployee("Hamza")
acc.addEmployee("Hamza")
acc.describe()
console.log("Acc", acc)

// Department class
console.log("Department Class")
const Accounting = new Department("d1","Accounting");
Accounting.describe()
Accounting.addEmployee("Talha")
Accounting.addEmployee("Malik")
// Accounting.employees[2] = "Hamza"                // this is not possibe as employees is private and is only accessible within the class
Accounting.printEmployees()
console.log(Accounting)

// let duplicateDepartment;
// duplicateDepartment = {describe: Accounting.describe}
// console.log(duplicateDepartment.describe())      //this will return undefined because there is no name property for duplicateDepartment

// duplicateDepartment = {name: "Duplicate", describe: Accounting.describe};
// console.log(duplicateDepartment.describe())      // this will print Department: Duplicate because we have specified the name property