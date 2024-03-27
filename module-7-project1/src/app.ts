enum ProjectStatus{
    Active, Finish
}

class Project{
    constructor(public id: string, public title: string, public description: string, public people: number, public status: ProjectStatus){ }
}

type Listener = (item: Project[]) => void

class ProjectState{
    private projects: Project[] = [];
    private static instance: ProjectState;
    private listeners: Listener[] =[];

    private constructor(){ }

    static getInstance(){
        if(this.instance){
            return this.instance
        }
        else
        return this.instance = new ProjectState();
    }

    addListener(projectListener: Listener){
        this.listeners.push(projectListener)
    }

    addProject(title: string, description: string, numOfPeople: number){
        const newProject = new Project(Math.random().toFixed(2), title, description, numOfPeople, ProjectStatus.Active)
        this.projects.push(newProject)
         for (const prjListener of this.listeners){
            prjListener(this.projects.slice())
        }
    }

}

const projectState = ProjectState.getInstance();

interface validatable {
    value : string | number,
    required: boolean,
    minLength?: number,
    maxLength?: number,
    min?: number,
    max?: number
}

function validate(validatableInput: validatable){
    let isValid = true;
    if(validatableInput.required === true){
        isValid = isValid && validatableInput.value.toString().trim().length !== 0
    }
    if(validatableInput.minLength != null && typeof validatableInput.value === 'string'){
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength
    }
    if(validatableInput.maxLength != null && typeof validatableInput.value === 'string'){
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength
    }
    if(validatableInput.min != null && typeof validatableInput.value === 'number'){
        isValid = isValid && validatableInput.value >= validatableInput.min
    }
    if(validatableInput.max != null && typeof validatableInput.value === 'number'){
        isValid = isValid && validatableInput.value <= validatableInput.max
    }
    return isValid
}

function Autobind(_target: any, _name: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}

class projectList{
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    assignprojects: Project[] = []

    constructor(private type: 'active' | 'finished'){
        this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`;

        projectState.addListener((projects: Project[])=>{
            this.assignprojects = projects;
            this.renderProjects();
        })
        
        this.attach();
        this.renderContent();
    }

    renderProjects(){
     const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
     for (const prjItem of this.assignprojects){
        const listItem = document.createElement('li');
        listItem.textContent = prjItem.title
        listEl.appendChild(listItem)
     }       
    }

    renderContent(){
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + " Projects"
    }

    attach(){
        this.hostElement.insertAdjacentElement('beforeend', this.element)
    }
}

class ProjectInput{
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor(){
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input'
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;
        
        this.configure();
        this.attach()
    }

    private getUser() : [string, string, number] | void{
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        if(!validate({value: enteredTitle, required: true}) || !validate({value: enteredDescription, required: true, minLength: 6}) || !validate({value: +enteredPeople, required: true, max: 5, min: 1})){
            alert("Please adjust your values or fill all fields")
            return;
        }
        else{
            return [enteredTitle, enteredDescription, +enteredPeople]
        }
    }

    private clearInput(){
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = ''
    }

    @Autobind
    private submitHandler(event: Event){
        event.preventDefault();
        const userInput = this.getUser()
        if(Array.isArray(userInput)){
            const [enteredTitle, enteredDescription, enteredPeople] = userInput;
            projectState.addProject(enteredTitle, enteredDescription, +enteredPeople)
            this.clearInput()
        }
    }

    private configure(){
        this.element.addEventListener('submit', this.submitHandler)
    }

    private attach(){
        this.hostElement.insertAdjacentElement('afterbegin', this.element)
    }
}

const prjInput = new ProjectInput()
const activePrj = new projectList('active')
const finishedePrj = new projectList('finished')
