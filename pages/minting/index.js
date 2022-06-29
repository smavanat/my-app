import React from "react";
import NavBar from "../../src/navbar";
import { useState } from "react";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";

export default function mintingPage() {
    const [txError, setTxError] = useState(null)
    const [likes, setLikes] = React.useState(0);
    const [walletError, setWalletError] = useState(null)
    const [currentAccount, setCurrentAccount] = useState("")
    const [correctNetwork, setCorrectNetwork] = useState(false)
    const [requestedAccounts, setRequestedAccounts] = useState(false)


    async function handleClick(){
         
            try {
    
                const { ethereum } = window
    
                if (ethereum) {
    
                    const provider = new ethers.providers.Web3Provider(ethereum)
                    const signer = provider.getSigner()
    
                    const nftContract = new ethers.Contract(
                        nftContractAddress,
                        NFT.abi,
                        signer
                    )
    
    
                    let nftTx = await nftContract.mint(currentAccount, nftURI, ETHPriceValue)
            console.log('Minting....', nftTx.hash)
                    setMiningStatus(0)
    
                    let tx = await nftTx.wait()
                    setLoadingState(1)
                    // console.log('Mined!', tx)
                    // let event = tx.events[0]
                    // let value = event.args[2]
                    // let tokenId = value.toNumber()
    
                    // console.log(
                    // 	`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTx.hash}`
                    // )
    
                    // getMintedNFT(tokenId)
                    setMiningStatus(1)
                    // getNFTs()
                    // window.setTimeout(function(){location.reload()},60000)
                    
                } else {
                    setWalletError('Please install MetaMask Wallet.')
                }
            } catch (error) {
                // console.log('Error minting character', error)
                setTxError(error.message)
            }
        }	

      // Checks if wallet is connected
	const checkIfWalletIsConnected = async () => {
		const { ethereum } = window
		if (ethereum) {
			// console.log('Got the ethereum obejct: ', ethereum)
			const accounts = await ethereum.request({ method: 'eth_accounts' })

			if (accounts.length !== 0) {
				// console.log('Found authorized Account: ', accounts[0])
				setCurrentAccount(accounts[0])
			} else {
				// console.log('No authorized account found')
			}
		} else {
			setWalletError('Please install MetaMask Wallet.')
		}
	}

	const checkCorrectNetwork = async () => {
		const { ethereum } = window
		if (ethereum) {
			let chainId = await ethereum.request({ method: 'eth_chainId' })
			// console.log('Connected to chain:' + chainId)

			 const rinkebyChainId = '0x2a'

			// const devChainId = 1337
    
      

			const devChainId = 80001
			const localhostChainId = `0x${Number(devChainId).toString(16)}`

			if (chainId !== rinkebyChainId && chainId !== localhostChainId) {
				setCorrectNetwork(false)
			} else {
				setCorrectNetwork(true)
			}
		} else {
			setWalletError('Please install MetaMask Wallet.')
		}
	}
	function walletListener() {
		const { ethereum } = window
		if (ethereum) {
			ethereum.on('accountsChanged', (accounts) => {
				// Handle the new accounts, or lack thereof.
				// "accounts" will always be an array, but it can be empty.
				window.location.reload();
			});
			
			ethereum.on('chainChanged', (chainId) => {
				// Handle the new chain.
				// Correctly handling chain changes can be complicated.
				// We recommend reloading the page unless you have good reason not to.
				window.location.reload();
			});
		} else {
			setWalletError('Please install MetaMask Wallet.')
		}

		//   ethereum.on('message', mesg => {
		// 	  console.log("asd435&&")
		// 	  console.log(msg)
		//   })

	}

  useEffect(() => {
		checkIfWalletIsConnected()
		checkCorrectNetwork()

		walletListener()
	
	}, [currentAccount])

    const connectWallet = async () => {
		try {
			const { ethereum } = window

			if (!ethereum) {
				setWalletError('Please install MetaMask Wallet.')
				return
			}
			let chainId = await ethereum.request({ method: 'eth_chainId' })
      // let chainId = await ethereum.request({
      //     method: 'wallet_switchEthereumChain',
      //   params: [{ chainId: '0x13881' }], // '0x3830303031'
      // })
			// console.log('Connected to chain:' + chainId)

			const rinkebyChainId = '0x13881'

			const devChainId = 80001
			const localhostChainId = `0x${Number(devChainId).toString(16)}`

      console.log(localhostChainId)
      console.log(chainId)
			if (chainId !== rinkebyChainId && chainId !== localhostChainId) {
				alert('You are not connected to the Polygon Mumbai Testnet!')
				return
			}

			// console.log(requestedAccounts)
			setRequestedAccounts(true)

			const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
			
			// console.log('Found account', accounts[0])
			setCurrentAccount(accounts[0])
		} catch (error) {
			// console.log('Error connecting to metamask', error)
		}
	}

    
    return(
        <div><NavBar/><Grid container item xs={6} justify="center">
        {walletError === null ? (
        currentAccount === "" ? (
            <Button
                variant="outlined" disableElevation
                style={{ border: '2px solid', height: "50px", width: "100%", margin: "2px", marginTop: "80px", maxWidth: "200px" }}
                aria-label="View Code"
                disabled={(currentAccount === "" && requestedAccounts)}
                onClick={connectWallet}

            >
                Connect Wallet
            </Button>
        ) : correctNetwork ? (
				<div>
				<Grid container item xs={12} justify="center">
				<TextField id="outlined-basic" type="number" label="ETH Price Prediction" variant="outlined" style={{marginTop: "50px" }} onChange={handleInputChange}/>
				</Grid>

				<Grid container item xs={12} justify="center">
				<Button
					variant="outlined" disableElevation
					style={{ border: '2px solid', height: "50px", width: "100%", margin: "2px", marginTop: "40px", maxWidth: "200px" }}
					aria-label="View Code"
					onClick={handleClick}
					// disabled={(nftList.length >= 2 || numMinted == 50)}
				>
					Mint NFTs
				</Button>
				</Grid>
				</div>
				) : (
						<Paper elevation={0}
						style={{width: "100%", margin: "2px", marginTop: "80px", maxWidth: "250px", textAlign: "center"}}
						>
							Please connect to Polygon Mumbai Testnet
						</Paper>
					)) : (
						<div style={{marginTop: "80px"}}>{walletError}</div>
					)}
				</Grid>
				</div>
        )

}