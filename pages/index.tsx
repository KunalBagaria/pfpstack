import type { NextPage } from 'next'
import { DefaultHead } from '../layouts/Head'
import { Navbar } from '../layouts/Navbar'
import {
	Typography,
	Container,
	Button,
	Stack
} from '@mui/material'

const Home: NextPage = () => {
	return (
		<>
			<DefaultHead />
			<Navbar />
			<Container maxWidth="lg">
				<Typography marginTop={10} color="primary" fontFamily="quicksand" variant="h4">
					nftpic
				</Typography>
				<Typography marginTop={2} color="secondary" fontFamily="quicksand" variant="h6">
					Streamlined API for syncing your NFT avatar across dApps
				</Typography>
				<Stack direction="row" sx={{ marginTop: '2rem' }} gap={2} alignItems="center">
					<Button variant="outlined" color="primary" href="/docs">
						API Docs
					</Button>
					<Button variant="outlined" color="secondary" href="/update">
						Update Profile
					</Button>
				</Stack>
			</Container>
		</>
	)
}

export default Home