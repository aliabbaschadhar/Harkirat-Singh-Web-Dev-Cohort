import { ReactElement } from "react";

type variants = "primary" | "secondary"

export interface ButtonProps {
    variant: variants;
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick: () => void;
}

const defaultStyles = "flex rounded-md p-4 m-2 cursor-pointer"
const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-300 text-purple-600 "
}
const sizeStyles = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-4 px-6",
}


export const Button = ({ variant, size, onClick, text, startIcon, endIcon }: ButtonProps) => {
    return (
        <button
            className={` ${defaultStyles}  ${variantStyles[variant]} ${sizeStyles[size]} `}
            onClick={() => onClick}
        >
            {startIcon ? <div className="pr-2">{startIcon}</div> : null}
            {text}
            {endIcon ? <div className="pr-2"> {endIcon}</div> : null}
        </button>
    )
}

{/* <Button variant="primary" size="md" onClick={() => { }} text={"ass"} /> */ }

