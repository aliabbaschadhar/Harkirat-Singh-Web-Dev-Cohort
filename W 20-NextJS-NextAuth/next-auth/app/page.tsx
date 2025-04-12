// "use client";
import { getServerSession } from "next-auth";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";


//! But now everthing is happening on client side which not the best approach in next js we should render it on server side.
//* For that we will use getServerSession hook;
// export default function Home() {
//   return <SessionProvider>
//     <RealHome />
//   </SessionProvider>
// }

// function RealHome() {
//   const session = useSession();
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       {/* How to check whether a user is loged in or not ? By using useSession hook */}
//       {session.status === "authenticated" ? <button onClick={() => signOut()}>LogOut</button> : <button onClick={() => signIn()}>SignIn</button>}

//       {JSON.stringify(session)}
//     </div>
//   );
// }


export default async function Home() {
  const session = await getServerSession();
  return <div>
    {JSON.stringify(session)}
  </div>
}
