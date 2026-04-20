export type MCQ = {
  question: string;
  options: string[];
  answer: string;
};

export const questionBank: Record<string, MCQ[]> = {
  "Threat Modelling": [
    {
      question: "What is the main goal of threat modelling?",
      options: [
        "To design a database",
        "To identify and reduce security risks",
        "To increase network speed",
        "To compress files",
      ],
      answer: "To identify and reduce security risks",
    },
    {
      question: "Which framework is commonly used in threat modelling?",
      options: ["SCRUM", "STRIDE", "MVC", "RAD"],
      answer: "STRIDE",
    },
    {
      question: "Spoofing in STRIDE refers to:",
      options: [
        "Data compression",
        "Impersonating another user or system",
        "Improving performance",
        "Encrypting data",
      ],
      answer: "Impersonating another user or system",
    },
  ],

  "Web Vulnerabilities": [
    {
      question: "Which of the following is a common web vulnerability?",
      options: ["SQL Injection", "RAM upgrade", "CPU caching", "Disk partitioning"],
      answer: "SQL Injection",
    },
    {
      question: "XSS stands for:",
      options: [
        "Cross-Site Scripting",
        "Extended Secure System",
        "XML Site Security",
        "Cross Server Setup",
      ],
      answer: "Cross-Site Scripting",
    },
    {
      question: "What helps prevent SQL injection?",
      options: [
        "Using parameterized queries",
        "Restarting the server",
        "Using larger storage",
        "Turning off CSS",
      ],
      answer: "Using parameterized queries",
    },
  ],

  "Spark Transformations": [
    {
      question: "Which of these is a Spark transformation?",
      options: ["map", "count", "collect", "save"],
      answer: "map",
    },
    {
      question: "Transformations in Spark are usually:",
      options: ["Immediate", "Lazy", "Deleted", "Compiled"],
      answer: "Lazy",
    },
    {
      question: "Which transformation is used to filter records?",
      options: ["reduce", "filter", "count", "first"],
      answer: "filter",
    },
  ],

  "Distributed Processing": [
    {
      question: "Distributed processing means:",
      options: [
        "Using only one CPU",
        "Processing data across multiple machines",
        "Deleting duplicate files",
        "Saving data locally only",
      ],
      answer: "Processing data across multiple machines",
    },
    {
      question: "A key advantage of distributed systems is:",
      options: ["Lower screen size", "Scalability", "Fewer files", "No network needed"],
      answer: "Scalability",
    },
    {
      question: "Spark is designed for:",
      options: [
        "Distributed data processing",
        "Photo editing",
        "Only web design",
        "Antivirus updates",
      ],
      answer: "Distributed data processing",
    },
  ],

  "Normalization": [
    {
      question: "Normalization is used to:",
      options: [
        "Increase data redundancy",
        "Reduce redundancy and improve structure",
        "Delete all tables",
        "Only change colors in UI",
      ],
      answer: "Reduce redundancy and improve structure",
    },
    {
      question: "Which normal form removes partial dependency?",
      options: ["1NF", "2NF", "BCNF", "4NF"],
      answer: "2NF",
    },
    {
      question: "A normalized database usually has:",
      options: [
        "Less redundancy",
        "More duplicated data",
        "No keys",
        "No relationships",
      ],
      answer: "Less redundancy",
    },
  ],

  "SQL Joins": [
    {
      question: "Which join returns matching rows from both tables?",
      options: ["LEFT JOIN", "INNER JOIN", "RIGHT JOIN", "CROSS JOIN"],
      answer: "INNER JOIN",
    },
    {
      question: "LEFT JOIN returns:",
      options: [
        "Only right table rows",
        "Only matching rows",
        "All rows from left table and matched rows from right table",
        "No rows",
      ],
      answer: "All rows from left table and matched rows from right table",
    },
    {
      question: "Which clause combines rows from multiple tables?",
      options: ["ORDER BY", "JOIN", "GROUP BY", "LIMIT"],
      answer: "JOIN",
    },
  ],

  "SDLC": [
    {
      question: "SDLC stands for:",
      options: [
        "Software Development Life Cycle",
        "System Data Logic Chain",
        "Secure Design Level Code",
        "Software Debugging Link Control",
      ],
      answer: "Software Development Life Cycle",
    },
    {
      question: "Which is a phase of SDLC?",
      options: ["Testing", "Painting", "Branding", "Printing"],
      answer: "Testing",
    },
    {
      question: "The first SDLC phase is usually:",
      options: ["Deployment", "Requirements gathering", "Testing", "Maintenance"],
      answer: "Requirements gathering",
    },
  ],

  "Software Testing": [
    {
      question: "The purpose of software testing is to:",
      options: [
        "Increase bugs",
        "Find defects and verify correctness",
        "Slow down development",
        "Remove all documentation",
      ],
      answer: "Find defects and verify correctness",
    },
    {
      question: "Unit testing focuses on:",
      options: [
        "Entire company network",
        "Small individual components",
        "Only databases",
        "Only UI colors",
      ],
      answer: "Small individual components",
    },
    {
      question: "Regression testing is used to:",
      options: [
        "Check if old functionality still works after changes",
        "Delete old code",
        "Improve internet speed",
        "Create new requirements",
      ],
      answer: "Check if old functionality still works after changes",
    },
  ],

  default: [
    {
      question: "What is the best way to improve weak academic areas?",
      options: [
        "Ignore feedback",
        "Revise concepts and practice regularly",
        "Skip classes",
        "Avoid quizzes",
      ],
      answer: "Revise concepts and practice regularly",
    },
    {
      question: "Why is feedback important?",
      options: [
        "It helps identify strengths and weaknesses",
        "It slows progress",
        "It replaces study",
        "It removes exams",
      ],
      answer: "It helps identify strengths and weaknesses",
    },
    {
      question: "What helps improve subject performance?",
      options: [
        "Consistent revision and practice",
        "Doing nothing",
        "Skipping assignments",
        "Ignoring mistakes",
      ],
      answer: "Consistent revision and practice",
    },
  ],
};