import React,{useState,useEffect} from "react";
import { ethers } from "ethers";
import './Admin.css';

function Admin({currentAddress,contractAddr,contractABI}) {

  const[adminAddress,setAdminAddress]=useState();
  const[isUserIsAdmin,setIsUserIsAdmin]=useState(false);

  const[formData,setFormData]=useState({title:'',reward:'',numberOfRewards:''});


  const getAdminAddress = async() => {
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddr,contractABI,provider);
    
      const adminAddr = await contract.admin();
      setAdminAddress(adminAddr);

      if(currentAddress.toLowerCase() == adminAddr.toLowerCase()){
        setIsUserIsAdmin(true);
        
      }
    
    } catch(error) {
      console.log(error);
    }
  }

  const createQuestHandler = async() => {
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
  

      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddr,contractABI,signer);

      const txn = await contract.createQuest(formData.title,formData.reward,formData.numberOfRewards);
        console.log('Creating Quest');

        await txn.wait();
        console.log('Quest Created Successfully');

        setFormData({title:'',reward:'',numberOfRewards:''});

    }catch(error){
      console.log(error);
    }
  }

  const handleInputChange = (e) => {
    const {name,value} = e.target;

    setFormData({...formData, [name]:value});
  }


  useEffect(() => {
    getAdminAddress();
  });

  return(
    <div >

       <h1 className="admin-address-heading">Admin Address : {adminAddress}</h1>
      

      <div className="user-admin-form"> 
      {isUserIsAdmin ? (

      <div> 

       

        <form className="form">

        <div className="form-title">
         
         
          <input type="text" name="title" placeholder="Enter the title" value={formData.title || ''} onChange={handleInputChange}/>
        </div>

        <div className="form-reward">
          
          <input type="number" name="reward" placeholder="Enter the Reward" value={formData.reward || ''} onChange={handleInputChange}/>
        </div>

        <div className="number-of-rewards">
         
          <input type="number" name="numberOfRewards" placeholder="Enter the no.of rewards" value={formData.numberOfRewards || ''} onChange={handleInputChange}/>
        </div>

    <button type="button" className="create-button" onClick={createQuestHandler}>Create Quest</button>
        </form></div>):(<h2 className="not-admin">You're Not an Admin</h2>)}
       
      </div>

    </div>
  );

}
export default Admin;