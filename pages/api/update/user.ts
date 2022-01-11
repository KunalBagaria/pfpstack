import prisma from '../../../lib/prisma';
import * as nacl from 'tweetnacl'
import { PublicKey } from '@solana/web3.js';
import type {
	NextApiRequest,
	NextApiResponse
} from 'next'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {
	const {
		method
	} = req;

	switch (method) {
		case "POST":
			try {
				const { publicKey, signature, image, name } = JSON.parse(req.body);
				if (!publicKey || !signature || !image) { res.status(400).json({ error: "Missing Parameters" }); return }

				const uSig = new Uint8Array(signature.signature.data)
				const bPubKey = new PublicKey(publicKey).toBytes()
				const message = new TextEncoder().encode('$PFPSTACK')
				const verified = nacl.sign.detached.verify(message, uSig, bPubKey)
				if (!verified) { res.status(400).json({ error: "Unauthorized" }); return }

				const cdn_image = image.includes('http://') ? image.replace('http://', 'https://i0.wp.com/') : image.replace('https://', 'https://i0.wp.com/');
				const user = await prisma.user.findFirst({ where: { public_key: publicKey } });
				if (!user) {
					const newUser = await prisma.user.create({
						data: {
							public_key: publicKey,
							image,
							cdn_image,
							name
						}
					});
					res.status(200).json(newUser);
					return
				}
				const updated = await prisma.user.update({
					where: {
						public_key: publicKey
					},
					data: {
						image,
						cdn_image,
						name
					}
				})
				res.status(200).json(updated);
			} catch (e) {
				console.error("Request error", e);
				res.status(500).json({
					error: "Error updating user"
				});
			}
			break;
		default:
			res.setHeader("Allow", ["POST"]);
			res.status(405).end(`Method ${method} Not Allowed`);
			break;
	}
}