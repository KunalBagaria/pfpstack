import type { NextPage } from 'next'
import { DefaultHead } from '../layouts/Head'
import { Navbar } from '../layouts/Navbar'
import Link from 'next/link'
import {
	Typography,
	Container,
	Accordion,
	AccordionSummary,
	AccordionDetails
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Docs: NextPage = () => {
	return (
		<>
			<DefaultHead title="API Documentation" />
			<Navbar />
			<Container maxWidth="lg">
				<Typography marginTop={10} color="primary" fontFamily="quicksand" variant="h4">
					API Documentation
				</Typography>

				<div style={{ marginTop: '2rem' }}>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography>{'/api/get/user/{public_key}'}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography variant="h6">
								Get the profile of a public key.
								Example response <Link href="/api/get/user/8kgbAgt8oedfprQ9LWekUh6rbY264Nv75eunHPpkbYGX"><a style={{ color: '#1976d2' }}>here</a></Link>
							</Typography>
						</AccordionDetails>
					</Accordion>
				</div>
			</Container>
		</>
	)
}

export default Docs