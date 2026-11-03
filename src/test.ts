function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size:10, label: "Size 10 Object"};
let point : Point = {x: 10, y: 10};

printLabel(myObj);

interface LabelledValue{
  label: string;
}

interface Point{
  readonly x: number;
  readonly y: number;
}

interface SearchFunc{
  (source: string, subString: string) : boolean;
}

class Greeter {
  greeting : string;
  constructor(message: string){
    this.greeting = message;
  }
  greet(){
    return "Hello, " + this.greeting
  }
}

let greeter = new Greeter("world");
