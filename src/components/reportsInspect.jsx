import React from 'react';

// Hardcoded list of all possible report outcomes
const allReports = [
    {
        title: "The Unchallenged Legend",
        description: "You didn't just survive the day; you dominated it. You are physically immaculate, socially flawless, and effortlessly ascended the high school hierarchy. You are simply too cool for this game. Go find a better life; your story here is over.",
        imgURL: 'gigachad.webp',
        condition: "HP >= HIGH && Dignity >= HIGH && Hygiene >= HIGH"
    },
    {
        title: "The Absolute Zero",
        description: "Every stat is at rock bottom. You are a complete disaster—physically exhausted, mentally crushed, and biologically offensive. You didn't survive the day; you were tolerated. Congratulations, you are the school's official pity project.",
        imgURL: 'shrek.webp',
        condition: "HP <= VERY_LOW && Dignity <= VERY_LOW && Hygiene <= VERY_LOW"
    },
    {
        title: "The Victorious Bully",
        description: "You are exhausted from winning. Every confrontation was a decisive victory, and your ego is soaring. You are the protagonist, and everyone else is just set dressing. You’re probably going to demand the lunch lady give you extra dessert.",
        imgURL: 'buffedCat.jpeg',
        condition: "HP >= HIGH && Dignity >= HIGH && Hygiene >= MID"
    },
    {
        title: "The Arrogant Trash Fire",
        description: "You are a potent mix of high self-regard and low personal maintenance. Your massive Dignity dictates that your terrible smell is actually a 'bold, earthy cologne.' You insulted everyone who commented on it, then successfully bulldozed your way home. You are objectively a mess, but a powerful mess.",
        imgURL: 'lordlyTrashcan.webp',
        condition: "Dignity >= HIGH && Hygiene <= LOW"
    },
    {
        title: "The Stinking Tank",
        description: "You are physically resilient, but your stench is a weapon of mass repulsion. You ran every lap and won every skirmish by being too disgusting to touch. An effective, if extremely lonely, strategy that will require a HAZMAT team for cleanup.",
        imgURL: 'buffedShrek.jpeg',
        condition: "HP >= HIGH && Hygiene <= VERY_LOW"
    },
    {
        title: "The Pristine Doormat",
        description: "You are clean but utterly spineless. You avoided confrontation and relied on your cleanliness to keep people from actively hating you. You have the squeaky-clean look of a victim waiting to happen. Your clothes smell great, but your soul is stained with cowardice.",
        imgURL: 'showerCat.jpeg',
        condition: "Dignity <= LOW && Hygiene >= HIGH"
    },
    {
        title: "The Battered Ego",
        description: "You are a wreck. Your body is exhausted, and your mind is mush. You failed every physical and social challenge. You don't have enough energy left to wallow in self-pity, so you're just going to lie there and quietly contemplate your failures. A deeply unsatisfying end to a miserable day.",
        imgURL: 'bulliedFrog.jpeg',
        condition: "HP <= VERY_LOW && Dignity <= LOW"
    },
    {
        title: "The Walking Bruise",
        description: "You arrived home as a human tapestry of minor injuries. Every nerve ending is screaming. You are too weak to even remove your shoes. Your body has filed a grievance against your spirit.",
        imgURL: 'weak.jpeg',
        condition: "HP <= LOW (Single Stat Check)"
    },
    {
        title: "The Embodiment of Shame",
        description: "Your Dignity is so low it registers as a gravitational anomaly. You are now scientifically indistinguishable from a sentient doormat. You will be thinking about that one awkward thing you said in 7th grade for the rest of the week.",
        imgURL: 'pathetic.jpeg',
        condition: "Dignity <= LOW (Single Stat Check)"
    },
    {
        title: "The Biohazard Blob",
        description: "You are covered in a toxic film composed of sweat, exhaust, and construction filth. The *smell* arrived 30 seconds before you did. Your clothes must be burned. You may need to be hosed down.",
        imgURL: 'stinker.jpeg',
        condition: "Hygiene <= LOW (Single Stat Check)"
    },
    {
        title: "The Unsinkable Anomaly",
        description: "Against all logic, you are energized. Your relentless HP allowed you to absorb every blow without losing momentum. You are now considering a light 10K run. You are a biological bulldozer with unearned stamina.",
        imgURL: 'buffedMona.jpeg',
        condition: "HP >= HIGH (Single Stat Check)"
    },
    {
        title: "The Egotistical Titan",
        description: "Your Dignity has achieved critical mass. You are convinced the entire school day was an elaborate test of your character, which you passed flawlessly. You close your eyes, radiating an unearned sense of moral superiority.",
        imgURL: 'vultouri.jpg',
        condition: "Dignity >= HIGH (Single Stat Check)"
    },
    {
        title: "The Sparkling Target",
        description: "Despite the chaos, you remained bafflingly clean. Every piece of filth in your house is now magnetically drawn to you. You are doomed to smell good, which seems to be the greatest handicap of all.",
        imgURL: 'MrClean.jpeg',
        condition: "Hygiene >= HIGH (Single Stat Check)"
    },
    {
        title: "The Average Survivor",
        description: "You made it home. Nothing spectacular happened, good or bad, and your stats are perfectly balanced. A true middle-of-the-road experience. Don't worry, tomorrow will be just as unremarkable.",
        imgURL: '',
        condition: "Default/Fallback"
    }
];

const AllReportsComponent = () => {
    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>All Possible End of Day Reports</h1>
            <p>This is a complete list of every possible outcome, ignoring the conditional logic and stats.</p>
            
            {allReports.map((report, index) => (
                <div 
                    key={index} 
                    style={{ 
                        border: '1px solid #ccc', 
                        padding: '15px', 
                        margin: '15px 0', 
                        borderRadius: '8px',
                        boxShadow: '2px 2px 5px rgba(0,0,0,0.1)'
                    }}
                >
                    <h2 style={{ color: '#0056b3' }}>{report.title}</h2>
                    {/* Display Image if URL exists - Placeholder for your actual image handling */}
                    {report.imgURL && (
                        <div style={{ margin: '10px 0', textAlign: 'center' }}>
                            <img 
                                src={report.imgURL} 
                                alt={`Image for ${report.title}`} 
                                
                            />
                           
                        </div>
                    )}
                    <p style={{ lineHeight: '1.6' }}>
                        <strong>Description:</strong> {report.description}
                    </p>
                    <p style={{ fontSize: '0.8em', color: '#999' }}>
                        **Original Condition:** *{report.condition}*
                    </p>
                </div>
            ))}
        </div>
    );
};

export default AllReportsComponent;