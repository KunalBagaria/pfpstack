/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useState } from 'react'
import {
	Typography,
	Container,
	TextField,
	Button,
	ImageListItem,
	ImageList
} from '@mui/material'
import { connectWallet } from '../components/wallet'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { getSolanaNFTs, fetchSolanaNftImage } from '../components/getNFT'
import { DefaultHead } from '../layouts/Head'
import { Navbar } from '../layouts/Navbar'

const Update: NextPage = () => {
	const [publicKey, setPublicKey] = useState('')
	const [nfts, setNFTs] = useState<any[]>([])
	const [loading, setLoading] = useState(false)
	const [nftLoading, setNFTLoading] = useState(false)
	const [image, setImage] = useState('')

	console.log(image)

	const connect = async () => {
		const response = await connectWallet();
		const pKey = response.toString();
		if (!pKey) return
		setPublicKey(pKey)
		setLoading(true)
		const fNfts = await getSolanaNFTs(pKey)
		setLoading(false)
		if (!fNfts) return
		setNFTLoading(true)
		const tokenAddresses = fNfts.map((fNft) => fNft.tokenAddress)
		const nftImages = await Promise.all(tokenAddresses.map((address) => fetchSolanaNftImage(address)))
		setNFTs(nftImages)
		setNFTLoading(false)
	}

	return (
		<>
			<DefaultHead title="Update Profile"/>
			<Navbar />
			<Container maxWidth="lg">
				<Typography marginTop={10} color="white" fontFamily="quicksand" variant="h4">
					Update Profile
				</Typography>

				<div style={{ marginTop: '2rem' }}>
					{!publicKey && (
						<Button startIcon={<AccountBalanceWalletIcon />}
							color="primary" onClick={connect} variant={'contained'}>Connect Wallet</Button>
					)}
					{publicKey && (
						<div style={{ marginBottom: '6rem' }}>
							<TextField variant="outlined" label="Name (optional)" />
							<Typography variant="body1" color="white" marginTop={4} gutterBottom>Choose an NFT as your profile picture</Typography>
							<ImageList variant="quilted" cols={3} rowHeight={400}>
								{nfts.map((nft, index) => (
									<ImageListItem onClick={() => setImage(nft)} key={index}>
										<img style={{
											cursor: 'pointer', transition: '.2s linear', borderRadius: '1rem', border: nft === image ? '3px solid white' : 'none'
										}} src={nft} alt="" key={index} loading="lazy" />
									</ImageListItem>
								))}
							</ImageList>
							<Button color="primary" variant={'contained'}>Update Profile</Button>
						</div>
					)}
				</div>
			</Container>
		</>
	)
}

export default Update