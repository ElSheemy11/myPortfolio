export const navItems = [
  { name: "Home", link: "#home" },
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Contact", link: "#contact" },
];

export const contact = {
  email: "momenelshemy1@gmail.com",
  github: "https://github.com/ElSheemy11",
};

export const gridItems = [
  { id: 1, title: "I prioritize client collaboration, fostering open communication", description: "", className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]", imgClassName: "w-full h-full", titleClassName: "justify-end", img: "/b1.svg", spareImg: "" },
  { id: 2, title: "Based in Aswan, Egypt, and happy to work across time zones", description: "", className: "lg:col-span-2 md:col-span-3 md:row-span-2", imgClassName: "", titleClassName: "justify-start", img: "", spareImg: "" },
  { id: 3, title: "My tech stack", description: "Next.js, React, TypeScript and always improving", className: "lg:col-span-2 md:col-span-3 md:row-span-2", imgClassName: "", titleClassName: "justify-center", img: "", spareImg: "" },
  { id: 4, title: "Tech enthusiast with a passion for development.", description: "", className: "lg:col-span-2 md:col-span-3 md:row-span-1", imgClassName: "", titleClassName: "justify-start", img: "/grid.svg", spareImg: "/b4.svg" },
  { id: 5, title: "Currently building Auric: premium websites and dashboards for hotels", description: "The Inside Scoop", className: "md:col-span-3 md:row-span-3", imgClassName: "absolute right-0 bottom-0 md:w-96 w-60", titleClassName: "justify-center md:justify-start lg:justify-center", img: "/b5.svg", spareImg: "/grid.svg" },
  { id: 6, title: "Do you want to start a project together?", description: "", className: "lg:col-span-2 md:col-span-3 md:row-span-2", imgClassName: "", titleClassName: "justify-center md:max-w-full max-w-60 text-center", img: "", spareImg: "" },
];

// NOTE: add your own screenshots to /public (auric.png, red.png, reframe.png) or change `img`.
export const projects = [
  {
    id: 1,
    title: "Auric Hotel-demo: Hospitality Websites & Dashboards",
    des: "A premium digital solution for hotels and tourism businesses, featuring bilingual Arabic/English websites, multi-tenant architecture, private management dashboards, and WhatsApp-confirmed booking requests.",
    img: "/auric.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/c.svg"],
    link: "https://auric-hoteldemo.vercel.app/en",
  },
  {
    id: 2,
    title: "RED: PlayStation Lounge Manager",
    des: "A Windows desktop management system for gaming lounges, featuring room management, timed gaming sessions, automated billing, customer accounts, prepaid balances, staff authentication, and receipt printing.",
    img: "/red.png",
    iconLists: [],
    link: "https://github.com/ElSheemy11",
  },
  {
    id: 3,
    title: "reFrame.ai: Edit Photos with Words",
    des: "An AI-powered photo editing platform that transforms images using natural-language prompts, enabling users to reimagine backgrounds, lighting, styles, and visual details.",
    img: "/reframe.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/re.svg"],
    link: "https://re-frame-ai.vercel.app/",
  },
  {
    id: 4,
    title: "High Up: Social Media Platform",
    des: "A full-stack social media application with secure authentication, post creation, photo sharing, and a responsive interface, built with Next.js and a PostgreSQL database.",
    img: "/high-up.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/c.svg"],
    link: "https://high-up.vercel.app",
  },
  {
    id: 5,
    title: "Chattrix: Real-Time Messenger",
    des: "A full-stack messaging application featuring authentication, conversations, real-time communication, typing indicators, and customizable themes, powered by the MERN stack and Socket.IO.",
    img: "/chattrix.png",
    iconLists: ["/re.svg", "/tail.svg", "/node.svg", "/mongo.svg"],
    link: "https://chattrix-seven.vercel.app",
  },
  {
    id: 6,
    title: "PulseCore AI: Your Personal Fitness Coach",
    des: "An AI-powered fitness coaching platform that helps users pursue their fitness goals with personalized workout planning, fitness profiles, and voice-based AI coaching.",
    img: "/pulsecore.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/c.svg"],
    link: "https://pulse-core-ai.vercel.app/",
  },
  {
    id: 7,
    title: "Book-Lock: Online Bookstore",
    des: "A full-stack bookstore project designed to provide an organized shopping experience, with a focus on product discovery, book listings, and scalable application architecture.",
    img: "/book-lock.png",
    iconLists: ["/re.svg", "/tail.svg", "/node.svg", "/mongo.svg"],
    link: "https://github.com/ElSheemy11",
  },
  {
    id: 8,
    title: "Assembly: Word Guessing Game",
    des: "A fun hangman-style word guessing game with multiple levels. Players receive hints about the word’s difficulty level and try to guess it before running out of chances. Built with React for an interactive and responsive gameplay experience.",
    img: "/assembly.png",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg"],
    link: "https://assembly-endgame-theta-rose.vercel.app/",
  },
];

export const testimonials: { quote: string; name: string; title: string }[] = [];
export const companies: { id: number; name: string; img: string; nameImg: string }[] = [];

export const workExperience = [
  {
    id: 1,
    title: "Founder & Full-Stack Developer — Auric",
    desc: "Founded a digital development studio building premium websites and private management dashboards for hospitality and tourism businesses. Developed a bilingual hotel platform with booking requests, staff authentication, and a multi-tenant management system.",
    date: "2026 – Present",
    place: "Aswan, Egypt",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "ShadCN UI", "Drizzle ORM", "Neon", "Clerk", "Multi-Tenant Architecture"],
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "Developer — RED Management System",
    desc: "Developing a Windows desktop application for PlayStation lounge management, featuring timed gaming sessions, billing, customer accounts, prepaid balances, staff authentication, and receipt printing.",
    date: "2026 – Present",
    place: "Egypt · Client Project",
    tags: ["Python", "Tkinter", "SQLite", "Desktop Development", "Process Automation"],
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Developer — reFrame.ai",
    desc: "Built an AI-powered photo editing web application using Next.js, React, TypeScript, and Cloudflare Workers AI. Integrated AI image processing and Neon PostgreSQL to support prompt-based image transformations.",
    date: "2026",
    place: "Remote",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Cloudflare Workers AI", "Neon", "AI Image Processing"],
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    title: "Volunteer Web Developer — APEL",
    desc: "Contributed web development skills to APEL at Aswan University, supporting project needs and applying front-end and full-stack development knowledge in a collaborative environment.",
    date: "2026",
    place: "Aswan University, Aswan, Egypt",
    tags: ["Web Development", "Frontend", "JavaScript", "Team Collaboration"],
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
  {
    id: 5,
    title: "Full-Stack Developer — PulseCore AI",
    desc: "Developed an AI-powered fitness coaching application that generates personalized workout plans and provides voice coaching using Vapi, with Convex powering real-time data synchronization.",
    date: "2026",
    place: "Remote",
    tags: ["Next.js", "React", "Tailwind CSS", "ShadCN UI", "Convex", "Vapi", "Voice AI"],
    className: "md:col-span-2",
    thumbnail: "/exp6.svg",
  },
  {
    id: 6,
    title: "Full-Stack Developer — High Up",
    desc: "Built and deployed a social media platform using Next.js, PostgreSQL, Prisma ORM, and ShadCN UI, featuring secure authentication and a responsive interface.",
    date: "2025",
    place: "Remote",
    tags: ["Next.js", "PostgreSQL", "Prisma ORM", "ShadCN UI", "Tailwind CSS", "Authentication"],
    className: "md:col-span-2",
    thumbnail: "/exp5.svg",
  },
  {
    id: 7,
    title: "Full-Stack Developer — Chattrix",
    desc: "Built and deployed a real-time messaging application featuring a responsive interface, authentication, conversations, typing indicators, and customizable themes.",
    date: "2025",
    place: "Remote",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Tailwind CSS", "Real-Time Communication"],
    className: "md:col-span-2",
    thumbnail: "/exp7.svg",
  },
  {
    id: 8,
    title: "MEAN Stack Web Development — NTI",
    desc: "Completed full-stack web development training covering MongoDB, Express.js, Angular, and Node.js.",
    date: "2024",
    place: "National Telecommunication Institute (NTI), Egypt",
    tags: ["MongoDB", "Express.js", "Angular", "Node.js", "MEAN Stack"],
    className: "md:col-span-2",
    thumbnail: "/exp8.svg",
  },
  {
    id: 9,
    title: "Web Development Training — NTI",
    desc: "Completed a web development course with a 100% success rate.",
    date: "2024",
    place: "National Telecommunication Institute (NTI), Egypt",
    tags: ["Web Development", "HTML", "CSS", "JavaScript"],
    className: "md:col-span-2",
    thumbnail: "/exp9.svg",
  },
];

export const socialMedia = [
  { id: 1, img: "/git.svg", link: "https://github.com/ElSheemy11" },
  { id: 2, img: "/link.svg", link: "https://www.linkedin.com/in/momen-el-sheemy/" },
  { id: 3, img: "/facebook.svg", link: "https://www.facebook.com/momen.elsheemy" },
  { id: 4, img: "/insta.svg", link: "https://www.instagram.com/momen.elsheemy/" },
  { id: 5, img: "/wha.svg", link: "https://wa.me/+201104328077" },
];