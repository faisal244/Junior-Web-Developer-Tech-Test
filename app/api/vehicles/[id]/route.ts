import prisma from "@/database";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const vehicle = await prisma.vehicle.findFirstOrThrow({
		where: { id: Number(params.id) },
	});

	return new Response(JSON.stringify(vehicle), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}
