import prisma from '../../../../lib/prisma';
import type {
	NextApiRequest,
	NextApiResponse
} from 'next'
import { getSolDomain } from '../../../../components/getSolDomain'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {
	const {
		method
	} = req;

	switch (method) {
		case "GET":
			try {
				let { publicKey }: any = req.query
				if (!publicKey) { res.status(400).json({ error: "Public Key not found" }); return }
				if (publicKey.includes('.sol')) {
					const domain = publicKey
					const owner = await getSolDomain(domain)
					if (!owner) { res.status(404).json({ error: "Name service domain not registered "}); return }
					publicKey = owner
				}
				const user = await prisma.user.findFirst({ where: { public_key: publicKey } });
				if (!user) { res.status(404).json({ error: "User not found" }); return }
				res.status(200).json(user);
			} catch (e) {
				console.error("Request error", e);
				res.status(500).json({
					error: "Error fetching user"
				});
			}
			break;
		default:
			res.setHeader("Allow", ["GET"]);
			res.status(405).end(`Method ${method} Not Allowed`);
			break;
	}
}