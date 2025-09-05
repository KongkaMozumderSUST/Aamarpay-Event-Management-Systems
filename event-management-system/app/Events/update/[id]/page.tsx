"use client";

import { useEffect, useState } from "react";
import { useParams,redirect } from "next/navigation";
import Loading from "@/components/loading";
import Navbar from "@/components/Navbar";

type EventItem = {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  description: string;
  creatorName: string;
};

export default function UpdateEventDetails() {
  const { id } = useParams(); 
   const [events, setEvents] = useState<EventItem[]>([]);
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
    const [form, setForm] = useState<EventItem>({
      id: "",
      title: "",
      date: "",
      location: "",
      category: "",
      description: "",
      creatorName: "",
    })

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`/api/events/update/${id}`);
        if (!res.ok) throw new Error("Failed to fetch event");
        const data = await res.json();
        setEvent(data.event);
        setForm(data.event);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchEvent();
  }, [id]);
  function handleChange(
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      const { name, value } = e.target;
     setForm((prev) => {
    const storedUser = localStorage.getItem("user");
    const creatorName = storedUser ? JSON.parse(storedUser).name : ""; 
  
    return {
      ...prev,
      [name]: value,
      creatorName
    };
  });
  
    }
  
    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
    
      setEvents([...events, form]);
      setLoading(true);
      try {
        
        const res = await fetch(`/api/events/update/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
  
        if (!res.ok) throw new Error("Failed to create event");
  
        const data = await res.json();
        console.log("Event updated:", data);
        setForm({
          id: "",
          title: "",
          date: "",
          location: "",
          category: "",
          description: "",
          creatorName: "",
        });
      } catch (err) {
        console.error(err);
        alert("Error creating event.");
      } finally {
        setLoading(false);
        redirect('/MyEvents')
      }
    }
  

  if (loading) return  (<Loading/>);
  if (!event) return <h1>Event not found</h1>;

  return (
<>
  
  <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl m-8 border border-gray-300 ">
      <h1 className="text-2xl font-bold mb-6 text-center"> Update Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title */}
        <label className="font-bold"> Event title:</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />

        {/* Date */}
        <label className="font-bold"> Date and time of event: </label>
        <input
          type="datetime-local"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />

        {/* Location */}
        <label className="font-bold"> Event location:</label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />

        {/* Category */}
        <label className="font-bold">Event category:</label>
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />

        {/* Description */}
        <label className="font-bold">Event description:</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows={4}
          required
        />


        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
</>

  );
}
