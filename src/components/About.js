import React from 'react';
import './About.css';

const About = () => {
  return (
    <div>

      <h1 className='about'>Quest Information Dapp</h1>
    <div className='content'>
    
    <div className='project-description'>
      <h3>Project Description</h3>
      <p> The Quest Information Dapp is a web application built using React and Ethereum smart contracts. It provides a platform for users to explore and participate in various quests to learn advanced skills. The Dapp connects to the Ethereum blockchain using MetaMask to manage user wallet addresses and interact with smart contracts.</p>
    </div>

    <div className='key-features'>
      <h3>Key Features</h3>
      <p> <div style={{fontWeight:"bold",marginBottom:"0.5rem"}}>User Wallet Integration :</div> Users can connect their wallets to the Dapp using MetaMask to manage their Ethereum addresses.
    <br/>
<div style={{fontWeight:"bold",marginBottom:"0.5rem",marginTop:"0.5rem"}}>Quest Exploration:</div> Users can explore ongoing quests available on the platform, each with a unique title, reward, and the number of rewards available.
<br/>
<div style={{fontWeight:"bold" ,marginBottom:"0.5rem",marginTop:"0.5rem"}}>Quest Status:</div> Users can view their quest status, indicating whether they have submitted, joined, or not joined a specific quest.
<br/>
<div style={{fontWeight:"bold",marginTop:"0.5rem",marginBottom:'0.5rem'}}>Joining Quests:</div> Users can join quests by entering the quest ID and clicking the "Join Quest" button, allowing them to participate in the quest.
<br/>
<div style={{fontWeight:"bold",marginTop:"0.5rem",marginBottom:"0.5rem"}}>Submitting Quests: </div>Users can submit quests they have completed by entering the quest ID and clicking the "Submit Quest" button.
<br/>
<div style={{fontWeight:"bold", marginTop:"0.5rem" ,marginBottom:"0.5rem"}}>Admin Features:</div> Admins can create new quests with titles, rewards, and the number of rewards available. Admin status is determined by ownership of the smart contract.</p>
    </div>

    <div className='tech-stack'>
      <h3>Technology Stack</h3>
      <p> <div style={{fontWeight:"bold",marginBottom:"0.5rem"}}>React :</div>Front-end framework for building the user interface.
      <div style={{fontWeight:"bold",marginBottom:"0.5rem",marginTop:"0.5rem"}}>Ethereum Smart Contract :</div> Used to manage quests and user interactions on the blockchain.
      <div style={{fontWeight:"bold",marginBottom:"0.5rem",marginTop:"0.5rem"}}>MetaMask :</div> Provides wallet integration and blockchain interaction for users.
      <div style={{fontWeight:"bold",marginBottom:"0.5rem",marginTop:"0.5rem"}}>Ethers.js</div> Used to interact with Ethereum smart contracts from the front-end.</p>
    </div>

    </div>
    </div>
    
  )
}

export default About