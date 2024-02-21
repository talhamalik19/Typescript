var user;
var userName;
user = 5;
// user = "Talha"
if (typeof user === 'string') {
    userName = user;
    console.log(userName);
}
var person = {
    name: "Talha",
    age: 23
};
var secondPerson = {
    name: "Talha",
    age: 23,
    hobbies: ['supports']
};
function checkAge(user, age) {
    if (user.age > age) {
        console.log("Is Older");
    }
}
checkAge(secondPerson, 19);
