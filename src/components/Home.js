import React,{useState,useEffect,useContext} from "react";
import './Home.css';
import {ethers} from "ethers";
import { WalletContext } from "../App";
import Admin from "./Admin";
import { BrowserRouter as Router,Routes,Link } from "react-router-dom";


import contractABI from '../StackUp.json';
const contractAddr = '0x1Eda8A739A2ccf3Bd041CfE14c653d429A25d329';

function Home() {

  const{currentAddress,walletConnected,connectWalletHandler}=useContext(WalletContext);
    
  const[allQuestsInfo,setAllQuestsInfo] = useState([]);
  const[userQuestStatuses,setUserQuestStatuses]=useState([]);
  const[questId,setQuestId]=useState(null);
  const[submitId,setSubmitId]=useState(null);
  


  const getAllQuestsInfoHandler = async() => {
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddr,contractABI,provider);

      const nextQuestId = await contract.nextQuestId();
      let allQuestsInfo = [];
      let thisQuest;

      for(let i=0;i<nextQuestId;i++){
        thisQuest = await contract.quests(i);
        allQuestsInfo.push(thisQuest);
      }

      setAllQuestsInfo(allQuestsInfo);

    }catch(error){
      console.log(error);
    }
  }

  const getUserQuestStatusHandler = async() => {
    try{
      if(currentAddress){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddr,contractABI,provider);

        const nextQuestId = await contract.nextQuestId();
      
        const questStatusMapping = {0:"NOT_JOINED",1:"JOINED",2:"SUBMITTED"};
        
        let userQuestStatuses = [];
        let thisQuest;

        for(let i=0;i<nextQuestId;i++){
          let thisQuestStatus = [];
          thisQuest = await contract.quests(i);
         
          let thisQuestTitle = thisQuest[2];
          let thisQuestId = thisQuest[0];
   
          thisQuestStatus.push(thisQuestTitle);
          
          const questStatusId = await contract.playerQuestStatuses(currentAddress,thisQuestId);
         
          thisQuestStatus.push(questStatusMapping[questStatusId]);
          
          userQuestStatuses.push(thisQuestStatus);
        }
        
        setUserQuestStatuses(userQuestStatuses);
      }else{
        console.log('There is no current Address');
      }
    }catch(error){
      console.log(error);
    }
  }

  const joinQuestHandler = async() => {
    try{
      if(questId){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddr,contractABI,signer);

        const txn = await contract.joinQuest(questId);
        console.log('Joining the Quest');
        await txn.wait();
        console.log('Quest Joined Successfully');
        setQuestId(null);

      }else{
        alert("Enter Quest Id before proceeding");
      }
    }catch(error){
      console.log(error);
    }
  }

  const submitQuestHandler = async() => {
    
      try{
          if(submitId){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
        const contract = new ethers.Contract(contractAddr,contractABI,signer);
    
        const txn = await contract.submitQuest(submitId);
        console.log('Submitting Quest');
        txn.wait();
        console.log('Quest Submitted Successfully');
        setSubmitId(null);
          }else{
            alert("Enter Quest Id before Submitting");
          }
        
       }catch(error){
        console.log(error);
       }
   
   
  }



  useEffect(() => {
    if(currentAddress){
      getUserQuestStatusHandler();
    }

    getAllQuestsInfoHandler();
   
    
  },[currentAddress]);

  return(
    <div>
     

      <div className="heading-div">
      <h1> Quest Information Dapp</h1>
        <h4>Learn the Advance Skills by Joining to a 
          particular Quest
        </h4>
      </div>

      
      <div className="all-quests">
          <h2 className="all-quests-heading">Ongoing Quests :</h2>
          <div className="all-quests-1" >
            {allQuestsInfo && allQuestsInfo.map((quest,index) => {

              const questStatus = userQuestStatuses[index];
              if(questStatus){
                return(
                
                  <div className="all-quests-2" key={quest[0]}>
  
                        
                       <h4 className="quest-heading">{quest[2]}</h4>
                      
                       <ul className="quest-listitems">
                        
                       <div className="quest-status">
                        <ul>
                          
                        {questStatus[1] ==="SUBMITTED"?<li className="submitted">{questStatus[1]}</li>:null }
                        {questStatus[1] ==="JOINED"?<li className="joined">{questStatus[1]}</li>:null }
                        {questStatus[1] ==="NOT_JOINED"?<li className="not_joined">{questStatus[1]}</li>:null }
                            
                          

                        </ul>
                       </div>
             
  
                        <li data-label="questId"> {quest[0].toString()}</li>
           <li data-label="number of players">{quest[1].toString()}</li>
           <li data-label="reward">{quest[3].toString()}</li>
           <li data-label="number of rewards available">{quest[4].toString()}</li>
          
          </ul>
                  </div>
                );
              }else{
                return (
                  <div className="all-quests-2" key={quest[0]}>
                    <h5>NOT_JOINED</h5>
                    <h4 className="quest-heading">{quest[2]}</h4>
                    {/* Rest of your code for not joined quests */}
                  </div>
                );
              }
              
            })}
          </div>
      </div>

        {/*  
      <div>
        <h2>User Quest Status</h2>
        
        <div>
        <ul>
          {userQuestStatuses && userQuestStatuses.map((quest,index) => {
            return(
              <div key={quest}>
                <li>
                  {quest[0]}  - {quest[1]}
                   <div>
                  {quest[1] === "JOINED" ? (<div><br/><button onClick={submitQuestHandler(index)}>Submit</button></div>):null}
                  </div>
                  
                </li>
              </div>
            );
          })}
        </ul>
        </div>
      </div>
        */}

      <div className="actions">
        <div>
        <h2 className="text-dec"><u>Actions </u></h2>
        </div>
        
        </div>
       
        <div className="handling-quest">

                                <div >
                                            <div className="join-quest">
                                            <input type = "text" placeholder="Enter Quest Id" value={questId}
                                            onChange={(e) => setQuestId(e.target.value)} />
                                            <button onClick={joinQuestHandler}>Join Quest</button>
                                            </div>
                                </div>

                                <div>
                                          <div className="submit-quest">
                                            <input type="text" placeholder="Enter Quest Id" value={submitId} onChange={(e) => setSubmitId(e.target.value)} />
                                            <button onClick={submitQuestHandler}>Submit Quest</button>
                                          </div>
                                </div>
        
        </div>
          
        
     

      










    </div>
  );
}

export default Home;