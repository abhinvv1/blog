import { Project } from '@/types';

// Sample projects data - replace with your actual projects
export const projects: Project[] = [
  {
    id: 'mrav-cpu',
    title: 'Mrav CPU: A fully automated, custom CPU and software stack for tiny embedded systems',
    description: 'Complete CPU design and implementation with custom software tooling for embedded systems. Features automated build pipeline and comprehensive testing framework.',
    url: 'https://github.com/abhinvv1/mrav-cpu', // Replace with actual URL
    github: 'https://github.com/abhinvv1/mrav-cpu', // Replace with actual URL
    tags: ['CPU Design', 'Embedded Systems', 'Hardware', 'RISC-V', 'SystemVerilog'],
    featured: true,
    status: 'completed',
  },
  {
    id: 'linux-board',
    title: 'Linux Board: A self-designed PCB board that boots full mainline Linux kernel',
    description: 'Custom PCB design capable of running full Linux kernel with bootloader, device drivers, and complete system integration.',
    url: 'https://github.com/abhinvv1/linux-board', // Replace with actual URL
    github: 'https://github.com/abhinvv1/linux-board', // Replace with actual URL
    tags: ['PCB Design', 'Linux Kernel', 'Hardware', 'Embedded Linux', 'Electronics'],
    featured: true,
    status: 'completed',
  },
  {
    id: 'g2disk',
    title: 'g2disk: Go monorepo for a framework to build Linux block devices in userspace',
    description: 'Framework for creating Linux block devices in userspace using Go, providing a simple API for custom storage solutions.',
    url: 'https://github.com/abhinvv1/g2disk', // Replace with actual URL
    github: 'https://github.com/abhinvv1/g2disk', // Replace with actual URL
    tags: ['Go', 'Linux', 'Block Devices', 'Storage', 'Systems Programming'],
    featured: false,
    status: 'completed',
  },
  {
    id: 'glua-kit',
    title: 'glua-kit: Monorepo for automatically integrating mainline Lua into different applications via Bazel',
    description: 'Build system integration for embedding Lua scripting into applications with automated tooling and comprehensive build support.',
    url: 'https://github.com/abhinvv1/glua-kit', // Replace with actual URL
    github: 'https://github.com/abhinvv1/glua-kit', // Replace with actual URL
    tags: ['Lua', 'Bazel', 'Build Systems', 'Scripting', 'Integration'],
    featured: false,
    status: 'completed',
  },
  {
    id: 'blog-website',
    title: 'Personal Blog & Portfolio Website',
    description: 'Modern, responsive blog website built with Next.js, TypeScript, and Tailwind CSS. Features MDX content, search functionality, and clean design.',
    url: 'https://yourdomain.com', // Replace with actual URL
    github: 'https://github.com/abhinvv1/blog-website', // Replace with actual URL
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MDX', 'Web Development'],
    featured: false,
    status: 'in-progress',
  },
  {
    id: 'ai-code-assistant',
    title: 'AI-Powered Code Assistant',
    description: 'Intelligent coding assistant that helps with code completion, debugging, and optimization using machine learning algorithms.',
    github: 'https://github.com/abhinvv1/ai-code-assistant', // Replace with actual URL
    tags: ['AI/ML', 'Python', 'NLP', 'Code Analysis', 'Developer Tools'],
    featured: false,
    status: 'planned',
  },
];

// You can add more projects here or modify existing ones
// Each project should follow the Project interface defined in types/index.ts
