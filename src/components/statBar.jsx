import { useContext } from "react";
import Context from "./context";

export default function StatBar(){
    const {stats} = useContext(Context)

    return(
        <nav>
            {stats&&Object.entries(stats).map(([key, value]) =>{
                return(<span className="stat" key={key}>
                    {key} : {value}/10
                </span>)
            })}
        </nav>
    )
}