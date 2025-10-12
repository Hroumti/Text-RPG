import { useNavigate, Link } from "react-router-dom"


export default function Home(){
    const navigate = useNavigate()
    return(
        <div className="render-container">
            <h1>Welcome to our Text Role Playing game</h1>
            <Link to={'/render'} className="start">Start a new game</Link>
        </div>

)
}