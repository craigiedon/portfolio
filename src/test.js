"use strict";
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
let myObj = { size: 10, label: "Size 10 Object" };
let point = { x: 10, y: 10 };
printLabel(myObj);
class Greeter {
    greeting;
    constructor(message) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
let greeter = new Greeter("world");
//# sourceMappingURL=test.js.map