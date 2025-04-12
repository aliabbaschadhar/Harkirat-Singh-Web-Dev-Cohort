import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "email",
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
        }),
        GoogleProvider({
            clientId: "asd",
            clientSecret: "Asd",
        }),
        GithubProvider({
            clientId: "asd",
            clientSecret: "ads"
        })
    ],
    secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }