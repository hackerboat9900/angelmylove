// DOM Elements
const navMenu = document.getElementById('navMenu');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const heartsBg = document.getElementById('hearts-bg');
const printLetterBtn = document.getElementById('printLetter');
const shareLetterBtn = document.getElementById('shareLetter');
const generateQuoteBtn = document.getElementById('generateQuote');
const randomQuoteDiv = document.getElementById('randomQuote');
const startHeartsBtn = document.getElementById('startHearts');
const startConfettiBtn = document.getElementById('startConfetti');
const clearAnimationsBtn = document.getElementById('clearAnimations');
const startHeartGameBtn = document.getElementById('startHeartGame');
const heartBoard = document.getElementById('heartBoard');
const heartScoreSpan = document.getElementById('heartScore');
const startQuizBtn = document.getElementById('startQuiz');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizScoreSpan = document.getElementById('quizScore');
const meterFill = document.getElementById('meterFill');
const meterText = document.getElementById('meterText');
const forgiveButton = document.getElementById('forgiveButton');
const filterButtons = document.querySelectorAll('[data-filter]');
const filterImage = document.getElementById('filterImage');
const cuteButtons = document.querySelectorAll('.wiggle-btn, .bounce-btn, .spin-btn, .grow-btn');
const emojiButtons = document.querySelectorAll('[data-emoji]');
const stopRainBtn = document.getElementById('stopRain');
const emojiDisplay = document.getElementById('emojiDisplay');
const confettiContainer = document.getElementById('confetti-container');
const currentYearSpan = document.getElementById('currentYear');

// Game State Variables
let heartScore = 0;
let quizScore = 0;
let totalForgiveness = 0;
let heartRainInterval;
let confettiInterval;
let emojiRainInterval;
let quizQuestions = [];
let currentQuizQuestion = 0;
let quizActive = false;

// Quote Database
const loveQuotes = [
    {
        text: "Love is not about how many days, months, or years you've been together. It's about how much you love each other every day.",
        author: "Unknown"
    },
    {
        text: "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.",
        author: "Angelita Lim"
    },
    {
        text: "You are my sun, my moon, and all my stars.",
        author: "E.E. Cummings"
    },
    {
        text: "If I know what love is, it is because of you.",
        author: "Hermann Hesse"
    },
    {
        text: "I would rather spend one lifetime with you, than face all the ages of this world alone.",
        author: "J.R.R. Tolkien"
    },
    {
        text: "My love for you is a journey starting at forever and ending at never.",
        author: "Unknown"
    },
    {
        text: "I love you not only for what you are, but for what I am when I am with you.",
        author: "Roy Croft"
    },
    {
        text: "To the world you may be one person, but to one person you are the world.",
        author: "Bill Wilson"
    },
    {
        text: "I never want to stop making memories with you.",
        author: "Pierre Jeanty"
    },
    {
        text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
        author: "Maya Angelou"
    }
];

// Quiz Questions Database
const quizData = [
    {
        question: "What's the most important thing in our relationship?",
        options: ["Trust", "Communication", "Love", "All of the above"],
        correct: 3
    },
    {
        question: "What would I do to make you smile when you're sad?",
        options: ["Give you space", "Tell jokes", "Cook your favorite meal", "Just be there for you"],
        correct: 3
    },
    {
        question: "How do I feel when I'm with you?",
        options: ["Complete", "Happy", "Loved", "All of the above"],
        correct: 3
    },
    {
        question: "What's my favorite thing about you?",
        options: ["Your smile", "Your kindness", "Your intelligence", "Everything about you"],
        correct: 3
    },
    {
        question: "What's my promise to you for our future?",
        options: ["To always be honest", "To make you happy", "To grow together", "All of the above"],
        correct: 3
    }
];

// Initialize the website
function init() {
    // Set current year in footer
    currentYearSpan.textContent = new Date().getFullYear();
    
    // Create background hearts
    createBackgroundHearts();
    
    // Initialize quiz questions
    quizQuestions = [...quizData];
    
    // Set up event listeners
    setupEventListeners();
    
    // Show home section by default
    showSection('home');
    
    // Start subtle background animations
    startSubtleAnimations();
}

// Create floating hearts in background
function createBackgroundHearts() {
    for (let i = 0; i < 20; i++) {
        createHeart(true);
    }
}

function createHeart(isBackground = false) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heart.style.color = getRandomColor();
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    heart.style.left = Math.random() * 100 + '%';
    
    if (isBackground) {
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
        heartsBg.appendChild(heart);
    } else {
        heart.style.top = '-50px';
        heart.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        document.querySelector('.animation-display').appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 5000);
    }
}

function getRandomColor() {
    const colors = ['#ff9a9e', '#fad0c4', '#a18cd1', '#ffb6c1', '#add8e6', '#98fb98'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Set up all event listeners
function setupEventListeners() {
    // Mobile menu toggle
    menuToggle.addEventListener('click', toggleMobileMenu);
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            showSection(sectionId);
            closeMobileMenu();
        });
    });
    
    // Print letter button
    printLetterBtn.addEventListener('click', printLetter);
    
    // Share letter button
    shareLetterBtn.addEventListener('click', shareLetter);
    
    // Generate quote button
    generateQuoteBtn.addEventListener('click', generateRandomQuote);
    
    // Animation buttons
    startHeartsBtn.addEventListener('click', startHeartRain);
    startConfettiBtn.addEventListener('click', launchConfetti);
    clearAnimationsBtn.addEventListener('click', clearAnimations);
    
    // Game buttons
    startHeartGameBtn.addEventListener('click', startHeartGame);
    startQuizBtn.addEventListener('click', startQuiz);
    
    // Forgive button
    forgiveButton.addEventListener('click', acceptForgiveness);
    
    // Anime filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            applyAnimeFilter(filter);
        });
    });
    
    // Cute element buttons
    cuteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.target.classList[1].split('-')[0]; // wiggle, bounce, spin, grow
            activateCuteElement(action, e.target.closest('.cute-item'));
        });
    });
    
    // Emoji rain buttons
    emojiButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const emoji = button.getAttribute('data-emoji');
            startEmojiRain(emoji);
        });
    });
    
    stopRainBtn.addEventListener('click', stopEmojiRain);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#navMenu') && !e.target.closest('#menuToggle') && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// Navigation functions
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    menuToggle.innerHTML = navMenu.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
}

function showSection(sectionId) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Add active class to corresponding nav link
        const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }
        
        // Special initialization for certain sections
        if (sectionId === 'games') {
            updateForgivenessMeter();
        }
    }
}

// Apology letter functions
function printLetter() {
    const letterContent = document.querySelector('.letter-container').innerHTML;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>My Apology to Angel</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .letter { max-width: 800px; margin: 0 auto; }
                @media print {
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="letter">${letterContent}</div>
            <div class="no-print" style="text-align: center; margin-top: 20px;">
                <button onclick="window.print()">Print</button>
                <button onclick="window.close()">Close</button>
            </div>
        </body>
        </html>
    `;
    
    window.print();
    document.body.innerHTML = originalContent;
    showSection('letter');
}

function shareLetter() {
    if (navigator.share) {
        navigator.share({
            title: 'My Apology to Angel',
            text: 'Read my heartfelt apology to Angel',
            url: window.location.href + '#letter'
        })
        .then(() => console.log('Shared successfully'))
        .catch(error => console.log('Error sharing:', error));
    } else {
        alert('Share this link: ' + window.location.href + '#letter');
    }
}

// Quotes functions
function generateRandomQuote() {
    const randomIndex = Math.floor(Math.random() * loveQuotes.length);
    const quote = loveQuotes[randomIndex];
    
    randomQuoteDiv.innerHTML = `
        <p>"${quote.text}"</p>
        <div class="quote-author">- ${quote.author}</div>
    `;
    
    // Add animation
    randomQuoteDiv.style.animation = 'none';
    setTimeout(() => {
        randomQuoteDiv.style.animation = 'pulse 1s';
    }, 10);
}

// Animation functions
function startHeartRain() {
    stopHeartRain(); // Clear any existing heart rain
    
    heartRainInterval = setInterval(() => {
        for (let i = 0; i < 5; i++) {
            createHeart(false);
        }
    }, 300);
}

function stopHeartRain() {
    if (heartRainInterval) {
        clearInterval(heartRainInterval);
    }
}

function launchConfetti() {
    stopConfetti(); // Clear any existing confetti
    
    const confettiCount = 150;
    const colors = ['#ff9a9e', '#fad0c4', '#a18cd1', '#ffb6c1', '#add8e6'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['❤️', '✨', '🌟', '💫', '🌸'][Math.floor(Math.random() * 5)];
        confetti.style.position = 'absolute';
        confetti.style.fontSize = Math.random() * 20 + 10 + 'px';
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.top = '-50px';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.opacity = Math.random() * 0.7 + 0.3;
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
        
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
}

function stopConfetti() {
    // Clear any existing confetti
    while (confettiContainer.firstChild) {
        confettiContainer.removeChild(confettiContainer.firstChild);
    }
}

function clearAnimations() {
    stopHeartRain();
    stopConfetti();
    stopEmojiRain();
    
    const animationBox = document.querySelector('.animation-display');
    while (animationBox.firstChild && !animationBox.querySelector('.pokki-character')) {
        animationBox.removeChild(animationBox.firstChild);
    }
}

// Game functions
function startHeartGame() {
    // Reset game
    heartScore = 0;
    heartScoreSpan.textContent = '0';
    heartBoard.innerHTML = '';
    startHeartGameBtn.textContent = 'Restart Game';
    startHeartGameBtn.classList.remove('btn-primary');
    startHeartGameBtn.classList.add('btn-secondary');
    
    // Create hearts
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'game-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 80 + '%';
        heart.style.top = Math.random() * 70 + '%';
        heart.style.fontSize = Math.random() * 30 + 20 + 'px';
        heart.style.opacity = '0.8';
        heart.style.cursor = 'pointer';
        heart.style.position = 'absolute';
        heart.style.transition = 'all 0.3s';
        
        heart.addEventListener('click', () => {
            if (heart.style.opacity !== '0') {
                heartScore++;
                heartScoreSpan.textContent = heartScore;
                heart.style.opacity = '0';
                heart.style.transform = 'scale(0)';
                
                // Play sound effect
                playSoundEffect('click');
                
                // Check if game is won
                if (heartScore >= 10) {
                    heartGameWon();
                }
                
                updateForgivenessMeter();
            }
        });
        
        heartBoard.appendChild(heart);
    }
}

function heartGameWon() {
    // Show winning message
    const winMessage = document.createElement('div');
    winMessage.className = 'win-message';
    winMessage.innerHTML = `
        <h3>You collected all the hearts!</h3>
        <p>Your love has healed my heart ❤️</p>
    `;
    winMessage.style.textAlign = 'center';
    winMessage.style.marginTop = '20px';
    winMessage.style.padding = '15px';
    winMessage.style.backgroundColor = 'rgba(255, 154, 158, 0.2)';
    winMessage.style.borderRadius = '10px';
    
    heartBoard.appendChild(winMessage);
    
    // Add forgiveness points
    totalForgiveness += 30;
    updateForgivenessMeter();
    
    // Launch confetti
    launchConfetti();
}

function startQuiz() {
    // Reset quiz
    quizScore = 0;
    currentQuizQuestion = 0;
    quizActive = true;
    quizScoreSpan.textContent = '0';
    startQuizBtn.textContent = 'Restart Quiz';
    startQuizBtn.classList.remove('btn-primary');
    startQuizBtn.classList.add('btn-secondary');
    
    // Shuffle questions
    quizQuestions = [...quizData].sort(() => Math.random() - 0.5);
    
    // Display first question
    displayQuizQuestion();
}

function displayQuizQuestion() {
    if (currentQuizQuestion >= quizQuestions.length) {
        endQuiz();
        return;
    }
    
    const question = quizQuestions[currentQuizQuestion];
    quizQuestion.textContent = question.question;
    
    // Clear previous options
    quizOptions.innerHTML = '';
    
    // Create option buttons
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = option;
        button.style.display = 'block';
        button.style.width = '100%';
        button.style.margin = '10px 0';
        button.style.padding = '12px';
        button.style.borderRadius = '5px';
        button.style.border = '1px solid #ddd';
        button.style.backgroundColor = 'white';
        button.style.cursor = 'pointer';
        button.style.transition = 'all 0.3s';
        
        button.addEventListener('mouseenter', () => {
            button.style.backgroundColor = '#f9f9f9';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.backgroundColor = 'white';
        });
        
        button.addEventListener('click', () => {
            checkQuizAnswer(index);
        });
        
        quizOptions.appendChild(button);
    });
}

function checkQuizAnswer(selectedIndex) {
    const question = quizQuestions[currentQuizQuestion];
    const options = quizOptions.querySelectorAll('.quiz-option');
    
    // Disable all buttons
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Mark correct answer in green
    options[question.correct].style.backgroundColor = '#d4edda';
    options[question.correct].style.borderColor = '#c3e6cb';
    
    // Mark wrong answer in red if selected wrong
    if (selectedIndex !== question.correct) {
        options[selectedIndex].style.backgroundColor = '#f8d7da';
        options[selectedIndex].style.borderColor = '#f5c6cb';
    } else {
        // Correct answer
        quizScore++;
        quizScoreSpan.textContent = quizScore;
        
        // Play success sound
        playSoundEffect('correct');
    }
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuizQuestion++;
        displayQuizQuestion();
    }, 1500);
    
    updateForgivenessMeter();
}

function endQuiz() {
    quizActive = false;
    
    let message = '';
    if (quizScore === quizQuestions.length) {
        message = 'Perfect! You know me so well! 💖';
        totalForgiveness += 50;
    } else if (quizScore >= quizQuestions.length / 2) {
        message = 'Good job! You know me pretty well! 😊';
        totalForgiveness += 30;
    } else {
        message = 'Thanks for playing! Let\'s get to know each other better! 💕';
        totalForgiveness += 10;
    }
    
    quizQuestion.textContent = `Quiz Complete! Your score: ${quizScore}/${quizQuestions.length}`;
    quizOptions.innerHTML = `<p style="text-align: center; padding: 20px;">${message}</p>`;
    
    updateForgivenessMeter();
}

function updateForgivenessMeter() {
    // Calculate percentage (max 100)
    const percentage = Math.min(totalForgiveness, 100);
    
    // Update meter visual
    meterFill.style.width = percentage + '%';
    
    // Update meter text
    if (percentage < 20) {
        meterText.textContent = 'Just starting... Play games to fill the meter!';
        meterFill.style.backgroundColor = '#ff6b6b';
        forgiveButton.disabled = true;
    } else if (percentage < 50) {
        meterText.textContent = 'Making progress... Keep going!';
        meterFill.style.backgroundColor = '#ff9a9e';
        forgiveButton.disabled = true;
    } else if (percentage < 80) {
        meterText.textContent = 'Almost there! You\'re doing great!';
        meterFill.style.backgroundColor = '#a18cd1';
        forgiveButton.disabled = false;
    } else {
        meterText.textContent = 'Ready for forgiveness! Click the button below!';
        meterFill.style.backgroundColor = '#4CAF50';
        forgiveButton.disabled = false;
    }
}

function acceptForgiveness() {
    // Show acceptance message
    meterText.textContent = 'Thank you for forgiving me! I love you so much! ❤️';
    meterFill.style.width = '100%';
    meterFill.style.backgroundColor = '#4CAF50';
    
    // Create celebration
    launchConfetti();
    startEmojiRain('❤️');
    
    // Play celebration sound
    playSoundEffect('celebration');
    
    // Show special message
    const celebrationMessage = document.createElement('div');
    celebrationMessage.className = 'celebration-message';
    celebrationMessage.innerHTML = `
        <h3>🎉 You've Made Me the Happiest Person! 🎉</h3>
        <p>Thank you for your forgiveness, Angel. I promise to cherish you forever.</p>
        <p>Let's make new beautiful memories together! 💕</p>
    `;
    celebrationMessage.style.textAlign = 'center';
    celebrationMessage.style.marginTop = '30px';
    celebrationMessage.style.padding = '25px';
    celebrationMessage.style.backgroundColor = 'rgba(255, 154, 158, 0.3)';
    celebrationMessage.style.borderRadius = '15px';
    celebrationMessage.style.border = '2px dashed #ff9a9e';
    
    document.querySelector('.forgiveness-meter').appendChild(celebrationMessage);
    
    // Disable the forgive button
    forgiveButton.disabled = true;
    forgiveButton.textContent = 'Forgiven! ❤️';
}

// Anime filter functions
function applyAnimeFilter(filter) {
    // Remove existing filter classes
    filterImage.classList.remove('sakura-filter', 'shojo-filter');
    
    // Apply new filter
    if (filter === 'sakura') {
        filterImage.classList.add('sakura-filter');
        filterImage.querySelector('.filter-text').textContent = 'Angel in Sakura Bloom';
    } else if (filter === 'shojo') {
        filterImage.classList.add('shojo-filter');
        filterImage.querySelector('.filter-text').textContent = 'Angel as Shojo Heroine';
    } else {
        filterImage.querySelector('.filter-text').textContent = 'Angel in Anime Style';
    }
}

// Cute element functions
function activateCuteElement(action, element) {
    // Reset any existing animations
    element.style.animation = 'none';
    
    // Apply new animation
    switch(action) {
        case 'wiggle':
            element.style.animation = 'wiggle 0.5s ease-in-out 3';
            break;
        case 'bounce':
            element.style.animation = 'bounce 0.8s ease-in-out';
            break;
        case 'spin':
            element.style.animation = 'spin 1s linear';
            break;
        case 'grow':
            element.style.transform = 'scale(1)';
            element.style.animation = 'grow 0.5s ease-in-out forwards';
            break;
    }
    
    // Play sound effect
    playSoundEffect(action);
}

// Emoji rain functions
function startEmojiRain(emoji) {
    stopEmojiRain(); // Clear any existing emoji rain
    
    emojiDisplay.innerHTML = '';
    emojiDisplay.style.position = 'relative';
    emojiDisplay.style.height = '200px';
    emojiDisplay.style.overflow = 'hidden';
    emojiDisplay.style.border = '2px dashed #ddd';
    emojiDisplay.style.borderRadius = '10px';
    
    emojiRainInterval = setInterval(() => {
        for (let i = 0; i < 3; i++) {
            createFallingEmoji(emoji);
        }
    }, 300);
}

function createFallingEmoji(emoji) {
    const emojiElement = document.createElement('div');
    emojiElement.textContent = emoji;
    emojiElement.style.position = 'absolute';
    emojiElement.style.fontSize = Math.random() * 30 + 20 + 'px';
    emojiElement.style.left = Math.random() * 100 + '%';
    emojiElement.style.top = '-50px';
    emojiElement.style.opacity = Math.random() * 0.7 + 0.3;
    emojiElement.style.animation = `emojiFall ${Math.random() * 3 + 2}s linear forwards`;
    
    emojiDisplay.appendChild(emojiElement);
    
    // Remove emoji after animation
    setTimeout(() => {
        if (emojiElement.parentNode) {
            emojiElement.parentNode.removeChild(emojiElement);
        }
    }, 5000);
}

function stopEmojiRain() {
    if (emojiRainInterval) {
        clearInterval(emojiRainInterval);
    }
}

// Sound effects
function playSoundEffect(type) {
    // In a real implementation, you would play actual sound files
    // For this example, we'll just log and use system sounds
    console.log(`Playing ${type} sound effect`);
    
    // Create a simple beep for demonstration
    if (type === 'click' || type === 'correct' || type === 'celebration') {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = type === 'celebration' ? 800 : type === 'correct' ? 600 : 400;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.log('Audio not supported');
        }
    }
}

// Start subtle background animations
function startSubtleAnimations() {
    // Animate background hearts occasionally
    setInterval(() => {
        if (Math.random() > 0.7) {
            createHeart(true);
            
            // Remove some old hearts to prevent too many
            const hearts = heartsBg.querySelectorAll('div');
            if (hearts.length > 30) {
                heartsBg.removeChild(hearts[0]);
            }
        }
    }, 3000);
}

// CSS Animation Keyframes (dynamically added)
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(10deg); }
    }
    
    @keyframes fall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
    
    @keyframes confettiFall {
        0% { transform: translateY(0) rotate(0deg); }
        100% { transform: translateY(100vh) rotate(720deg); }
    }
    
    @keyframes emojiFall {
        0% { transform: translateY(0) rotate(0deg); }
        100% { transform: translateY(200px) rotate(360deg); opacity: 0; }
    }
    
    @keyframes wiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-10deg); }
        75% { transform: rotate(10deg); }
    }
    
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes grow {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .sakura-filter {
        background: linear-gradient(135deg, rgba(255, 182, 193, 0.7) 0%, rgba(255, 255, 255, 0.9) 100%);
        border: 3px solid #ffb6c1;
    }
    
    .shojo-filter {
        background: linear-gradient(135deg, rgba(173, 216, 230, 0.7) 0%, rgba(255, 255, 255, 0.9) 100%);
        border: 3px solid #add8e6;
        box-shadow: 0 0 20px rgba(173, 216, 230, 0.5);
    }
`;
document.head.appendChild(styleSheet);

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add CSS for responsive design
const responsiveCSS = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            flex-direction: column;
            background-color: white;
            transition: left 0.3s ease;
            box-shadow: 0 10px 15px rgba(0,0,0,0.1);
            padding: 20px 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-link {
            margin: 5px 20px;
            padding: 15px;
        }
        
        .menu-toggle {
            display: block;
        }
        
        .hero {
            flex-direction: column;
            text-align: center;
        }
        
        .hero-text {
            padding-right: 0;
            margin-bottom: 40px;
        }
        
        .title {
            font-size: 3.5rem;
        }
        
        .subtitle {
            font-size: 2rem;
        }
        
        .section-title {
            font-size: 2.5rem;
        }
        
        .cta-buttons {
            justify-content: center;
        }
        
        .animation-controls, .letter-actions {
            flex-direction: column;
            align-items: center;
        }
        
        .animation-controls button, .letter-actions button {
            width: 100%;
            max-width: 300px;
            margin-bottom: 10px;
        }
        
        .games-container {
            flex-direction: column;
        }
        
        .cute-elements {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    
    @media (max-width: 480px) {
        .title {
            font-size: 2.8rem;
        }
        
        .subtitle {
            font-size: 1.8rem;
        }
        
        .section-title {
            font-size: 2rem;
        }
        
        .quotes-container, .cute-elements {
            grid-template-columns: 1fr;
        }
        
        .apology-list {
            grid-template-columns: 1fr;
        }
    }
`;

const responsiveStyle = document.createElement('style');
responsiveStyle.textContent = responsiveCSS;
document.head.appendChild(responsiveStyle);