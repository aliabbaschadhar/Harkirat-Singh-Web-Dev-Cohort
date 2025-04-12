//If we want to handle the routes at /blog route one way is that we can do it by creating page.tsx here  and other way is to use ===> catch all [[...slug]] 
// this will handle all the routes at /blog and routes inside the /blog/2/2/1 etc
export default function page() {
    return <div>
        Blog component
    </div>
}