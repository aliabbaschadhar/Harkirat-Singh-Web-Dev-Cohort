import { ReactNode } from "react"

export function IconButton({
    icon,
    onClick,
    activated = false // Add default value of false
}: {
    icon: ReactNode;
    onClick: () => void;
    activated?: boolean; // Add the activated prop
}) {
    return (
        <div
            className={`cursor-pointer rounded-xl border-2 p-2 ${activated
                    ? "border-purple-500 bg-purple-900 text-white"
                    : "border-gray-600 bg-black hover:bg-gray-700 active:bg-purple-900"
                }`}
            onClick={onClick}
        >
            {icon}
        </div>
    )
}
