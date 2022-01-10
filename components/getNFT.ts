export const getSolanaNFTs = async (publicKey: string): Promise < Array < any > | undefined > => {
	const request = await fetch(`https://public-api.solscan.io/account/tokens?account=${publicKey}`)
	const response = await request.json()
	if (response.error || response.length === 0) {
		console.error(response.error)
		return
	}
	return response.filter((nft: any) => nft.tokenAmount.decimals === 0 && nft.tokenAmount.uiAmount > 0)
}

export const fetchSolanaNftImage = async (address: string) => {
	console.log(address)
	try {
		const response = await fetch(`https://api.all.art/v1/solana/${address}`);
		if (!response.ok) {
			throw Error(response.statusText);
		}
		const {
			Preview_URL
		} = await response.json();

		return Preview_URL
	} catch (e) {
		console.error(e)
	}
};