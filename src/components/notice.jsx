import { useContext } from 'react'
import Context from './context'
import { Link } from 'react-router-dom'

export default function Notice(){
    const {stats, setCurrSceneId, restart} = useContext(Context)

    return(
        <div className="notice-container">
            <h1>--GAME OVER--</h1>
            {stats.hp<=0?(<div className="game-over-notice">
                    You succumbed to your injuries . Your passing was genuinely sad for exactly 17 seconds. After that, everyone became absorbed in the task of dividing up your meager possessions. <br />

                    The only thing your relatives and friends will remember about you is how good the couscous tasted at your funeral reception.
                    <img src='funeral.jpg' alt="funeral" />

                </div>):(stats.dignity<=0?<div className="game-over-notice">
                    Your sense of Dignity has completely dissolved. Unable to face the consequences of your pathetic decisions, your character instinctively buried their head in sand. <br />
                    Unfortunately, the rest of your body failed to receive oxygen, leading to an immediate and preventable demise.

                    CAUSE OF DEATH: Terminal embarrassment leading to positional asphyxiation.
                    <img src='depressedCat.jpeg' alt="depressedCat" />

                </div>:(<div className="game-over-notice">
                    Some people are filthy rich, but you're just straight up filthy. <br />
                    Your actions (or lack thereof, regarding soap) created an atmosphere so toxic that the very air molecules around you became depressed and refused to carry oxygen to your lungs. <br />
                    CAUSE OF DEATH: A protest by the local air quality against the global injustice of your existence.
                    <img src='trashGoblin.webp' alt="trashGoblin" />

                </div>))}
            <button onClick={restart}>Do you want play again?</button>
        </div>
    )
}