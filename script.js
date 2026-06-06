/* ==========================================================================
   Dablu Kumar Portfolio - Interactive Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. DOM Elements
    // ----------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('back-to-top');
    const contactForm = document.getElementById('contact-form');
    const sections = document.querySelectorAll('section');
    
    // Upgraded Premium Features Elements
    const themeToggleBtn = document.getElementById('theme-toggle');
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');

    // ----------------------------------------------------------------------
    // 2. Header Scroll Effect
    // ----------------------------------------------------------------------
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll();

    // ----------------------------------------------------------------------
    // 3. Mobile Navigation Menu Toggle
    // ----------------------------------------------------------------------
    const toggleMobileMenu = () => {
        const isOpen = navMenu.classList.toggle('open');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
    };

    const closeMobileMenu = () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    };

    hamburger.addEventListener('click', toggleMobileMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
            closeMobileMenu();
        }
    });

    // ----------------------------------------------------------------------
    // 4. ScrollSpy: Highlight Active Section in Navbar
    // ----------------------------------------------------------------------
    const handleScrollSpy = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', handleScrollSpy);

    // ----------------------------------------------------------------------
    // 5. Back to Top Button
    // ----------------------------------------------------------------------
    const handleBackToTopVisibility = () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    };
    window.addEventListener('scroll', handleBackToTopVisibility);

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ----------------------------------------------------------------------
    // 6. Upgraded feature: Premium Dark / Light Theme Toggle
    // ----------------------------------------------------------------------
    const initializeTheme = () => {
        const cachedTheme = localStorage.getItem('theme');
        if (cachedTheme === 'light') {
            document.body.classList.add('light-theme');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            document.body.classList.remove('light-theme');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    };

    themeToggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');
        if (isLight) {
            localStorage.setItem('theme', 'light');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    });

    initializeTheme();

    // ----------------------------------------------------------------------
    // 7. Upgraded feature: Interactive Developer Terminal CLI
    // ----------------------------------------------------------------------
    const addTerminalOutput = (command, text, isError = false) => {
        // Output User input prompt
        const promptLine = document.createElement('div');
        promptLine.className = 'terminal-line';
        promptLine.innerHTML = `<span class="terminal-prompt">dablu@desktop:~$</span> ${command}`;
        terminalBody.insertBefore(promptLine, terminalBody.lastElementChild);

        // Output command result
        const resultLine = document.createElement('div');
        resultLine.className = `terminal-line ${isError ? 'error' : 'output'}`;
        resultLine.innerHTML = text;
        terminalBody.insertBefore(resultLine, terminalBody.lastElementChild);

        // Scroll to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;
    };

    const runTerminalCommand = (rawInput) => {
        const input = rawInput.trim().toLowerCase();
        if (!input) return;

        let outputText = '';
        let isError = false;

        switch (input) {
            case 'help':
                outputText = `Available commands:<br>
                &bull; <span class="text-gradient font-bold">about</span> - Short professional overview<br>
                &bull; <span class="text-gradient font-bold">skills</span> - Listing of technical tools<br>
                &bull; <span class="text-gradient font-bold">projects</span> - View my developed systems<br>
                &bull; <span class="text-gradient font-bold">contact</span> - Contact channels<br>
                &bull; <span class="text-gradient font-bold">clear</span> - Clear output log`;
                break;
            case 'about':
                outputText = `<strong>Dablu Kumar</strong> &bull; B.Tech Graduate (Passed out in 2026)<br>
                CGPA: 7.6 / 10.0 &bull; Bihar Engineering University (BEU), Patna.<br>
                MERN Full Stack and Java DSA Certified from Apna College.<br>
                Solved 200+ algorithm problems on LeetCode / GeeksforGeeks.`;
                break;
            case 'skills':
                outputText = `<strong>Technical Stack:</strong><br>
                &bull; Languages: Java, Python, C++, JavaScript<br>
                &bull; Web Core: HTML5, CSS3, Angular, Bootstrap<br>
                &bull; Backend: FastAPI, Node.js, Express.js<br>
                &bull; Databases: MongoDB, MySQL, SQLite<br>
                &bull; Tools & ML: Git, GitHub, Scikit-learn, Pandas`;
                break;
            case 'projects':
                outputText = `<strong>Featured Systems:</strong><br>
                1. <strong>AuraRing</strong> - Smart Ring Pre-order Landing page.<br>
                2. <strong>Issue Tracker</strong> - Web Bug ticketing (FastAPI + Angular).<br>
                3. <strong>Blockchain Voting</strong> - secure voting app (Python + SHA-256).<br>
                4. <strong>ML Heart Prediction</strong> - Classifier Web App (Flask + Scikit-learn).`;
                break;
            case 'contact':
                outputText = `Email: <a href="mailto:dablukumardk809@gmail.com">dablukumardk809@gmail.com</a><br>
                Phone: +91 7209769220<br>
                LinkedIn: <a href="https://www.linkedin.com/in/dablu-kumar-67b929292/" target="_blank">In/dablu-kumar</a><br>
                GitHub: <a href="https://github.com/Dablu-kumar" target="_blank">github.com/Dablu-kumar</a>`;
                break;
            case 'clear':
                // Remove all lines except the last input line
                const lines = Array.from(terminalBody.querySelectorAll('.terminal-line'));
                lines.forEach(line => line.remove());
                terminalInput.value = '';
                return;
            default:
                outputText = `Command not found: "${rawInput}". Type <span class="font-bold">help</span> to list commands.`;
                isError = true;
        }

        addTerminalOutput(rawInput, outputText, isError);
        terminalInput.value = '';
    };

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            runTerminalCommand(terminalInput.value);
        }
    });

    // Terminal container focus helper
    terminalBody.addEventListener('click', () => {
        terminalInput.focus();
    });

    // ----------------------------------------------------------------------
    // 8. Upgraded feature: Live Projects Filter Tabs
    // ----------------------------------------------------------------------
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and apply to selected
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 9. Upgraded feature: Dynamic Project Detail Modals
    // ----------------------------------------------------------------------
    const projectDetailsData = {
        auraring: {
            title: "AuraRing - Smart Wearable Landing Page",
            role: "Frontend Developer & UI Designer",
            duration: "Self-Initiated Design Practice",
            desc: "An immersive showcase landing page detailing an AI-enabled smart ring. Integrated with dynamic customization controls, micro-interactions, and visual specifications panels.",
            architecture: ["Client Browser", "HTML5 Layout", "CSS3 Transitions", "Custom JS Controller"],
            challenges: [
                "Building a fully responsive, stateful 4-step induction pre-order configurator (customizing finishes and sizes) entirely in vanilla JavaScript.",
                "Ensuring high-performance glassmorphism backdrop blurs and keyframe gradients that run fluidly at 60 FPS on older mobile devices."
            ],
            dbSchema: "Static page with client-side state storage (no active backend database required)."
        },
        issuetracker: {
            title: "Full Stack Issue Tracker System",
            role: "Full Stack Developer",
            duration: "Full Stack Project",
            desc: "A highly modular and scalable web application that allows dev teams to log, assign, filter, and close software development tickets and code bugs.",
            architecture: ["Angular Frontend", "REST Client", "FastAPI Engine", "SQLAlchemy ORM", "SQLite Database"],
            challenges: [
                "Designing optimized SQL queries with sorting, pagination, and multi-parameter filtering to keep response times under 50ms.",
                "Implementing modular component layout structure in Angular to guarantee front-end maintainability and clean structure."
            ],
            dbSchema: "SQLite database containing schemas for:<br>&bull; <strong>Users</strong>: (id, email, hashed_password, role)<br>&bull; <strong>Issues</strong>: (id, title, description, status, priority, assignee_id, tags)"
        },
        voting: {
            title: "Blockchain Voting Management System",
            role: "Blockchain & GUI Developer",
            duration: "Security Systems Project",
            desc: "A decentralized, secure desktop voting application validating identity, generating immutable block ledgers, and preventing fraudulent votes.",
            architecture: ["Tkinter GUI", "Voter Validation", "SHA-256 Hashing", "Blockchain Ledger"],
            challenges: [
                "Ensuring total tamper detection by writing a real-time validation algorithm that recalculates hashes across the entire blockchain upon every new vote.",
                "Preventing double-voting using voter ID memory tables without compromising voter anonymity."
            ],
            dbSchema: "Local JSON/file-based encrypted ledger recording:<br>&bull; <strong>Ledger Block</strong>: (index, timestamp, voter_hash, vote_data, prev_hash, current_hash)"
        },
        heartdisease: {
            title: "Heart Disease Prediction Web Application",
            role: "Machine Learning & Backend Developer",
            duration: "ML & Analytics Project",
            desc: "An intelligent medical tool utilizing machine learning classification algorithms to evaluate clinical test parameters and predict heart disease risk.",
            architecture: ["Form Input", "Flask Backend", "Scikit-Learn Classifier", "Pandas Engine", "UI Report Panel"],
            challenges: [
                "Handling missing values and preprocessing medical metrics using standard scaling to optimize classification performance.",
                "Integrating and exporting the trained python model via pickle files to be served asynchronously by a Flask web controller."
            ],
            dbSchema: "Lightweight session store holding temporary patient report files (CSV/JSON) for feature analysis."
        }
    };

    const openModal = (projectId) => {
        const data = projectDetailsData[projectId];
        if (!data) return;

        // Construct architecture nodes html
        let archNodesHtml = '';
        data.architecture.forEach((node, index) => {
            archNodesHtml += `<div class="flow-node">${node}</div>`;
            if (index < data.architecture.length - 1) {
                archNodesHtml += `<span class="flow-arrow"><i class="fa-solid fa-arrow-right"></i></span>`;
            }
        });

        // Construct challenges bullet list
        let challengesHtml = '';
        data.challenges.forEach(challenge => {
            challengesHtml += `<li>${challenge}</li>`;
        });

        // Populating modal content
        modalContent.innerHTML = `
            <h3 class="modal-project-title text-gradient">${data.title}</h3>
            
            <div class="modal-section">
                <h4>Description</h4>
                <p>${data.desc}</p>
            </div>
            
            <div class="modal-section">
                <h4>System Architecture Flow</h4>
                <div class="architecture-flow">
                    ${archNodesHtml}
                </div>
            </div>
            
            <div class="modal-section">
                <h4>Technical Challenges Solved</h4>
                <ul>
                    ${challengesHtml}
                </ul>
            </div>
            
            <div class="modal-section">
                <h4>Database / Storage Schema</h4>
                <p>${data.dbSchema}</p>
            </div>
        `;

        // Open Modal
        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    };

    const closeModal = () => {
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Resume background scrolling
    };

    // Attach event listeners to modal triggers
    document.querySelectorAll('.btn-modal-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const projectId = trigger.getAttribute('data-project');
            openModal(projectId);
        });
    });

    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeModal();
        }
    });

    // ----------------------------------------------------------------------
    // 10. Contact Form Validation & Submission
    // ----------------------------------------------------------------------
    const formFields = {
        name: {
            input: document.getElementById('user-name'),
            group: document.getElementById('user-name').closest('.form-group'),
            validate: value => value.trim().length > 0
        },
        email: {
            input: document.getElementById('user-email'),
            group: document.getElementById('user-email').closest('.form-group'),
            validate: value => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value.trim());
            }
        },
        subject: {
            input: document.getElementById('user-subject'),
            group: document.getElementById('user-subject').closest('.form-group'),
            validate: value => value.trim().length > 0
        },
        message: {
            input: document.getElementById('user-message'),
            group: document.getElementById('user-message').closest('.form-group'),
            validate: value => value.trim().length >= 10
        }
    };

    const validateField = (fieldKey) => {
        const field = formFields[fieldKey];
        const isValid = field.validate(field.input.value);

        if (isValid) {
            field.group.classList.remove('invalid');
        } else {
            field.group.classList.add('invalid');
        }
        return isValid;
    };

    Object.keys(formFields).forEach(fieldKey => {
        const field = formFields[fieldKey];
        field.input.addEventListener('blur', () => validateField(fieldKey));
        field.input.addEventListener('input', () => {
            if (field.group.classList.contains('invalid')) {
                validateField(fieldKey);
            }
        });
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isFormValid = true;
        Object.keys(formFields).forEach(fieldKey => {
            const isValid = validateField(fieldKey);
            if (!isValid) {
                isFormValid = false;
            }
        });

        const statusElement = document.getElementById('form-status');
        const submitBtn = contactForm.querySelector('.btn-submit');
        const submitBtnText = submitBtn.querySelector('span');
        const submitBtnIcon = submitBtn.querySelector('i');
        
        if (isFormValid) {
            // UI Feedback: Disable button and show sending state
            statusElement.className = 'form-status info';
            statusElement.textContent = 'Sending message...';
            statusElement.style.display = 'block';
            
            submitBtn.disabled = true;
            const originalBtnText = submitBtnText.textContent;
            submitBtnText.textContent = 'Sending...';
            if (submitBtnIcon) {
                submitBtnIcon.className = 'fa-solid fa-spinner fa-spin';
            }

            const visitorName = formFields.name.input.value.trim();
            const visitorEmail = formFields.email.input.value.trim();
            const emailSubject = formFields.subject.input.value.trim();
            const messageBody = formFields.message.input.value.trim();

            // Send AJAX POST request to FormSubmit
            fetch("https://formsubmit.co/ajax/dablukumardk809@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: visitorName,
                    email: visitorEmail,
                    _subject: `New Portfolio Message: ${emailSubject}`,
                    message: messageBody
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                statusElement.className = 'form-status success';
                statusElement.textContent = `Thank you, ${visitorName}! Your message has been sent successfully.`;
                contactForm.reset();
                
                setTimeout(() => {
                    statusElement.style.display = 'none';
                }, 6000);
            })
            .catch(error => {
                console.error('Submission error:', error);
                statusElement.className = 'form-status error';
                statusElement.textContent = 'Oops! There was a problem sending your message. Please check your connection and try again.';
            })
            .finally(() => {
                // Restore button states
                submitBtn.disabled = false;
                submitBtnText.textContent = originalBtnText;
                if (submitBtnIcon) {
                    submitBtnIcon.className = 'fa-solid fa-paper-plane';
                }
            });
        } else {
            statusElement.className = 'form-status error';
            statusElement.textContent = 'Please fix the errors above before submitting.';
            statusElement.style.display = 'block';
        }
    });
});
