import React, { useContext } from "react";
import "./main.css";
import { assets } from "../../assets/assets";
import { context } from "../../context/Context";
const Main = () => {

  const {onSent,recentPrompt,showResult,loading,resultData,setInput,input}=useContext(context)
  return (
    <div className="main">
      <div className="nav">
        <p>Helpmeai..</p>
        <img src={`src/assets/user_icon.png`} alt="" className=""  width={50} height={50} />
      </div>
      <div className="main-container">
        {!showResult?
        <>
<div className="greet">
          <p>
            <span>Hello, kapil.</span>
          </p>
          <p>how can i help you today</p>
        </div>
        <div className="cards">
          <div className="card">
            <p>who is the lord of the universe</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card">
            <p>Oldest religion in the world</p>
            <img src={assets.bulb_icon} alt="" />
          </div>
          <div className="card">
            <p>who is the real goat?</p>
            <img src={assets.message_icon} alt="" />
          </div>
          <div className="card">
            <p>why sanatan is best religion</p>
            <img src={assets.code_icon} alt="" />
          </div>
        </div>
        </>
        :<div className="result">
          <div className="result-title">
            <img src={assets.user_icon} alt=""  style={{height:'30px',width:'40px',borderRadius:'50%'}}/>
            <p>{recentPrompt}</p>
          </div>
          <div className="result-data">
            {/* <img src={assets.gemini_icon} /> */}
            <p className="hma">Helpmeai..</p>
            {loading
            ?
            <div className="loader">
              <img src={assets.load_icon}/>

            </div>
            : 
            <p dangerouslySetInnerHTML={{__html:resultData}}></p>
            }
           
          </div>
        </div>
        }
        
        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e)=>setInput(e.target.value)}  value={input}  type="text" placeholder="enter a prompt here.." />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
            </div>
          </div>
          <p className="bottom-info">
            Helpmeai is using gemini api  <a href="https://ai.google.dev/gemini-api" target="blank">gemini api</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
