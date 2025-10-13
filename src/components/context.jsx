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
    const [report, setReport] = useState({title:null, description:null,imgURL:null, finalStats:null})
    

    const script = {
    // Scene 1: Starting point (No changes needed here)
    "start_scene": {
        text: "Your miserable alarm clock screams its daily warning. You have a class in a mere sixty minutes. What critical life choice do you make?",
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
                statChange: stats.hp <= 8
                    ? { hp: -2, dignity: -2 } // Pathetic Loss: Take more damage and shame
                    : { dignity: 1 }   
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
                text: "Thrash around",
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
                text:`Restart`,
                nextSceneId:'start_scence'
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
        text: `You purchase a sickly-green energy drink marked "Radioactive Blast." You chug it quickly on the curb, feeling energized but with a lingering powerful smell.`,
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
        text: `While thrashing around while getting beaten up, you stumbled onto the coat hanger, and your jacket fell to the ground. A pack of cigarette fell from the pocket and is now resting on the carpet. Your father stops beating you, his eyes wide with horror at the cigarette. He stares at you with quiet fury. What do you do?.`,
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
            statChange: stats.hygiene <= 5 ? { dignity: -2 } : null
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
            nextSceneId: "second_period", // End of this sequence
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
            statChange: { hp: 1 } // Minor HP gain
        },
        {
            text: "Douse self in soap/water (Hygiene focused).",
            nextSceneId: "bathroom_douse",
            statChange: { hygiene: -2 }
        }
    ]
},

// NEW SCENE: Bathroom Rinse
"bathroom_rinse": {
    text: `You wash the dirt and grime from your face, soothing your aches with cold water. It doesn't heal much, but you feel slightly less repulsive.`,
    choices: [
        {
            text: "Head to class.",
            nextSceneId: "second_period",
            
        }
    ]
},

// NEW SCENE: Bathroom Douse
"bathroom_douse": {
    text: `You frantically scrub yourself with industrial-grade hand soap, trying to kill the smell. It temporarily replaces the stench of sardines with the sharp, artificial odor of 'Blue Mountain Dew,' but you feel lighter.`,
    choices: [
        {
            text: "Head to class.",
            nextSceneId: "second_period",
             // Minor hygiene improvement
        }
    ]
},
"second_period": {
    text: `You arrive in the second period, English Literature. The teacher, an ancient woman named Ms. Bighrdayn, slowly pushes her glasses up and announces, "Pop quiz. Analyze this quote from *Anita bath*." Your mind immediately goes blank.`,
    choices: [
        {
            text: "Feign a cough and attempt to discreetly copy from your neighbor.",
            // HP Check: If HP is low (fatigue), cheating is risky.
            nextSceneId: stats.hp <= 6 ? "quiz_cheat_fail" : "quiz_cheat_success",
            // Stat change occurs here immediately upon choice:
            statChange: stats.hp <= 6 ? { dignity: -3 } : { dignity: 2 }
        },
        {
            text: "Write the first coherent thing that comes to mind (The Bruteforce Method).",
            // Hygiene Check: If Hygiene is high (smelly), the teacher is annoyed.
            nextSceneId: stats.hygiene <= 6 ? "quiz_bruteforce_fail" : "quiz_bruteforce_success",
            // Stat change occurs here immediately upon choice:
            statChange: stats.hygiene <= 6 ? { dignity: -1 } : { dignity: 1 }
        },
        {
            text: "Lean back and try to think hard about the meaning.",
            // Dignity Check: Confidence aids focus.
            nextSceneId: stats.dignity >= 8 ? "quiz_think_success" : "quiz_think_fail",
            // Stat change occurs here immediately upon choice:
            statChange: stats.dignity >= 8 ? { dignity: 1 } : { dignity: -2 }
        }
    ]
},
// NEW SCENE: Cheat Success
"quiz_cheat_success": {
    text: `Your movements are slick and silent. You successfully lean over, getting a perfect, legible view of your neighbor's complex, pretentious essay. You furiously scribble down their answer just before the teacher looks your way. You earned a free A!`,
    choices: [
        {
            text: "Accept your victory.",
            nextSceneId: "quiz_results",
        }
    ]
},

// NEW SCENE: Cheat Fail
"quiz_cheat_fail": {
    text: `You turn too quickly, your aching muscles protesting with a **loud groan** against the chair. The sudden movement, combined with the visible fatigue on your face, instantly alerts Ms. Bighrdayn. She stares until you stop breathing, then slowly walks over to rip your paper in half. You failed spectacularly.`,
    choices: [
        {
            text: "Accept your fate.",
            nextSceneId: "quiz_results",
        }
    ]
},

// NEW SCENE: Bruteforce Success
"quiz_bruteforce_success": {
    text: `Your argument is absurd (you wrote about a white shark), but your tolerable scent and effort prevent the teacher from grading out of spite. Ms. Bighrdayn awards you a sympathetic **'C-'** for originality. You barely passed.`,
    choices: [
        {
            text: "Reluctantly move on.",
            nextSceneId: "quiz_results",
        }
    ]
},

// NEW SCENE: Bruteforce Fail
"quiz_bruteforce_fail": {
    text: `Ms. Bighrdayn reads your paper. As she holds it, the faint, lingering aroma of sardines and old socks wafts up from it. She gives you a pained look, as if unsure whether to grade the paper or spray it with disinfectant. She slams a **'D-'** onto the page just to get it out of her sight. You failed.`,
    choices: [
        {
            text: "Reluctantly move on.",
            nextSceneId: "quiz_results",
        }
    ]
},

// NEW SCENE: Think Success
"quiz_think_success": {
    text: `You lean back, ignoring the pressure. Your high **Dignity** allows you to focus, blocking out the pain and the smells. You calmly construct a coherent argument. You feel surprisingly intelligent and get a passing grade.`,
    choices: [
        {
            text: "Submit the paper.",
            nextSceneId: "quiz_results",
        }
    ]
},

// NEW SCENE: Think Fail
"quiz_think_fail": {
    text: `You try to concentrate, but your low **Dignity** means your mind is a chaotic mess of self-doubt and internal panicking. All you can think about is the morning's chaos. You scrawl a confused, panicked stream of consciousness onto the page, resulting in an obvious failure.`,
    choices: [
        {
            text: "Submit the paper.",
            nextSceneId: "quiz_results",
        }
    ]
},

// (The following scenes remain the same, leading to the next section)
"quiz_results": {
    text: `The quiz is over, regardless of your success. You either feel smugly successful, crushed by failure, or somewhere in the middle. The morning drags on, leading up to the most anticipated (and risky) part of the school day: **lunch**.`,
    choices: [
        {
            text: "Head to the cafeteria.",
            nextSceneId: "lunch_scene",
        }
    ]
},

// MODIFIED SCENE: lunch_scene (The next major decision point)
"lunch_scene": {
    text: `The cafeteria is a deafening, chaotic mess, smelling vaguely of floor wax and overcooked mystery meat. You clutch your tray (or perhaps just a stale piece of bread). Where do you sit?`,
    choices: [
        {
            text: "The **Cool Kids' Table** (High risk, high reward).",
            nextSceneId: "lunch_cool_kids_attempt", 
        },
        {
            text: "The **Corner Table**, alone and invisible (Low risk, no reward).",
            nextSceneId: "lunch_corner_alone",
            statChange: stats.dignity <= 5 ? { dignity: -1 } : { hp: 1 } 

        }
    ]
},

// NEW SCENE: Lunch - Corner Table (Dignity vs. Solitude)
"lunch_corner_alone": {
    text: stats.dignity <= 5
        ? `You find the furthest, darkest corner and slump down, staring at your food. No one bothers you. The silence is a relief, but the isolation only amplifies the deep sense of shame and worthlessness from the morning's failures.`
        : `You choose the corner for peace, but your inherent **Dignity** makes solitude feel empowering, not pathetic. You use the quiet time to mentally review the morning's chaos, feeling surprisingly calm and collected.`,
    choices: [
        {
            text: "Finish lunch.",
            nextSceneId: "lunch_end",
        }
    ]
},

// NEW SCENE: Lunch - Cool Kids Attempt (The Social Test)
"lunch_cool_kids_attempt": {
    text: `You approach the table where the school's most judgmental elite sit, laughing loudly and ignoring the world. You stand awkwardly, waiting for an invitation that will never come. The social pressure is immense. How do you attempt to break the ice?`,
    choices: [
        {
            text: "Try to impress them with a bold statement (Dignity Check).",
            nextSceneId: "lunch_bold_statement",
        },
        {
            text: "Just stand there and wait for a sign of acceptance (Hygiene Check).",
            nextSceneId: "lunch_stand_and_stink",
        },
        {
            text: "Attempt to sit down without permission (Combined Check).",
            nextSceneId: "lunch_sit_uninvited",
        }
    ]
},

// NEW SCENE: Lunch - Bold Statement (Dignity Check)
"lunch_bold_statement": {
    text: `You clear your throat and announce, "This food is an insult! I'm pretty sure the cook just used the toilet water to cook the beans!"`,
    choices: [
        {
            // Dignity success: The confidence (even if misplaced) earns a grudging laugh.
            nextSceneId: stats.dignity >= 8 ? "bold_statement_success" : "bold_statement_fail",
            text: "Wait for their reaction.",
            statChange: stats.dignity >= 8 ? { dignity: 2 } : { dignity: -3 }
        }
    ]
},

// NEW SCENE: Bold Statement Success
"bold_statement_success": {
    text: `Your sheer, unearned confidence is baffling, but they find your statement unintentionally hilarious. The "leader" slaps the table once. "Okay, nerd," he says, smiling slightly. "Take a seat." You actually gained temporary, conditional respect.`,
    choices: [
        {
            text: "Sit down.",
            nextSceneId: "lunch_end",
        }
    ]
},

// NEW SCENE: Bold Statement Fail
"bold_statement_fail": {
    text: `Your voice cracks halfway the sentence. The cool kids stare at you like you're an exotic, pathetic bug. "Did the chair just talk?" one asks. You immediately regret your existence.`,
    choices: [
        {
            text: "Slither away to the corner table.",
            nextSceneId: "lunch_end",
        }
    ]
},

// NEW SCENE: Lunch - Stand and Stink (Hygiene Check)
"lunch_stand_and_stink": {
    text: `You stand silently, hoping your presence will be accepted through osmosis. The group's laughter gradually dies down.`,
    choices: [
        {
            // Hygiene success: You're clean enough that the *idea* of you isn't repulsive.
            nextSceneId: stats.hygiene >= 5 ? "stand_stink_success" : "stand_stink_fail",
            text: "Endure the awkward silence.",
            statChange: stats.hygiene >= 5 ? { dignity: 1 } : { dignity: -2 }
        }
    ]
},

// NEW SCENE: Stand and Stink Success
"stand_stink_success": {
    text: `The leader finally glances at you. Since you don't look or smell aggressively bad, he just shrugs. "Whatever. Sit down. Don't breathe on the fries though." A win is a win.`,
    choices: [
        {
            text: "Sit down.",
            nextSceneId: "lunch_end",
        }
    ]
},

// NEW SCENE: Stand and Stink Fail
"stand_stink_fail": {
    text: `The cool kids fall silent. The leader, slowly leans back and gestures vaguely toward you with a single fry. "Listen," he says, sounding genuinely weary. "We're going to need you to move. Even a skunk would be disgusted but the toxins you're emitting. You are a biological risk to all living beings. Retreat."`,
    choices: [
        {
            text: "Retreat in shame.",
            nextSceneId: "lunch_end",
        }
    ]
},


// NEW SCENE: Lunch - Sit Uninvited (Combined Check)
"lunch_sit_uninvited": {
    text: `You decide that action is better than waiting. You casually try to slide into an empty spot at the edge of the table. This is the ultimate test of your morning's preparation.`,
    choices: [
        {
            // Combined Check: Requires high Dignity AND low Hygiene to succeed.
            // Success Condition: Dignity >= 8 AND Hygiene <= 3
            nextSceneId: (stats.dignity >= 8 && stats.hygiene >= 5) ? "sit_uninvited_success" : "sit_uninvited_fail",
            text: "Commit to the sit.",
            statChange: (stats.dignity >= 8 && stats.hygiene >= 5) ? { dignity: 3 } : { hp: -1, dignity: -3 }
        }
    ]
},

// NEW SCENE: Sit Uninvited Success
"sit_uninvited_success": {
    text: `Your effortless move and lack of offensive stench completely disarm the group. The leader merely nods. "Bold move," he says. "We're impressed by the audacity." You have momentarily ascended the social ladder.`,
    choices: [
        {
            text: "Enjoy your triumph.",
            nextSceneId: "lunch_end",
        }
    ]
},

// NEW SCENE: Sit Uninvited Fail
"sit_uninvited_fail": {
    text: `Before your rear even touches the seat, two of the biggest cool kids push your tray—and your body—backwards. You crash to the floor in a pathetic tangle of limbs and spilled mystery meat. The whole cafeteria laughs. "Get lost, creep!" one shouts. You are physically and socially assaulted.`,
    choices: [
        {
            text: "Crawl away.",
            nextSceneId: "lunch_end",
        }
    ]
},

// MODIFIED SCENE: lunch_end
"lunch_end": {
    text: `Lunch is over. Whether you ate alone or were forcibly removed, the bell rings, dragging you toward the afternoon classes. Your ordeal continues...`,
    choices: [
        {
            text: "Continue to Third Period (Gym Class).",
            nextSceneId: "third_period_hallway", 
        }
    ]
},

// MODIFIED SCENE: third_period_hallway (The Nemesis Test)
"third_period_hallway": {
    text: `Navigating the crowded hallway, you run straight into your perennial nemesis, **Stu Pidd**. He's standing directly in your path. "Well, well," Stu sneers. "Look who decided to show up for school today." He's blocking your only path to the gym.`,
    choices: [
        {
            text: "Launch a preemptive attack (HP Check: The physical option).",
            nextSceneId: "nemesis_attack",
            statChange: stats.hp >= 8 ? { dignity: 2 } : { hp: -2, dignity: -3 }

        },
        {
            text: "Try to insult him with a devastating, witty retort (Dignity Check: The mental option).",
            nextSceneId: "nemesis_insult",
            statChange: stats.dignity >= 8 ? { dignity: 3 } : { dignity: -4 }

        },
        {
            text: "Just try to squeeze past him (Hygiene Check: The disgusting option).",
            nextSceneId: "nemesis_squeeze",
            statChange: stats.hygiene <= 3 ? { dignity: 1 } : { hp: -1, dignity: -2, hygiene: -1 }

        }
    ]
},

// NEW SCENE: Nemesis - Physical Attack (HP Check)
"nemesis_attack": {
    text: stats.hp >= 8
        ? `Ignoring the exhaustion from the morning, you surge forward with surprising energy. You catch Stu completely off guard with a solid shove that sends him staggering. He bellows in frustrated rage as you power past him into the gym. You made it through, bruised but triumphant.`
        : `You try to land a quick punch, but your low **HP** makes your move slow and pathetic. Stu merely grabs your outstretched arm, twists it hard, and shoves you into a row of lockers. Your pride is broken, and so is your spirit. You crawl into the gym, nursing a very sore elbow.`,
    choices: [
        {
            text: "Proceed to Gym Class.",
            nextSceneId: "gym_class",
            // If HP is high, you gain dignity. If low, you lose HP and dignity.
        }
    ]
},

// NEW SCENE: Nemesis - Insult (Dignity Check)
"nemesis_insult": {
    text: stats.dignity >= 8
        ? `You draw yourself up to your full height and speak calmly "I aplaud your parents. They knew what they were doing when they named Stu Pidd, stupid." The insult is so specific and delivered with such icy **Dignity** that Stu is genuinely stunned. He momentarily loses his menacing composure, and the nearby students roar with laughter. You seize the moment of confusion and slip past the stunned group.`
        : `You open your mouth to deliver a cutting insult, but your low **Dignity** causes your voice to squeak, and the best you can manage is, "Y-you smell like an old sock!" Stu doesn't even bother to punch you. He just laughs—a deep, crushing, pitying laugh—before flicking your ear and letting you stumble past, utterly humiliated.`,
    choices: [
        {
            text: "Proceed to Gym Class.",
            nextSceneId: "gym_class",
            // If Dignity is high, you gain massive Dignity. If low, you lose it severely.
        }
    ]
},

// NEW SCENE: Nemesis - Squeeze (Hygiene Check)
"nemesis_squeeze": {
    text: stats.hygiene <= 3
        ? `You drop your shoulder and attempt to squeeze between Stu and the wall. Your low **Hygiene** is your weapon. Stu is forced to take a lungful of your 'Egg, Beans, and Sardine combo' aroma. He recoils instantly, his eyes watering, clutching his throat and gagging. "What IS that?!" he coughs, creating a large, clear lane for you to sprint past.`
        : `You attempt to wedge your body past him, but your relatively high **Hygiene** provides no defensive barrier. Stu simply shoves you back with a massive forearm, sending you sprawling into a garbage can. "Not even worth getting my hands dirty," he growls. You emerge smelling of trash and failure.`,
    choices: [
        {
            text: "Proceed to Gym Class.",
            nextSceneId: "gym_class",
            // If Hygiene is low (stinky), you win a tactical victory. If high, you fail badly.
        }
    ]
},

// MODIFIED SCENE: gym_class (Setup for the Accident)
"gym_class": {
    text: `You change into your mandatory, poorly-fitting gym uniform. The coach who had just lost most of his ownings after a nasty divorce looked at you and the other students with fury, instructing you to run laps until your legs fall off. \nWhat do you do?`,
    choices: [
        {
            text: "Try your best to jog properly (HP Check).",
            nextSceneId: "after_warmup_jog",
            statChange: stats.hp >= 8 ? { hp: 1, hygiene: -1 } : { hp: -2, dignity: -1, hygiene: -2 }
        },
        {
            text: "Pretend to trip and feign an injury (Dignity Check).",
            nextSceneId: "after_warmup_trip",
            statChange: stats.dignity >= 8 ? { hp: 1 } : { hp: -1, dignity: -2, hygiene: -2 }
        },
        {
            text: "Walk slowly, trying to hide in the back (Hygiene Check).",
            nextSceneId: "after_warmup_walk",
            statChange: stats.hygiene <= 3 ? { dignity: 1 } : { hp: -1, dignity: -1, hygiene: -2 }
        }
    ]
},

// NEW SCENE: after_warmup_jog (HP Check)
"after_warmup_jog": {
    text: stats.hp >= 8
        ? `You power through the full five minutes, your **HP** holding strong. You barely break a sweat and finish the run feeling surprisingly vital. The coach, spotting your competence, merely grunts and moves on to yelling at someone else.`
        : `Your low **HP** makes the light jog feel like a marathon. By the end, you're winded, your lungs burning. You finish exhausted and slightly humiliated.`,
    choices: [
        {
            text: "Recover and wait for the next disaster.",
            nextSceneId: "after_warmup_next"
        }
    ]
},

// NEW SCENE: after_warmup_trip (Dignity Check)
"after_warmup_trip": {
    text: stats.dignity >= 8
        ? `You execute a flawless, dramatic stumble and clutch your ankle with Oscar-worthy pain. Your high **Dignity** allows you to pull off the deceit convincingly. The coach glares, but seeing the *sheer quality* of your performance, he just snaps, "Go sit on the bench and don't breathe too loudly!" Victory through superior acting.`
        : `You try to trip, but you stumble too hard, genuinely face-planting in front of the entire class. It's so pathetic that the coach assumes you're just clumsy, not injured. "Get up, buttercup! That was the saddest display I've ever seen! Now double-time it!" You must continue running, now with a scraped knee and zero dignity.`,
    choices: [
        {
            text: "Wait for the next disaster.",
            nextSceneId: "after_warmup_next"
        }
    ]
},

// NEW SCENE: after_warmup_walk (Hygiene Check)
"after_warmup_walk": {
    text: stats.hygiene <= 3
        ? `You walk at a snail's pace, letting the crowd of more enthusiastic students buffer you. Because your **Hygiene** is so low, a small, invisible cloud of 'essence' surrounds you. No one wants to jog close to you, and the coach avoids getting near enough to yell at you directly. You escape the run undetected.`
        : `You attempt to walk, but your relative cleanliness means other students keep jogging near you. The coach spots you immediately. "Hey, *you* in the poorly-fitting uniform! I said JOG! Are you deaf *and* lazy?!" He forces you to run the remaining laps with him jogging right beside you.`,
    choices: [
        {
            text: "Wait for the next disaster.",
            nextSceneId: "after_warmup_next"
        }
    ]
},

"after_warmup_next": {
    text: `Luckily, the rest of the afternoon was uneventful, you could sense the end of the school day approaching.\n Can you survive the journey back home and finish this story?.`,
    choices: [
        {
            text: "Only one way to find out.",
            nextSceneId: "way_back_home",
        },
        
    ]
},
// NEW SCENE: way_back_home (The Journey)
"way_back_home": {
    text: `The final bell screams its freedom song. You exit the school and step onto the cracked sidewalk. The journey home is a gauntlet of loose dogs, hostile elementary schoolers, and existential dread. A final challenge awaits.`,
    choices: [
        {
            text: "Take the shortcut through the dark alley (Hygiene Check: The stealth option).",
            nextSceneId: "alley_shortcut",
            statChange: stats.hygiene <= 3 ? { hp: 1 } : { hp: -2, dignity: -2 }
        },
        {
            text: "Brave the main street, weaving through traffic (HP Check: The endurance option).",
            nextSceneId: "main_street_traffic",
            statChange: stats.hp >= 8 ? { dignity: 1 } : { hp: -3, hygiene: -1 }
        },
        {
            text: "Attempt a detour through the fancy neighborhood (Dignity Check: The social option).",
            nextSceneId: "fancy_detour",
            statChange: stats.dignity >= 8 ? { hp: 1 } : { dignity: -2, hygiene: -1 }
        }
    ]
},

// NEW SCENE: alley_shortcut (Hygiene Check)
"alley_shortcut": {
    text: stats.hygiene <= 3
        ? `You enter the dark, damp alleyway. Your low **Hygiene** works as camouflage. You blend seamlessly with the environment—the damp garbage, the overflowing dumpster. Even the territorial stray cats ignore you, sensing a kindred, unwashed spirit. You emerge on the other side, faster and totally unnoticed.`
        : `You take the alley, but your lack of proper street filth makes you stand out. A feral dog, alerted by your comparatively clean scent, jumps out and barks aggressively. You have to sacrifice your dignity (and a shoe) to escape, sprinting until you hit the main road.`,
    choices: [
        {
            text: "Keep moving toward home.",
            nextSceneId: "end_of_day_report"
        }
    ]
},

// NEW SCENE: main_street_traffic (HP Check)
"main_street_traffic": {
    text: stats.hp >= 8
        ? `The main street is a madhouse, but your high **HP** allows you to move with surprising grace. You execute a series of athletic, parkour-like leaps over concrete barriers and time a gap in the traffic perfectly, crossing four lanes in a single, adrenaline-fueled dash. You feel a surge of energy.`
        : `You try to weave through traffic, but your exhaustion catches up to you. You trip over a loose curb right in front of a bus, forcing it to slam on its brakes with a screech. The driver unleashes a stream of profanity as you scramble across the street, thoroughly shaken and minorly injured.`,
    choices: [
        {
            text: "Keep moving toward home.",
            nextSceneId: "end_of_day_report"
        }
    ]
},

// NEW SCENE: fancy_detour (Dignity Check)
"fancy_detour": {
    text: stats.dignity >= 8
        ? `You take the detour. The houses are pristine, the lawns manicured. A neighborhood watch car slows down to observe you. Your high **Dignity** allows you to meet the driver's gaze calmly, radiating an air of unassailable, even if misleading, importance. The driver, confused by your confidence, waves and drives on. You pass through without incident.`
        : `You attempt to walk through the rich neighborhood. A woman, watering her prize-winning petunias, takes one look at your shame-ridden, poorly-uniformed form. She picks up her phone and dials a number "Hello, There's a creepy looking person hanging around the neighbourhood." You realize you do not belong and must quickly retreat before the police show up.`,
    choices: [
        {
            text: "Keep moving toward home.",
            nextSceneId: "end_of_day_report"
        }
    ]
},



// NEW SCENE: end_of_day_report (The End)
"end_of_day_report": {
    text: `You have made it home. You collapse onto your bed, the smell of your uniform, the exhaustion in your bones, and the shame of the day's social blunders finally weighing you down. You survived the day, but the question remains: Can you survive tomorrow? \n\n**-- END OF PART I -- Part two coming soon, maybe.**`,
    choices: [
        {
            text: "View Final Stats.",
            nextSceneId: "view_stats" // A placeholder for the final screen
        }
    ]
}

};


    

    function handleChoice(choiceObject){
      const { nextSceneId, statChange } = choiceObject; 
      if(nextSceneId==='view_stats'){
        generateEndOfDayReport()
      }

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
      setStats({hp:10, dignity:10, hygiene:10})
      setLastStatChange(null)
      navigate('/render')
    }
    
    /**
 * Function to generate the final end-of-day report and update state.
 * Assumes 'stats' object has properties: hp, dignity, hygiene.
 * Assumes 'setReport' is a React state setter function.
 */
/**
 * Function to generate the final end-of-day report and update state.
 * Uses specific numerical checks to ensure all report titles are plausible across the 0-10 stat range.
 */
function generateEndOfDayReport() {
    let reportTitle = "The Average Survivor";
    let reportDescription = "You made it home. Nothing spectacular happened, good or bad, and your stats are perfectly balanced. A true middle-of-the-road experience. Don't worry, tomorrow will be just as unremarkable.";
    let reportImgURL = '';
    // Variable to hold the user-readable condition string
    let reportCondition = 'Balanced Stats';

    // --- Define Thresholds (More granular for dynamic outcomes) ---
    const VERY_LOW = 2; // Extremely bad
    const LOW = 4;      // Bad
    const MID = 6;      // Okay/Average
    const HIGH = 8;     // Good
    const VERY_HIGH = 10; // Perfect

    // --- HIGHLY SPECIFIC COMBINED CHECKS (Priority 1) ---

    // The Unchallenged Legend: All EXTREMELY HIGH (e.g., all 9 or 10)
    if (stats.hp >= HIGH && stats.dignity >= HIGH && stats.hygiene >= HIGH) {
        reportTitle = "The Unchallenged Legend";
        reportDescription = "You didn't just survive the day; you **dominated** it. You are physically immaculate, socially flawless, and effortlessly ascended the high school hierarchy. You are simply too cool for this game. **Go find a better life; your story here is over.**";
        reportImgURL = 'gigachad.webp';
        reportCondition = 'HP, Dignity, and Hygiene are ALL HIGH (8+)';
    }
    // The Absolute Zero: All EXTREMELY LOW (e.g., all 0, 1, or 2)
    else if (stats.hp <= VERY_LOW && stats.dignity <= VERY_LOW && stats.hygiene <= VERY_LOW) {
        reportTitle = "The Absolute Zero";
        reportDescription = "Every stat is at rock bottom. You are a complete disaster—physically exhausted, mentally crushed, and biologically offensive. You didn't survive the day; you were *tolerated*. **Congratulations, you are the school's official pity project.**";
        reportImgURL = 'shrek.webp';
        reportCondition = 'HP, Dignity, and Hygiene are ALL VERY LOW (<= 2)';
    }
    // The Glorious Juggernaut: HP and Dignity HIGH, Hygiene just OK
    else if (stats.hp >= HIGH && stats.dignity >= HIGH && stats.hygiene >= MID) {
        reportTitle = "The Victorious Bully";
        reportDescription = "You are exhausted from winning. Every confrontation was a decisive victory, and your ego is soaring. You are the protagonist, and everyone else is just set dressing. **You’re probably going to demand the lunch lady give you extra dessert.**";
        reportImgURL = 'buffedCat.jpeg';
        reportCondition = 'High HP & High Dignity, with Mid Hygiene (6+)';
    }
    // The Arrogant Trash Fire: Dignity VERY HIGH, Hygiene VERY LOW
    else if (stats.dignity >= HIGH && stats.hygiene <= LOW) {
        reportTitle = "The Arrogant Trash Fire";
        reportDescription = "You are a potent mix of high self-regard and low personal maintenance. Your massive **Dignity** dictates that your terrible smell is actually a 'bold, earthy cologne.' You insulted everyone who commented on it, then successfully bulldozed your way home. **You are objectively a mess, but a powerful mess.**";
        reportImgURL = 'lordlyTrashcan.webp';
        reportCondition = 'High Dignity (8+) and Low Hygiene (<= 4)';
    }
    // The Stinking Tank: HP HIGH, Hygiene VERY LOW
    else if (stats.hp >= HIGH && stats.hygiene <= VERY_LOW) {
        reportTitle = "The Stinking Tank";
        reportDescription = "You are physically resilient, but your stench is a weapon of mass repulsion. You ran every lap and won every skirmish by being **too disgusting to touch**. An effective, if extremely lonely, strategy that will require a HAZMAT team for cleanup.";
        reportImgURL = 'buffedShrek.jpeg';
        reportCondition = 'High HP (8+) and Very Low Hygiene (<= 2)';
    }
    // The Pristine Doormat: Dignity VERY LOW, Hygiene HIGH
    else if (stats.dignity <= LOW && stats.hygiene >= HIGH) {
        reportTitle = "The Pristine Doormat";
        reportDescription = "You are clean but utterly spineless. You avoided confrontation and relied on your cleanliness to keep people from actively hating you. You have the squeaky-clean look of a victim waiting to happen. **Your clothes smell great, but your soul is stained with cowardice.**";
        reportImgURL = 'showerCat.jpeg';
        reportCondition = 'Low Dignity (<= 4) and High Hygiene (8+)';
    }
    // The Battered Ego: HP and Dignity VERY LOW, Hygiene doesn't matter
    else if (stats.hp <= VERY_LOW && stats.dignity <= LOW) {
        reportTitle = "The Battered Ego";
        reportDescription = "You are a wreck. Your body is exhausted, and your mind is mush. You failed every physical and social challenge. You don't have enough energy left to wallow in self-pity, so you're just going to lie there and quietly contemplate your failures. **A deeply unsatisfying end to a miserable day.**";
        reportImgURL = 'bulliedFrog.jpeg';
        reportCondition = 'Very Low HP (<= 2) and Low Dignity (<= 4)';
    }

    // --- SINGLE STAT CHECKS (Priority 2 - Catch all remaining high/low extremes) ---

    // Low Checks (Use MID as the cut-off for a major flaw)
    else if (stats.hp <= LOW) {
        reportTitle = "The Walking Bruise";
        reportDescription = "You arrived home as a human tapestry of minor injuries. Every nerve ending is screaming. You are too weak to even remove your shoes. **Your body has filed a grievance against your spirit.**";
        reportImgURL = 'weak.jpeg';
        reportCondition = 'Low HP (<= 4)';
    }
    else if (stats.dignity <= LOW) {
        reportTitle = "The Embodiment of Shame";
        reportDescription = "Your **Dignity** is so low it registers as a gravitational anomaly. You are now scientifically indistinguishable from a sentient doormat. **You will be thinking about that one awkward thing you said in 7th grade for the rest of the week.**";
        reportImgURL = 'pathetic.jpeg';
        reportCondition = 'Low Dignity (<= 4)';
    }
    else if (stats.hygiene <= LOW) {
        reportTitle = "The Biohazard Blob";
        reportDescription = "You are covered in a toxic film composed of sweat, exhaust, and construction filth. The *smell* arrived 30 seconds before you did. **Your clothes must be burned. You may need to be hosed down.**";
        reportImgURL = 'shower.jpeg';
        reportCondition = 'Low Hygiene (<= 4)';
    }

    // High Checks (Use HIGH as the cut-off for a major advantage)
    else if (stats.hp >= HIGH) {
        reportTitle = "The Unsinkable Anomaly";
        reportDescription = "Against all logic, you are energized. Your relentless **HP** allowed you to absorb every blow without losing momentum. You are now considering a light 10K run. **You are a biological bulldozer with unearned stamina.**";
        reportImgURL = 'buffedMona.jpeg';
        reportCondition = 'High HP (8+)';
    }
    else if (stats.dignity >= HIGH) {
        reportTitle = "The Egotistical Titan";
        reportDescription = "Your **Dignity** has achieved critical mass. You are convinced the entire school day was an elaborate test of your character, which you passed flawlessly. **You close your eyes, radiating an unearned sense of moral superiority.**";
        reportImgURL = 'vultouri.jpeg';
        reportCondition = 'High Dignity (8+)';
    }
    else if (stats.hygiene >= HIGH) {
        reportTitle = "The Sparkling Target";
        reportDescription = "Despite the chaos, you remained bafflingly clean. Every piece of filth in your house is now magnetically drawn to you. **You are doomed to smell good, which seems to be the greatest handicap of all.**";
        reportImgURL = 'Mr_Clean.jpeg';
        reportCondition = 'High Hygiene (8+)';
    }

    // --- Final State Update ---
    setReport({
        title: reportTitle,
        description: reportDescription,
        finalStats: stats,
        imgURL: reportImgURL,
        // Passing the readable condition
        condition: reportCondition
    });
    // Assuming 'navigate' is your routing function (e.g., from react-router-dom)
    navigate('/report');
}



    return(
        <Context.Provider value={{script, currSceneId, setCurrSceneId, stats, handleChoice, restart, handleStatChange, lastStatChange, report}}>
            {children}
        </Context.Provider>
    )

  }



export default Context