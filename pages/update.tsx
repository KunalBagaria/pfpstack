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
import { connectWallet, signMessage } from '../components/wallet'
import { getSolanaNFTs, fetchSolanaNftImage } from '../components/getNFT'
import { DefaultHead } from '../layouts/Head'
import { Navbar } from '../layouts/Navbar'
import styles from '../styles/Update.module.css'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref,
) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Update: NextPage = () => {
	const [publicKey, setPublicKey] = useState('')
	const [nfts, setNFTs] = useState<any[]>([])
	const [name, setName] = useState('')
	const [image, setImage] = useState('')
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState(false)

	console.log(image)

	const getUser = async (pKey: string) => {
		const request = await fetch(`/api/get/user/${pKey}`)
		const response = await request.json()
		if (response.name) setName(response.name)
		if (response.image) setImage(response.image)
	}

	const connect = async () => {
		const response = await connectWallet();
		const pKey = response.toString();
		if (!pKey) return
		setPublicKey(pKey)
		getUser(pKey)
		const fNfts = await getSolanaNFTs(pKey)
		if (!fNfts) return
		const tokenAddresses = fNfts.map((fNft) => fNft.tokenAddress)
		const nftImages = await Promise.all(tokenAddresses.map((address) => fetchSolanaNftImage(address)))
		setNFTs(nftImages)
	}

	const update = async () => {
		const signature = await signMessage('$PFPSTACK')
		if (!signature) return
		const data = {
			name,
			publicKey,
			signature,
			image
		}
		console.log(data)
		const request = await fetch(`/api/update/user`, {
			method: 'POST',
			body: JSON.stringify(data)
		})
		const response = await request.json()
		if (request.ok) {
			setSuccess(true)
			setTimeout(() => setSuccess(false), 3000)
		} else {
			setError(true)
			setTimeout(() => setError(false), 3000)
		}
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
					{success && (
						<Alert severity="success">Successfully updated user!</Alert>
					)}
					{error && (
						<Alert severity="error">Error updating user!</Alert>
					)}
					{!publicKey && (
						<Button startIcon={<AccountBalanceWalletIcon />}
							color="primary" onClick={connect} variant={'contained'}>Connect Wallet</Button>
					)}
					{publicKey && (
						<div style={{ marginBottom: '6rem' }}>
							<TextField onChange={(e) => setName(e.target.value)} value={name} color="primary" sx={{ width: 200 }} variant="outlined" label="Name (optional)" />
							<Typography variant="body1" color="primary" marginTop={4} gutterBottom>Choose an NFT as your profile picture</Typography>
							<ImageList variant="quilted" cols={3} rowHeight={317}>
								{nfts.length > 0 ? (
									<>
										{nfts.map((nft, index) => (
											<ImageListItem onClick={() => setImage(nft)} key={index}>
												<img className={styles.nft} style={{
													cursor: 'pointer', transition: '.2s linear', borderRadius: '1rem', border: nft === image ? '3px solid #1976d2' : 'none'
												}} src={nft} alt="" key={index} loading="lazy" />
											</ImageListItem>
										))}
									</>
								) : (
									<>
										{[...Array(6)].map((_, index) => (
											<ImageListItem key={index}>
												<Skeleton animation="wave" variant="rectangular" width={317} height={317} />
											</ImageListItem>
										))}
									</>
								)}
							</ImageList>
							<Button onClick={update} color="primary" variant={'contained'}>Update Profile</Button>
						</div>
					)}
				</div>
			</Container>
		</>
	)
}

export default Update