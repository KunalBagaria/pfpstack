import Head from 'next/head'

type Props = {
	title?: string
}

export const DefaultHead = ({ title }: Props) => (
	<Head>
		<title>{title ? title : 'nftpic - Your streamlined NFT avatar' }</title>
		<meta name="title" content={title ? title : 'nftpic - Your streamlined NFT avatar' } />
		<meta name="description" content="With nftpic, you can select your NFT as your avatar to sync across multiple dApps and platforms" />

		<meta property="og:type" content="website" />
		<meta property="og:url" content="https://nftpic.me/" />
		<meta property="og:title" content={title ? title : 'nftpic - Your streamlined NFT avatar' } />
		<meta property="og:description" content="With nftpic, you can select your NFT as your avatar to sync across multiple dApps and platforms" />
		<meta property="og:image" content="https://nftpic.me/meta.png" />

		<meta property="twitter:card" content="summary_large_image" />
		<meta property="twitter:url" content="https://nftpic.me/" />
		<meta property="twitter:title" content={title ? title : 'nftpic - Your streamlined NFT avatar' } />
		<meta property="twitter:description" content="With nftpic, you can select your NFT as your avatar to sync across multiple dApps and platforms" />
		<meta property="twitter:image" content="https://nftpic.me/meta.png" />
		<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		<link rel="icon" href="/favicon.ico" />
	</Head>
)