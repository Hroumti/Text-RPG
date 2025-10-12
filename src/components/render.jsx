import { useContext, useEffect, useState } from "react";
import Context from './context'
import { useNavigate } from "react-router-dom";

export default function Render(){
    const navigate = useNavigate()
    const {handleChoice, currSceneId, handleStatChange, script, stats} = useContext(Context)
    // This hook correctly runs *after* stats have been updated and the component has re-rendered.
useEffect(()=>{
    // Check for game-over conditions based on the LATEST stats value
    console.log(stats)
    if(stats.hp <= 0 || stats.dignity <= 0 || stats.filthiness <= 0){ 
        navigate('/notice')
    }
}, [stats, navigate]); // Reruns whenever `stats` object changes


    return(
        <div className="render-container">
            <div className="text-container">
                {script[currSceneId||'place_holder'].text}.
                {script[currSceneId||'place_holder'].image && <img src={script[currSceneId||'place_holder'].image} alt="scene image" />}
            </div>
            <div className="choice-container">
                {script[currSceneId||'place_holder'].choices && script[currSceneId||'place_holder'].choices.map((c, index)=> (
                    <button key={index} onClick={()=>handleChoice(c)}>{c.text}</button>
                ))}
            </div>
        </div>
    )
}