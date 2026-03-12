// profile.js
// This object is used by the portfolio assistant.
// Only update values — do not change structure unless backend changes.

const profile = {
    name: "Sergio Lopez",
    title: "Computer Science Student | AI Engineering Aspirant",
  
    contact: {
      email: "srgl1179@gmail.com",
      phone: "479-278-3112",
      website: "https://sergiolopez.work"
    },

    important:{ 
        very_important_DONOTSKIP:"im not a profesional software developer yet im aspiring to be one",
        profesional_level:"Im a student, i have been involded with computers and coding since highschool, im not a proffesional yet, but im super willing to learn and become better",
        skills:"JavaScript (Frontend + API Integration) HTML/CSS (Responsive UI Systems) - Python (Data & Logic Projects) - C++ (Data Structures & Algorithms) - REST API Design & Backend Integration - Git Version Control - Object-Oriented Programming - Systems Thinking & Performance Optimization",
        focus:" I want to learn im constantly seeking for guidence in how to become better not just as a software engineer but as a person",
    },
  
    Resume: `
  First-generation Computer Science student at the University of Arkansas.
  Balances a 33-hour/week leadership role at Starbucks while carrying 10–15 credit hours.
  Promoted to Barista Trainer (2023) and Shift Supervisor (2025).
  Recognized as Employee of the Quarter (2025).
  
  Founded SLANDS, a startup building websites and automation systems for local businesses.
  Delivered production-ready systems including:
  - Casa Doner online ordering platform integrated directly with Clover
  - Barbershop booking system reducing manual scheduling
  
  Fluent in Spanish. Focused on building strong engineering fundamentals,
  scalable systems, and leveraging AI responsibly.
  `,
  
    values: [
      "Integrity",
      "Congruency",
      "Constancy",
      "Hard work",
      "Family"
    ],
  
    philosophy: [
      "Kaizen (continuous improvement)",
      "Stoicism (discipline, emotional control, resilience)"
    ],
  
    availability: {
      monday: "After 2PM",
      tuesday: "After 11AM",
      wednesday: "After 2PM",
      thursday: "After 11AM",
      friday: "After 2PM"
    },
  
    education: {
      university: "University of Arkansas",
      major: "Computer Science",
      minor: "Mathematics",
      status: "2 years remaining",
      notes: "First-generation student"
    },
  
    experience: {
      starbucks: {
        role: "Shift Supervisor",
        hoursPerWeek: 33,
        highlights: [
          "Promoted to Barista Trainer (2023)",
          "Promoted to Shift Supervisor (2025)",
          "Employee of the Quarter (2025)",
          "Designed workflow optimization improving transaction throughput",
          "Strong de-escalation and conflict resolution skills"
        ]
      }
    },
  
    projects: [
      {
        name: "SLANDS Startup",
        description: `
  Founded startup focused on building websites and automation systems
  for local businesses to improve digital presence and revenue opportunities.
  `,
        subprojects: [
          {
            name: "Casa Doner Website + Online Order System",
            description: `
  Built mobile-first e-commerce site integrated directly with Clover,
  reducing third-party commission costs.
  Technologies: HTML, CSS, JavaScript.
  `
          },
          {
            name: "Barbershop Booking System",
            description: `
  Built mobile-focused booking system simplifying appointment scheduling
  and reducing manual planning workload.
  `
          }
        ]
      },
      {
        name: "Weather App",
        description: `
  Full-stack weather application built to improve daily planning and routine optimization.
  Focused on API integration and frontend/backend synchronization.
  `
      },
      {
        name: "Battleship Game + Antiderivative Solver",
        description: `
  Academic projects expanded beyond coursework to deeply understand logic,
  data structures, and mathematical implementation in code.
  `
      }
    ],
  
    skills: [
      "Problem Solving & Algorithmic Thinking",
      "Data Structures & Algorithms Fundamentals",
      "Object-Oriented Programming",
      "REST API Design & Backend Integration",
      "Version Control (Git)",
      "Performance Optimization",
      "Technical Documentation",
      "JavaScript",
      "HTML",
      "CSS",
      "Python",
      "C++"
    ],

    aboutSections: {
        anyone: `
    I grew up in a small town in Mexico and moved to the United States in 2018. 
    Adapting to a new country required learning a new language, culture, and system from the ground up. 
    
    I guide myself by Stoic and Kaizen philosophy. I believe in continuous improvement, emotional discipline, and long-term consistency. 
    The trust of my parents, mentors, and those who believed in me shaped my purpose: to build things that leave the world better than I found it.
    `,
    
        engineers: `
    I am early in my engineering journey, but fully committed to becoming exceptional. 
    I value feedback, collaboration, and working with people who raise the standard.
    
    My focus is building strong software fundamentals — systems thinking, performance awareness, and clean architecture — while learning how to integrate AI into real-world applications. 
    
    I want to grow into an engineer who not only writes code, but designs intelligent systems that improve decision-making and human capability.
    `,
    
        recruiters: `
    My goal is to become an AI-focused software engineer — someone who builds secure, scalable applications and integrates artificial intelligence directly into software systems.
    
    I dedicate time outside of work and school to project-based learning, backend/frontend integration, API design, and understanding how AI models can be embedded into products responsibly.
    
    I am aware of how competitive and rapidly evolving this industry is, especially with AI reshaping everything. I did not choose this path because it is easy — I chose it because I want to build at the frontier of intelligent systems.
    
    I am particularly fascinated by how AI can act as a “second brain” — assisting reasoning, optimization, automation, and decision-making within software products.
    `,
    
        designDirectors: `
    Although my formal design experience is limited, I deeply care about how systems affect human behavior.
    
    AI-powered software must not only function well — it must guide users clearly, ethically, and responsibly. 
    I am curious about how intelligent interfaces influence decisions, trust, and long-term engagement.
    `,
    
        productManagers: `
    From sports to professional leadership roles, I have always operated as a team-first contributor.
    
    When building AI-integrated software, I think in terms of systems impact:
    • What problem does this solve?
    • How does AI improve the workflow?
    • Is the intelligence aligned with user trust?
    
    I want to help teams build products that are not just functional, but intelligently designed for real-world use.
    `
      },
    
  
    languages: [
      "Spanish (Fluent)",
      "English (Fluent)"
    ],
  
    references: [
      "Brian Richard",
      "Edward Stinglets",
      "Craig Gschwend",
      "Nick Rooland",
      "Christopher Stevens – cwsteven@uark.edu"
    ]
  };
  
  export default profile;
  