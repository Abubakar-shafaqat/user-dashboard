"use client";
import { useState, useEffect } from 'react';
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface Car {
  id: number;
  name: string;
  type: string;
  fuel_capacity: string;
  transmission: string;
  seating_capacity: string;
  price_per_day: string;
  image_url: string;
  tags: string[];
}

interface FormData {
  name: string;
  type: string;
  fuel_capacity: string;
  transmission: string;
  seating_capacity: string;
  price_per_day: string;
  image_url: string;
  tags: string;
}

const AddProductForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    type: '',
    fuel_capacity: '',
    transmission: '',
    seating_capacity: '',
    price_per_day: '',
    image_url: '',
    tags: ''
  });

  const router = useRouter();
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) {
      router.push("/sign-in");
    }
  }, [userId, router]);

  const [cars, setCars] = useState<Car[]>([]); // Store cars in an array
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch('https://678cc7fcf067bf9e24e83478.mockapi.io/carrental');
        const data: Car[] = await res.json();

        // Convert 'id' from string to number for each car
        const carsWithNumbers = data.map((car: Car) => ({
          ...car,
          id: parseInt(car.id.toString(), 10), // Convert 'id' from string to number
        }));

        setCars(carsWithNumbers); // Store the data with number 'id'
      } catch (error) {
        console.log('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the data for submission
    const newProduct: Car = {
      id: Math.floor(Math.random() * 1000), // Random numeric ID for demonstration (you can modify this logic)
      name: formData.name,
      type: formData.type,
      fuel_capacity: formData.fuel_capacity,
      transmission: formData.transmission,
      seating_capacity: formData.seating_capacity,
      price_per_day: formData.price_per_day,
      image_url: formData.image_url,
      tags: formData.tags.split(',').map(tag => tag.trim()) // Handle tags as an array
    };

    // Send the product data to the API
    const res = await fetch('https://678cc7fcf067bf9e24e83478.mockapi.io/carrental', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    if (res.ok) {
      alert('Product added successfully!');
      setFormData({
        name: '',
        type: '',
        fuel_capacity: '',
        transmission: '',
        seating_capacity: '',
        price_per_day: '',
        image_url: '',
        tags: ''
      });
    } else {
      alert('Failed to add product');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Add New Car Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">Car Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium">Car Type</label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="fuel_capacity" className="block text-sm font-medium">Fuel Capacity</label>
            <input
              type="text"
              id="fuel_capacity"
              name="fuel_capacity"
              value={formData.fuel_capacity}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="transmission" className="block text-sm font-medium">Transmission</label>
            <input
              type="text"
              id="transmission"
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="seating_capacity" className="block text-sm font-medium">Seating Capacity</label>
            <input
              type="text"
              id="seating_capacity"
              name="seating_capacity"
              value={formData.seating_capacity}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price_per_day" className="block text-sm font-medium">Price per Day</label>
            <input
              type="text"
              id="price_per_day"
              name="price_per_day"
              value={formData.price_per_day}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image_url" className="block text-sm font-medium">Image URL</label>
            <input
              type="text"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="tags" className="block text-sm font-medium">Tags (comma separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
