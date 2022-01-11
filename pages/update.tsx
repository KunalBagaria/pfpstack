/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useState, forwardRef } from 'react'
import {
	Typography,
	Container,
	TextField,
	Button,
	ImageListItem,
	Skeleton,
	ImageList
} from '@mui/material'
import toast from 'react-hot-toast'
import { toasterPromise } from '../components/toasterNetworkPromise'
import { connectWallet, signMessage } from '../components/wallet'
import { getSolanaNFTs, fetchSolanaNftImage } from '../components/getNFT'
import { DefaultHead } from '../layouts/Head'
import { Navbar } from '../layouts/Navbar'
import styles from '../styles/Update.module.css'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const Update: NextPage = () => {
	const [publicKey, setPublicKey] = useState('')
	const [nfts, setNFTs] = useState<any[]>([])
	const [name, setName] = useState('')
	const [image, setImage] = useState('')
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState(false)

	const getUser = async (pKey: string) => {
		try {
			const request = await fetch(`/api/get/user/${pKey}`)
			const response = await request.json()
			if (!name && response.name) setName(response.name)
			if (!image && response.image) setImage(response.image)
		} catch (e) {
			console.error(e)
		}
	}

	const connect = async () => {
		const response = await connectWallet();
		const pKey = response.toString();
		if (!pKey) return
		setPublicKey(pKey)
		const fNfts = await getSolanaNFTs(pKey)
		if (!fNfts) return
		const tokenAddresses = fNfts.map((fNft) => fNft.tokenAddress)
		const nftImages = await Promise.all(tokenAddresses.map((address) => fetchSolanaNftImage(address)))
		setNFTs(nftImages)
		getUser(pKey)
	}

	const update = async () => {
		if (!image) return toast.error('Please select an image')
		const signature = await signMessage('$PFPSTACK')
		if (!signature) return
		const data = {
			name,
			publicKey,
			signature,
			image
		}
		console.log(data)
		const request = fetch(`/api/update/user`, {
			method: 'POST',
			body: JSON.stringify(data)
		})
		toast.promise(toasterPromise(request), {
			loading: 'Updating user',
			success: 'User updated',
			error: 'Error updating user'
		})
		const aRequest = await request
		const response = await aRequest.json()
		console.log(response)
	}

	return (
		<>
			<DefaultHead title="Update Profile"/>
			<Navbar />
			<Container maxWidth="lg">
				<Typography marginTop={10} color="primary" fontFamily="quicksand" variant="h4">
					Update Profile
				</Typography>

				<div style={{ marginTop: '2rem' }}>
					{!publicKey && (
						<Button startIcon={<AccountBalanceWalletIcon />}
							color="primary" onClick={connect} variant={'contained'}>Connect Wallet</Button>
					)}
					{publicKey && (
						<div style={{ marginBottom: '6rem' }}>
							<TextField onChange={(e) => setName(e.target.value)} value={name} color="primary" sx={{ width: 200 }} variant="outlined" label="Name (optional)" />
							<Typography variant="body1" color="primary" marginTop={4} gutterBottom>Choose an NFT as your profile picture</Typography>
							<div className={styles.nftGrid}>
								{nfts.length > 0 ? (
									<>
										{nfts.map((nft, index) => (
											<img className={styles.nft} style={{
												outline: nft === image ? '3px solid #1976d2' : 'none'
											}} onClick={() => setImage(nft)} key={index} src={nft} alt="" loading="lazy" />
										))}
									</>
								) : (
									<>
										{[...Array(3)].map((_, index) => (
											<Skeleton key={index} animation="wave" variant="rectangular" width={160} height={160} />
										))}
									</>
								)}
							</div>
							<Button onClick={update} color="primary" variant={'contained'}>Update Profile</Button>
						</div>
					)}
				</div>
			</Container>
		</>
	)
}

export default Update