import axios from "axios";

export default async function BlogPage({ params }: {
    params: {
        blogId: string
    }
}) {
    const postId = (await params).blogId; // The params. property must match the parent folder name in [] here it is postId

    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    const finalData = response.data;
    return <div>
        Blog Page {postId}
        <br />
        title:{finalData.title}
        <br />
        body:{finalData.body}
    </div>
}