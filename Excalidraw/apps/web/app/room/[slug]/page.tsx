import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ChatRoom } from "../../../components";

async function getRoomId(slug: string) {
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`)
    return response.data.room.id;
}

export default async function chatRoom({ params }: {
    params: {
        slug: string
    }
}) {
    const { slug } = await params;
    const id = await getRoomId(slug);
    return (
        <div
            style={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    height: '80vh',
                    alignItems: 'center',
                    gap: '8px',

                }
            }
        >

            <ChatRoom
                id={id}
            />
        </div>
    )
}