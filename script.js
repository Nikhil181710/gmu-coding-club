// DOM Elements
const header = document.getElementById('header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const registrationForm = document.getElementById('registration-form');
const runCodeBtn = document.getElementById('run-code');
const resetCodeBtn = document.getElementById('reset-code');
const codeEditor = document.getElementById('code-editor');
const output = document.getElementById('output');
const modals = document.querySelectorAll('.modal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const learnMoreBtns = document.querySelectorAll('.learn-more');
const langBtns = document.querySelectorAll('.lang-btn');
const currentLangDisplay = document.getElementById('current-lang');
const pageSections = document.querySelectorAll('.page-section');
const navItems = document.querySelectorAll('.nav-links a[data-page]');
const dropdowns = document.querySelectorAll('.dropdown');

// Event data
const events = {
    1: {
        title: "Web Development Workshop",
        date: "October 15, 2023",
        time: "6:00 PM - 8:00 PM",
        location: "CS seminar hall, Room 139",
        description: "Join us for an interactive workshop where we'll cover the fundamentals of web development. This session is perfect for beginners who want to learn HTML, CSS, and JavaScript.",
        details: "In this hands-on workshop, you'll learn how to create your first web page from scratch. We'll cover HTML structure, CSS styling, and basic JavaScript functionality. By the end of the session, you'll have a working knowledge of how websites are built and the skills to create your own simple web projects.",
        requirements: "No prior experience required. Just bring your laptop and enthusiasm to learn!",
        instructor: "Sarah Johnson, Senior CS Student"
    },
    2: {
        title: "Hackathon Preparation",
        date: "October 22, 2023",
        time: "5:30 PM - 8:30 PM",
        location: "GM halamma Auditorium",
        description: "Get ready for our annual 24-hour hackathon with this preparation session. We'll cover team formation, project ideas, and competition strategies.",
        details: "This session is designed to help you prepare for our upcoming hackathon. We'll discuss how to form effective teams, brainstorm project ideas that can be completed in 24 hours, and share tips for managing your time during the competition. We'll also review the judging criteria and past winning projects for inspiration.",
        requirements: "Basic programming knowledge recommended but not required.",
        instructor: "Alex Chen, Hackathon Coordinator"
    },
    3: {
        title: "Tech Career Fair",
        date: "November 5, 2023",
        time: "10:00 AM - 3:00 PM",
        location: "GM halamma Auditorium",
        description: "Connect with recruiters from top tech companies and learn about internship and job opportunities in the industry.",
        details: "Our annual Tech Career Fair brings together leading technology companies looking to hire GMU students. This is your chance to network with industry professionals, learn about internship and full-time opportunities, and practice your interview skills. We'll have companies ranging from startups to Fortune 500 tech giants.",
        requirements: "Bring copies of your resume and dress professionally.",
        instructor: "Career Services & Coding Club"
    }
};

// Project data
const projects = {
    1: {
        title: "Study Buddy Platform",
        description: "A platform for GMU students to find study partners and form study groups based on courses and schedules.",
        details: "This web application allows students to create profiles, list their courses, and find other students who are studying the same subjects. The platform includes features like scheduling study sessions, sharing resources, and tracking study progress. The frontend is built with React and the backend uses Node.js with a MongoDB database.",
        technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
        team: "Web Development Team",
        status: "In Development",
        github: "https://github.com/gmucodingclub/study-buddy"
    },
    2: {
        title: "Campus Navigation",
        description: "An interactive map app to help students navigate GMU campus with real-time updates and event locations.",
        details: "This mobile application provides turn-by-turn navigation within the GMU campus. It includes features like finding the shortest path between buildings, locating available study spaces, and getting notifications about campus events. The app is built with Flutter and uses Firebase for real-time data synchronization.",
        technologies: ["Flutter", "Firebase", "Google Maps API", "Dart"],
        team: "Mobile Development Team",
        status: "Beta Testing",
        github: "https://github.com/gmucodingclub/campus-nav"
    },
    3: {
        title: "GMU Course Analytics",
        description: "A data analysis tool that helps students make informed decisions about course selection based on historical data.",
        details: "This Python-based application analyzes historical course data to provide insights about course difficulty, professor ratings, and grade distributions. The tool uses Pandas for data manipulation and visualization libraries to present the findings in an intuitive dashboard.",
        technologies: ["Python", "Pandas", "Matplotlib", "Streamlit"],
        team: "Data Science Team",
        status: "Completed",
        github: "https://github.com/gmucodingclub/course-analytics"
    }
};

// Code templates for different languages
const codeTemplates = {
    python: `# Welcome to our interactive code editor!
# Try writing some Python code below and click "Run" to see the output.

def greet(name):
    return f"Hello, {name}! Welcome to GMU Coding Club!"

# Example: Change the name below and run the code
print(greet("GMU Student"))`,

    c: `// Welcome to our interactive code editor!
// Try writing some C code below and click "Run" to see the output.

#include <stdio.h>

void greet(char name[]) {
    printf("Hello, %s! Welcome to GMU Coding Club!\\n", name);
}

int main() {
    // Example: Change the name below and run the code
    greet("GMU Student");
    return 0;
}`
};

// Current language
let currentLang = 'python';

// Custom Cursor Elements
const cursor = document.createElement('div');
const cursorFollower = document.createElement('div');
cursor.classList.add('cursor');
cursorFollower.classList.add('cursor-follower');
document.body.appendChild(cursor);
document.body.appendChild(cursorFollower);

// Scroll Indicator
const scrollIndicator = document.createElement('div');
scrollIndicator.classList.add('scroll-indicator');
scrollIndicator.innerHTML = '<i class="fas fa-chevron-up"></i>';
document.body.appendChild(scrollIndicator);

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes pageTransitionOut {
        0% {
            opacity: 1;
            transform: translateX(0) perspective(1000px) rotateY(0);
            filter: blur(0);
        }
        100% {
            opacity: 0;
            transform: translateX(-50px) perspective(1000px) rotateY(-10deg);
            filter: blur(5px);
        }
    }
    
    /* Custom cursor styles */
    .cursor {
        position: fixed;
        width: 8px;
        height: 8px;
        background: var(--secondary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    }
    
    .cursor-follower {
        position: fixed;
        width: 30px;
        height: 30px;
        border: 2px solid var(--secondary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: all 0.15s ease;
    }
    
    .cursor.hover, .cursor-follower.hover {
        transform: scale(1.5);
        background: rgba(52, 152, 219, 0.3);
    }
    
    .cursor.click, .cursor-follower.click {
        transform: scale(0.8);
    }
    
    .click-effect {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--secondary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9997;
        animation: clickAnimation 0.6s ease-out forwards;
    }
    
    @keyframes clickAnimation {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
    
    .particle-burst {
        position: fixed;
        pointer-events: none;
        z-index: 9996;
    }
    
    .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--accent);
        border-radius: 50%;
        animation: particleMove 1s ease-out forwards;
    }
    
    @keyframes particleMove {
        0% {
            transform: translate(0, 0);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx), var(--ty));
            opacity: 0;
        }
    }
    
    .scroll-indicator {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--secondary);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        transform: rotate(180deg);
    }
    
    .scroll-indicator.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-indicator:hover {
        transform: rotate(180deg) scale(1.1);
        background: var(--accent);
    }
    
    /* Grand entrance animations */
    .grand-entrance {
        animation: grandEntrance 0.8s ease-out forwards;
    }
    
    @keyframes grandEntrance {
        0% {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .subdivision-entrance {
        animation: subdivisionEntrance 0.6s ease-out 0.3s both;
    }
    
    @keyframes subdivisionEntrance {
        0% {
            opacity: 0;
            transform: translateX(-30px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    /* Dropdown enhancements */
    .dropdown-content {
        transition: all 0.3s ease;
    }
    
    .dropdown:hover .dropdown-content {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    /* Mobile dropdown */
    @media (max-width: 768px) {
        .dropdown.active .dropdown-content {
            display: block;
            position: static;
            opacity: 1;
            visibility: visible;
            transform: none;
            box-shadow: none;
            background: transparent;
        }
    }
`;
document.head.appendChild(style);

// Cursor Hover Effects
const hoverElements = document.querySelectorAll('a, button, .btn, .nav-links > li > a, .dropdown-content a');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});
// Click Effects
document.addEventListener('click', (e) => {
    // Cursor click animation
    cursor.classList.add('click');
    cursorFollower.classList.add('click');
    setTimeout(() => {
        cursor.classList.remove('click');
        cursorFollower.classList.remove('click');
    }, 300);

    // Create click effect
    const clickEffect = document.createElement('div');
    clickEffect.classList.add('click-effect');
    clickEffect.style.left = e.clientX + 'px';
    clickEffect.style.top = e.clientY + 'px';
    document.body.appendChild(clickEffect);
    
    setTimeout(() => {
        clickEffect.remove();
    }, 600);

    // Create particle burst
    createParticleBurst(e.clientX, e.clientY);
});

function createParticleBurst(x, y) {
    const particles = 12;
    const burst = document.createElement('div');
    burst.classList.add('particle-burst');
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const angle = (i / particles) * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        burst.appendChild(particle);
    }
    
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 1000);
}



// Grand Opening Animations
function initializeGrandOpenings() {
    // Add grand entrance class to main sections
    const mainSections = document.querySelectorAll('.page-section');
    mainSections.forEach(section => {
        section.classList.add('grand-entrance');
    });

    // Add subdivision animations
    const subdivisions = document.querySelectorAll('.about-content, .events-grid, .projects-grid, .resources-grid, .contact-content');
    subdivisions.forEach(sub => {
        sub.classList.add('subdivision-entrance');
    });
}

// Navigation functionality
function showPage(pageId) {
    // Add exit animation to current page
    const currentPage = document.querySelector('.page-section.active');
    if (currentPage) {
        currentPage.style.animation = 'pageTransitionOut 0.5s ease-out forwards';
    }
    
    // Switch page after animation
    setTimeout(() => {
        // Hide all pages
        pageSections.forEach(section => {
            section.classList.remove('active');
            section.style.animation = '';
        });
        
        // Show target page
        document.getElementById(pageId).classList.add('active');
        
        // Update active nav link
        navItems.forEach(navItem => {
            navItem.classList.remove('active');
        });
        
        // Set active class to the clicked link
        const activeLink = document.querySelector(`[data-page="${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Re-initialize animations
        initializeGrandOpenings();
        
        // Close mobile menu if open
        navLinks.classList.remove('active');
        
        // Close all dropdowns on mobile
        if (window.innerWidth <= 768) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeGrandOpenings();
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        // Scroll indicator visibility
        if (window.scrollY > 500) {
            scrollIndicator.classList.add('visible');
        } else {
            scrollIndicator.classList.remove('visible');
        }
    });

    // Scroll indicator click
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Navigation functionality
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            showPage(targetPage);
        });
    });

    // Handle "Join Now" and "Upcoming Events" buttons on home page
    const heroButtons = document.querySelectorAll('.hero-btns a');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            if (pageId) {
                showPage(pageId);
            }
        });
    });

    // Dropdown functionality for desktop
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.classList.add('active');
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.classList.remove('active');
            }
        });
    });

    // Mobile dropdown functionality
    if (window.innerWidth <= 768) {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            link.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            if (window.innerWidth <= 768) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });

    // Registration form submission
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                semester: document.getElementById('semester').value,
                year: document.getElementById('year').value,
                interests: document.getElementById('interests').value
            };
            
            // Display registration details
            const detailsContainer = document.getElementById('registration-details');
            detailsContainer.innerHTML = `
                <h3>Your Registration Details:</h3>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Semester:</strong> ${formData.semester}</p>
                <p><strong>Year:</strong> ${formData.year}</p>
                <p><strong>Interests:</strong> ${formData.interests || 'Not specified'}</p>
            `;
            
            // Show success modal
            document.getElementById('success-modal').style.display = 'block';
            
            // Reset form
            registrationForm.reset();
        });
    }

    // Code editor functionality
    runCodeBtn.addEventListener('click', function() {
        try {
            let code = codeEditor.textContent;
            let result = '';
            
            if (currentLang === 'python') {
                result = executePython(code);
            } else if (currentLang === 'c') {
                result = executeC(code);
            }
            
            // Display output
            output.textContent = result || 'Code executed successfully (no output)';
        } catch (error) {
            output.textContent = 'Error: ' + error.message;
        }
    });

    resetCodeBtn.addEventListener('click', function() {
        codeEditor.textContent = codeTemplates[currentLang];
        output.textContent = '';
    });

    // Language selector
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            
            // Update active button
            langBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update editor content
            currentLang = lang;
            codeEditor.textContent = codeTemplates[lang];
            currentLangDisplay.textContent = lang === 'python' ? 'Python Playground' : 'C Programming Playground';
            output.textContent = '';
        });
    });

    // Modal functionality
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.dataset.event) {
                const eventId = this.dataset.event;
                showEventModal(eventId);
            } else if (this.dataset.project) {
                const projectId = this.dataset.project;
                showProjectModal(projectId);
            }
        });
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    // Initialize code editor with Python
    codeEditor.textContent = codeTemplates.python;
});

// Functions
function showEventModal(eventId) {
    const event = events[eventId];
    const modal = document.getElementById('event-modal');
    const title = document.getElementById('event-modal-title');
    const body = document.getElementById('event-modal-body');
    
    title.textContent = event.title;
    body.innerHTML = `
        <div style="margin-bottom: 20px;">
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Instructor:</strong> ${event.instructor}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <h3>Description</h3>
            <p>${event.description}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <h3>Details</h3>
            <p>${event.details}</p>
        </div>
        <div>
            <h3>Requirements</h3>
            <p>${event.requirements}</p>
        </div>
    `;
    
    modal.style.display = 'block';
}

function showProjectModal(projectId) {
    const project = projects[projectId];
    const modal = document.getElementById('project-modal');
    const title = document.getElementById('project-modal-title');
    const body = document.getElementById('project-modal-body');
    
    title.textContent = project.title;
    body.innerHTML = `
        <div style="margin-bottom: 20px;">
            <p><strong>Status:</strong> ${project.status}</p>
            <p><strong>Team:</strong> ${project.team}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <h3>Description</h3>
            <p>${project.description}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <h3>Project Details</h3>
            <p>${project.details}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <h3>Technologies</h3>
            <div class="project-tags">
                ${project.technologies.map(tech => `<span class="project-tag">${tech}</span>`).join('')}
            </div>
        </div>
        <div>
            <a href="${project.github}" class="btn" target="_blank"><i class="fab fa-github"></i> View on GitHub</a>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Simple Python interpreter simulation
function executePython(code) {
    let output = '';
    const printStatements = code.match(/print\(([^)]+)\)/g) || [];
    
    printStatements.forEach(statement => {
        const content = statement.match(/print\(([^)]+)\)/)[1];
        
        try {
            if (content.includes('+')) {
                const parts = content.split('+').map(part => part.trim().replace(/'|"/g, ''));
                output += parts.join('') + '\n';
            } else if (content.includes('f"')) {
                const match = content.match(/f"([^"]+)"/);
                if (match) {
                    output += match[1].replace(/\{([^}]+)\}/g, (match, p1) => {
                        return `[${p1}]`;
                    }) + '\n';
                }
            } else {
                output += content.replace(/'|"/g, '') + '\n';
            }
        } catch (e) {
            output += `Error in print statement: ${e.message}\n`;
        }
    });
    
    const functionCalls = code.match(/(\w+)\([^)]*\)/g) || [];
    functionCalls.forEach(call => {
        if (!call.startsWith('print')) {
            output += `Function called: ${call}\n`;
        }
    });
    
    return output || 'Code executed (output simulation)';
}

// Simple C interpreter simulation
function executeC(code) {
    let output = '';
    const printfStatements = code.match(/printf\([^)]+\);/g) || [];
    
    printfStatements.forEach(statement => {
        const formatMatch = statement.match(/printf\(([^,]+)/);
        if (formatMatch) {
            const format = formatMatch[1].replace(/'|"/g, '');
            const vars = statement.match(/%s|%d|%c/g) || [];
            let result = format;
            vars.forEach((v, i) => {
                result = result.replace(v, `[var${i+1}]`);
            });
            output += result + '\n';
        }
    });
    
    const functionCalls = code.match(/(\w+)\([^)]*\);/g) || [];
    functionCalls.forEach(call => {
        if (!call.startsWith('printf')) {
            output += `Function called: ${call}\n`;
        }
    });
    
    return output || 'Code executed (output simulation)';
}

// Handle window resize for responsive dropdown behavior
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        // Reset mobile dropdown states on desktop
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        navLinks.classList.remove('active');
    }
});