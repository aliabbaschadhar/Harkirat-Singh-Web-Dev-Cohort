import axios from "axios";
import { BACKEND_URL } from "../../config";

async function getRoomId(slug: string) {
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`)
    return response.data.id;
}

export default async function chatRoom({ params }: {
    params: {
        slug: string
    }
}) {
    const slug = params.slug;
    const roomId = await getRoomId(slug);


    return (
        <div
            style={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    gap: '20px'
                }
            }
        >
            <h1>Welcome to the Chat Room</h1>
            <h2>Room ID: {params.slug}</h2>
        </div>
    )
}