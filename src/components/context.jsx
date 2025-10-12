import { createContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { text } from "@fortawesome/fontawesome-svg-core";


const Context = createContext()

export function ContextProvider({children}){
    const navigate = useNavigate()
    const script = {
  // Scene 1: Starting point
  "start_scene": {
    text: "Your alarm starts ringing. You have a class in an hour. What do you do?",
    image: "https://placehold.co/200x150",
    choices: [
      {
        text: "Wake up and get ready for school.",
        nextSceneId: "prepare_for_school",
      },
      {
        text: "Why go to school when you can just stay and bed, and keep dreaming.",
        nextSceneId: "stay_and_dream",
      }, 
      {text: "Curse the teacher so that he slips in hurts his back", 
      nextSceneId: "curse_teacher"}
    ]
  },

  "prepare_for_school": {
    text: `You get out of bed, dreading your miserable life and start preparing for school. You open the fridge and see all kinds of food.\n What do you eat?`,
    image: "https://placehold.co/200x150",
    choices: [
      {
        text: "Eggs",
        nextSceneId: "leave_house",
        statChange: {hygiene:-1}
      },
      {
        text: "Beans",
        nextSceneId: "leave_house",
        statChange: {hygiene:-2}
      },
      {
        text: "Can of sardines",
        nextSceneId: "leave_house",
        statChange: {hygiene:-3}

      },
      {
        text: "All three",
        nextSceneId: "leave_house",
        statChange: {hygiene:-6}

      },
      {
        text: "You close the fridge and decide to have some tea with bread and olive oil instead.",
        nextSceneId: "leave_house",
      }
    ]
  },
  "hide_mug":{
    text: `After throwing the broken pieces of porcelain in trash can, you caught your brother filming you. Now, he's blackmailing you. \n What do you do?`,
    choices: [
      {
        text: "Call his bluff.",
        nextSceneId: "call_bluf",
      },
      {
        text: "Give him 20DH.",
        nextSceneId: "give_money",
      },
      {
        text: "Blackmail him back.",
        nextSceneId: "blackmail_brother"
      }
    ]
  }, 
  

  "stay_and_dream": {
    text: `You enjoy the warmth of the bed, until you hear your father shouting in the kitchen after he found out that the lights of the kitchen were left on overnight.\n What do you do?`,
    choices: [
      {
        text: "Wake up and prepare for school",
        nextSceneId: "prepare_for_school",
      },
      {
        text: "Even an earthquack won't force me out of my bed.",
        nextSceneId: "unlucky_father"
      }
    ]
  },
  "curse_teacher":{
    text:`You try to curse your teacher, but nothing happened.\n You gained five karma points.\n What do you do now?`,
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
    text: `On his way out of the kitchen, your father stabs his toe against the table before triping on the cat and falling to the ground.\n What do you do?`,
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
        statChange: {hp:-100, dignity:-3, hygiene:0}
      }
    ]
  },
  "act_nonchalant":{
    text: `Your attempt to act nonchalant failed miserably, infurating your father and making him beat you even harder.\n After getting beaten up, you had no choice but to prepare for school.\n You lost 4 HP.`,
    choices: [
      {
        text:"Prepare for school",
        nextSceneId: "prepare_for_school"
      }
    ]
  },
  "beg":{
    text: `After your father vented his anger, you walked out of the room to find your brother laughing at you.\n After getting beaten up, you had no choice but to prepare for school.\n You lost 2 HP and 4 points in dignity.`,
    choices:[
      {
        text:`Prepare for school`,
        nextSceneId: "prepare_for_school"
      }
    ]
  },
  "thrash_around":{
    text: `While thrashing around while getting beaten up, you stumbled onto the hanger, and your jacket fell to the ground. A cigarette fell from the pocket of the jacket and rolled on the carpet.\n What do you do?`,
    choices:[
      {
        text:`${<FontAwesomeIcon icon={faSkullCrossbones}/>}!!!`,
        nextSceneId: "place_holder"
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
  

  

  // ... and so on for all your narrative branches
    };

    const [currSceneId, setCurrSceneId] = useState('start_scene')
    const [stats, setStats] = useState({hp:10, dignity:10, hygiene:0})

    function handleChoice(choiceObject){
  const { nextSceneId, statChange } = choiceObject; 

  if (statChange) {
    handleStatChange(statChange);
    // This works for displaying all key/value pairs in an object.
alert('Stats were updated: ' + 
    Object.entries(statChange) // Converts {hp: -4, dignity: -2} into [['hp', -4], ['dignity', -2]]
    .map(([key, value]) => `\n${key}: ${value}`)) //
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