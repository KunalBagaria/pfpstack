import prisma from '../../../../lib/prisma';
import type {
	NextApiRequest,
	NextApiResponse
} from 'next'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {
	const {
		method
	} = req;

	switch (method) {
		case "GET":
			try {
				const { publicKey }: any = req.query
				if (!publicKey) { res.status(400).json({ error: "Public Key not found" }); return }
				const user = await prisma.user.findFirst({ where: { public_key: publicKey } });
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