import { createContext, useState } from "react";
import run from '../config/gemini'
export const context =createContext();

const ContextProvider=(props)=>{

    const [input,setInput]=useState('')
    const [recentPrompt,setRecentPrompt]=useState('')
    const [prevPrompt,setprevPrompt]=useState([])
    const [showResult,setShowResult]=useState(false)
    const [loading,setLoading]=useState(false)
    const [resultData,setResultData]=useState('')

    const delaypara = (index,nextWord)=>{
        setTimeout(()=>{
            setResultData(prev=>prev+nextWord)
        },10*index)
    }

    const newChat=()=>{
        setLoading(false)
        setShowResult(false)
    }

    const onSent=async (prompt)=>{
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt !==undefined){
            response= await run(prompt);
            setRecentPrompt(prompt)
        }
        else{
            setprevPrompt(prev=>[...prev,input])
            setRecentPrompt(input)
            response= await run(input);
        }
        
        let responseArray= response.split("**")
        let newResponse='' ;
        for(let i=0;i<responseArray.length;i++){
            if(i===0 || i%2!==1){
                newResponse += responseArray[i];
            }
            else{
                newResponse += '<b>'+responseArray[i]+'</b>';
            }
        }
        let newResponse2 = newResponse.split("*").join('</br>')
        // setResultData(newResponse2)
        let newResponseArray = newResponse2.split("");
        for(let i=0;i<newResponseArray.length;i++){
            const nextWord= newResponseArray[i]
            delaypara(i,nextWord+'')
        }
    //   setResultData(newResponse)
      setLoading(false)
      setInput('')
    }

    const contextValue={
        prevPrompt,
        setprevPrompt,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }
 
    return (
        <context.Provider value={contextValue}>
            {props.children}
        </context.Provider>
    )
}

export default ContextProvider