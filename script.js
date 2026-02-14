/* Configuration Data */
const careerDB = {
    "Engineering": {
        duration: "4 Years",
        exam: "JEE Advanced",
        examDesc: "The toughest engineering entrance exam unlocking the IITs.",
        jobs: [
            { title: "AI Engineer", salary: "$120k", icon: "fa-robot" },
            { title: "Robotics Architect", salary: "$95k", icon: "fa-cogs" },
            { title: "Software Dev", salary: "$100k", icon: "fa-laptop-code" }
        ],
        skills: ["Algorithms", "System Design", "Mathematics", "Problem Solving"],
        workplaces: ["Google HQ", "Tesla GigaFactory", "NASA JPL"]
    },
    "MBBS": {
        duration: "5.5 Years + Internship",
        exam: "NEET UG/PG",
        examDesc: "The gateway to saving lives and medical mastery.",
        jobs: [
            { title: "Neurosurgeon", salary: "$300k", icon: "fa-brain" },
            { title: "Cardiologist", salary: "$250k", icon: "fa-heartbeat" },
            { title: "Medical Officer", salary: "$100k", icon: "fa-user-md" }
        ],
        skills: ["Anatomy", "Diagnostics", "Patient Care", "Steady Hands"],
        workplaces: ["Mayo Clinic", "AIIMS", "Red Cross"]
    },
    "MBA": {
        duration: "2 Years",
        exam: "CAT / GMAT",
        examDesc: "Test of aptitude, data interpretation, and verbal ability.",
        jobs: [
            { title: "CEO", salary: "$500k+", icon: "fa-user-tie" },
            { title: "Strategy Consultant", salary: "$140k", icon: "fa-chess" },
            { title: "Product Manager", salary: "$130k", icon: "fa-box-open" }
        ],
        skills: ["Leadership", "Market Analysis", "Finance", "Negotiation"],
        workplaces: ["Wall Street", "Silicon Valley", "McKinsey"]
    },
    "Law": {
        duration: "5 Years (Integrated)",
        exam: "CLAT",
        examDesc: "Evaluates legal aptitude and logical reasoning.",
        jobs: [
            { title: "Corporate Counsel", salary: "$150k", icon: "fa-balance-scale" },
            { title: "Judge", salary: "$100k", icon: "fa-gavel" },
            { title: "Human Rights Lawyer", salary: "$80k", icon: "fa-globe" }
        ],
        skills: ["Debating", "Constitutional Law", "Critical Thinking", "Writing"],
        workplaces: ["Supreme Court", "United Nations", "Top Law Firms"]
    },
    "Arts": {
        duration: "3-4 Years",
        exam: "Portfolio Review",
        examDesc: "Showcase of creativity and theoretical knowledge.",
        jobs: [
            { title: "Creative Director", salary: "$110k", icon: "fa-paint-brush" },
            { title: "Journalist", salary: "$70k", icon: "fa-newspaper" },
            { title: "Psychologist", salary: "$90k", icon: "fa-user-friends" }
        ],
        skills: ["Empathy", "Storytelling", "Design Theory", "Observation"],
        workplaces: ["Media Houses", "Art Galleries", "Private Practice"]
    },
    "Design": {
        duration: "4 Years",
        exam: "NID / UCEED",
        examDesc: "For the creative minds shaping the future of products.",
        jobs: [
            { title: "UX Researcher", salary: "$95k", icon: "fa-search" },
            { title: "Product Designer", salary: "$105k", icon: "fa-layer-group" },
            { title: "Animator", salary: "$80k", icon: "fa-video" }
        ],
        skills: ["Figma/Sketch", "User Research", "Prototyping", "Color Theory"],
        workplaces: ["Apple Design Studio", "Pixar", "IDEO"]
    },
    "DataScience": {
        duration: "4 Years",
        exam: "Statistics & CS Entrances",
        examDesc: "Focus on math, logic, and computational thinking.",
        jobs: [
            { title: "Data Scientist", salary: "$130k", icon: "fa-poll" },
            { title: "ML Engineer", salary: "$140k", icon: "fa-microchip" },
            { title: "Big Data Architect", salary: "$125k", icon: "fa-server" }
        ],
        skills: ["Python", "TensorFlow", "Statistics", "Data Viz"],
        workplaces: ["OpenAI", "Deepmind", "Financial Tech"]
    },
    "Pilot": {
        duration: "18-24 Months",
        exam: "Cadet Pilot Program",
        examDesc: "Physical fitness, physics, and psychometric coordination.",
        jobs: [
            { title: "Airline Captain", salary: "$200k", icon: "fa-plane" },
            { title: "First Officer", salary: "$80k", icon: "fa-plane-departure" },
            { title: "Test Pilot", salary: "$150k", icon: "fa-fighter-jet" }
        ],
        skills: ["Navigation", "Physics", "Crisis Management", "Communication"],
        workplaces: ["Emirates", "Delta Airlines", "Air Force"]
    },
    "Chef": {
        duration: "3 Years",
        exam: "Culinary Institute Entrance",
        examDesc: "Taste test and practical cooking skills.",
        jobs: [
            { title: "Executive Chef", salary: "$100k", icon: "fa-utensils" },
            { title: "Sous Chef", salary: "$60k", icon: "fa-bread-slice" },
            { title: "Food Critic", salary: "$70k", icon: "fa-pen-fancy" }
        ],
        skills: ["Palate Training", "Knife Skills", "Menu Design", "Speed"],
        workplaces: ["Michelin Star Restaurants", "Luxury Hotels", "Cruise Ships"]
    }
};

/* State Management */
let currentState = {
    step: 0,
    data: {}
};

const pages = [
    'welcome-page', 'basic-details-page', 'course-selection-page',
    'entrance-exam-page', 'institutions-page', 'job-opportunities-page',
    'skills-needed-page', 'workplace-page', 'review-page',
    'happiness-check-page', 'summary-page'
];

/* Initialization */
document.addEventListener('DOMContentLoaded', () => {
    typeWriterEffect();
});

function typeWriterEffect() {
    const text = "Discover. Plan. Achieve.";
    const element = document.getElementById('typing-text');
    let i = 0;

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    type();
}

/* Navigation System */
function nextPage(targetId) {
    // If targetId is provided, jump to it, else next in list
    if (!targetId) {
        const nextIdx = currentState.step + 1;
        if (nextIdx < pages.length) targetId = pages[nextIdx];
    }

    transitionTo(targetId);
}

function prevPage(targetId) {
    if (!targetId) {
        const prevIdx = currentState.step - 1;
        if (prevIdx >= 0) targetId = pages[prevIdx];
    }
    transitionTo(targetId);
}

function transitionTo(pageId) {
    // Validate existence
    const targetElement = document.getElementById(pageId);
    if (!targetElement) return;

    // Update State index
    currentState.step = pages.indexOf(pageId);

    // Run specific load logic
    runPageLogic(pageId);

    // UI Updates
    document.querySelectorAll('.view-section').forEach(el => {
        el.classList.remove('active');
    });

    setTimeout(() => {
        targetElement.classList.add('active');
        updateProgressBar();
    }, 100); // Slight delay for smoother feel
}

function updateProgressBar() {
    const progress = ((currentState.step) / (pages.length - 1)) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

function validateAndNext(currentId, nextId) {
    const section = document.getElementById(currentId);
    const inputs = section.querySelectorAll('input[required], select[required]');
    let valid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            valid = false;
            highlightError(input);
        } else {
            clearError(input);
        }
    });

    if (valid) {
        saveData(currentId);
        nextPage(nextId);
    }
}

function highlightError(element) {
    element.style.borderColor = "#ef4444";
    element.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.2)";
    // Shake animation
    element.style.transform = "translateX(5px)";
    setTimeout(() => element.style.transform = "translateX(0)", 100);
}

function clearError(element) {
    element.style.borderColor = "";
    element.style.boxShadow = "";
}

/* Data Logic */
function saveData(pageId) {
    if (pageId === 'basic-details-page') {
        currentState.data.name = document.getElementById('user-name').value;
        currentState.data.age = document.getElementById('user-age').value;
        currentState.data.education = document.getElementById('user-education').value;
    }
    else if (pageId === 'course-selection-page') {
        currentState.data.course = document.getElementById('selected-course').value;
    }
    else if (pageId === 'institutions-page') {
        currentState.data.location = document.getElementById('institution-location').value;
    }
    else if (pageId === 'workplace-page') {
        currentState.data.email = document.getElementById('user-email').value;
    }
}

function runPageLogic(pageId) {
    const course = document.getElementById('selected-course').value;
    const db = careerDB[course];

    if (pageId === 'entrance-exam-page' && db) {
        document.getElementById('exam-course-name').textContent = course;
        document.getElementById('exam-name').textContent = db.exam;
        document.getElementById('exam-desc').textContent = db.examDesc;
    }

    else if (pageId === 'institutions-page') {
        const list = document.getElementById('institution-list');
        list.innerHTML = '';
        // Simulating items
        const location = document.getElementById('institution-location').value || "Global";
        const items = [
            `National Institute of ${course}`,
            `Global ${course} University`,
            `${location} Institute of Technology`
        ];
        items.forEach(item => {
            list.innerHTML += `<div class="item-card"><strong>${item}</strong><br><small>Ranked Top 10</small></div>`;
        });
    }

    else if (pageId === 'job-opportunities-page' && db) {
        const container = document.getElementById('jobs-container');
        container.innerHTML = '';
        db.jobs.forEach(job => {
            container.innerHTML += `
                <div class="item-card" style="min-width: 200px; text-align: center;">
                    <i class="fas ${job.icon} fa-2x" style="color:var(--accent); margin-bottom:10px;"></i>
                    <h4>${job.title}</h4>
                    <p style="color:#10b981; margin:0; font-weight:bold;">${job.salary}</p>
                </div>
            `;
        });
    }

    else if (pageId === 'skills-needed-page' && db) {
        const container = document.getElementById('skills-container');
        container.innerHTML = '';
        db.skills.forEach(skill => {
            container.innerHTML += `<span class="pill">${skill}</span>`;
        });
    }

    else if (pageId === 'workplace-page' && db) {
        const list = document.getElementById('workplace-list');
        list.innerHTML = '';
        db.workplaces.forEach(wp => {
            list.innerHTML += `<div class="item-card"><i class="fas fa-building"></i> ${wp}</div>`;
        });
    }

    else if (pageId === 'review-page') {
        document.getElementById('review-name').textContent = currentState.data.name;
        document.getElementById('review-course').textContent = currentState.data.course;
        document.getElementById('review-exam').textContent = db ? db.exam : 'N/A';
        document.getElementById('review-location').textContent = currentState.data.location || 'Anywhere';
    }

    else if (pageId === 'summary-page') {
        document.getElementById('final-name').textContent = currentState.data.name;
        document.getElementById('final-title').textContent = currentState.data.course; // Using course as title generic
        document.getElementById('final-exam').textContent = db ? db.exam : '';
        document.getElementById('final-workplace').textContent = db ? db.workplaces[0] : '';
        launchConfetti();
    }
}

/* Event Hooks */
function updateCourseDetails() {
    const course = document.getElementById('selected-course').value;
    const db = careerDB[course];
    const insightBox = document.getElementById('course-insight');

    if (db) {
        insightBox.classList.remove('hidden');
        document.getElementById('duration-text').textContent = db.duration;
    } else {
        insightBox.classList.add('hidden');
    }
}

function debounceInstSearch() {
    // Simple mock update
    runPageLogic('institutions-page');
}

function resetToCourse() {
    document.getElementById('selected-course').value = "";
    updateCourseDetails();
    nextPage('course-selection-page');
}

function finishPlanner() {
    nextPage('summary-page');
}

/* Confetti (Simple Canvas Implementation) */
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#8b5cf6', '#f472b6', '#10b981', '#fbbf24'];

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 5 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 2,
            angle: Math.random() * Math.PI * 2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.y += p.speed;
            p.x += Math.sin(p.angle) * 2;
            if (p.y > canvas.height) p.y = -10;

            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}
