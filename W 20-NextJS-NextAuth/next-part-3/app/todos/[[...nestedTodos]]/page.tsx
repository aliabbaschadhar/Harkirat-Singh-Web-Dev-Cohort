export default async function Page({ params }: {
    params: {
        //It should be same as slug used in [[...slug]]
        nestedTodos?: string[]  // Optional array of string segments
    }
}) {
    // When accessing just /todos, nestedTodos will be undefined
    // When accessing /todos/1/2, nestedTodos will be ['1', '2']
    const resolvedParams = await Promise.resolve(params);
    const nestedTodos = resolvedParams.nestedTodos;

    return (
        <div>
            {!nestedTodos && <div>I am on /todos/ page</div>}
            {nestedTodos && (
                <div>
                    <p>Catch all segments: {JSON.stringify(nestedTodos)}</p>
                    <p>I am on todos and nested route</p>
                </div>
            )}
        </div>
    );
}