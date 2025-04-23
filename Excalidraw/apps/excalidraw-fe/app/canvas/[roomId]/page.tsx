import { RoomCanvas } from "@/components/RoomCanvas";

export default async function page({ params }: {
    params: {
        roomId: string
    }
}) {

    const roomId = (await params).roomId;
    console.log(roomId)

    return (
        <RoomCanvas
            roomId={roomId}
        />
    )
}