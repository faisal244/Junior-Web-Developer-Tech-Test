const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const vehiclesData = require("../data.json");

async function main() {
	await prisma.vehicle.createMany({
		data: vehiclesData,
	});

	console.log("Vehicles seeded successfully");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
