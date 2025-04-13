interface PropType {
    placeholder: string;
    onClick?: () => void;
    onChange?: React.ChangeEvent<HTMLInputElement>;
}

export function TextIput({ placeholder }: PropType) {
    return <input
        type="text"
        style={{
            padding: 16,
            margin: 4,
            backgroundColor: "orange",
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: "5%",
            color: "black"
        }}
        placeholder={placeholder}
    >
    </input>
}