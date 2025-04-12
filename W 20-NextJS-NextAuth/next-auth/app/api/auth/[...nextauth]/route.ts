import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        Credentials({
            name: "Login with your email",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Enter your email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const username = credentials?.username;
                const password = credentials?.password;

                console.log(username, password)

                // Create db request and it returns me successfully user

                const user = {
                    username: "harkirat",
                    id: "1",
                    password: "random1234",
                }

                if (user) return user;
                else return null;
            }
        })
    ]
})

export { handler as GET, handler as POST }