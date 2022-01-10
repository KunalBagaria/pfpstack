declare global {
    interface Window {
        solana: any;
		solflare: any;
    }
}

export default () => typeof window !== 'undefined' ? (window.solana || window.solflare) : null;