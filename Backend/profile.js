// profile.js


const profile = {
  name: "Sergio Lopez",
  title: "Computer Science Student | AI Engineering Aspirant",

  contact: {
    email: "srgl1179@gmail.com",
    phone: "479-278-3112",
    website: "https://sergiolopez.work"
  },

  important: {
    very_important_DONOTSKIP: "im not a professional software developer yet im aspiring to be one",
    professional_level: "Im a student, i have been involved with computers and coding since highschool, im not a professional yet, but im super willing to learn and become better",
    skills: "JavaScript (Frontend + API Integration) HTML/CSS (Responsive UI Systems) - Python (Data & Logic Projects) - C++ (Data Structures & Algorithms) - REST API Design & Backend Integration - Git Version Control - Object-Oriented Programming - Systems Thinking & Performance Optimization",
    focus: " I want to learn im constantly seeking for guidance in how to become better not just as a software engineer but as a person"
  },

  Resume: `
First-generation Computer Science student at the University of Arkansas.
Balances a 33-hour/week leadership role at Starbucks while carrying 10–15 credit hours.
Promoted to Barista Trainer (2023) and Shift Supervisor (2025).
Recognized as Employee of the Quarter (2025).

Founded SLANDS, a startup building websites and automation systems for local businesses.
Delivered production systems including:
- AI voice receptionist backend for Red Trucking LLC (Flask, Twilio, Retell AI)
- Casa Doner online ordering platform integrated directly with Clover
- BarberStudio05 booking system reducing manual scheduling

Fluent in Spanish. Focused on building strong engineering fundamentals,
scalable systems, and leveraging AI responsibly.
`,

  values: ["Integrity", "Congruency", "Constancy", "Hard work", "Family"],

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

  // ---------------------------------------------------------------------------
  // PROJECTS
  // Each project lists: what it is, status, architecture, concepts, tradeoffs,
  // interview-style talking points, and known gaps (things the assistant must
  // NOT invent). "strongestEvidence" is the one-line answer to "what does this
  // project prove?"
  // ---------------------------------------------------------------------------
  projects: [
    {
      name: "AI Voice Receptionist — Red Trucking LLC",
      aliases: ["Red Trucking", "voice receptionist", "AI receptionist", "Twilio project"],
      category: "SLANDS client work",
      status: "Built for a real client",
      strongestEvidence: "Backend and integration engineering: webhooks, API integration, security, and production error handling.",
      problem: "A trucking business needed incoming calls answered and summarized for the owner without someone manning the phone.",
      technologies: ["Python", "Flask", "Twilio (voice/SMS)", "Retell AI (voice agent)", "Webhooks", "JSON", "Environment variables"],
      architecture: `
Twilio handles the phone/SMS layer. Retell AI runs the voice-agent conversation.
A Flask backend exposes a webhook endpoint that receives call events as JSON,
extracts structured caller information (name, phone number, issue, location),
and sends an SMS summary to the owner through Twilio.
Flow: caller → Twilio → Retell AI voice agent → webhook (Flask) → validation → SMS summary to owner.
`,
      engineeringHighlights: [
        "Webhook security: HMAC-SHA256 signature verification over the timestamp plus request body, compared with hmac.compare_digest() (constant-time comparison) instead of plain string equality.",
        "Secrets management: API keys and Twilio credentials are loaded from environment variables, not hardcoded.",
        "Rate limiting: a global limit of 10 requests/minute and a stricter 5 requests/minute on the webhook, keyed by client address.",
        "Defensive input validation: safely handles missing JSON, applies defaults, and caps the length of name, phone, issue, and location fields.",
        "Honest error handling: SMS sending is wrapped in try/except and returns HTTP 500 on failure instead of falsely reporting success."
      ],
      engineeringConcepts: ["REST/webhooks", "API integration", "HMAC authentication", "Rate limiting", "Input validation", "Error handling", "Event-driven architecture", "Secrets via environment variables"],
      dataStructures: "Mainly dictionaries/JSON objects for webhook payloads and normalized string fields. The interesting part of this project is the architecture and security, not algorithms.",
      talkingPoints: [
        "He didn't want the webhook to trust arbitrary POST requests, so he verified signatures before processing any payload.",
        "He chose to return a real failure status when SMS delivery fails, so problems are visible instead of silently lost."
      ],
      unknowns: ["Call volume or usage numbers", "Hosting provider", "Uptime or reliability metrics"]
    },

    {
      name: "BarberStudio05 — Barbershop Booking System",
      aliases: ["BarberStudio05", "barbershop booking", "booking system", "barber project"],
      category: "SLANDS client work",
      status: "V1 in use by the client; database and multi-barber support are planned, not built",
      strongestEvidence: "System design and architectural tradeoffs: a single source of truth and deliberately avoiding premature complexity.",
      problem: "A barber was spending time manually coordinating appointments.",
      technologies: ["JavaScript", "n8n", "REST APIs", "Webhooks", "Outlook Calendar API"],
      architecture: `
Frontend → n8n webhook → availability logic → Outlook Calendar.
Outlook Calendar is the single source of truth: availability is read from it and
bookings are written back into the same calendar the barber already uses.
`,
      engineeringHighlights: [
        "Single source of truth: using the barber's existing Outlook Calendar avoids keeping two independent stores (a database and a calendar) in sync.",
        "Deliberate tradeoff (YAGNI): booking volume didn't justify a database yet, so he chose lower complexity and cost now while keeping the design open to adding one later.",
        "Core scheduling problem: checking availability, working with time intervals and service durations, and avoiding conflicting bookings for the same slot.",
        "Designed so barber IDs, service IDs, availability records, and customer records could be introduced later without rewriting the frontend."
      ],
      engineeringConcepts: ["Workflow automation", "Calendar API integration", "State consistency", "Conflict detection", "Date/time handling", "Incremental architecture", "System design"],
      dataStructures: "Calendar event objects, JSON payloads, arrays of available time slots, timestamps, and service-duration values.",
      reportedOutcome: "The portfolio reports roughly 2 hours per week less manual coordination and infrastructure costs below $20/month; these are self-reported figures, not independently verified measurements.",
      plannedFeatures: ["Database integration if volume requires it", "Multi-barber expansion"],
      talkingPoints: [
        "Why no database? Outlook already represented the real state of the schedule, and a second store would introduce synchronization and consistency problems for no real benefit at this volume.",
        "Designed around a single source of truth to avoid duplicate state."
      ],
      unknowns: ["How concurrent booking requests for the same slot are handled at the exact same moment (race conditions) — ask Sergio", "Number of bookings processed"]
    },

    {
      name: "Casa Doner — Website + Online Ordering",
      aliases: ["Casa Doner", "Casa Döner", "restaurant site", "Clover project"],
      category: "SLANDS client work",
      status: "Delivered to client",
      strongestEvidence: "Production client integration and good judgment about not rebuilding infrastructure that already works.",
      problem: "The restaurant was paying third-party commission costs on online orders.",
      technologies: ["HTML", "CSS", "JavaScript", "Clover ordering integration"],
      architecture: "A mobile-first website that routes customers into the restaurant's existing Clover ordering system, creating a direct ordering path.",
      engineeringHighlights: [
        "Integrated with the client's existing Clover POS/ordering system instead of building a custom payment processor, POS, or fulfillment system.",
        "Mobile-first, responsive UI because most restaurant customers order from phones."
      ],
      engineeringConcepts: ["Third-party system integration", "Responsive design", "Production client requirements", "Incremental modernization"],
      talkingPoints: [
        "He integrated with what the business already used rather than replacing working infrastructure."
      ],
      unknowns: ["Order volume", "Exact commission savings", "Hosting details"]
    },

    {
      name: "Concert Companion — Hackathon Project",
      aliases: ["Concert Companion", "hackathon", "hackathon project"],
      category: "Team hackathon (24 hours)",
      status: "Completed at a hackathon",
      strongestEvidence: "Applying an algorithm (Jaccard similarity) to a real problem, plus learning a new framework under time pressure on a team.",
      problem: "At concerts, many attendees may report the same incident, flooding moderators with duplicate reports.",
      technologies: ["Next.js", "React", "JavaScript"],
      engineeringHighlights: [
        "Report deduplication with Jaccard similarity: each report is tokenized into a set of words, and similarity = |A ∩ B| / |A ∪ B|. Reports scoring above a threshold are grouped, so moderators see one cluster instead of many duplicates.",
        "Sets are the natural data structure here because the algorithm only cares about unique tokens, intersection, and union.",
        "Time-based state: pinned announcements expire after ten minutes (timestamps, expiration logic, derived state).",
        "Sergio learned Next.js during the event and shipped a working feature within the 24-hour team environment."
      ],
      algorithmExplained: `
Report text → tokenize → Set A / Set B → intersection and union → similarity score → group if score >= threshold.
Example: A = {person, fighting, stage}, B = {fight, stage, person} share 2 of 4 unique tokens, so J = 0.5.
`,
      engineeringConcepts: ["Sets", "Jaccard similarity", "Tokenization", "Similarity thresholds", "Deduplication", "React state", "Next.js", "Time-based expiration", "Teamwork under time pressure"],
      unknowns: ["Which specific parts Sergio personally built versus teammates — ask Sergio", "Whether the final version used a database", "The exact similarity threshold"]
    },

    {
      name: "Verdant Valley — Pokémon-Inspired Game (Java → Python port)",
      aliases: ["Verdant Valley", "Pokémon game", "Pokemon game", "Pokémon project", "Pygame game"],
      category: "Personal learning project",
      status: "Working game; personal learning project that Sergio continues to expand",
      strongestEvidence: "OOP and design patterns, data structures, collision detection, persistence, and deterministic testing — more depth than a typical beginner game.",
      problem: "A self-directed project to strengthen OOP, game logic, and problem solving, later ported from Java to Python/Pygame while preserving behavior.",
      technologies: ["Python", "Pygame", "Java (original version)", "JSON"],
      techLine: "Python · Pygame · OOP · MVC · Factory Pattern · JSON Persistence · Collision Detection · Deterministic Testing",
      summary: "A sprite-based game ported from Java to Python/Pygame using an MVC-style architecture, polymorphic entities, a factory pattern, collision detection, projectile physics, JSON persistence, a built-in map editor, and deterministic regression tests.",
      engineeringHighlights: [
        "OOP: a base Sprite class holds shared position, size, collision, update, and draw behavior; subclasses (Sprite → Pokemon → Pikachu, and buildings like TrainingGym, TownHall, ResearchLab) override type and drawing. Demonstrates inheritance, polymorphism, encapsulation, and abstraction.",
        "Factory Pattern with dictionary dispatch: SpriteFactory maps type-name strings to classes, so objects are created with one constant-time lookup instead of a long if/elif chain.",
        "Game rules as data: catch cost per Pokémon type (e.g., Mewtwo 24 hits, Pikachu 3) lives in a dictionary rather than hardcoded conditionals.",
        "Different representations for storage vs. display: caught Pokémon are stored as a dictionary of type → count and converted into a list to render the six team slots.",
        "Collision detection: axis-aligned bounding boxes (pygame.Rect / colliderect); blocked movement is resolved by restoring the previous position.",
        "Projectile physics: Poké Ball direction is normalized with math.hypot and scaled to a fixed speed; collisions bounce by reversing the relevant velocity component.",
        "Entity state machine: Pokémon move through normal → hit/flashing → capture animation → joined team, driven by hits, flash, and captureTick values.",
        "Camera and viewport culling: the camera follows the player, clamps to world bounds, and only draws sprites that intersect the visible rectangle.",
        "Render ordering: sprites are sorted by their bottom edge (y + h) before drawing to create a simple depth effect (O(n log n) sort).",
        "Built-in map editor: grid snapping to 40×40 tiles, placement previews, placing buildings/Pokémon/trees/supplies, deletion, camera panning, save/load.",
        "Persistence: game state saves to JSON, and the Python version stays compatible with saves from the original Java version. Partial capture progress is persisted; in-flight projectiles intentionally are not (durable vs. ephemeral state).",
        "Fixed timestep: simulation advances on a fixed 33 ms step (~30 updates/second), matching the original, so behavior doesn't depend on rendering speed.",
        "Testing: eight test groups covering Java/Python state comparison, movement, collisions, catching, projectiles, supplies, save/load, malformed files, editor controls, and rendered previews. Tests compare snapshots at specific frames and reproduce the Java random sequence so initial placements match (deterministic, cross-implementation regression testing)."
      ],
      engineeringConcepts: ["Inheritance", "Polymorphism", "MVC", "Factory Pattern", "Hash maps/dictionaries", "Lists", "AABB collision detection", "Vector normalization", "State machines", "Viewport culling", "Sorting", "JSON serialization", "Fixed timestep simulation", "Regression testing", "Cross-language porting"],
      talkingPoints: [
        "He implemented rectangular collision detection using Pygame Rect bounds and used the entity's previous coordinates to resolve blocked movement.",
        "Porting between languages required understanding the software well enough to translate classes, events, rendering, state, persistence, and tests — not just syntax.",
        "He deliberately decided which state should be durable (capture progress) and which should be ephemeral (projectiles in flight)."
      ],
      unknowns: ["Total lines of code", "Whether it is published or playable online"]
    },

    {
      name: "Weather App",
      aliases: ["weather app", "OpenWeather project"],
      category: "Personal project",
      status: "Completed personal project",
      strongestEvidence: "Consuming an external API asynchronously and transforming the response into a usable UI.",
      problem: "Built to improve daily planning and routine optimization.",
      technologies: ["JavaScript", "OpenWeather API", "Frontend web development"],
      architecture: "User/location → API request → OpenWeather API → JSON response → extract relevant fields → transform and present in the UI.",
      engineeringConcepts: ["Asynchronous programming (promises)", "HTTP requests", "External API integration", "Error states", "Data transformation"],
      dataStructures: "JavaScript objects for weather records, arrays for forecast periods, JSON responses.",
      unknowns: ["Exact framework used", "Whether it is deployed publicly"]
    },

    {
      name: "Battleship Game + Antiderivative Solver",
      aliases: ["Battleship", "antiderivative solver"],
      category: "Academic projects",
      status: "Completed coursework, expanded beyond requirements",
      description: "Academic projects expanded beyond coursework to deeply understand logic, data structures, and mathematical implementation in code.",
      unknowns: ["Implementation language and specific algorithms used — ask Sergio"]
    }
  ],

  // Quick map for "what does each project prove?"
  projectEvidenceSummary: {
    "Red Trucking": "Backend architecture, APIs, webhooks, security, production integration",
    "BarberStudio05": "System design, state consistency, scheduling, architectural tradeoffs",
    "Concert Companion": "Algorithms (Jaccard similarity with sets), Next.js/React, teamwork under time pressure",
    "Verdant Valley": "OOP, design patterns, data structures, collision detection, persistence, deterministic testing",
    "Casa Doner": "Production client integration, working within business constraints",
    "Weather App": "API consumption, asynchronous programming, data transformation"
  },

  skills: [
    "Problem Solving & Algorithmic Thinking",
    "Data Structures & Algorithms Fundamentals",
    "Object-Oriented Programming & Design Patterns",
    "REST APIs, Webhooks & Backend Integration",
    "API Security Basics (HMAC signature verification, rate limiting, input validation)",
    "Workflow Automation (n8n)",
    "Automated Testing (regression and deterministic tests)",
    "Version Control (Git)",
    "Performance Awareness",
    "Technical Documentation",
    "JavaScript", "HTML", "CSS", "Python", "C++", "Flask", "Pygame", "Next.js/React (hackathon experience)"
  ],

  // Honest, constructive growth areas the assistant may share when asked.
  growthAreas: [
    "Early career: his engineering work is client projects through his own small business, a hackathon, and personal/academic projects, not a full-time engineering role.",
    "He has not yet worked inside a large codebase or a formal engineering team with code review processes.",
    "AI engineering is his goal; his current AI experience is integrating AI services (e.g., a voice agent) into products, not training or evaluating ML models.",
    "Some client systems are intentionally simple V1s (e.g., no database yet in the booking system), so he has less experience operating systems at scale."
  ],

  // Prepared answers the assistant can adapt. These are guides, not scripts:
  // tailor them to the visitor's question and role, and keep them honest.
  preparedAnswers: {
    shouldIHire: `
Sergio is worth interviewing for a software engineering internship or junior role with mentorship. He has built real systems for paying clients through SLANDS, including a Flask backend for an AI voice receptionist with HMAC-verified webhooks and rate limiting, and a booking system designed around a single source of truth. His personal game project goes further than most student projects, with design patterns, collision detection, JSON persistence, and deterministic regression tests. He's also held a 33-hour/week supervisor role at Starbucks while studying. He's still early in his career, so the best fit is a team that can support his growth. What role are you hiring for?
`,
    isSergioGood: `
For a student, Sergio shows unusually practical evidence: he ships systems real businesses use and makes sensible engineering tradeoffs, like integrating with a restaurant's existing Clover system instead of rebuilding it, or skipping a database until booking volume justifies one. He also tests his own work, with regression tests that compare his Python port against the original Java version. He is not yet a senior engineer and has limited experience in large team codebases, but his trajectory and habits are strong. Is there a specific skill you'd like me to speak to?
`,
    strengths: `
His clearest strengths are integrating real systems for real clients, thinking about tradeoffs instead of defaulting to complexity, security awareness in backend work, and testing discipline. Beyond code, he's shown reliability and leadership as a Starbucks trainer and shift supervisor while studying full time.
`,
    weaknesses: `
He's early in his career: his engineering experience comes from his own small business, a hackathon, and personal projects rather than a full-time engineering team, and his AI experience is integration rather than model development. He's aware of this and actively looking for mentorship and feedback.
`,
    whichProjectIsMostImpressive: `
It depends on what you care about. For backend and security, the Red Trucking voice receptionist. For system design, the BarberStudio05 booking system. For algorithms, Concert Companion's Jaccard-similarity report grouping. For overall engineering depth, Verdant Valley, his Pokémon-inspired game with design patterns, physics, a map editor, and deterministic tests.
`
  },

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
  
  I am particularly fascinated by how AI can act as a "second brain" — assisting reasoning, optimization, automation, and decision-making within software products.
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

  languages: ["Spanish (Fluent)", "English (Fluent)"],

  references: [
    "Brian Richard",
    "Edward Stinglets",
    "Craig Gschwend",
    "Nick Rooland",
    "Christopher Stevens – cwsteven@uark.edu"
  ]
};

export default profile;