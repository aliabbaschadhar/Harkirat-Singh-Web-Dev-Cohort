interface User32 {
    id: number,
    name: string,
    age: number,
    email: string,
    password: string,
}

type UpdatedProps = Pick<User32, "name" | "age" | "email">

type UpdatedPropsOptional = Partial<UpdatedProps>

function updatedUser(UpdatedProps: UpdatedPropsOptional) {
    // Hit the database tp update the user
}

updatedUser({})