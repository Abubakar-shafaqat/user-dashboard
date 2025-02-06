'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

interface Car {
  id: number;
  name: string;
  description: string;
  price_per_day: number;
  image_url: string;
}

const CarsPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
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
    // Fetching the data from the mock API
    axios
      .get("https://678cc7fcf067bf9e24e83478.mockapi.io/carrental")
      .then((response) => {
        setCars(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch car data");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-semibold text-center mb-8">Explore Our Available Cars</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <div key={car.id} className="max-w-sm bg-gray-100 border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
            {/* Check if imageUrl exists */}
            <img className="w-32 object-cover" src={car.image_url} alt={car.name} />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">{car.name}</h2>
              <p className="text-gray-600 mt-2">{car.description}</p>
              <p className="text-gray-900 font-semibold mt-4">Price: ${car.price_per_day}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarsPage;