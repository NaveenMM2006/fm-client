import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import API from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const gigSchema = z.object({
  title: z.string().min(5, "Title is required"),
  description: z.string().min(10, "Description too short"),
  category: z.string().min(2, "Select a category"),
  price: z.number().min(1, "Price must be at least 1"),
  deliveryTime: z.number().min(1, "Delivery time is required"),
});

export default function CreateGig() {
  const navigate = useNavigate();
  const { id } = useParams(); // For editing
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(gigSchema) });

  // Load gig data if in edit mode
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchGig = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await API.get(`/gigs/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const gig = res.data;
          setValue("title", gig.title);
          setValue("description", gig.description);
          setValue("category", gig.category);
          setValue("price", gig.price);
          setValue("deliveryTime", gig.deliveryTime);
        } catch (err) {
          console.error("❌ Failed to load gig", err);
        }
      };
      fetchGig();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      if (isEditMode) {
        await API.put(`/gigs/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Gig updated!");
      } else {
        await API.post("/gigs/create", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Gig created!");
      }
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit gig");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isEditMode ? "Edit Gig" : "Create New Gig"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title")}
          placeholder="Title"
          className="w-full p-2 border rounded"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

        <textarea
          {...register("description")}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

        <select {...register("category")} className="w-full p-2 border rounded">
          <option value="">Select Category</option>
          <option value="design">Design</option>
          <option value="development">Development</option>
          <option value="writing">Writing</option>
        </select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}

        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          placeholder="Price ($)"
          className="w-full p-2 border rounded"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

        <input
          type="number"
          {...register("deliveryTime", { valueAsNumber: true })}
          placeholder="Delivery Time (days)"
          className="w-full p-2 border rounded"
        />
        {errors.deliveryTime && <p className="text-red-500 text-sm">{errors.deliveryTime.message}</p>}


        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isEditMode ? "Update Gig" : "Create Gig"}
        </button>
      </form>
    </div>
  );
}