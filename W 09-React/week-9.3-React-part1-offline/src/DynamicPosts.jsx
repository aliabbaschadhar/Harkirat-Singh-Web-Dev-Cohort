import { useState } from 'react'
import { PostComponent } from './Post'


function App() {
  const [posts, setPosts] = useState([]);//Initially the posts array is empty 

  // const posts = [
  //   {
  //     name: "John Doe",
  //     subtitle: "Software Engineer",
  //     time: "2 hours ago",
  //     image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D&auto=format&fit=crop&w=400&q=60",
  //     description: "Want to know how to win BIG? Check out this video!",
  //   }, {
  //     name: "Simon",
  //     subtitle: "Software Engineer",
  //     time: "2 min ago",
  //     image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D&auto=format&fit=crop&w=400&q=60",
  //     description: "Want to know how to win BIG? Check out this video!",
  //   },]

  function addPosts() {
    // posts.push({
    //   name: "John Doe",
    //   subtitle: "Software Engineer",
    //   time: "2 hours ago",
    //   image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D&auto=format&fit=crop&w=400&q=60",
    //   description: "Want to know how to win BIG? Check out this video!",
    // })

    //! When we clicked the Add Post button it does not adds the post Why?
    // Because when we click the button, it does not re-render the component
    // Which is bcz react will only re-renders the component when the state in the component changes.
    // So for that we will use the useState to change the state of the component.

    setPosts([...posts, {
      name: "John Doe",
      subtitle: "Software Engineer",
      time: "2 hours ago",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D&auto=format&fit=crop&w=400&q=60",
      description: "Want to know how to win BIG? Check out this video!",
    }])
  }

  return (
    <div style={{ backgroundColor: "#dfe6e9", height: "100vh" }}>
      <button onClick={addPosts}>Add Post</button>
      <div style={{ display: 'flex', justifyContent: "center" }}>
        <div>

          {/* <PostComponent
            name={"John Doe"}
            subtitle={"Software Engineer"}
            time={"2 hours ago"}
            image={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D&auto=format&fit=crop&w=400&q=60"}
            description={"Want to know how to win BIG? Check out this video!"}
          /> */}

          {
            posts.map((post, index) =>
              <PostComponent
                key={index} //So that map does not re-render the same component and can differentiate each post with their unique key.
                name={post.name}
                image={post.image}
                description={post.description}
                subtitle={post.subtitle}
                time={post.time}
              />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default App