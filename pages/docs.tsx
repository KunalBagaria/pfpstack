import type { NextPage } from 'next'
import { DefaultHead } from '../layouts/Head'
import { Navbar } from '../layouts/Navbar'

const Docs: NextPage = () => {
	return (
		<>
			<DefaultHead title="API Documentation" />
			<Navbar />
		</>
	)
}

export default Docs