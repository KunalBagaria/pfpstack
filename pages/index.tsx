import type { NextPage } from 'next'
import Link from 'next/link'
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
					pfpstack
				</Typography>
				<Typography marginTop={2} color="secondary" fontFamily="quicksand" variant="h6">
					Streamlined API for syncing your NFT avatar across dApps
				</Typography>
				<Stack direction="row" sx={{ marginTop: '2rem' }} gap={2} alignItems="center">
					<Link href="/docs">
						<a>
							<Button variant="outlined">API Docs</Button>
						</a>
					</Link>
					<Link href="/update">
						<a>
							<Button variant="outlined">Update Profile</Button>
						</a>
					</Link>
				</Stack>
			</Container>
		</>
	)
}

export default Home