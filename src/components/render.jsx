import { useContext, useEffect, useState } from "react";
import Context from './context'
import { useNavigate,Link } from "react-router-dom";

export default function Render(){
    const navigate = useNavigate()
    const {handleChoice, currSceneId, handleStatChange, script, stats, lastStatChange} = useContext(Context)
    const [gameOver, setGameOver] = useState(false)
    // This hook correctly runs *after* stats have been updated and the component has re-rendered.
useEffect(()=>{
    // Check for game-over conditions based on the LATEST stats value
    console.log(stats)
    if(stats.hp <= 0 || stats.dignity <= 0 || stats.filthiness <= 0){ 
        setGameOver(true)
    }
}, [stats, navigate]); // Reruns whenever `stats` object changes


    return(
        <div className="render-container">
            <div className="text-container">
{lastStatChange && <span className="statChangeSpan">Stats were updated: {Object.entries(lastStatChange).map(([key, value]) => <span key={key} className="stat-change" style={{color:value<0?'red':'limegreen'}}>{value > 0 ? `+${value} ${key} ` : `${value} ${key} `}</span>)}<br/><hr/></span>}                
                {script[currSceneId||'place_holder'].text}.
                {script[currSceneId||'place_holder'].image && <img src={script[currSceneId||'place_holder'].image} alt="scene image" />}
            </div>
            <div className="choice-container">
                {gameOver?<Link to={'/notice'} className="start">You lost</Link>:script[currSceneId||'place_holder'].choices && script[currSceneId||'place_holder'].choices.map((c, index)=> (
                    <button key={index} onClick={()=>handleChoice(c)}>{c.text}</button>
                ))}
            </div>
        </div>
    )
}