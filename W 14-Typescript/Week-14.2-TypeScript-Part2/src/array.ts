let marks: number[] = [38, 21, 13, 113, 553, 2, 1];

let maxNum = -1;
marks.forEach((num) => {
    if (num > maxNum) maxNum = num;
})
console.log(maxNum);

function maxVal(arr: number[]) {
    let max = 0;

    // arr.map((num)=>(num>max && max=num))
    // Gives error because && has higher precedence then =(assignment operator)
    //  so the evaluated expression would be (num>max && max) = num instead of (num > max && max=num)

    // arr.map((num) => ((num > max) && (max = num)))

    // Can also done using ternary operator
    arr.map((num) => num > max ? max = num : max)

    return max;
}

let val = maxVal(marks);

// User is legal or not

interface UserLegal {
    firstName: string,
    lastName: string,
    age: number,
}

function filteredUsers(users: UserLegal[]) {
    return users.filter((user) => user.age >= 18);
}

console.log(filteredUsers([{
    firstName: "ali",
    lastName: "abbas",
    age: 8
}, {
    firstName: "ali",
    lastName: "Hamza",
    age: 25,
}]));

