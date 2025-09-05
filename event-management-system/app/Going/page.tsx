"use client";
import { useState, useEffect } from "react";

type EventItem = {
  id: string;
  title: string;
  date: string;
  location: string;
};

const demoEvents: EventItem[] = [
  { id: "1", title: "Hackathon Kickoff", date: "2025-09-06", location: "SUST Auditorium" },
  { id: "2", title: "AI Workshop", date: "2025-09-07", location: "Lab 401" },
  { id: "3", title: "Cultural Night", date: "2025-09-08", location: "Central Field" },
];

type RSVPCounts = Record<string, { going: number; notGoing: number }>;
type UserRSVPs = Record<string, "going" | "notGoing" | null>;

export default function EventList() {
  const [counts, setCounts] = useState<RSVPCounts>({});
  const [userRSVPs, setUserRSVPs] = useState<UserRSVPs>({});
  const [user, setUser] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    const savedCounts = localStorage.getItem("eventCounts");
    const savedUserRSVPs = localStorage.getItem("userRSVPs");
    const savedUser = localStorage.getItem("user"); // 👈 check if user exists

    if (savedCounts) setCounts(JSON.parse(savedCounts));
    if (savedUserRSVPs) setUserRSVPs(JSON.parse(savedUserRSVPs));
    if (savedUser) setUser(savedUser);
  }, []);

  // Save counts + RSVPs
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

  return (
    <div className="p-6 grid gap-4 md:grid-cols-2">
      {demoEvents.map((event) => {
        const count = counts[event.id] || { going: 0, notGoing: 0 };
        const userChoice = userRSVPs[event.id];

        return (
          <div key={event.id} className="p-4 rounded-2xl shadow bg-white">
            <h2 className="text-xl font-bold">{event.title}</h2>
            <p className="text-gray-600">{event.date} • {event.location}</p>

            {/* Always show counts */}
            <p className="mt-2 text-sm text-gray-700">
              ✅ Going: {count.going} | ❌ Not Going: {count.notGoing}
            </p>

            {/* Only show buttons if user exists */}
            {user && (
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleRSVP(event.id, "going")}
                  className={`px-3 py-1 rounded-lg ${
                    userChoice === "going" ? "bg-green-700" : "bg-green-500"
                  } text-white`}
                >
                  ✅ Going
                </button>
                <button
                  onClick={() => handleRSVP(event.id, "notGoing")}
                  className={`px-3 py-1 rounded-lg ${
                    userChoice === "notGoing" ? "bg-red-700" : "bg-red-500"
                  } text-white`}
                >
                  ❌ Not Going
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
