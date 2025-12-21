require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Testimonial = require('./models/Testimonial');

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedProjects = [
  {
    title: "YACSN",
    description: "YACSN is a modern, fully responsive corporate website developed with WordPress for York Air Conditioning's official representative in Nigeria. Designed to strengthen brand presence, improve user engagement, and showcase products and dealer information with a clean, professional interface.",
    image: "/src/assets/Images/YACSN.png",
    liveUrl: "https://yacsn.com/",
    githubUrl: "https://github.com/simon-azike1",
    category: "web",
    technologies: ["WordPress", "HTML", "CSS", "JavaScript", "PHP"],
    featured: true
  },
  {
    title: "Barber Booking App",
    description: "A full-stack web app for booking grooming sessions and managing appointments online. Built with React, Node.js, and MongoDB for smooth, responsive performance.",
    image: "/src/assets/Images/baberShop.png",
    liveUrl: "https://barber-shop-web-app-mhma.vercel.app/",
    githubUrl: "https://github.com/simon-azike1/barberShopWebApp",
    category: "web",
    technologies: ["React", "Node.js", "MongoDB", "CSS"],
    featured: true
  },
  {
    title: "Mercel Life",
    description: "A modern and responsive portfolio website for a UX/UI designer, built with React and Tailwind CSS to showcase projects and design work beautifully.",
    image: "/src/assets/Images/MercelLife2.png",
    liveUrl: "https://mercel-life.vercel.app/",
    githubUrl: "https://github.com/simon-azike1/Mercel-Life",
    category: "design",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    featured: false
  },
  {
    title: "The Recipe Book",
    description: "A web app that displays categorized recipes with ingredients and steps. Built using Vanilla JavaScript and responsive CSS.",
    image: "/src/assets/Images/TheRecipeBook.png",
    liveUrl: "https://therecipebook-liard.vercel.app/",
    githubUrl: "https://github.com/simon-azike1/THERECIPEBOOK",
    category: "web",
    technologies: ["JavaScript", "CSS", "HTML", "API"],
    featured: true
  },
  {
    title: "Chetro",
    description: "Chetro is a task management app that helps users organize and categorize daily activities efficiently for better productivity.",
    image: "/src/assets/Images/ChetroApp.png",
    liveUrl: "https://task-management-app-omega-flax.vercel.app/",
    githubUrl: "https://github.com/simon-azike1/Blog-Page",
    category: "web",
    technologies: ["HTML", "CSS", "JavaScript"],
    featured: false
  },
  {
    title: "Util",
    description: "Util is a house utility management system that automates budgeting, expense tracking, and contributions for shared apartments. Built from personal experience managing utilities manually.",
    image: "/src/assets/Images/UtilApp.png",
    liveUrl: "https://house-utility-app.vercel.app/",
    githubUrl: "https://github.com/simon-azike1/HouseUtility-App",
    category: "web",
    technologies: ["React", "API", "CSS", "JavaScript"],
    featured: true
  },
  {
    title: "DeHire Ventures",
    description: "A dynamic web application for a logistics company featuring recruitment management and modern branding built with React and MongoDB.",
    image: "/src/assets/Images/DeHireVentures.png",
    liveUrl: "https://hrms-client-self.vercel.app/",
    githubUrl: "https://github.com/samzik234/HRMS",
    category: "web",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    featured: true
  },
  {
    title: "Product Management App",
    description: "A React-based inventory management system with product addition, viewing, searching, and deletion features.",
    image: "/src/assets/Images/productM.png",
    liveUrl: "https://product-management-app-kl4b.vercel.app/",
    githubUrl: "https://github.com/simon-azike1/product-management-app",
    category: "web",
    technologies: ["React", "Firebase", "CSS", "JavaScript"],
    featured: true
  },
  {
    title: "MovieMania",
    description: "A movie database app that fetches and displays movie details via API, with search and filtering options in a clean UI.",
    image: "/src/assets/Images/movieMania.png",
    liveUrl: "https://movie-mania-drab-six.vercel.app/",
    githubUrl: "https://github.com/samzik234/MovieMania",
    category: "web",
    technologies: ["HTML", "CSS", "JavaScript"],
    featured: true
  }
];

const seedSkills = [
  {
    name: "JavaScript",
    category: "frontend",
    level: "Intermediate",
    percentage: 50,
    experience: "2+ years"
  },
  {
    name: "React.js",
    category: "frontend",
    level: "Intermediate",
    percentage: 65,
    experience: "2+ years"
  },
  {
    name: "HTML5",
    category: "frontend",
    level: "Expert",
    percentage: 75,
    experience: "3+ years"
  },
  {
    name: "CSS3",
    category: "frontend",
    level: "Advanced",
    percentage: 70,
    experience: "3+ years"
  },
  {
    name: "Node.js",
    category: "backend",
    level: "Intermediate",
    percentage: 75,
    experience: "2+ years"
  },
  {
    name: "Git & GitHub",
    category: "tools",
    level: "Advanced",
    percentage: 85,
    experience: "3+ years"
  },
  {
    name: "MongoDB",
    category: "backend",
    level: "Intermediate",
    percentage: 65,
    experience: "2+ years"
  },
  {
    name: "ElasticSearch",
    category: "backend",
    level: "Intermediate",
    percentage: 55,
    experience: "1+ year"
  }
];

const seedTestimonials = [
  {
    name: "John Anderson",
    role: "CEO, Tech Innovations Inc.",
    content: "Working with Simon was an absolute pleasure. His attention to detail and commitment to delivering high-quality work exceeded our expectations. The project was completed on time and the results speak for themselves.",
    rating: 5,
    avatar: "/src/assets/Images/profile.jpg"
  },
  {
    name: "Sarah Mitchell",
    role: "Product Manager, Digital Solutions",
    content: "Simon's technical expertise and problem-solving skills are outstanding. He transformed our complex requirements into an elegant, user-friendly solution. Highly recommended for any web development project.",
    rating: 5,
    avatar: "/src/assets/Images/profile.jpg"
  },
  {
    name: "Michael Chen",
    role: "Founder, StartupLab",
    content: "Exceptional developer with great communication skills. Simon not only built our application but also provided valuable insights that improved the overall product. Looking forward to working together again.",
    rating: 5,
    avatar: "/src/assets/Images/profile.jpg"
  }
];

const seedDatabase = async () => {
  try {
    await connectDatabase();

    // Clear existing data
    console.log('Clearing existing data...');
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Testimonial.deleteMany({});
    console.log('Existing data cleared.');

    // Insert projects
    console.log('Seeding projects...');
    const projects = await Project.insertMany(seedProjects);
    console.log(`${projects.length} projects inserted.`);

    // Insert skills
    console.log('Seeding skills...');
    const skills = await Skill.insertMany(seedSkills);
    console.log(`${skills.length} skills inserted.`);

    // Insert testimonials
    console.log('Seeding testimonials...');
    const testimonials = await Testimonial.insertMany(seedTestimonials);
    console.log(`${testimonials.length} testimonials inserted.`);

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
