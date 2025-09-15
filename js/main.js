// Global variables
let currentDashboardTab = 'overview';
let currentBookingTab = 'instant';
let selectedExpert = null;
let selectedTimeSlot = null;

// Expert data
const experts = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "Medical Expert",
        category: "health",
        rating: 4.9,
        reviews: 324,
        status: "online",
        price: 45,
        bio: "Board-certified physician with 15+ years of experience in internal medicine and preventive care. Specializes in holistic health approaches.",
        skills: ["Internal Medicine", "Preventive Care", "Nutrition", "Lifestyle Medicine"],
        avatar: "https://picsum.photos/seed/sarah/80/80.jpg"
    },
    {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "Mental Health Counselor",
        category: "mental-health",
        rating: 4.8,
        reviews: 276,
        status: "busy",
        price: 55,
        bio: "Licensed therapist specializing in CBT, mindfulness, and stress management. Helps individuals achieve mental wellness and balance.",
        skills: ["CBT", "Mindfulness", "Stress Management", "Anxiety Treatment"],
        avatar: "https://picsum.photos/seed/michael/80/80.jpg"
    },
    {
        id: 3,
        name: "Sheikh Ahmed Hassan",
        specialty: "Islamic Scholar",
        category: "spiritual",
        rating: 5.0,
        reviews: 456,
        status: "online",
        price: 35,
        bio: "Renowned Islamic scholar with expertise in Quranic studies, Hadith, and Islamic spirituality. Provides guidance for faith-based living.",
        skills: ["Quranic Studies", "Hadith", "Islamic Spirituality", "Faith Counseling"],
        avatar: "https://picsum.photos/seed/ahmed/80/80.jpg"
    },
    {
        id: 4,
        name: "Emily Rodriguez",
        specialty: "Financial Advisor",
        category: "financial",
        rating: 4.7,
        reviews: 198,
        status: "online",
        price: 60,
        bio: "Certified financial planner with expertise in investment strategies, retirement planning, and wealth management for individuals and families.",
        skills: ["Investment Planning", "Retirement", "Wealth Management", "Tax Planning"],
        avatar: "https://picsum.photos/seed/emily/80/80.jpg"
    },
    {
        id: 5,
        name: "Robert Thompson",
        specialty: "Business Coach",
        category: "career",
        rating: 4.6,
        reviews: 234,
        status: "offline",
        price: 75,
        bio: "Executive coach and business strategist with 20+ years of experience helping entrepreneurs and professionals achieve their goals.",
        skills: ["Business Strategy", "Leadership", "Entrepreneurship", "Executive Coaching"],
        avatar: "https://picsum.photos/seed/robert/80/80.jpg"
    },
    {
        id: 6,
        name: "Lisa Wang",
        specialty: "Legal Consultant",
        category: "legal",
        rating: 4.8,
        reviews: 167,
        status: "online",
        price: 80,
        bio: "Experienced attorney specializing in business law, contracts, and compliance. Provides practical legal advice for individuals and businesses.",
        skills: ["Business Law", "Contracts", "Compliance", "Legal Consulting"],
        avatar: "https://picsum.photos/seed/lisa/80/80.jpg"
    },
    {
        id: 7,
        name: "Dr. James Wilson",
        specialty: "Educational Consultant",
        category: "education",
        rating: 4.5,
        reviews: 189,
        status: "busy",
        price: 50,
        bio: "Educational psychologist and learning specialist with expertise in curriculum development and personalized learning strategies.",
        skills: ["Educational Psychology", "Curriculum Development", "Learning Strategies", "Academic Coaching"],
        avatar: "https://picsum.photos/seed/james/80/80.jpg"
    },
    {
        id: 8,
        name: "Maria Garcia",
        specialty: "Relationship Counselor",
        category: "relationships",
        rating: 4.9,
        reviews: 267,
        status: "online",
        price: 65,
        bio: "Licensed marriage and family therapist specializing in relationship dynamics, communication skills, and family counseling.",
        skills: ["Marriage Counseling", "Family Therapy", "Communication Skills", "Relationship Dynamics"],
        avatar: "https://picsum.photos/seed/maria/80/80.jpg"
    },
    {
        id: 9,
        name: "David Kim",
        specialty: "IT Consultant",
        category: "technology",
        rating: 4.7,
        reviews: 145,
        status: "online",
        price: 70,
        bio: "Senior IT consultant with expertise in digital transformation, cybersecurity, and technology strategy for businesses.",
        skills: ["Digital Transformation", "Cybersecurity", "IT Strategy", "Technology Consulting"],
        avatar: "https://picsum.photos/seed/david/80/80.jpg"
    },
    {
        id: 10,
        name: "Jennifer Brown",
        specialty: "Real Estate Advisor",
        category: "real-estate",
        rating: 4.6,
        reviews: 178,
        status: "offline",
        price: 55,
        bio: "Licensed real estate broker and investment specialist with expertise in property investment and market analysis.",
        skills: ["Property Investment", "Market Analysis", "Real Estate Strategy", "Property Management"],
        avatar: "https://picsum.photos/seed/jennifer/80/80.jpg"
    },
    {
        id: 11,
        name: "Dr. Rachel Green",
        specialty: "Nutritionist",
        category: "nutrition",
        rating: 4.8,
        reviews: 234,
        status: "online",
        price: 45,
        bio: "Registered dietitian and nutritionist specializing in personalized nutrition plans, weight management, and dietary counseling.",
        skills: ["Nutrition Planning", "Weight Management", "Dietary Counseling", "Meal Planning"],
        avatar: "https://picsum.photos/seed/rachel/80/80.jpg"
    },
    {
        id: 12,
        name: "Mark Johnson",
        specialty: "Personal Trainer",
        category: "fitness",
        rating: 4.9,
        reviews: 289,
        status: "busy",
        price: 40,
        bio: "Certified personal trainer and fitness coach specializing in strength training, weight loss, and athletic performance.",
        skills: ["Strength Training", "Weight Loss", "Athletic Performance", "Fitness Coaching"],
        avatar: "https://picsum.photos/seed/mark/80/80.jpg"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Populate experts grid
    populateExpertsGrid();
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Welcome to AiBhai!', 'Your AI companion for holistic life development is ready to help.');
    }, 2000);
    
    // Add scroll animations
    addScrollAnimations();
});

// Expert functions
function populateExpertsGrid(filter = 'all') {
    const grid = document.getElementById('expertsGrid');
    grid.innerHTML = '';
    
    let filteredExperts = experts;
    
    if (filter !== 'all') {
        if (filter === 'available') {
            filteredExperts = experts.filter(expert => expert.status === 'online');
        } else if (filter === 'top-rated') {
            filteredExperts = experts.filter(expert => expert.rating >= 4.8);
        } else if (filter === 'new') {
            filteredExperts = experts.slice(-6);
        } else {
            filteredExperts = experts.filter(expert => expert.category === filter);
        }
    }
    
    filteredExperts.forEach(expert => {
        const expertCard = createExpertCard(expert);
        grid.appendChild(expertCard);
    });
}

function createExpertCard(expert) {
    const card = document.createElement('div');
    card.className = 'expert-card';
    
    const statusClass = `status-${expert.status}`;
    const statusText = expert.status.charAt(0).toUpperCase() + expert.status.slice(1);
    
    card.innerHTML = `
        <div class="expert-header">
            <img src="${expert.avatar}" alt="${expert.name}" class="expert-avatar">
            <div class="expert-info">
                <h3>${expert.name}</h3>
                <div class="expert-specialty">${expert.specialty}</div>
                <div class="expert-rating">
                    <div class="stars">${'★'.repeat(Math.floor(expert.rating))}</div>
                    <span>${expert.rating} (${expert.reviews} reviews)</span>
                </div>
                <div class="expert-status ${statusClass}">
                    <span style="width: 8px; height: 8px; background: currentColor; border-radius: 50%; display: inline-block; margin-right: 0.5rem;"></span>
                    ${statusText}
                </div>
            </div>
        </div>
        <div class="expert-bio">${expert.bio}</div>
        <div class="expert-skills">
            ${expert.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
        <div class="expert-actions">
            <button class="btn-book" onclick="showNotification('Booking System', 'Expert booking feature coming soon!')">Book Session</button>
            <button class="btn-profile" onclick="showNotification('Expert Profile', 'Expert profile feature coming soon!')">View Profile</button>
        </div>
        <div class="expert-availability">
            <div class="availability-info">30-minute session</div>
            <div class="consultation-price">£${expert.price}</div>
        </div>
    `;
    
    return card;
}

function filterExperts(category) {
    populateExpertsGrid(category);
    
    // Update filter buttons
    document.querySelectorAll('.filter-button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Form handlers
function handleLogin(event) {
    event.preventDefault();
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.innerHTML = '<div class="loading"></div> Logging in...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        closeModal('loginModal');
        showNotification('Login Successful!', 'Welcome back to your AiBhai dashboard.');
        showDashboard();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        event.target.reset();
    }, 2000);
}

function handleSignup(event) {
    event.preventDefault();
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.innerHTML = '<div class="loading"></div> Creating account...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        closeModal('signupModal');
        showNotification('Account Created!', 'Welcome to AiBhai! Start your journey to holistic development.');
        showDashboard();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        event.target.reset();
    }, 2000);
}

function handleContact(event) {
    event.preventDefault();
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.innerHTML = '<div class="loading"></div> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        closeModal('contactModal');
        showNotification('Message Sent!', 'Our sales team will contact you within 24 hours.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        event.target.reset();
    }, 2000);
}

// Dashboard functions
function showDashboard() {
    const dashboard = document.getElementById('dashboard');
    dashboard.classList.add('active');
    dashboard.scrollIntoView({ behavior: 'smooth' });
}

function switchDashboardTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.dashboard-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update content based on tab
    const content = document.querySelector('.dashboard-content');
    
    // Simulate different content for different tabs
    const tabContents = {
        overview: `
            <div class="dashboard-grid">
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">Daily Progress</div>
                        <div class="widget-icon">📊</div>
                    </div>
                    <div class="progress-tracker">
                        <div class="progress-steps">
                            <div class="progress-step">
                                <div class="step-circle completed">✓</div>
                                <div class="step-label">Morning Prayer</div>
                            </div>
                            <div class="progress-step">
                                <div class="step-circle completed">✓</div>
                                <div class="step-label">Exercise</div>
                            </div>
                            <div class="progress-step">
                                <div class="step-circle active">3</div>
                                <div class="step-label">Work Tasks</div>
                            </div>
                            <div class="progress-step">
                                <div class="step-circle">4</div>
                                <div class="step-label">Learning</div>
                            </div>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 60%;"></div>
                        </div>
                    </div>
                </div>
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">Wellness Score</div>
                        <div class="widget-icon">💪</div>
                    </div>
                    <div style="text-align: center; padding: 1rem;">
                        <div style="font-size: 3rem; font-weight: 800; background: linear-gradient(135deg, #00ffcc 0%, #ffcc00 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">85%</div>
                        <div style="color: #e0e0e0;">Great job today!</div>
                    </div>
                </div>
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">Upcoming Tasks</div>
                        <div class="widget-icon">📋</div>
                    </div>
                    <ul style="list-style: none;">
                        <li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">Team meeting at 2:00 PM</li>
                        <li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">Review project proposal</li>
                        <li style="padding: 0.5rem 0;">Evening prayer reminder</li>
                    </ul>
                </div>
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">Expert Consultations</div>
                        <div class="widget-icon">👥</div>
                    </div>
                    <div style="text-align: center; padding: 1rem;">
                        <div style="font-size: 2rem; margin: 1rem 0;">3/5</div>
                        <div style="color: #e0e0e0;">Used this month</div>
                        <button class="btn-primary" style="margin-top: 1rem; padding: 0.5rem 1rem; font-size: 0.9rem;" onclick="scrollToSection('expert-consultation')">Book Expert</button>
                    </div>
                </div>
            </div>
        `,
        health: `
            <div class="dashboard-grid">
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">Health Metrics</div>
                        <div class="widget-icon">❤️</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; margin: 1rem 0;">7,234</div>
                        <div style="color: #e0e0e0;">Steps today</div>
                    </div>
                </div>
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">Sleep Quality</div>
                        <div class="widget-icon">😴</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; margin: 1rem 0;">8.2h</div>
                        <div style="color: #e0e0e0;">Average sleep</div>
                    </div>
                </div>
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">Nutrition</div>
                        <div class="widget-icon">🥗</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; margin: 1rem 0;">1,850</div>
                        <div style="color: #e0e0e0;">Calories today</div>
                    </div>
                </div>
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">Mental Wellness</div>
                        <div class="widget-icon">🧠</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; margin: 1rem 0;">92%</div>
                        <div style="color: #e0e0e0;">Mood score</div>
                    </div>
                </div>
            </div>
        `,
        spiritual: `
            <div class="dashboard-grid">
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">Prayer Times</div>
                        <div class="widget-icon">🕌</div>
                    </div>
                    <ul style="list-style: none;">
                        <li style="padding: 0.5rem 0;">Fajr: 5:30 AM</li>
                        <li style="padding: 0.5rem 0;">Dhuhr: 1:15 PM</li>
                        <li style="padding: 0.5rem 0;">Asr: 4:45 PM</li>
                        <li style="padding: 0.5rem 0;">Maghrib: 7:30 PM</li>
                        <li style="padding: 0.5rem 0;">Isha: 9:00 PM</li>
                    </ul>
                </div>
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">Quran Progress</div>
                        <div class="widget-icon">📖</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; margin: 1rem 0;">15</div>
                        <div style="color: #e0e0e0;">Juz completed</div>
                    </div>
                </div>
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">Dhikr Counter</div>
                        <div class="widget-icon">📿</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; margin: 1rem 0;">334</div>
                        <div style="color: #e0e0e0;">Today's count</div>
                    </div>
                </div>
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">Spiritual Goals</div>
                        <div class="widget-icon">🎯</div>
                    </div>
                    <ul style="list-style: none;">
                        <li style="padding: 0.5rem 0;">✓ Morning adhkar</li>
                        <li style="padding: 0.5rem 0;">✓ Quran reading</li>
                        <li style="padding: 0.5rem 0;">○ Evening reflection</li>
                    </ul>
                </div>
            </div>
        `,
        productivity: `
            <div class="dashboard-grid">
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">Today's Tasks</div>
                        <div class="widget-icon">✅</div>
                    </div>
                    <ul style="list-style: none;">
                        <li style="padding: 0.5rem 0;">✓ Morning routine</li>
                        <li style="padding: 0.5rem 0;">✓ Team standup</li>
                        <li style="padding: 0.5rem 0;">○ Project review</li>
                        <li style="padding: 0.5rem 0;">○ Client meeting</li>
                    </ul>
                </div>
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">Focus Time</div>
                        <div class="widget-icon">⏰</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; margin: 1rem 0;">4.5h</div>
                        <div style="color: #e0e0e0;">Deep work today</div>
                    </div>
                </div>
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">Habits</div>
                        <div class="widget-icon">🔄</div>
                    </div>
                    <ul style="list-style: none;">
                        <li style="padding: 0.5rem 0;">✓ Exercise</li>
                        <li style="padding: 0.5rem 0;">✓ Reading</li>
                        <li style="padding: 0.5rem 0;">✓ Meditation</li>
                        <li style="padding: 0.5rem 0;">○ Journaling</li>
                    </ul>
                </div>
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">Goals Progress</div>
                        <div class="widget-icon">🎯</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; margin: 1rem 0;">78%</div>
                        <div style="color: #e0e0e0;">Monthly goals</div>
                    </div>
                </div>
            </div>
        `,
        finance: `
            <div class="dashboard-grid">
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">Budget Overview</div>
                        <div class="widget-icon">💳</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; margin: 1rem 0;">£2,450</div>
                        <div style="color: #e0e0e0;">Remaining this month</div>
                    </div>
                </div>
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">Savings Goal</div>
                        <div class="widget-icon">🏦</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; margin: 1rem 0;">68%</div>
                        <div style="color: #e0e0e0;">Of £10,000 goal</div>
                    </div>
                </div>
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">Investments</div>
                        <div class="widget-icon">📈</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; margin: 1rem 0;">+15%</div>
                        <div style="color: #4caf50;">Portfolio growth</div>
                    </div>
                </div>
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">Expenses</div>
                        <div class="widget-icon">📊</div>
                    </div>
                    <ul style="list-style: none;">
                        <li style="padding: 0.5rem 0;">Food: £450</li>
                        <li style="padding: 0.5rem 0;">Transport: £200</li>
                        <li style="padding: 0.5rem 0;">Utilities: £300</li>
                        <li style="padding: 0.5rem 0;">Other: £600</li>
                    </ul>
                </div>
            </div>
        `,
        experts: `
            <div class="dashboard-grid">
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">My Expert Sessions</div>
                        <div class="widget-icon">👥</div>
                    </div>
                    <ul style="list-style: none;">
                        <li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                            <div style="font-weight: 600;">Dr. Sarah Johnson</div>
                            <div style="font-size: 0.9rem; color: #e0e0e0;">Medical Consultation - Tomorrow 2:00 PM</div>
                        </li>
                        <li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                            <div style="font-weight: 600;">Sheikh Ahmed Hassan</div>
                            <div style="font-size: 0.9rem; color: #e0e0e0;">Spiritual Guidance - Friday 4:00 PM</div>
                        </li>
                        <li style="padding: 0.5rem 0;">
                            <div style="font-weight: 600;">Emily Rodriguez</div>
                            <div style="font-size: 0.9rem; color: #e0e0e0;">Financial Planning - Next Week</div>
                        </li>
                    </ul>
                </div>
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">Session History</div>
                        <div class="widget-icon">📚</div>
                    </div>
                    <ul style="list-style: none;">
                        <li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                            <div style="font-weight: 600;">Dr. Michael Chen</div>
                            <div style="font-size: 0.9rem; color: #e0e0e0;">Mental Health - Completed</div>
                        </li>
                        <li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                            <div style="font-weight: 600;">Robert Thompson</div>
                            <div style="font-size: 0.9rem; color: #e0e0e0;">Business Coaching - Completed</div>
                        </li>
                        <li style="padding: 0.5rem 0;">
                            <div style="font-weight: 600;">Maria Garcia</div>
                            <div style="font-size: 0.9rem; color: #e0e0e0;">Relationship Counseling - Completed</div>
                        </li>
                    </ul>
                </div>
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">Available Sessions</div>
                        <div class="widget-icon">🎟️</div>
                    </div>
                    <div style="text-align: center; padding: 1rem;">
                        <div style="font-size: 2rem; margin: 1rem 0;">2</div>
                        <div style="color: #e0e0e0;">Remaining this month</div>
                        <button class="btn-primary" style="margin-top: 1rem; padding: 0.5rem 1rem; font-size: 0.9rem;" onclick="scrollToSection('expert-consultation')">Book More</button>
                    </div>
                </div>
                <div class="dashboard-widget">
                    <div class="widget-header">
                        <div class="widget-title">Favorite Experts</div>
                        <div class="widget-icon">⭐</div>
                    </div>
                    <ul style="list-style: none;">
                        <li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                            <div style="font-weight: 600;">Dr. Sarah Johnson</div>
                            <div style="font-size: 0.9rem; color: #00ffcc;">Medical Expert</div>
                        </li>
                        <li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                            <div style="font-weight: 600;">Sheikh Ahmed Hassan</div>
                            <div style="font-size: 0.9rem; color: #00ffcc;">Islamic Scholar</div>
                        </li>
                        <li style="padding: 0.5rem 0;">
                            <div style="font-weight: 600;">Emily Rodriguez</div>
                            <div style="font-size: 0.9rem; color: #00ffcc;">Financial Advisor</div>
                        </li>
                    </ul>
                </div>
            </div>
        `
    };
    
    content.innerHTML = tabContents[tabName] || tabContents.overview;
    currentDashboardTab = tabName;
}

// Chat interface functions
function toggleChat() {
    const chatInterface = document.getElementById('chatInterface');
    const chatToggle = document.getElementById('chatToggle');
    
    if (chatInterface.classList.contains('active')) {
        chatInterface.classList.remove('active');
        chatToggle.innerHTML = '💬';
    } else {
        chatInterface.classList.add('active');
        chatToggle.innerHTML = '✕';
    }
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function showNotification(title, message) {
    const notification = document.getElementById('notification');
    const notificationTitle = document.querySelector('.notification-title');
    const notificationMessage = document.querySelector('.notification-message');
    
    notificationTitle.textContent = title;
    notificationMessage.textContent = message;
    
    notification.classList.add('show');
    
    setTimeout(() => {
        hideNotification();
    }, 5000);
}

function hideNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('show');
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 15, 25, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(15, 15, 25, 0.8)';
        header.style.boxShadow = 'none';
    }
});

// Add scroll animations
function addScrollAnimations() {
    // Animate cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards
    document.querySelectorAll('.service-card, .feature-card, .pricing-card, .testimonial-card, .expert-card, .expert-category-card, .why-choose-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}