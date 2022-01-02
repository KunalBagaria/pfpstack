import prisma from "../../lib/prisma";
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
				const users = await prisma.user.findMany();
				res.status(200).json(users);
			} catch (e) {
				console.error("Request error", e);
				res.status(500).json({
					error: "Error fetching users"
				});
			}
			break;
		default:
			res.setHeader("Allow", ["GET"]);
			res.status(405).end(`Method ${method} Not Allowed`);
			break;
	}
}