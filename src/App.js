import React,{useState,useContext} from "react";
import { BrowserRouter as Router,Route,Link,Routes } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";
import About from "./components/About";
import contractABI from './StackUp.json';

import './App.css';

const contractAddr = '0x1Eda8A739A2ccf3Bd041CfE14c653d429A25d329';


const WalletContext = React.createContext();
export {WalletContext};

function App() {

  const [walletConnected,setWalletConnected]=useState(false);
  const[currentAddress,setCurrentAddress]=useState();

  const connectWalletHandler = async() => {
    if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
      try{
        const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
        setCurrentAddress(accounts[0]);
        setWalletConnected(true);

      }catch(error) {
        console.log(error);
      }
    }else{
      console.log("Please install metamask");
    }
  }

  return(
    <div >

      <WalletContext.Provider value={{currentAddress,walletConnected,connectWalletHandler}}>

      <div>
      <Router>

        <div >

          <div className="container">

          <nav className="navbar">
            <Link to="/">Home </Link>
            <Link to="/admin">Admin</Link>
            <Link to="about">About</Link>
            </nav>

            <div  >
            {walletConnected ? (<h3 className="curr-addr">{`Wallet Address : ${currentAddress.slice(0,4)}...${currentAddress.slice(-4)}`}</h3>) :(<button className="connect-wallet"onClick={connectWalletHandler}>Connect Wallet</button>)}
            </div>

             </div>
          

            

          
          <Routes>
          <Route path="/"  element={<Home />} />
          
          <Route path="/admin" element={<Admin currentAddress={currentAddress} contractAddr={contractAddr} contractABI={contractABI} />} />
          <Route path="/about" element={<About />} />
          </Routes>
          
          
           
         
          

        </div>

      </Router>
      </div>

      </WalletContext.Provider>
      
    

    </div>
    
  );
}

export default App;
