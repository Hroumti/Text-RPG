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
    const [lastStatChange, setLastStatChange] = useState(null)
    

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
        text: stats.hp===10?`You manage to peel yourself out of bed, immediately dreading your life. Time to face the kitchen. You open the fridge—it's a chaotic mess of options. What fuels your impending doom?`:`Rubbing your bruises and dreading your miserable life, you open the fridge—it's a chaotic mess of options. What fuels your impending doom?`,
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
                text: "Why go to school when you can just stay in bed, and keep dreaming.",
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
                statChange: {hp:-4},
            }, 
            {
                text: "Beg.",
                nextSceneId:"beg",
                statChange: {hp:-2, dignity: -4},
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
    
    
    
    "place_holder":{
        text:`place_holder`,
        choices:[
            {
                text:`place_holder`,
                nextSceneId:'place_holder'
            }
        ]
    },
    //New events
    // ... (The previous script block content is assumed to be here)

    // NEW SCENE: The Alleys
    "alleys": {
        text: `You slip into the dark, refuse-scented alleys, hoping for a quicker, quieter route. Halfway down, you find a faded $50 bill crumpled beneath a dumpster. But just as you reach for it, a mangy stray dog lunges at your hand.`,
        choices: [
            {
                text: "Snatch the money and run.",
                nextSceneId: "alleys_win",
                statChange: { hp: -1 } // The dog takes a nip
            },
            {
                text: "Try to befriend the dog with an old piece of bread.",
                nextSceneId: "alleys_fail",
                statChange: { dignity: -3 } // You look ridiculous
            }
        ]
    },

    // NEW SCENE: Alleys - Success
    "alleys_win": {
        text: `You were quick, but not quick enough to avoid a painful nip. The dog lets out a satisfied yelp, but you escaped with the wrinkled 50 dirhams bill clutched in your bleeding hand.\n\n**Consequence:** You're richer, but wounded.`,
        choices: [
            {
                text: "Continue toward school.",
                nextSceneId: "continue_school_road",
            }
        ]
    },

    // NEW SCENE: Alleys - Failure
    "alleys_fail": {
        text: `The dog just stares at you, utterly unimpressed by your offering and your strange demeanor. It barks once, grabs the 50 dirhams bill itself (it's surprisingly well-trained), and trots off. You are left alone, standing foolishly with a handful of stale bread.`,
        choices: [
            {
                text: "Continue toward school.",
                nextSceneId: "continue_school_road",
            }
        ]
    },
    
    

    

    

    // NEW SCENE: The End of the Road (Placeholder to continue or end the story)
    "continue_school_road":{
        text: stats.hp<10&&stats.hygiene<=8?`You finally reach the corner before the school. You're wounded, possibly smelly, but you made it. Do you go to class, or do you stop at the local kiosk for a questionable energy drink?`:`You finally reach the corner before the school.\n Do you go to class, or do you stop at the local kiosk for a questionable energy drink?`,
        choices:[
            {
                text:`Head straight into class.`,
                nextSceneId: "class_scene" // Placeholder for next chapter
            },
            {
                text:`Stop for a 'Questionable Energy Drink'.`,
                nextSceneId: "kiosk_stop",
                statChange: { hp: 1, hygiene: -1 }
            }
        ]
    },
    
    // NEW SCENE: kiosk Stop
    "kiosk_stop": {
        text: `You purchase a sickly-green energy drink marked "Radioactive Blast." You chug it quickly on the curb, feeling a strange tingling in your fingertips.`,
        choices: [
            {
                text: "Head to class.",
                nextSceneId: "class_scene",
                 // Gain some energy, but the drink smells.
            }
        ]
    },

    // NEW SCENE: Thrash Around Consequence (The current thrash around leads to a loop with a massive HP loss, so this is the final resolution)
    "thrash_around":{
        text: `While thrashing around while getting beaten up, you stumbled onto the coat hanger, and your jacket fell to the ground. A lit cigarette fell from the pocket and is now resting on the carpet. Your father stops beating you, his eyes wide with horror at the cigarette. He stares at you with quiet fury. What do you do?.`,
        choices:[
            {
                text:`There's nothing you can do (You're cooked).`,
                nextSceneId: "game_over",
                statChange: {hp:-100, dignity:-3}
            }
        ]
    },

    // NEW SCENE: Game Over
    "game_over": {
        text: `The domestic incident caused by the hidden cigarette finished you. You are now a statistic..`,
        choices: [
            {
                text: "RIP",
                nextSceneId: "start_scene",
                
            }
        ]
    },
    
    // NEW SCENE: Class (Placeholder for the next part of the story)
    // NEW SCENE: Class (The setup for the stat check)
"class_scene": {
    text: `You arrive late and immediately sense the crushing weight of education and judgment. The teacher glares at you. You slink to your desk, but now you have to face the next five hours. What do you do during the first period?`,
    choices: [
        {
            text: "Try to sleep on the desk.",
            nextSceneId: "class_sleep_attempt",
            statChange: stats.hp <= 5 ? { dignity: -1 } : null
        },
        {
            text: "Try to blend in and focus on the lecture.",
            nextSceneId: "class_blend_in",
        },
    ]
},

// NEW SCENE: Sleep Attempt (HP Check)
"class_sleep_attempt": {
    text: stats.hp <= 5
        ? `You try to rest your head, but your body is too broken and painful from the morning's various beatings. Every slight movement sends a fresh spike of pain. You lie there twitching, unable to rest, drawing pity and confusion from the nearest students.`
        : `Your head hits the desk like a sack of rocks. The quiet exhaustion of your morning's misadventures claims you completely, and you instantly fall into a deep, drooling sleep. The teacher doesn't even bother to wake you—you look that pitifully worn out.`,
    choices: [
        {
            text: stats.hp<=5?"Sigh and endure.":"Sleep like the pitiful failure that you're",
            nextSceneId: "class_endure",
            // If you failed (low HP), you lost sleep time, so suffer a minor dignity hit
        }
    ]
},

// NEW SCENE: Blend In (Hygiene Check)
"class_blend_in": {
    text: stats.hygiene <= 8
        ? `You try your hardest to focus, leaning in to look at the board. Unfortunately, the close quarters mean your **Hygiene** is now a tactical liability. The student next to you starts sniffing the air, looks directly at you, and makes a very dramatic show of covering their nose with their sleeve. The teacher notices and wrinkles their own nose. Under their judgemental gazes, you fart out of nervousness.\n What do you do?`
        : `You manage to keep a low profile, silently enduring the class. Nobody notices you, which, given your life choices, is a major victory.`,
    choices: stats.hygiene>8?[
        {
            text: "Continue the agonizing focus.",
            nextSceneId: "class_endure",
            // If you failed (high Hygiene), you look shameful
            statChange: stats.hygiene >= 5 ? { dignity: -2 } : null
        },
        
    ]:[
        {
            text: "Blame it on the chair (The Farouq way).",
            nextSceneId: "chair_fart",
            // If you failed (high Hygiene), you look shameful
            statChange:stats.dignity>=5? { dignity: -4 }:null
        },
        {
            text: "Act cool.",
            nextSceneId: "act_cool",
            // If you failed (high Hygiene), you look shameful
            statChange: stats.dignity<9?{ dignity: -2 }:{dignity:1}
        }
    ]
},
"chair_fart": {
    text: lastStatChange=={dignity:-4}
        ? `"It wasn't me! It was the chair, I swear!" you hiss, pointing a shaking finger at the innocent piece of furniture. The teacher and all 30 students stare. The wooden chair, in its silent solidarity, chooses that exact moment to let out a loud, protesting creak, as if deeply offended by your blatant betrayal. You sink low, realizing even inanimate objects have more dignity than you do. `
        : `You try to blame the chair with a theatrical sweep of your arm. "Bad chair!" you declare, trying to deflect the noxious cloud. No one laughs. No one glares. The students just continue to exist, as if this is simply a mundane part of your daily routine—like breathing, or failing. The non-reaction is crushing: your reputation is so low that even a loud, stinky public blunder is met with absolute, soul-destroying apathy. You realize you've reached a new low when your own flatulence is considered the baseline expectation.`,
    choices: [
        {
            text: "Continue",
            nextSceneId: "class_endure",
            
        },
        
    ]
},
"act_cool": {
    text: stats.dignity>=9
        ? `"The offensive noise tears through the quiet classroom, drawing every eye to your vicinity. Instead of reacting with panic, your high Dignity takes over. You slowly turn your gaze to the student sitting behind you, holding their eyes with an expression of profound, pitying disappointment. "A truly pathetic effort, Mouad," you say, your voice low and even. "I expected better." The class immediately shifts their focus to the terrified student you just blamed. Your confidence is so absolute, no one dares to suggest the smell is emanating from the source of the accusation—you. `
        : `The foul noise is immediate and undeniable. Your low Dignity scores make you desperate, so you try the bold, confident play: you slowly turn your gaze to the student sitting behind you, "Johnson." "A truly pathetic effort, I expected better," you attempt to sneer.\m

        The entire class just stares back at you with dead eyes, not believing your story for a second. Your face, red with shame and effort, betrays the truth that your Dignity was never high enough to pull off such a powerful lie. The only person suffering more than you is poor Johnson, who now has to endure the class thinking he's friends with you.`,
    choices: [
        {
            text: "Continue",
            nextSceneId: "class_endure",
            
        },
        
    ]
},


// NEW SCENE: Endure (The default transition to the next part of the story)
"class_endure": {
    text: `The bell finally rings, signaling the end of the first period. You survived the classroom's judgment. Where do you go next?`,
    choices: [
        {
            text: "To the bathroom to assess the damage.",
            nextSceneId: "bathroom_break",
        },
        {
            text: "Go straight to the next class.",
            nextSceneId: "place_holder", // End of this sequence
        }
    ]
},

// NEW SCENE: Bathroom Break (HP/Hygiene interaction)
"bathroom_break": {
    text: `You find a dirty school bathroom. You look in the mirror and are deeply disappointed. Do you try to patch up your injuries, or try to reduce the stink?`,
    choices: [
        {
            text: "Rinse face and injuries (HP focused).",
            nextSceneId: "bathroom_rinse",
        },
        {
            text: "Douse self in soap/water (Hygiene focused).",
            nextSceneId: "bathroom_douse",
        }
    ]
},

// NEW SCENE: Bathroom Rinse
"bathroom_rinse": {
    text: `You wash the dirt and grime from your face, soothing your aches with cold water. It doesn't heal much, but you feel slightly less repulsive.`,
    choices: [
        {
            text: "Head to class.",
            nextSceneId: "place_holder",
            statChange: { hp: 1 } // Minor HP gain
        }
    ]
},

// NEW SCENE: Bathroom Douse
"bathroom_douse": {
    text: `You frantically scrub yourself with industrial-grade hand soap, trying to kill the smell. It temporarily replaces the stench of sardines with the sharp, artificial odor of 'Blue Mountain Dew,' but you feel lighter.`,
    choices: [
        {
            text: "Head to class.",
            nextSceneId: "place_holder",
            statChange: { hygiene: -2 } // Minor hygiene improvement
        }
    ]
},
};


    

    function handleChoice(choiceObject){
      const { nextSceneId, statChange } = choiceObject; 

      if (statChange) {
        handleStatChange(statChange);
        setLastStatChange(statChange)
      } else{
        setLastStatChange(null)
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
        <Context.Provider value={{script, currSceneId, setCurrSceneId, stats, handleChoice, restart, handleStatChange, lastStatChange}}>
            {children}
        </Context.Provider>
    )

  }



export default Context