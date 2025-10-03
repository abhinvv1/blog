import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "isort",
    title:
      "isort: A Ruby gem that automatically sorts and organizes your import statements in Ruby files",
    description:
      "Sorts import statements correctly as per the norms, groups imports by type (require, require_relative, include, extend), preserves code structure and spacing, maintains conditional requires, respects nested class and module definitions. You can use it on a file or a complete directory at once.",
    url: "https://rubygems.org/gems/isort",
    github: "https://github.com/abhinvv1/isort",
    tags: [
      "Ruby on Rails",
      "Gems",
      "Clean Code",
      "Code Quality",
      "Developer Tools",
      "Ruby",
    ],
    featured: false,
    status: "completed",
  },
  {
    id: "log-monitor",
    title: "Log Monitor: Real-Time Log Monitoring and Broadcasting System",
    description:
      "Real-time log monitoring and broadcasting app leveraging asyncio, WebSockets, docker and NGINX for monitoring huge size log files and broadcasting updates to multiple clients in real-time.",
    url: "https://github.com/pixelcaliber/Log-Monitor",
    github: "https://github.com/pixelcaliber/Log-Monitor",
    tags: [
      "Websockets",
      "Asyncio",
      "Python",
      "Docker",
      "NGINX",
      "Real-Time",
      "Monitoring Tools",
    ],
    featured: false,
    status: "completed",
  },
  {
    id: "t3-ai",
    title:
      "t3-AI: Reinforcement learning leveraged Tic Tac Toe against an AI game powered by a Q-learning agent",
    description:
      "This project is a full-fledged web application built using Python Flask (backend) and a React/Next.js frontend. It allows users to play a game of Tic Tac Toe against an AI powered by a Q-learning agent. The application supports multiple users simultaneously by isolating each game session with unique session IDs and includes rate limiting to prevent abuse. It replays each game and apply bellman equation to readjust weights and improve from its gameplay through reinforcement learning. Q-learning agent: a type of reinforcement learning algorithm where an agent learns to take actions in an environment by maximizing a cumulative reward.",
    url: "https://t3-ai.vercel.app/",
    github: "https://github.com/pixelcaliber/q-learning",
    tags: [
      "Q-Learning",
      "Python",
      "Reinforcement Learning",
      "AI",
      "Machine Learning",
      "Algorithms",
      "Game Theory",
    ],
    featured: true,
    status: "completed",
  },
  {
    id: "hype",
    title:
      "hype: A minimalistic video calling web application built WebRTC, STURN and TURN servers.",
    description:
      "A minimalistic video calling web application built with WebRTC, STUN, and TURN servers for real-time communication. It enables peer-to-peer video calls directly in the browser without the need for plugins or downloads. The application uses a signaling server to establish connections and manage call sessions, ensuring low latency and high-quality video and audio transmission. Ideal for personal and professional use, hype provides a seamless and secure video calling experience with support for isolated rooms and multiple users.",
    url: "https://hype-eta.vercel.app",
    github: "https://github.com/abhinvv1/hype",
    tags: [
      "WebRTC",
      "Video Calling",
      "Real-Time Communication",
      "JavaScript",
      "STUN",
      "TURN",
      "Signaling Servers",
    ],
    featured: true,
    status: "completed",
  },
  {
    id: "veb_tree",
    title:
      "Van-Emde-Boas-tree: A Ruby gem implementation of high-performance Van Emde Boas (vEB) tree with a C++17 core.",
    description:
      "VebTree is a production-quality Van Emde Boas tree implementation providing O(log log U) time complexity for insert, delete, search, successor, and predecessor operations on integer sets. The core algorithm is implemented in C++17 for maximum performance with an idiomatic Ruby API. Perfect for applications requiring fast integer set operations, range queries, and successor/predecessor lookups within a bounded universe.",
    url: "https://rubygems.org/gems/veb_tree",
    github: "https://github.com/abhinvv1/Van-Emde-Boas-tree",
    tags: [
      "RubyGems",
      "c++",
      "Gems",
      "Ruby",
      "Van-Emde-Boas-tree"
    ],
    featured: true,
    status: "completed",
  },
  {
    id: "blog-website",
    title: "Personal Blog & Portfolio Website",
    description:
      "Modern, responsive blog website built with Next.js, TypeScript, and Tailwind CSS. Features MDX content, search functionality, and clean design.",
    url: "https://pixelcaliber.vercel.app",
    github: "https://github.com/abhinvv1/blog",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "MDX", "Web Development"],
    featured: false,
    status: "completed",
  },
  {
    id: "reddit-code",
    title:
      "Reddit-Code: A VS Code extension that brings the power of Reddit directly into your IDE.",
    description:
      "A VS Code extension that integrates Reddit into the development environment, allowing users to browse and interact with their favorite subreddits without leaving the editor. The extension features a sidebar for subreddit feeds, post previews, and the ability to upvote or downvote posts directly from the IDE.",
    url: "https://github.com/pixelcaliber/Reddit-Code/commits/first-release",
    github: "https://github.com/abhinvv1/reddit-code",
    tags: ["VS Code", "Reddit", "Extension", "JavaScript", "Web Development"],
    featured: false,
    status: "completed",
  },
  {
    id: "sentinel",
    title:
      "Sentinel: A Chat Application facilitating messaging between individuals for seamless communication.",
    description:
      "A Highly Scalable and Powerful Chat Application that provides a seamless messaging experience between individuals. It is designed to be highly scalable and powerful, capable of handling a large number of users and messages. The application features real-time messaging, user authentication, and a clean user interface.",
    url: "https://github.com/pixelcaliber/Sentinel",
    github: "https://github.com/pixelcaliber/Sentinel",
    tags: [
      "Chat Application",
      "Messaging",
      "Real-Time Communication",
      "JavaScript",
      "Web Development",
      "Websockets",
      "NGINX",
      "Docker",
      "Python",
      "Crons",
      "Worker",
    ],
    featured: false,
    status: "completed",
  },
  {
    id: "proofread",
    title:
      "ProofRead: A spell checker using Tries and Optical Character Recognition (OCR)",
    description:
      "Data structure project to detect spelling errors using Optical Character Recognition technique, extracting texts from images and then finding spelling errors.",
    url: "https://github.com/pixelcaliber/ProofRead",
    github: "https://github.com/pixelcaliber/ProofRead",
    tags: ["Tries", "OCR", "node.js", "Data Structures", "Algorithms"],
    featured: false,
    status: "completed",
  },
  {
    id: "airgo",
    title: "AirGo: Flight Reservation System based on node express & mongoDB",
    description:
      "A flight reservation system that allows users to search for flights, book tickets, and manage their reservations. The system is built using Node.js, Express, and MongoDB, providing a robust and scalable backend for handling user requests and data storage. Generates tickets as pdf document",
    url: "https://airgoworld.onrender.com",
    github: "https://github.com/pixelcaliber/AirGo",
    tags: ["Node.js", "Express", "MongoDB", "Web Development", "REST API", "PDF"],
    featured: false,
    status: "completed",
  },
  {
    id: "kepler",
    title: "Kepler: Ruby on Rails CRUD application to create and share microposts",
    description:
      "A simple Ruby on Rails CRUD application that allows users to create, read, update, and delete microposts. Users can share their thoughts and ideas in short posts, similar to Twitter. The application features user authentication, responsive design, and a clean user interface.",
    url: "https://github.com/abhinvv1/kepler",
    github: "https://github.com/abhinvv1/kepler",
    tags: ["Ruby on Rails", "CRUD", "MySQL", "Ruby", "Web Development"],
    featured: false,
    status: "completed",
  },
];
