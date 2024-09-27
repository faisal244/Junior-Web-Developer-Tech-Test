"use client";

// Imports
import { useEffect, useState } from "react";
import Image from "next/image";
import { Vehicle } from "@prisma/client";
import LoadingSpinner from "./components/LoadingSpinner";

export default function Home() {
	const [vehicles, setVehicles] = useState<Vehicle[]>([]);
	const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const [vehicleLoading, setVehicleLoading] = useState(false);

	// State variables for filters and search query
	const [makeFilter, setMakeFilter] = useState("");
	const [yearFilter, setYearFilter] = useState("");
	const [fuelTypeFilter, setFuelTypeFilter] = useState("");
	const [searchQuery, setSearchQuery] = useState("");

	// Fetch vehicles from the API
	useEffect(() => {
		async function fetchVehicles() {
			setLoading(true);
			const response = await fetch("/api/vehicles");
			const data = await response.json();
			setVehicles(data);
			setLoading(false);
		}

		fetchVehicles();
	}, []);

	// Fetch vehicle details when a vehicle is clicked
	const handleVehicleClick = async (id: number) => {
		setVehicleLoading(true);
		const response = await fetch(`/api/vehicles/${id}`);
		const data = await response.json();
		setTimeout(() => {
			setSelectedVehicle(data);
			setVehicleLoading(false);
		}, 500); // Added a delay of 0.5 seconds so that the loading spinner is visible
	};

	//  Function to get unique values for a key in the vehicles array
	const getUniqueValues = (key: keyof Vehicle) => {
		return Array.from(new Set(vehicles.map((vehicle) => vehicle[key])))
			.filter(Boolean)
			.sort((a, b) => {
				if (typeof a === "string" && typeof b === "string") {
					return a.localeCompare(b);
				}
				if (typeof a === "number" && typeof b === "number") {
					return a - b;
				}
				return 0;
			});
	};

	//  Filter vehicles based on search query and filters
	const filteredVehicles = vehicles.filter((vehicle) => {
		const matchesSearchQuery =
			vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
			vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
			vehicle.year.toString().includes(searchQuery) ||
			vehicle.fuel_type.toLowerCase().includes(searchQuery.toLowerCase());

		return (
			matchesSearchQuery &&
			(makeFilter === "" || vehicle.make === makeFilter) &&
			(yearFilter === "" || vehicle.year.toString() === yearFilter) &&
			(fuelTypeFilter === "" || vehicle.fuel_type === fuelTypeFilter)
		);
	});

	//  Function to clear all filters
	const clearFilters = () => {
		setMakeFilter("");
		setYearFilter("");
		setFuelTypeFilter("");
		setSearchQuery("");
	};

	// Clear selected vehicle if no matches are found
	useEffect(() => {
		if (filteredVehicles.length === 0) {
			setSelectedVehicle(null);
		}
	}, [filteredVehicles]);

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<header className="fixed top-0 left-0 w-full p-4 bg-gray-100 rounded-lg z-10 flex items-center justify-between">
				<Image
					src="/autoserve-logo.png"
					alt="Autoserve logo"
					width={384}
					height={65}
					priority
				/>
				<div className="flex flex-col items-center sm:items-start ml-4">
					<p className="text-gray-500 text-lg font-semibold">
						Welcome to the Autoserve Fleet Management Dashboard!
					</p>
					<p className="text-gray-500 text-sm">
						Click on a vehicle to view more details.
					</p>
				</div>
			</header>
			<main className="flex flex-col gap-5 row-start-2 items-center sm:items-start w-full ">
				<h1 className="text-2xl font-bold ">Vehicle List</h1>
				<div className="w-full ">
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search by make, model, year, or fuel type"
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				<div className="flex flex-col sm:flex-row gap-4 mb-4 w-full">
					<select
						value={makeFilter}
						onChange={(e) => setMakeFilter(e.target.value)}
						className="p-2 border border-gray-300 rounded w-full sm:w-auto"
					>
						<option>Filter by make</option>
						{getUniqueValues("make").map((make) => (
							<option
								key={make}
								value={make}
							>
								{make}
							</option>
						))}
					</select>
					<select
						value={yearFilter}
						onChange={(e) => setYearFilter(e.target.value)}
						className="p-2 border border-gray-300 rounded w-full sm:w-auto"
					>
						<option>Filter by year</option>
						{getUniqueValues("year").map((year) => (
							<option
								key={year}
								value={year.toString()}
							>
								{year}
							</option>
						))}
					</select>
					<select
						value={fuelTypeFilter}
						onChange={(e) => setFuelTypeFilter(e.target.value)}
						className="p-2 border border-gray-300 rounded w-full sm:w-auto"
					>
						<option>Filter by fuel type</option>
						{getUniqueValues("fuel_type").map((fuelType) => (
							<option
								key={fuelType}
								value={fuelType}
							>
								{fuelType}
							</option>
						))}
					</select>
					<button
						onClick={clearFilters}
						className="p-2 border border-gray-300 rounded bg-red-500 text-white w-full sm:w-auto"
					>
						Clear Filters
					</button>
				</div>
				{loading ? (
					<LoadingSpinner />
				) : (
					<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
						{filteredVehicles.map((vehicle) => (
							<li
								key={vehicle.id}
								className="cursor-pointer p-4 bg-gray-50 shadow rounded-lg w-full sm:w-auto"
								onClick={() => handleVehicleClick(vehicle.id)}
							>
								<div className="flex justify-between items-center">
									<div>
										<p className="text-lg font-semibold">
											{vehicle.make}
										</p>
										<p className="text-lg font-semibold">
											{vehicle.model}
										</p>
										<p className="text-gray-500">
											{vehicle.year}
										</p>
									</div>
									<p className="text-lg font-semibold ml-6">
										${vehicle.price}
									</p>
								</div>
							</li>
						))}
					</ul>
				)}

				{vehicleLoading ? (
					<LoadingSpinner />
				) : (
					selectedVehicle && (
						<div className="mt-2 p-4 bg-gray-50 shadow rounded-lg">
							<h2 className="text-xl font-bold">
								Vehicle Details
							</h2>
							<div className="items-center justify-center grid grid-cols-2 sm:grid-cols-4 gap-4 p-8 break-words">
								<div>
									<p className="text-gray-400">Make</p>
									<p className="font-semibold">
										{selectedVehicle.make}
									</p>
								</div>
								<div>
									<p className="text-gray-400">Model</p>
									<p className="font-semibold">
										{selectedVehicle.model}
									</p>
								</div>
								<div>
									<p className="text-gray-400">Year</p>
									<p className="font-semibold">
										{selectedVehicle.year}
									</p>
								</div>
								<div>
									<p className="text-gray-400">Price</p>
									<p className="font-semibold">
										${selectedVehicle.price}
									</p>
								</div>
								<div>
									<p className="text-gray-400">Fuel Type</p>
									<p className="font-semibold">
										{selectedVehicle.fuel_type}
									</p>
								</div>
								<div>
									<p className="text-gray-400">Mileage</p>
									<p className="font-semibold">
										{selectedVehicle.mileage} miles
									</p>
								</div>
								<div>
									<p className="text-gray-400">
										Transmission
									</p>
									<p className="font-semibold">
										{selectedVehicle.transmission}
									</p>
								</div>
							</div>
						</div>
					)
				)}
			</main>
		</div>
	);
}
