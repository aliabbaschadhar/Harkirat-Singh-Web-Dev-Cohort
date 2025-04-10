import axios from "axios"

export default async function Home() {

  const response = await axios.get("http://localhost:3000/api/v1/user/details")

  const data = response.data;

  return (
    <div>
      Home page

      {data.user}
      {data.email}
    </div>
  )
}