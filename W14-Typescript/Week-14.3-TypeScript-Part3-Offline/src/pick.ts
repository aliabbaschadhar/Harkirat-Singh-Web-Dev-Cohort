// Ceating a new type/ subset of types from existing types this is called pick.
//See blackBoxPICK.ts first.

interface User {
    id: number,
    name: string,
    email: string,
    createdAt: Date,
}

const user: User = {
    id: 89289,
    name: "alpha",
    email: "aliab@gmial.com",
    // createdAt:01 - 12 - 2001
    createdAt: new Date("December 1, 2001")

}

// For profile display only pick name and email
type UserProfile = Pick<User, 'name' | "email">

const displayUserProfile = (user: UserProfile) => {
    console.log(`User name is : ${user.name} \n User email is : ${user.email}`);
}

displayUserProfile(user)

// To say that we want to take all the properties except one then we use the Omit thingy..

type UserProfileOmited = Omit<User, "id" | "email">

const omitedUserProfile = (user: UserProfileOmited) => {
    console.log(`User name is : ${user.name} \n User crated at : ${user.createdAt}`);
}

omitedUserProfile(user)