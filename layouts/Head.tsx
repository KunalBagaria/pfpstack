import Head from 'next/head'

type Props = {
	title?: string
}

export const DefaultHead = ({ title }: Props) => (
	<Head>
		<title>{title ? title : 'pfpStack - Your streamlined NFT avatar' }</title>
		<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		<link rel="icon" href="/favicon.ico" />
	</Head>
)