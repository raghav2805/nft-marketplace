import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navigation from './components/Navigation';
import Home from './components/Home'
import Create from './components/Create'
import MyListedItems from './components/MyListedItems'
import MyPurchases from './components/MyPurchase'
import Explore from './components/explorer'
import {marketPlaceABI, marketPlaceAddress, nftABI, nftAddress} from './utils/constants'

import { useState } from 'react'
import { ethers } from "ethers"
import { Spinner } from 'react-bootstrap'

import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0])
      await web3Handler()
    })
    loadContracts(signer)
  }
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(marketPlaceAddress, marketPlaceABI, signer)
    setMarketplace(marketplace)
    const nft = new ethers.Contract(nftAddress, nftABI, signer)
    setNFT(nft)
    setLoading(false)
  }

  return (
    <BrowserRouter>
      <div className="App">
        <>
          <Navigation web3Handler={web3Handler} account={account} />
        </>
        <div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <Spinner animation="border" style={{ display: 'flex' }} />
              <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={
                  <Home marketplace={marketplace} nft={nft}/>
              } />
              <Route path="/create" element={
                <Create marketplace={marketplace} nft={nft} />
              } />
              <Route path="/my-listed-items" element={
                <MyListedItems marketplace={marketplace} nft={nft} account={account} />
              } />
              <Route path="/my-purchases" element={
                <MyPurchases marketplace={marketplace} nft={nft} account={account} />
              } />
              <Route path="/explorer" element={
                  <Explore/>
              } />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;