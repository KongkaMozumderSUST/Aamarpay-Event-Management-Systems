export type EventItem = {
id: string;
title: string;
date: string; // ISO string or human-readable date
location: string;
category: string;
description: string;
creatorName: string;
};


// ---- Demo Data (you can pass your own via props) ----
export const demoEvents: EventItem[] = [
{ id: "1", title: "Hackathon Kickoff", date: "2025-09-04T10:00:00", location: "SUST Auditorium", category: "Tech", description: "A hackathon is a time-limited event, often lasting a day or a weekend, where diverse teams collaborate to solve a specific problem or develop new ideas through creative, rapid prototyping, typically in tech-related fields but also spanning other industries. Participants are usually developers, designers, and other professionals who form teams to build a working product, prototype, or proof-of-concept, with mentorship often available and winners potentially receiving prizes or recognition.",creatorName:"Kongka" },
{ id: "2", title: "AI & ML Workshop", date: "2025-09-07T14:30:00", location: "CSE Dept Lab 2", category: "Workshop", description: "Hands-on training on AI and Machine Learning.",creatorName:"Popy" },
{ id: "3", title: "Women in Tech Meetup", date: "2025-09-12T16:00:00", location: "Sylhet Innovation Hub", category: "Networking", description: "A meetup celebrating women in technology.",creatorName:"Eshika" },
{ id: "4", title: "Career Fair", date: "2025-10-01T09:00:00", location: "University Ground", category: "Career", description: "Annual career fair with local and international companies.",creatorName:"Kongka" },
{ id: "5", title: "Hackathon Kickoff", date: "2025-09-04T10:00:00", location: "SUST Auditorium", category: "Tech", description: "Opening ceremony for the annual hackathon.",creatorName:"Nishi" },
{ id: "6", title: "AI & ML Workshop", date: "2025-09-07T14:30:00", location: "CSE Dept Lab 2", category: "Workshop", description: "Hands-on training on AI and Machine Learning.",creatorName:"Eshan" },
{ id: "7", title: "Women in Tech Meetup", date: "2025-09-12T16:00:00", location: "Sylhet Innovation Hub", category: "Networking", description: "A meetup celebrating women in technology.",creatorName:"Dev" },
{ id: "8", title: "Career Fair", date: "2025-10-01T09:00:00", location: "University Ground", category: "Career", description: "Annual career fair with local and international companies.",creatorName:"Himel" },
{ id: "9", title: "Hackathon Kickoff", date: "2025-09-04T10:00:00", location: "SUST Auditorium", category: "Tech", description: "Opening ceremony for the annual hackathon.",creatorName:"Abantika" },
{ id: "10", title: "AI & ML Workshop", date: "2025-09-07T14:30:00", location: "CSE Dept Lab 2", category: "Workshop", description: "Hands-on training on AI and Machine Learning.",creatorName:"Dev" },
{ id: "11", title: "Women in Tech Meetup", date: "2025-09-12T16:00:00", location: "Sylhet Innovation Hub", category: "Networking", description: "A meetup celebrating women in technology.",creatorName:"Gopal" },
{ id: "12", title: "Career Fair", date: "2025-10-01T09:00:00", location: "University Ground", category: "Career", description: "Annual career fair with local and international companies.",creatorName:"Kongka" },
];