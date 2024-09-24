import prisma from "@/database";

export async function GET() {
	const vehicles = await prisma.vehicle.findMany();

	return new Response(JSON.stringify(vehicles), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}
