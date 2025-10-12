import { createContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { text } from "@fortawesome/fontawesome-svg-core";


const Context = createContext()

export function ContextProvider({children}){
    const navigate = useNavigate()
    const [currSceneId, setCurrSceneId] = useState('start_scene')
    const [stats, setStats] = useState({hp:10, dignity:10, hygiene:10})
    

    const script = {
    // Scene 1: Starting point (No changes needed here)
    "start_scene": {
        text: "Your miserable alarm clock screams its daily warning. You have a class in a mere sixty minutes. What critical life choice do you make?",
        image: "https://placehold.co/200x150",
        choices: [
            {
                text: "Accept fate. Drag yourself out of bed and face the school day.",
                nextSceneId: "prepare_for_school",
            },
            {
                text: "Stay buried and keep dreaming.",
                nextSceneId: "stay_and_dream",
            },
            {
                text: "Curse the teacher so violently their back spontaneously throws out.",
                nextSceneId: "curse_teacher"
            }
        ]
    },

    "prepare_for_school": {
        text: `You manage to peel yourself out of bed, immediately dreading your life. Time to face the kitchen. You open the fridge—it's a chaotic mess of options. What fuels your impending doom?`,
        image: "https://placehold.co/200x150",
        choices: [
            {
                text: "Scrambled Eggs (A basic level of stench).",
                nextSceneId: "leave_house",
                statChange: { hygiene: -1 }
            },
            {
                text: "Beans (Nuclear fuel).",
                nextSceneId: "leave_house",
                statChange: { hygiene: -2 }
            },
            {
                text: "A can of sardines (The maritime assault).",
                nextSceneId: "leave_house",
                statChange: { hygiene: -3 }
            },
            {
                text: "The Full Combo: Eggs, Beans, and Sardines (Biohazard breakfast).",
                nextSceneId: "leave_house",
                statChange: { hygiene: -6 }
            },
            {
                text: "You close the fridge. It's too much effort. The classic tea, bread, and olive oil it is.",
                nextSceneId: "leave_house",
            }
        ]
    },

    "leave_house":{
        text: `Having survived breakfast, you escape the house. You reach a major intersection, a crossroads of consequence. Do you face the public or seek shadow?`,
        choices: [
            {
                text: "Take the **Main Street** (The crowded path).",
                nextSceneId: "main_street",
            },
            {
                text: "Slip through the **Alleys** (The suspicious shortcut).",
                nextSceneId: "alleys",
            }
        ],
        
    }, 

    "main_street":{
        text: `While walking down the busy Main Street, you awkwardly collide with a weird-looking guy. He spins around, face contorted in a silent scream of pure fury. What do you do?`,
        choices: [
            {
                text: "Scream back at him immediately.",
                nextSceneId: "crowded_quarell",
            },
            {
                text: "Control yourself and apologize profusely.",
                nextSceneId: "apologise",
            },
            {
                text: "Stand there, mouth slightly ajar, staring blankly.",
                nextSceneId: "stand_there",
            }
        ]
    },

    "apologise":{
        text: `You managed to control your immediate reaction and offered a genuine apology. Surprisingly, the weird guy accepted it and even commended your "humble, grounded personality." The situation is defused.`,
        choices: [
            {
                text: "Continue toward school.",
                nextSceneId: "continue_school_road",
            },
        ]
    },

    "stand_there":{
        // Hygiene Checks Refined
        text: stats.hygiene >= 8
            ? `You stand on the spot, staring at the weird guy's face like an absolute simpleton. He screams threats, but all he gets is your vacant, unblinking stare. After a minute of this performance, he gives up and walks away, clearly doubting his own sanity.`
            : stats.hygiene >= 5
                ? `Annoyed by your idiotic attitude, he lunges and grabs you by the collar. But before a word can escape his mouth, he recoils, overwhelmed by the sudden, pungent wave of your breakfast. He glares at you with furious disgust, then walks away muttering about public sanitation.`
                : `Annoyed by your total lack of reaction, he grabs you by the collar for a shake. But the sheer force of the **Egg, Beans, and Sardine combo** hits him like a tactiacal nuke. He faints on the spot, overwhelmed by the atmospheric pollution that is your morning hygiene.`,
        choices: [
            {
                text: "Continue toward school.",
                nextSceneId: "continue_school_road",
            },
        ]
    },

    "crowded_quarell":{
        text: `The noise attracts a growing crowd. The weird guy sneers, pulling the attention to himself. He dramatically challenges you to a **singing contest**. The loser must publicly apologize to the winner. What is your response?`,
        choices: [
            {
                text: "Accept the challenge (You're no chicken).",
                nextSceneId: "singing_contest",
            },
            {
                text: "Buc Buc (Make chicken noises and run).",
                nextSceneId: "chicken_out",
                statChange: { dignity: -2 }
            },
            {
                // CRITICAL FIX: Removed the statChange logic here entirely.
                text: "Skip the singing and punch him in the mouth.",
                nextSceneId: "fight",
            }
        ]
    },

    "fight":{
        // HP-Based Fight Text Refined
        text: stats.hp <= 8
            ? `You try to take the weird-looking guy, swinging your fist at him, but the morning's beating has left you heavy and slow. Your punch is less of an attack and more of a **tired, mid-air wobble**, making a wide arc that would miss a stationary lamppost. The guy simply steps aside and, with bored efficiency, begins to beat the absolute pulp out of you. You don't manage a single effective block; you are merely a **flopping, pathetic receiver of consequences.**`
            : `Ignoring the early morning stiffness, you let loose a **wild, sputtering barrage of fists.** You catch the weird-looking guy completely off-guard, overwhelming him with sheer, unexpected rage. After stumbling back and realizing you're not going to stop, he decides the fight isn't worth the trouble. He lets out a disgusted grunt, turns tail, and **sprints away like a frightened rabbit.**`,
        choices: [
            {
                text: "Continue",
                nextSceneId: "continue_school_road",
                // Applying the consequences based on the HP stat
                statChange: stats.hp <= 8
                    ? { hp: -2, dignity: -2 } // Pathetic Loss: Take more damage and shame
                    : { dignity: 1 }          // Surprising Win: Gain confidence
            },
        ]
    },
    
    // The rest of the script is clean and remains the same for continuity.
    // ...
    "singing_contest":{
        text: `The crowd hushes. You have accepted the challenge. Your reputation is on the line: impress the majority of this judgmental street crowd, and you win.`,
        choices: [
            {
                text: "You sing like a champion. (WIN).",
                nextSceneId: "won_contest",
                statChange: { dignity: 1 }
            },
            {
                text: "You sing like a cat being strangled. (LOSE).",
                nextSceneId: "lost_contest",
                statChange: { dignity: -2 }
            },
            {
                text: "Buc Buc (Abandon all pretense and make chicken noises).",
                nextSceneId: "chicken_out",
                statChange: { dignity: -5 }
            }
        ]
    },
    "chicken_out":{
        text: `The weird guy sneered at you, calling you a coward before walking away. The crowd dispersed, leaving you alone with their mocking words echoing in your ears.`,
        choices: [
            {
                text: "Continue.",
                nextSceneId: "continue_school_road",
            }
        ]
    },
    "won_contest":{
        text: `You won! The weird-looking guy lowered his head in shame, apologized loudly, and walked away. The crowd applauds your unexpected vocal talent.`,
        choices: [
            {
                text: "Continue toward school.",
                nextSceneId: "continue_school_road",
            },

        ]
    },
    "lost_contest":{
        text: `You lowered your head in shame and apologized to the weird-looking guy. He looked at you with a smug expression before walking away, relishing his small victory.`,
        choices: [
            {
                text: "Continue toward school.",
                nextSceneId: "continue_school_road",
            },
            
        ]
    },
    
    "stay_and_dream": {
        text: `You enjoy the warmth of the bed, until you hear your father shouting in the kitchen after he found out that the lights were left on overnight. What do you do?`,
        choices: [
            {
                text: "Wake up and prepare for school",
                nextSceneId: "prepare_for_school",
            },
            {
                text: "Even an earthquake won't force me out of my bed.",
                nextSceneId: "unlucky_father"
            }
        ]
    },
    "curse_teacher":{
        text:`You tried to curse your teacher, but nothing happened. It seems you lack the spiritual conviction. What do you do now?`,
        choices:[
            {
                text: "Wake up and get ready for school.",
                nextSceneId: "prepare_for_school",
            },
            {
                text: "Why go to school when you can just stay and bed, and keep dreaming.",
                nextSceneId: "stay_and_dream",
            }
        ]

    },

    "unlucky_father": {
        text: `On his way out of the kitchen, your father stabs his toe against the table before tripping on the cat and falling to the ground. What do you do?`,
        choices: [
            {
                text: "Wake up and prepare for school",
                nextSceneId: "prepare_for_school",
            }, {
                text: "Zzzzzzz. Keep on dreaming, champ. I'm sure nothing bad is gonna happen",
                nextSceneId: "good_beating"
            }
        ]
    },
    "good_beating":{
        text: `With smoke puffing from his ears like a cartoon character, your father barges into your room very mad. Seeing you sleeping peacefully instead of going to school, he starts beating you up. What do you do?`,
        choices: [
            {
                text: "Act nonchalant",
                nextSceneId:"act_nonchalant",
                statChange: {hp:-4, dignity:0, hygiene:0},
            }, 
            {
                text: "Beg.",
                nextSceneId:"beg",
                statChange: {hp:-2, dignity: -4, hygiene:0},
            },
            {
                text: "Trash around",
                nextSceneId: "thrash_around",
            }
        ]
    },
    "act_nonchalant":{
        text: `Your attempt to act nonchalant failed miserably, infuriating your father and making him beat you even harder. After getting beaten up, you had no choice but to prepare for school.`,
        choices: [
            {
                text:"Prepare for school",
                nextSceneId: "prepare_for_school"
            }
        ]
    },
    "beg":{
        text: `After your father vented his anger, you walked out of the room to find your brother laughing at you. After getting beaten up, you had no choice but to prepare for school.`,
        choices:[
            {
                text:`Prepare for school`,
                nextSceneId: "prepare_for_school"
            }
        ]
    },
    "thrash_around":{
        text: `While thrashing around while getting beaten up, you stumbled onto the coat hanger, and your jacket fell to the ground. A cigarette fell from the pocket and is now resting on the carpet. What do you do?`,
        choices:[
            {
                text:`💀💀💀 (You're cooked).`,
                nextSceneId: "thrash_around",
                statChange: {hp:-100, dignity:-3, hygiene:0}

            }
        ]
    },
    "continue_school_road":{
        text: `You barely manage to reach `,
        choices:[
            {
                text:`💀💀💀 (You're cooked).`,
                nextSceneId: "thrash_around",
                statChange: {hp:-100, dignity:-3, hygiene:0}

            }
        ]
    },
    
    "place_holder":{
        text:`place_holder`,
        choices:[
            {
                text:`place_holder`,
                nextSceneId:'place_holder'
            }
        ]
    }
    // ...
};

    

    function handleChoice(choiceObject){
      const { nextSceneId, statChange } = choiceObject; 

      if (statChange) {
        handleStatChange(statChange);
        alert('Stats were updated: ' + Object.entries(statChange).map(([key, value]) => `\n${key}: ${value}`))
      }

      setCurrSceneId(nextSceneId);
      console.log(stats); 

    }

    

    function handleStatChange(statDiff){
      setStats({hp:stats.hp+(statDiff.hp||0), dignity:stats.dignity+(statDiff.dignity||0), hygiene:stats.hygiene+(statDiff.hygiene||0)})
    };

    function restart(){
      setCurrSceneId('start_scene')
      setStats({hp:10, dignity:10, hygiene:0})
      navigate('/render')
    }
    
    

    return(
        <Context.Provider value={{script, currSceneId, setCurrSceneId, stats, handleChoice, restart, handleStatChange}}>
            {children}
        </Context.Provider>
    )

  }



export default Context