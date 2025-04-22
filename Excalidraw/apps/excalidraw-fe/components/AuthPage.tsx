"use client";
export function AuthPage({ isSignin }: {
    isSignin: boolean;
}) {
    return (
        <div
            className="w-screen h-screen flex items-center justify-center"
        >
            <div className="w-full max-w-sm p-4  shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-4">
                    {isSignin ? "Sign In" : "Sign Up"}
                </h1>
                <div className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded"
                        onClick={() => {
                            // Handle sign in or sign up
                        }}
                    >
                        {isSignin ? "Sign In" : "Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    )
}