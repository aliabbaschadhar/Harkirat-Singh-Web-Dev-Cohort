interface Person {
    name: string,
    age: number,
    greet(phrase: string): void,
}

class Employee implements Person {
    name: string;
    age: number;

    constructor(a: string, n: number) {
        this.name = a;
        this.age = n;
    }

    greet(phrase: string): void {
        console.log(`${phrase} ${this.name}`)
    }
}

// Abstract classes
// Abstract classes in TypeScript are classes that cannot be instantiated directly. 
// They serve as a blueprint for other classes. An abstract class can contain 
// implementation details for its methods, but it can also declare methods 
// that must be implemented in derived classes. Abstract classes are useful 
// when you want to provide a common base class with some shared logic 
// while still requiring derived classes to implement specific details to achieve runtime polymarphism.

abstract class Shape {
    // An abstract property that must be defined in derived classes
    abstract name: string;

    // An abstract method that must be implemented in derived classes
    abstract calculateArea(): number;

    // A concrete method with implementation shared across all subclasses
    describe(): void {
        console.log(`This shape is a ${this.name} \n with an area of ${this.calculateArea()} units square`)
    }
}

class Rectangle extends Shape {
    name = "Rectangle";

    constructor(public width: number, public height: number) {
        super(); // Calls the constructor of the abstract class
    }

    // Implements the abstract method from the base class
    calculateArea(): number {
        return this.width * this.height;
    }
}

class Circle extends Shape {
    name = "Circle";

    constructor(public radius: number) {
        super(); // Calls the constructor of the abstract class
    }

    // Implements the abstract method from the base class
    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

// Usage example
const shapes: Shape[] = [new Rectangle(10, 5), new Circle(7)];
shapes.forEach(shape => shape.describe());
