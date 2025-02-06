'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
interface Car {
  id: string;
  name: string;
  description: string;
  price_per_day: number;
  image_url: string;
  status?: string;
}

const BookingPage = () => {
  const [bookedCars, setBookedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { userId } = useAuth();
  useEffect(() => {
    if (!userId) {
      router.push("/sign-in");
    }
  }, [userId, router]);
  useEffect(() => {
    axios.get("https://678cc7fcf067bf9e24e83478.mockapi.io/carrental")
      .then((response) => {
        console.log("API Response:", response.data); // Debugging API data
        
        const shuffledCars = response.data.sort(() => 0.5 - Math.random());
        const selectedCars = shuffledCars.slice(0, 8).map((car: { status: string; }) => ({
          ...car,
          status: car.status || getRandomStatus() // Assign random status if missing
        }));

        setBookedCars(selectedCars);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch booking data");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-semibold text-center mb-8">Car Bookings</h1>

      {bookedCars.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No cars available.</p>
      ) : (
        <div className="space-y-6"> {/* Row layout */}
          {bookedCars.map((car) => (
            <div 
              key={car.id} 
              className="flex items-center bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden p-4"
            >
              {/* Car Image */}
              <img className=" w-32 object-cover rounded-lg" src={car.image_url} alt={car.name} />

              {/* Car Details */}
              <div className="ml-6">
                <h2 className="text-2xl font-semibold text-gray-800">{car.name}</h2>
                <p className="text-gray-600">{car.description}</p>
                <p className="text-gray-900 font-semibold">Price: ${car.price_per_day}</p>
                
                {/* Status */}
                <p className="mt-2 text-lg font-medium">
                  Status: 
                  <span className={`font-bold ml-2 ${getStatusColor(car.status)}`}>
                    {car.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Function to return color classes based on status
const getStatusColor = (status?: string) => {
  if (!status) return "text-gray-500"; // Default color if status is missing

  switch (status.toLowerCase()) {
    case "pending":
      return "text-yellow-500";
    case "completed":
      return "text-green-500";
    case "failed":
      return "text-red-500";
    case "in progress":
      return "text-blue-500";
    default:
      return "text-gray-500";
  }
};

// Function to randomly assign a status if missing
const getRandomStatus = () => {
  const statuses = ["Pending", "Completed", "Failed", "In Progress"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

export default BookingPage;
