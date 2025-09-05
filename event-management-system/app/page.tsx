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
  type RSVPCounts = Record<string, { going: number; notGoing: number }>;
  type UserRSVPs = Record<string, "going" | "notGoing" | null>;
  const [counts, setCounts] = useState<RSVPCounts>({});
  const [userRSVPs, setUserRSVPs] = useState<UserRSVPs>({});
  const [user, setUser] = useState<string | null>(null);
  const [demoEvents, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const savedCounts = localStorage.getItem("eventCounts");
    const savedUserRSVPs = localStorage.getItem("userRSVPs");
    const storedUser = localStorage.getItem("user"); // 👈 check if user exists
     const currentUserName = storedUser ? JSON.parse(storedUser).name : "";
    if (savedCounts) setCounts(JSON.parse(savedCounts));
    if (savedUserRSVPs) setUserRSVPs(JSON.parse(savedUserRSVPs));
    if (currentUserName) setUser(currentUserName);
  }, []);
  useEffect(() => {
    localStorage.setItem("eventCounts", JSON.stringify(counts));
    localStorage.setItem("userRSVPs", JSON.stringify(userRSVPs));
  }, [counts, userRSVPs]);

  const handleRSVP = (id: string, type: "going" | "notGoing") => {
    const previous = userRSVPs[id];

    setCounts((prev) => {
      const current = prev[id] || { going: 0, notGoing: 0 };
      let newGoing = current.going;
      let newNotGoing = current.notGoing;

      if (previous === type) {
        // Toggle off
        newGoing -= previous === "going" ? 1 : 0;
        newNotGoing -= previous === "notGoing" ? 1 : 0;
      } else {
        // Switch or new selection
        newGoing -= previous === "going" ? 1 : 0;
        newNotGoing -= previous === "notGoing" ? 1 : 0;
        newGoing += type === "going" ? 1 : 0;
        newNotGoing += type === "notGoing" ? 1 : 0;
      }

      return {
        ...prev,
        [id]: { going: newGoing, notGoing: newNotGoing },
      };
    });

    setUserRSVPs((prev) => ({
      ...prev,
      [id]: previous === type ? null : type,
    }));
  };
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
    filteredEvents.map((event) => {
      const count = counts[event.id] || { going: 0, notGoing: 0 };
      const userChoice = userRSVPs[event.id];

      return (
        <div
          key={event.id}
          className="p-4 bg-white hover:shadow-lg transition shadow-xl border border-gray-300 rounded-lg"
        >
          <h2 className="text-lg font-semibold">{event.title}</h2>
          <p className="text-sm text-gray-500">
            📅 {new Date(event.date).toLocaleString()} | 📍 {event.location}
          </p>
          <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
            {event.category}
          </span>
          <p className="mt-1 text-sm">Created by {event.creatorName}</p>

          {/* RSVP counts always visible */}
          <p className="mt-2 text-sm text-gray-700">
            ✅ Going: {count.going} | ❌ Not Going: {count.notGoing}
          </p>

          {/* RSVP buttons only if user exists */}
          {user && (
            <div className="mt-3 flex gap-3">
              <button
                onClick={() => handleRSVP(event.id, "going")}
                className={`px-3 py-1 rounded-lg text-white text-sm ${
                  userChoice === "going" ? "bg-green-700" : "bg-green-500 hover:bg-green-600"
                }`}
              >
                ✅ Going
              </button>
              <button
                onClick={() => handleRSVP(event.id, "notGoing")}
                className={`px-3 py-1 rounded-lg text-white text-sm ${
                  userChoice === "notGoing" ? "bg-red-700" : "bg-red-500 hover:bg-red-600"
                }`}
              >
                ❌ Not Going
              </button>
            </div>
          )}

          <Link href={`/Events/${event.id}`}>
            <button
              type="button"
              className="mt-3 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 
                         focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 
                         dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              View
            </button>
          </Link>
        </div>
      );
    })
  ) : (
    <p className="text-gray-500">No events found.</p>
  )}
</div>

    </div>
  );
}
