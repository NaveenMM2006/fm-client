import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const gigSchema = z.object({
  title: z.string().min(5, "Title is required"),
  description: z.string().min(10, "Description too short"),
  category: z.string().min(2, "Select a category"),
  price: z.number().min(1, "Price must be at least 1"),
  deliveryTime: z.number().min(1, "Delivery time is required"),
});

export default function CreateGig() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(gigSchema) });

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      await API.post("/gigs/create", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Gig created!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create gig");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Create New Gig</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("title")} placeholder="Title" className="w-full p-2 border rounded" />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

        <textarea {...register("description")} placeholder="Description" className="w-full p-2 border rounded" />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

        <select {...register("category")} className="w-full p-2 border rounded">
          <option value="">Select Category</option>
          <option value="design">Design</option>
          <option value="development">Development</option>
          <option value="writing">Writing</option>
        </select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}

        <input type="number" {...register("price", { valueAsNumber: true })} placeholder="Price ($)" className="w-full p-2 border rounded" />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

        <input type="number" {...register("deliveryTime", { valueAsNumber: true })} placeholder="Delivery Time (days)" className="w-full p-2 border rounded" />
        {errors.deliveryTime && <p className="text-red-500 text-sm">{errors.deliveryTime.message}</p>}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Create Gig</button>
      </form>
    </div>
  );
}