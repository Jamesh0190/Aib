// AiBhai Main JavaScript File

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize App
function initializeApp() {
    setupSmoothScrolling();
    setupNavbarScrollEffect();
    setupAnimations();
    setupMobileMenu();
    setupInteractiveDemoChat();
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar background change on scroll
function setupNavbarScrollEffect() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// Setup intersection observer for animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe cards and sections
    const elementsToAnimate = document.querySelectorAll('.feature-card, .pricing-card, .interface-content');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Mobile menu functionality
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-open');
            const icon = mobileToggle.querySelector('i');
            
            if (navLinks.classList.contains('mobile-open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'white';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                navLinks.style.display = 'none';
            }
        });
        
        // Close mobile menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('mobile-open');
                navLinks.style.display = 'none';
                mobileToggle.querySelector('i').classList.remove('fa-times');
                mobileToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }
}

// Interactive demo chat
function setupInteractiveDemoChat() {
    setTimeout(() => {
        const demoChat = document.getElementById('demoChat');
        if (demoChat) {
            const newMessage = document.createElement('div');
            newMessage.className = 'message ai';
            newMessage.innerHTML = 'I can help you with goal setting, habit formation, spiritual practices, financial planning, and much more. What interests you most?';
            demoChat.appendChild(newMessage);
            demoChat.scrollTop = demoChat.scrollHeight;
        }
    }, 5000);
}

// Modal Functions
function showModal(title, content) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    modalTitle.textContent = title;
    if (content) {
        modalContent.innerHTML = content;
    }
    modal.style.display = 'flex';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showLogin() {
    showModal('Welcome Back');
    document.getElementById('modalContent').innerHTML = `
        <p>Sign in to continue your growth journey with AiBhai.</p>
        <form onsubmit="handleLogin(event)" style="margin-top: 1.5rem;">
            <input type="email" placeholder="Email address" required style="width: 100%; padding: 1rem; border: 2px solid var(--border); border-radius: 10px; margin-bottom: 1rem;">
            <input type="password" placeholder="Password" required style="width: 100%; padding: 1rem; border: 2px solid var(--border); border-radius: 10px; margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <label style="display: flex; align-items: center; color: var(--text-secondary); font-size: 0.9rem;">
                    <input type="checkbox" style="margin-right: 0.5rem;"> Remember me
                </label>
                <a href="#" style="color: var(--primary); text-decoration: none; font-size: 0.9rem;">Forgot password?</a>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Sign In</button>
            <p style="text-align: center; margin-top: 1rem; color: var(--text-secondary);">
                Don't have an account? <a href="#" onclick="startTrial()" style="color: var(--primary);">Sign up free</a>
            </p>
        </form>
    `;
}

function startTrial() {
    showModal('Start Your Free Trial');
    document.getElementById('modalContent').innerHTML = `
        <p>Join thousands of people already growing with AiBhai. Start your free trial today!</p>
        <form onsubmit="handleSignup(event)" style="margin-top: 1.5rem;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <input type="text" placeholder="First name" required style="padding: 1rem; border: 2px solid var(--border); border-radius: 10px;">
                <input type="text" placeholder="Last name" required style="padding: 1rem; border: 2px solid var(--border); border-radius: 10px;">
            </div>
            <input type="email" placeholder="Email address" required style="width: 100%; padding: 1rem; border: 2px solid var(--border); border-radius: 10px; margin-bottom: 1rem;">
            <input type="password" placeholder="Create password" required style="width: 100%; padding: 1rem; border: 2px solid var(--border); border-radius: 10px; margin-bottom: 1rem;">
            <select required style="width: 100%; padding: 1rem; border: 2px solid var(--border); border-radius: 10px; margin-bottom: 1rem;">
                <option value="">What's your main focus?</option>
                <option>Personal Development</option>
                <option>Spiritual Growth</option>
                <option>Health & Wellness</option>
                <option>Business & Career</option>
                <option>Financial Planning</option>
                <option>Overall Life Improvement</option>
            </select>
            <label style="display: flex; align-items: flex-start; margin-bottom: 1rem; color: var(--text-secondary); font-size: 0.9rem;">
                <input type="checkbox" required style="margin-right: 0.5rem; margin-top: 0.2rem;">
                I agree to the <a href="#" style="color: var(--primary);">Terms of Service</a> and <a href="#" style="color: var(--primary);">Privacy Policy</a>
            </label>
            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Start Free Trial</button>
            <p style="text-align: center; margin-top: 1rem; color: var(--text-secondary); font-size: 0.9rem;">
                Already have an account? <a href="#" onclick="showLogin()" style="color: var(--primary);">Sign in</a>
            </p>
        </form>
    `;
}

function selectPlan(plan) {
    const planNames = {
        'free': 'Free Plan',
        'basic': 'Basic Plan - £4.99/month',
        'pro': 'Pro Plan - £9.99/month'
    };
    
    const planDescriptions = {
        'free': 'Perfect for getting started with AiBhai!',
        'basic': 'Great for personal growth enthusiasts!',
        'pro': 'The complete AI life companion experience!'
    };
    
    showModal(`Get Started with ${planNames[plan]}`);
    document.getElementById('modalContent').innerHTML = `
        <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: 10px; margin-bottom: 1.5rem;">
            <h4 style="margin-bottom: 0.5rem;">${planNames[plan]}</h4>
            <p style="color: var(--text-secondary); margin: 0;">${planDescriptions[plan]}</p>
        </div>
        <form onsubmit="handlePlanSelection(event, '${plan}')" style="margin-top: 1.5rem;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <input type="text" placeholder="First name" required style="padding: 1rem; border: 2px solid var(--border); border-radius: 10px;">
                <input type="text" placeholder="Last name" required style="padding: 1rem; border: 2px solid var(--border); border-radius: 10px;">
            </div>
            <input type="email" placeholder="Email address" required style="width: 100%; padding: 1rem; border: 2px solid var(--border); border-radius: 10px; margin-bottom: 1rem;">
            ${plan !== 'free' ? `
                <div style="background: #f8f9fa; padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
                    <h5 style="margin-bottom: 0.5rem;">Payment Information</h5>
                    <input type="text" placeholder="Card number" required style="width: 100%; padding: 1rem; border: 2px solid var(--border); border-radius: 10px; margin-bottom: 1rem;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
                        <input type="text" placeholder="MM/YY" required style="padding: 1rem; border: 2px solid var(--border); border-radius: 10px;">
                        <input type="text" placeholder="CVC" required style="padding: 1rem; border: 2px solid var(--border); border-radius: 10px;">
                        <input type="text" placeholder="ZIP" required style="padding: 1rem; border: 2px solid var(--border); border-radius: 10px;">
                    </div>
                </div>
            ` : ''}
            <label style="display: flex; align-items: flex-start; margin-bottom: 1rem; color: var(--text-secondary); font-size: 0.9rem;">
                <input type="checkbox" required style="margin-right: 0.5rem; margin-top: 0.2rem;">
                I agree to the <a href="#" style="color: var(--primary);">Terms of Service</a> and <a href="#" style="color: var(--primary);">Privacy Policy</a>
            </label>
            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                ${plan === 'free' ? 'Get Started Free' : 'Start Subscription'}
            </button>
        </form>
    `;
}

function openDemo() {
    showModal('AiBhai Demo');
    document.getElementById('modalContent').innerHTML = `
        <div style="border: 2px solid var(--border); border-radius: 15px; height: 400px; overflow: hidden;">
            <div style="background: var(--primary); color: white; padding: 1rem; display: flex; align-items: center; gap: 1rem;">
                <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-robot"></i>
                </div>
                <div>
                    <h4>AiBhai Demo</h4>
                    <p style="font-size: 0.9rem; opacity: 0.9; margin: 0;">Try our AI assistant</p>
                </div>
            </div>
            <div id="demoMessages" style="padding: 1rem; height: 270px; overflow-y: auto; background: white;">
                <div style="background: var(--bg-secondary); padding: 0.75rem 1rem; border-radius: 15px; margin-bottom: 1rem; max-width: 80%;">
                    Hello! I'm AiBhai, your AI life companion. I can help with planning, wellness, spiritual guidance, and much more. What would you like to explore today?
                </div>
            </div>
            <div style="padding: 1rem; border-top: 1px solid var(--border); display: flex; gap: 0.5rem;">
                <input type="text" id="demoInput" placeholder="Ask me anything..." style="flex: 1; padding: 0.75rem; border: 1px solid var(--border); border-radius: 25px;" onkeypress="handleDemoEnter(event)">
                <button onclick="sendDemoMessage()" style="background: var(--primary); color: white; border: none; padding: 0.75rem 1rem; border-radius: 25px; cursor: pointer; min-width: 45px;">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
        <p style="text-align: center; margin-top: 1rem; color: var(--text-secondary); font-size: 0.9rem;">
            This is a demo. <a href="#" onclick="startTrial()" style="color: var(--primary);">Sign up</a> to access the full AI assistant.
        </p>
    `;
}

function handleDemoEnter(event) {
    if (event.key === 'Enter') {
        sendDemoMessage();
    }
}

function sendDemoMessage() {
    const input = document.getElementById('demoInput');
    const messages = document.getElementById('demoMessages');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    const userDiv = document.createElement('div');
    userDiv.style.cssText = 'background: var(--primary); color: white; padding: 0.75rem 1rem; border-radius: 15px; margin-bottom: 1rem; max-width: 80%; margin-left: auto;';
    userDiv.textContent = message;
    messages.appendChild(userDiv);
    
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
    
    // Show typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.style.cssText = 'justify-content: flex-start; margin-bottom: 1rem;';
    typingDiv.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    messages.appendChild(typingDiv);
    messages.scrollTop = messages.scrollHeight;
    
    // Simulate AI response
    setTimeout(() => {
        messages.removeChild(typingDiv);
        
        const responses = [
            "That's a great question! As your AI companion, I'd recommend starting with small, consistent steps. Would you like me to create a personalized action plan?",
            "I understand what you're looking for. Based on your goals, I can suggest some evidence-based strategies that align with your values and lifestyle.",
            "Excellent! I can help you with that. Let me break this down into manageable steps and integrate it with your other life areas for maximum impact.",
            "That's something I specialize in! I can provide personalized guidance while respecting your beliefs and preferences. Shall we explore this together?",
            "Perfect timing for this question! I have some insights that could really help you grow in this area. Would you like specific, actionable advice?",
            "I love your curiosity! This is exactly the kind of holistic thinking that leads to real transformation. Let me share some strategies that have worked well for others.",
            "Great topic! I can integrate this with your other goals to create a comprehensive growth plan. What's most important to you right now?"
        ];
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        
        const aiDiv = document.createElement('div');
        aiDiv.style.cssText = 'background: var(--bg-secondary); padding: 0.75rem 1rem; border-radius: 15px; margin-bottom: 1rem; max-width: 80%;';
        aiDiv.textContent = response;
        messages.appendChild(aiDiv);
        messages.scrollTop = messages.scrollHeight;
    }, 1500);
}

// Form Handlers
function handleSignup(event) {
    event.preventDefault();
    const submitButton = event.target.querySelector('button[type="submit"]');
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    setTimeout(() => {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        
        // Show success message
        document.getElementById('modalContent').innerHTML = `
            <div style="text-align: center; padding: 2rem 0;">
                <div style="width: 80px; height: 80px; background: var(--secondary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                    <i class="fas fa-check" style="font-size: 2rem; color: white;"></i>
                </div>
                <h3 style="margin-bottom: 1rem;">Welcome to AiBhai!</h3>
                <p style="color: var(--text-secondary); margin: 1rem 0;">We're excited to have you join our community. You'll receive an email with your login details shortly.</p>
                <button onclick="closeModal()" class="btn btn-primary">Get Started</button>
            </div>
        `;
    }, 2000);
}

function handleLogin(event) {
    event.preventDefault();
    const submitButton = event.target.querySelector('button[type="submit"]');
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Show loading message
    document.getElementById('modalContent').innerHTML = `
        <div style="text-align: center; padding: 2rem 0;">
            <div class="typing-indicator" style="justify-content: center; margin-bottom: 1rem;">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
            <p>Signing you in...</p>
        </div>
    `;
    
    setTimeout(() => {
        document.getElementById('modalContent').innerHTML = `
            <div style="text-align: center; padding: 2rem 0;">
                <div style="width: 80px; height: 80px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                    <i class="fas fa-user" style="font-size: 2rem; color: white;"></i>
                </div>
                <h3 style="margin-bottom: 1rem;">Welcome back!</h3>
                <p style="color: var(--text-secondary); margin: 1rem 0;">Ready to continue your growth journey?</p>
                <button onclick="closeModal()" class="btn btn-primary">Continue to Dashboard</button>
            </div>
        `;
    }, 2000);
}

function handlePlanSelection(event, plan) {
    event.preventDefault();
    const submitButton = event.target.querySelector('button[type="submit"]');
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Show processing message
    document.getElementById('modalContent').innerHTML = `
        <div style="text-align: center; padding: 2rem 0;">
            <div class="typing-indicator" style="justify-content: center; margin-bottom: 1rem;">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
            <p>Setting up your ${plan} plan...</p>
        </div>
    `;
    
    setTimeout(() => {
        const planNames = {
            'free': 'Free',
            'basic': 'Basic', 
            'pro': 'Pro'
        };
        
        document.getElementById('modalContent').innerHTML = `
            <div style="text-align: center; padding: 2rem 0;">
                <div style="width: 80px; height: 80px; background: var(--secondary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                    <i class="fas fa-rocket" style="font-size: 2rem; color: white;"></i>
                </div>
                <h3 style="margin-bottom: 1rem;">You're all set!</h3>
                <p style="color: var(--text-secondary); margin: 1rem 0;">Your ${planNames[plan]} plan is active. Let's start your growth journey!</p>
                <button onclick="closeModal()" class="btn btn-primary">Launch AiBhai</button>
            </div>
        `;
    }, 2500);
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('modal');
    if (modal && e.target === modal) {
        closeModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('modal');
    if (modal && modal.style.display === 'flex' && e.key === 'Escape') {
        closeModal();
    }
});

// Utility Functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Performance optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Additional scroll-based animations can be added here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Analytics and tracking (placeholder functions)
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
    // Integrate with your analytics service (Google Analytics, Mixpanel, etc.)
}

function trackPageView(page) {
    console.log('Page view tracked:', page);
    // Integrate with your analytics service
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Log to error reporting service
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            }, function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Lazy loading for images (if you add images later)
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
setupLazyLoading();

// Accessibility improvements
function enhanceAccessibility() {
    // Add ARIA labels dynamically
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });

    // Add focus management for modals
    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                const focusableElements = modal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
}

// Initialize accessibility enhancements
enhanceAccessibility();

// Theme switching (optional feature)
function initThemeSwitch() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        }
    });
}

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart);
                // Send to analytics service
            }, 0);
        });
    }
}

// Initialize performance monitoring
monitorPerformance();

// Newsletter subscription (if you add this feature)
function subscribeToNewsletter(email) {
    return fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Newsletter subscription failed:', error);
        throw error;
    });
}

// Contact form handler (if you add contact forms)
function handleContactForm(formData) {
    return fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Contact form submission failed:', error);
        throw error;
    });
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showModal,
        closeModal,
        showLogin,
        startTrial,
        selectPlan,
        openDemo,
        handleSignup,
        handleLogin,
        handlePlanSelection
    };
}