"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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

export default function EventDetails() {
  const { id } = useParams(); 
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`/api/events/${id}`);
        if (!res.ok) throw new Error("Failed to fetch event");
        const data = await res.json();
        setEvent(data.event);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchEvent();
  }, [id]);

  if (loading) return  (<Loading/>);
  if (!event) return <h1>Event not found</h1>;

  return (

    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg border border-gray-300 p-4 rounded-lg m-8">
      <p className="mt-2  text-black font-bold">{event.creatorName} created an event </p>
      <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-500">
        📅 {new Date(event.date).toLocaleString()} | 📍 {event.location}
      </p>
      <p className="mt-4">{event.description}</p>
      <span className="inline-block mt-4 px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
        {event.category}
      </span>
      
    </div>
  );
}
