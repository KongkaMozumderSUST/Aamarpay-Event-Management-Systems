"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Loading from "@/components/loading";

type EventItem = {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  description: string;
  creatorName: string;
};

export default function Home() {
  const [demoEvents, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events"); 
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
       
       const sortedEvents: EventItem[] = [...data].sort(
  (a, b) => Number(b.id) - Number(a.id)
);
        setEvents(sortedEvents);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const categories = ["All", ...new Set(demoEvents.map((e) => e.category))];

  const filteredEvents = useMemo(() => {
    return demoEvents.filter((event) => {
      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchText.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [demoEvents, selectedCategory, searchText]);

  if (loading)
  return (
    <Loading/>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-grey  ">
      <h1 className="text-2xl font-bold mb-6">Upcoming Events</h1>
<div className="flex items-center justify-center">
      <input
        type="text"
        placeholder="Search by title..."
        className="mb-4 p-4 shadow-xl border border-gray-300 p-4 rounded-full w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
</div>

      <div className="flex gap-3 mb-6 flex-wrap flex items-center justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border transition ${
              selectedCategory === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="p-4 bg-white hover:shadow-lg transition shadow-xl border border-gray-300 p-4 rounded-lg"
            >
              
                <h2 className="text-lg font-semibold">{event.title}</h2>
              <p className="text-sm text-gray-500">
                📅 {new Date(event.date).toLocaleString()} | 📍 {event.location}
              </p>
              <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                {event.category}
              </span>
              <p className="mt-1 text-sm">Created by {event.creatorName}</p>
              <Link href={`/Events/${event.id}`}>
              <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">View Event</button>
            </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No events found.</p>
        )}
      </div>
    </div>
  );
}
