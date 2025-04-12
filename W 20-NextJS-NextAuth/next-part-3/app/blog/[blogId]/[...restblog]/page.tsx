
export default async function Page({ params }: {
    params: {
        restblog: string[],
        blogId: string
    }
}) {

    // A folder or file in the form `/docs/[...slug]` will match ** all ** segments in that position(e.g., `/docs/anything/here` will be matched by`[...slug]`).
    const blogId = (await params).blogId;
    const rest = (await params).restblog; // ["21",'143']
    return (
        <div>
            dynamic Routes: {blogId}
            <br />
            catch-All-Segments: {JSON.stringify(rest)}
        </div>
    )
}