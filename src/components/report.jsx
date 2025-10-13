import { useContext } from 'react';
import Context from './context';

export default function Report() { // Assuming restart is passed as a prop or defined globally
    const { report, restart } = useContext(Context);

    // Safety check in case the report object isn't fully loaded
    if (!report || !report.finalStats) {
        return (
            <div className="report-container">
                <h1>--LOADING REPORT...--</h1>
                <button onClick={restart}>Do you want play again?</button>
            </div>
        );
    }

    // Destructure for cleaner access
    const { title, description, finalStats, imgURL, condition } = report;

    return (
        <div className="report-container">
            <h1>--END OF DAY REPORT--</h1>
            <hr />

            <div className="report-summary">
                <h2>{title}</h2>
                <img src={imgURL} alt={imgURL} className='report-img'/>
                <p>{description}</p>
                <p><b>Condition</b> : {condition}</p>
            </div>

            <hr />

            


            <button onClick={restart}>
                Do you want to survive another day?
            </button>
        </div>
    );
}