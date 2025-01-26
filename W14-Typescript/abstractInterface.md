In JavaScript (and TypeScript), interfaces and abstract classes are used to define a blueprint for objects, but they have different use cases and characteristics.

### Interface
- **Definition**: An interface is a syntactical contract that an entity should conform to. It only contains declarations of methods and properties without any implementation.
- **Use Case**: Use interfaces when you want to define a contract for classes without any implementation details.
- **Syntax**: In TypeScript, interfaces are defined using the `interface` keyword.

```typescript
interface Animal {
    name: string;
    makeSound(): void;
}

class Dog implements Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    makeSound(): void {
        console.log("Bark");
    }
}

const dog = new Dog("Buddy");
dog.makeSound(); // Output: Bark
```

### Abstract Class
- **Definition**: An abstract class is a class that cannot be instantiated on its own and may contain both fully implemented and abstract methods (methods without implementation).
- **Use Case**: Use abstract classes when you have a base class that should not be instantiated, but you want to share common logic among derived classes.
- **Syntax**: In TypeScript, abstract classes are defined using the `abstract` keyword.

```typescript
abstract class Vehicle {
    abstract wheels: number;
    abstract startEngine(): void;

    describe(): void {
        console.log(`This vehicle has ${this.wheels} wheels.`);
    }
}

class Car extends Vehicle {
    wheels = 4;
    startEngine(): void {
        console.log("The car engine starts.");
    }
}

const car = new Car();
car.describe(); // Output: This vehicle has 4 wheels.
car.startEngine(); // Output: The car engine starts.
```

### Key Differences
- **Instantiation**: Interfaces cannot be instantiated, while abstract classes cannot be instantiated directly but can contain concrete/abstract/fully implemented/default methods.
- **Implementation**: Interfaces only declare methods and properties, whereas abstract classes can have implementations
. For example, in the `Vehicle` abstract class, the `describe` method is a concrete implementation that can be shared by all derived classes, whereas the `wheels` property and `startEngine` method are abstract and must be implemented by derived classes.

- **Use Case**: Interfaces are used to define a contract for other classes to implement, while abstract classes are used to provide a common base with shared implementation for derived classes.

