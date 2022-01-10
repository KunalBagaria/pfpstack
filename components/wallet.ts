import getWallet from './whichWallet'

export const connectWallet = async () => {
	const wallet = getWallet();
	if (wallet) {
		const response = await wallet.connect();
		if (!response || !response.publicKey) return
		return wallet.publicKey;
	}
	window.open('https://phantom.app/', '_blank');
};

export const disconnectWallet = async () => {
	const wallet = getWallet();
	if (wallet) {
		await wallet.disconnect();
	}
};

export const signMessage = async (message: string) => {
	const wallet = getWallet();
	const encodedMessage = new TextEncoder().encode(message);
	const signedMessage = await wallet.signMessage(encodedMessage, 'utf8');
	return signedMessage;
};

export const walletIsConnected = () => {
	const wallet = getWallet();
	return wallet.isConnected;
};

export const connectIfTrusted = () => {
	const wallet = getWallet();
	if (wallet) {
		return wallet.connect({
			onlyIfTrusted: true,
		});
	}
};