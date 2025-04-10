// In a function that can accept several types of inputs but you want to exclude specific types from being passed to it.

//! It works with only union of types not with intesection of types
//! if exclude is used with intersection then it will cause unexpected behaviours

type Event2 = 'click' | "scroll" | "mousemove";
type ExcludeEvent = Exclude<Event2, 'scroll'>

const handleEvent = (event: ExcludeEvent) => {
    console.log(`Handling event ${event}`);
}

handleEvent("click") // Handling event click
// Error for scroll
// handleEvent("scroll")
//! Type 'scroll' is not assignable to type 'ExcludeEvent'



type Person3 = {
    name: string;
    age: number;
};

type Employee = {
    employeeId: number;
    department: string;
};

type EmployeeWithoutDepartment = Exclude<Employee, { department: string }>;

// const employeeWithoutDepartment: EmployeeWithoutDepartment = {
//     employeeId: 123,
// }; 
//! type { employeeId: number; } is not assignable to type never;

// console.log(employeeWithoutDepartment);