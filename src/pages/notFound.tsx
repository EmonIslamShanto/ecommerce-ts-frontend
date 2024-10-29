import { MdErrorOutline } from "react-icons/md"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="container not-found">
        <MdErrorOutline size={100} />
        <h1>404</h1>
        <h2>Page not found</h2>
        <Link to="/">Back to Home</Link>
    </div>
  )
}

export default NotFound