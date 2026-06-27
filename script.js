/* ============================================
   APOLOGY WEBSITE - INTERACTIVE SCRIPT
   For my best friend ❤️
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // DOM ELEMENTS
    // ============================================
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const cursorGlow = document.getElementById('cursor-glow');
    const cursorDot = document.getElementById('cursor-dot');
    const scrollProgress = document.getElementById('scroll-progress');
    const particleCanvas = document.getElementById('particle-canvas');
    const fireflyCanvas = document.getElementById('firefly-canvas');
    const sparkleContainer = document.getElementById('sparkle-container');
    const floatingEmojisContainer = document.getElementById('floating-emojis');
    const backToTop = document.getElementById('back-to-top');
    const musicPlayer = document.getElementById('music-player');
    const musicToggle = document.getElementById('music-toggle');
    const musicPanel = document.getElementById('music-panel');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const musicProgressFill = document.getElementById('music-progress-fill');
    const musicTime = document.getElementById('music-time');
    const heroHeading = document.getElementById('hero-heading');
    const heartScrollBtn = document.getElementById('heart-scroll-btn');
    const musicAudio = document.getElementById('music-audio');
    const storyCards = document.querySelectorAll('.story-card');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const noText = document.getElementById('no-text');
    const yesResponse = document.getElementById('yes-response');
    const responseHearts = document.getElementById('response-hearts');
    const secretHeart = document.getElementById('secret-heart');
    const secretPopup = document.getElementById('secret-popup');
    const popupClose = document.getElementById('popup-close');
    const letterCard = document.getElementById('letter-card');
    const letterBodyParagraphs = document.querySelectorAll('.letter-body p');
    const endingStars = document.getElementById('ending-stars');
    const endingHearts = document.getElementById('ending-hearts');
    const heroHearts = document.getElementById('hero-hearts');
    const photoPopup = document.getElementById('photo-popup');
    const photoPopupClose = document.getElementById('photo-popup-close');
    const photoItems = document.querySelectorAll('.photo-item');
    const photoPrevBtn = document.getElementById('photo-prev');
    const photoNextBtn = document.getElementById('photo-next');
    const secretVideoPlayer = document.getElementById('secret-video-player');
    const videoDownloadBtn = document.getElementById('video-download-btn');

    // ============================================
    // STATE
    // ============================================
    let noAttempts = 0;
    let currentPhotoIndex = 0;
    let isMusicPlaying = false;
    let musicProgress = 0;
    let musicInterval = null;
    const totalMusicDuration = 225; // 3:45 in seconds
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    // ============================================
    // LOADING SCREEN
    // ============================================
    function initLoading() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                mainContent.classList.add('visible');
                startTypewriter();
                createHeroFloatingHearts();
            }, 800);
        }, 2800);
    }

    // ============================================
    // CUSTOM CURSOR
    // ============================================
    function initCursor() {
        if (isTouchDevice) return;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;

            cursorGlow.style.left = cursorX + 'px';
            cursorGlow.style.top = cursorY + 'px';
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('button, a, .glass-card, .magnetic-btn, .secret-heart');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorGlow.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursorGlow.classList.remove('hovering'));
        });
    }

    // ============================================
    // SCROLL PROGRESS
    // ============================================
    function initScrollProgress() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = progress + '%';

            // Back to top visibility
            if (scrollTop > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================
    // TYPEWRITER EFFECT
    // ============================================
    function startTypewriter() {
        const text = "I Owe You a Huge Sorry ❤️";
        let index = 0;

        function type() {
            if (index < text.length) {
                heroHeading.textContent += text.charAt(index);
                index++;
                setTimeout(type, 80);
            }
        }
        type();
    }

    // ============================================
    // HERO FLOATING HEARTS
    // ============================================
    function createHeroFloatingHearts() {
        const hearts = ['❤️', '💕', '💖', '💗', '💝'];
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.className = 'hero-floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.animationDelay = (Math.random() * 3) + 's';
            heart.style.animationDuration = (3 + Math.random() * 2) + 's';
            heroHearts.appendChild(heart);
        }
    }

    // ============================================
    // SMOOTH SCROLL TO STORY
    // ============================================
    heartScrollBtn.addEventListener('click', () => {
        document.getElementById('story').scrollIntoView({ behavior: 'smooth' });
    });

    // ============================================
    // PARTICLE SYSTEM
    // ============================================
    function initParticles() {
        const ctx = particleCanvas.getContext('2d');
        let particles = [];
        const particleCount = isTouchDevice ? 30 : 60;

        function resize() {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * particleCanvas.width;
                this.y = Math.random() * particleCanvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.color = ['#ff9a9e', '#e0c3fc', '#fecdd3', '#a78bfa', '#fda4af'][Math.floor(Math.random() * 5)];
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > particleCanvas.width || this.y < 0 || this.y > particleCanvas.height) {
                    this.reset();
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        }
        animate();
    }

    // ============================================
    // FIREFLY SYSTEM
    // ============================================
    function initFireflies() {
        const ctx = fireflyCanvas.getContext('2d');
        let fireflies = [];
        const fireflyCount = isTouchDevice ? 15 : 30;

        function resize() {
            fireflyCanvas.width = window.innerWidth;
            fireflyCanvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        class Firefly {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * fireflyCanvas.width;
                this.y = Math.random() * fireflyCanvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.8;
                this.speedY = (Math.random() - 0.5) * 0.8;
                this.opacity = Math.random() * 0.6 + 0.2;
                this.pulseSpeed = Math.random() * 0.02 + 0.01;
                this.pulsePhase = Math.random() * Math.PI * 2;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.pulsePhase += this.pulseSpeed;
                this.opacity = 0.3 + Math.sin(this.pulsePhase) * 0.3;
                if (this.x < 0 || this.x > fireflyCanvas.width || this.y < 0 || this.y > fireflyCanvas.height) {
                    this.reset();
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = '#fff5cc';
                ctx.globalAlpha = this.opacity;
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#fff5cc';
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;
            }
        }

        for (let i = 0; i < fireflyCount; i++) {
            fireflies.push(new Firefly());
        }

        function animate() {
            ctx.clearRect(0, 0, fireflyCanvas.width, fireflyCanvas.height);
            fireflies.forEach(f => { f.update(); f.draw(); });
            requestAnimationFrame(animate);
        }
        animate();
    }

    // ============================================
    // MOUSE TRAIL PARTICLES
    // ============================================
    function initMouseTrail() {
        if (isTouchDevice) return;

        let trailParticles = [];

        document.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.7) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    left: ${e.clientX}px;
                    top: ${e.clientY}px;
                    width: ${Math.random() * 6 + 2}px;
                    height: ${Math.random() * 6 + 2}px;
                    background: ${['#ff9a9e', '#e0c3fc', '#fecdd3', '#a78bfa'][Math.floor(Math.random() * 4)]};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9990;
                    opacity: 0.8;
                    transition: all 1s ease-out;
                `;
                document.body.appendChild(particle);

                requestAnimationFrame(() => {
                    particle.style.transform = `translate(${(Math.random() - 0.5) * 40}px, ${(Math.random() - 0.5) * 40}px) scale(0)`;
                    particle.style.opacity = '0';
                });

                setTimeout(() => particle.remove(), 1000);
            }
        });
    }

    // ============================================
    // INTERSECTION OBSERVER - STORY CARDS
    // ============================================
    function initStoryObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

        storyCards.forEach(card => observer.observe(card));
    }

    // ============================================
    // INTERSECTION OBSERVER - LETTER PARAGRAPHS
    // ============================================
    function initLetterObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 150);
                }
            });
        }, { threshold: 0.2 });

        letterBodyParagraphs.forEach(p => observer.observe(p));
    }

    // ============================================
    // 3D TILT CARDS
    // ============================================
    function initTiltCards() {
        if (isTouchDevice) return;

        const tiltCards = document.querySelectorAll('.tilt-card');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // ============================================
    // NO BUTTON BEHAVIORS (16 different behaviors)
    // ============================================
    const noBehaviors = [
        // 1. Move away from cursor
        () => {
            const rect = btnNo.getBoundingClientRect();
            const offsetX = (Math.random() - 0.5) * 200;
            const offsetY = (Math.random() - 0.5) * 200;
            btnNo.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            setTimeout(() => { btnNo.style.transform = ''; }, 800);
        },
        // 2. Teleport
        () => {
            btnNo.classList.add('teleporting');
            const x = Math.random() * (window.innerWidth - 200) + 50;
            const y = Math.random() * (window.innerHeight - 100) + 50;
            btnNo.style.position = 'fixed';
            btnNo.style.left = x + 'px';
            btnNo.style.top = y + 'px';
            btnNo.style.zIndex = '9999';
            setTimeout(() => {
                btnNo.style.position = '';
                btnNo.style.left = '';
                btnNo.style.top = '';
                btnNo.style.zIndex = '';
                btnNo.classList.remove('teleporting');
            }, 1000);
        },
        // 3. Rotate 360
        () => {
            btnNo.style.transition = 'transform 0.6s ease';
            btnNo.style.transform = 'rotate(360deg)';
            setTimeout(() => { btnNo.style.transform = ''; btnNo.style.transition = ''; }, 700);
        },
        // 4. Shrink
        () => {
            btnNo.classList.add('shrinking');
            setTimeout(() => btnNo.classList.remove('shrinking'), 600);
        },
        // 5. Grow huge
        () => {
            btnNo.classList.add('growing');
            setTimeout(() => btnNo.classList.remove('growing'), 600);
        },
        // 6. Flip horizontally
        () => {
            btnNo.classList.add('flipping');
            setTimeout(() => btnNo.classList.remove('flipping'), 600);
        },
        // 7. Bounce
        () => {
            btnNo.classList.add('bouncing');
            setTimeout(() => btnNo.classList.remove('bouncing'), 700);
        },
        // 8. Run around screen
        () => {
            btnNo.classList.add('running');
            setTimeout(() => btnNo.classList.remove('running'), 1100);
        },
        // 9. Swap with YES
        () => {
            const yesRect = btnYes.getBoundingClientRect();
            const noRect = btnNo.getBoundingClientRect();
            btnYes.style.transition = 'transform 0.5s ease';
            btnNo.style.transition = 'transform 0.5s ease';
            btnYes.style.transform = `translate(${noRect.left - yesRect.left}px, ${noRect.top - yesRect.top}px)`;
            btnNo.style.transform = `translate(${yesRect.left - noRect.left}px, ${yesRect.top - noRect.top}px)`;
            setTimeout(() => {
                btnYes.style.transform = '';
                btnNo.style.transform = '';
                btnYes.style.transition = '';
                btnNo.style.transition = '';
            }, 600);
        },
        // 10. Become transparent
        () => {
            btnNo.classList.add('transparent');
            setTimeout(() => btnNo.classList.remove('transparent'), 600);
        },
        // 11. Become blurred
        () => {
            btnNo.classList.add('blurred');
            setTimeout(() => btnNo.classList.remove('blurred'), 600);
        },
        // 12. Jump diagonally
        () => {
            btnNo.classList.add('jumping');
            setTimeout(() => btnNo.classList.remove('jumping'), 700);
        },
        // 13. Spin continuously
        () => {
            btnNo.classList.add('spinning');
            setTimeout(() => btnNo.classList.remove('spinning'), 900);
        },
        // 14. Hide for 2 seconds
        () => {
            btnNo.classList.add('hiding');
            setTimeout(() => btnNo.classList.remove('hiding'), 2200);
        },
        // 15. Duplicate
        () => {
            btnNo.setAttribute('data-text', noText.textContent);
            btnNo.classList.add('duplicating');
            setTimeout(() => btnNo.classList.remove('duplicating'), 900);
        },
        // 16. Display funny text
        () => {
            const funnyTexts = [
                "Nice try 😂",
                "Nope 😝",
                "You almost got me",
                "I know you want to click Yes",
                "Not happening 😏",
                "Keep trying 😜",
                "Wrong button! 😅",
                "Are you sure? 🤔"
            ];
            const originalText = noText.textContent;
            noText.textContent = funnyTexts[Math.floor(Math.random() * funnyTexts.length)];
            setTimeout(() => { noText.textContent = originalText; }, 1500);
        }
    ];

    const noFunnyTexts = [
        "Nice try 😂", "Nope 😝", "You almost got me", "I know you want to click Yes",
        "Not happening 😏", "Keep trying 😜", "Wrong button! 😅", "Are you sure? 🤔"
    ];

    btnNo.addEventListener('mouseenter', () => {
        noAttempts++;

        // After many attempts, change text
        if (noAttempts > 8) {
            noText.textContent = "Okay okay...just click YES 😭";
        } else if (noAttempts > 4) {
            noText.textContent = noFunnyTexts[Math.floor(Math.random() * noFunnyTexts.length)];
        }

        // Random behavior
        const behaviorIndex = Math.floor(Math.random() * noBehaviors.length);
        noBehaviors[behaviorIndex]();

        // Make YES more attractive
        makeYesAttractive();
    });

    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        noAttempts++;
        const behaviorIndex = Math.floor(Math.random() * noBehaviors.length);
        noBehaviors[behaviorIndex]();
    });

    // ============================================
    // YES BUTTON ATTRACTIVE EFFECTS
    // ============================================
    function makeYesAttractive() {
        btnYes.classList.add('attractive', 'glowing', 'pulsing');

        // Emit hearts from YES button
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createHeartFromElement(btnYes);
            }, i * 100);
        }

        setTimeout(() => {
            btnYes.classList.remove('attractive', 'glowing', 'pulsing');
        }, 1500);
    }

    function createHeartFromElement(element) {
        const heart = document.createElement('div');
        heart.textContent = ['❤️', '💕', '💖'][Math.floor(Math.random() * 3)];
        heart.style.cssText = `
            position: fixed;
            font-size: 1.2rem;
            pointer-events: none;
            z-index: 9999;
            animation: heartFloatUp 1.5s ease-out forwards;
        `;
        const rect = element.getBoundingClientRect();
        heart.style.left = (rect.left + rect.width / 2) + 'px';
        heart.style.top = (rect.top) + 'px';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1500);
    }

    // Add heart float animation
    const heartFloatStyle = document.createElement('style');
    heartFloatStyle.textContent = `
        @keyframes heartFloatUp {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-80px) scale(0.5); opacity: 0; }
        }
    `;
    document.head.appendChild(heartFloatStyle);

    // ============================================
    // YES BUTTON CLICK - CONFETTI & CELEBRATION
    // ============================================
    btnYes.addEventListener('click', () => {
        // Confetti explosion
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff9a9e', '#e0c3fc', '#fecdd3', '#a78bfa', '#fda4af', '#ff6b8a']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff9a9e', '#e0c3fc', '#fecdd3', '#a78bfa', '#fda4af', '#ff6b8a']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());

        // Hearts explosion
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createHeartFromElement(btnYes);
            }, i * 50);
        }

        // Sparkle burst
        const rect = btnYes.getBoundingClientRect();
        for (let i = 0; i < 30; i++) {
            createSparkle(
                rect.left + rect.width / 2 + (Math.random() - 0.5) * 100,
                rect.top + rect.height / 2 + (Math.random() - 0.5) * 100
            );
        }

        // Show response
        yesResponse.classList.remove('hidden');

        // Fill response hearts
        responseHearts.innerHTML = '';
        const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💞'];
        for (let i = 0; i < 6; i++) {
            const span = document.createElement('span');
            span.textContent = heartEmojis[i];
            span.style.animation = `heartbeat 1s ease-in-out ${i * 0.2}s infinite`;
            span.style.display = 'inline-block';
            responseHearts.appendChild(span);
        }

        // Hide buttons
        btnYes.style.display = 'none';
        btnNo.style.display = 'none';
        document.querySelector('.forgiveness-question').textContent = "Thank you for forgiving me! ❤️";
    });

    // ============================================
    // SPARKLES ON CLICK
    // ============================================
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.background = ['#ff9a9e', '#e0c3fc', '#fff', '#fecdd3', '#a78bfa'][Math.floor(Math.random() * 5)];
        sparkleContainer.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }

    document.addEventListener('click', (e) => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createSparkle(
                    e.clientX + (Math.random() - 0.5) * 30,
                    e.clientY + (Math.random() - 0.5) * 30
                );
            }, i * 30);
        }
    });

    // ============================================
    // FLOATING HEARTS ON HEART CLICK
    // ============================================
    document.addEventListener('click', (e) => {
        if (e.target.closest('.glowing-heart-btn') || e.target.textContent === '❤️') {
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.textContent = ['❤️', '💕', '💖', '💗'][Math.floor(Math.random() * 4)];
                    heart.style.cssText = `
                        position: fixed;
                        left: ${e.clientX + (Math.random() - 0.5) * 60}px;
                        top: ${e.clientY + (Math.random() - 0.5) * 60}px;
                        font-size: ${1 + Math.random()}rem;
                        pointer-events: none;
                        z-index: 9999;
                        animation: heartFloatUp 1.5s ease-out forwards;
                    `;
                    document.body.appendChild(heart);
                    setTimeout(() => heart.remove(), 1500);
                }, i * 80);
            }
        }
    });

    // ============================================
    // SECRET HEART
    // ============================================
    secretHeart.addEventListener('click', () => {
        secretPopup.classList.add('visible');
        // Confetti burst
        confetti({
            particleCount: 30,
            spread: 70,
            origin: { x: 0.8, y: 0.8 },
            colors: ['#ff9a9e', '#e0c3fc', '#fecdd3', '#a78bfa'],
            shapes: ['circle']
        });
    });

    popupClose.addEventListener('click', () => {
        secretPopup.classList.remove('visible');
    });

    secretPopup.addEventListener('click', (e) => {
        if (e.target === secretPopup) {
            secretPopup.classList.remove('visible');
        }
    });

    // ============================================
    // MUSIC PLAYER
    // ============================================
    musicToggle.addEventListener('click', () => {
        musicPanel.classList.toggle('hidden');
    });

    playBtn.addEventListener('click', () => {
        isMusicPlaying = true;
        playBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
        if (musicAudio) {
            musicAudio.play().catch(err => console.log('Audio play error:', err));
        }
        startMusicProgress();
    });

    pauseBtn.addEventListener('click', () => {
        isMusicPlaying = false;
        pauseBtn.classList.add('hidden');
        playBtn.classList.remove('hidden');
        if (musicAudio) {
            musicAudio.pause();
        }
        stopMusicProgress();
    });

    function startMusicProgress() {
        if (musicInterval) clearInterval(musicInterval);
        musicInterval = setInterval(() => {
            if (!isMusicPlaying || !musicAudio) return;
            updateMusicUI();
        }, 100);
    }

    function stopMusicProgress() {
        if (musicInterval) clearInterval(musicInterval);
    }

    function updateMusicUI() {
        if (!musicAudio) return;
        const currentTime = musicAudio.currentTime || 0;
        const duration = musicAudio.duration || totalMusicDuration;
        const progressPercent = (currentTime / duration) * 100;
        musicProgressFill.style.width = progressPercent + '%';

        const currentMin = Math.floor(currentTime / 60);
        const currentSec = Math.floor(currentTime % 60);
        const totalMin = Math.floor(duration / 60);
        const totalSec = Math.floor(duration % 60);
        musicTime.textContent = `${currentMin}:${currentSec.toString().padStart(2, '0')} / ${totalMin}:${totalSec.toString().padStart(2, '0')}`;
    }

    volumeSlider.addEventListener('input', () => {
        const volume = volumeSlider.value;
        if (musicAudio) {
            musicAudio.volume = volume / 100;
        }
        musicProgressFill.style.opacity = 0.5 + (volume / 200);
    });

    // Handle audio end
    if (musicAudio) {
        musicAudio.addEventListener('ended', () => {
            isMusicPlaying = false;
            pauseBtn.classList.add('hidden');
            playBtn.classList.remove('hidden');
            stopMusicProgress();
            musicProgress = 0;
            updateMusicUI();
        });

        // Set initial volume
        musicAudio.volume = 0.5;
    }

    // ============================================
    // FLOATING EMOJIS
    // ============================================
    function spawnFloatingEmoji() {
        const emojis = ['❤️', '💕', '💖', '✨', '🌸', '💫', '🦋', '☁️', '🌙', '⭐'];
        const emoji = document.createElement('div');
        emoji.className = 'floating-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.animationDuration = (8 + Math.random() * 10) + 's';
        emoji.style.animationDelay = (Math.random() * 5) + 's';
        floatingEmojisContainer.appendChild(emoji);

        setTimeout(() => {
            if (emoji.parentNode) emoji.remove();
        }, 20000);
    }

    // Spawn floating emojis periodically
    setInterval(spawnFloatingEmoji, 3000);
    for (let i = 0; i < 5; i++) spawnFloatingEmoji();

    // ============================================
    // HEART RAIN
    // ============================================
    function createHeartRain() {
        const heart = document.createElement('div');
        heart.className = 'heart-rain';
        heart.textContent = ['❤️', '💕', '💖'][Math.floor(Math.random() * 3)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (4 + Math.random() * 3) + 's';
        heart.style.fontSize = (1 + Math.random()) + 'rem';
        document.body.appendChild(heart);

        setTimeout(() => {
            if (heart.parentNode) heart.remove();
        }, 8000);
    }

    // Occasional heart rain
    setInterval(() => {
        if (Math.random() > 0.7) {
            for (let i = 0; i < 5; i++) {
                setTimeout(createHeartRain, i * 300);
            }
        }
    }, 8000);

    // ============================================
    // ENDING SECTION - STARS & HEARTS
    // ============================================
    function createEndingDecorations() {
        const stars = ['⭐', '✨', '💫', '🌟'];
        const hearts = ['❤️', '💕', '💖', '💗', '💝'];

        for (let i = 0; i < 15; i++) {
            const star = document.createElement('span');
            star.className = 'ending-star';
            star.textContent = stars[Math.floor(Math.random() * stars.length)];
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = (Math.random() * 2) + 's';
            endingStars.appendChild(star);
        }

        for (let i = 0; i < 12; i++) {
            const heart = document.createElement('span');
            heart.className = 'ending-heart-particle';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.animationDelay = (Math.random() * 3) + 's';
            endingHearts.appendChild(heart);
        }
    }

    // ============================================
    // FIREWORKS
    // ============================================
    function createFirework(x, y) {
        const colors = ['#ff9a9e', '#e0c3fc', '#fecdd3', '#a78bfa', '#fda4af', '#fff', '#ff6b8a'];
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = color;
            particle.style.boxShadow = `0 0 6px ${color}`;

            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 50 + Math.random() * 100;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            document.body.appendChild(particle);

            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 500,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            }).onfinish = () => particle.remove();
        }
    }

    // Trigger fireworks when ending is visible
    const endingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Launch fireworks
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        createFirework(
                            Math.random() * window.innerWidth,
                            Math.random() * window.innerHeight * 0.5
                        );
                    }, i * 400);
                }

                // Heart rain
                for (let i = 0; i < 20; i++) {
                    setTimeout(createHeartRain, i * 200);
                }

                // Confetti
                confetti({
                    particleCount: 100,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: ['#ff9a9e', '#e0c3fc', '#fecdd3', '#a78bfa', '#fda4af', '#ff6b8a']
                });
            }
        });
    }, { threshold: 0.5 });

    endingObserver.observe(document.getElementById('ending'));

    // ============================================
    // MAGNETIC BUTTONS
    // ============================================
    function initMagneticButtons() {
        if (isTouchDevice) return;

        const magneticBtns = document.querySelectorAll('.magnetic-btn');

        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // ============================================
    // PARALLAX BACKGROUND
    // ============================================
    function initParallax() {
        const auroraBlobs = document.querySelectorAll('.aurora-blob');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            auroraBlobs.forEach((blob, index) => {
                const speed = 0.1 + (index * 0.05);
                blob.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });
    }

    // ============================================
    // BUTTON RIPPLE EFFECT
    // ============================================
    function initButtonRipples() {
        const buttons = document.querySelectorAll('button');

        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.4);
                    width: ${size}px;
                    height: ${size}px;
                    left: ${e.clientX - rect.left - size / 2}px;
                    top: ${e.clientY - rect.top - size / 2}px;
                    pointer-events: none;
                    animation: rippleEffect 0.6s ease-out forwards;
                `;
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleEffect {
            0% { transform: scale(0); opacity: 0.6; }
            100% { transform: scale(2.5); opacity: 0; }
        }
    `;
    document.head.appendChild(rippleStyle);

    // ============================================
    // PHOTOS GALLERY & POPUP
    // ============================================
    function initPhotosGallery() {
        // Open photo popup when clicking photo item
        photoItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentPhotoIndex = index;
                openPhotoPopup();
            });
        });

        // Close popup
        photoPopupClose.addEventListener('click', closePhotoPopup);
        
        // Navigation buttons
        photoPrevBtn.addEventListener('click', () => {
            currentPhotoIndex = (currentPhotoIndex - 1 + photoItems.length) % photoItems.length;
            openPhotoPopup();
        });

        photoNextBtn.addEventListener('click', () => {
            currentPhotoIndex = (currentPhotoIndex + 1) % photoItems.length;
            openPhotoPopup();
        });

        // Close popup when clicking overlay
        photoPopup.addEventListener('click', (e) => {
            if (e.target === photoPopup || e.target.classList.contains('photo-popup-overlay')) {
                closePhotoPopup();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (photoPopup.classList.contains('hidden')) return;
            if (e.key === 'ArrowLeft') {
                currentPhotoIndex = (currentPhotoIndex - 1 + photoItems.length) % photoItems.length;
                openPhotoPopup();
            } else if (e.key === 'ArrowRight') {
                currentPhotoIndex = (currentPhotoIndex + 1) % photoItems.length;
                openPhotoPopup();
            } else if (e.key === 'Escape') {
                closePhotoPopup();
            }
        });
    }

    function openPhotoPopup() {
        photoPopup.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Create confetti when opening photo
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 30,
                spread: 60,
                origin: { y: 0.6 }
            });
        }
    }

    function closePhotoPopup() {
        photoPopup.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    // ============================================
    // SECRET VIDEO FUNCTIONALITY
    // ============================================
    function initSecretVideo() {
        if (!videoDownloadBtn) return;

        videoDownloadBtn.addEventListener('click', () => {
            downloadVideo();
        });

        // Add confetti when video starts
        if (secretVideoPlayer) {
            secretVideoPlayer.addEventListener('play', () => {
                if (typeof confetti !== 'undefined') {
                    confetti({
                        particleCount: 25,
                        spread: 70,
                        origin: { y: 0.5 }
                    });
                }
            });
        }
    }

    function downloadVideo() {
        if (!secretVideoPlayer || !secretVideoPlayer.src && !secretVideoPlayer.querySelector('source')) {
            alert('Video not found. Please try again.');
            return;
        }

        // Get the video source
        let videoSrc = secretVideoPlayer.src;
        if (!videoSrc) {
            const source = secretVideoPlayer.querySelector('source');
            videoSrc = source ? source.src : null;
        }

        if (!videoSrc) {
            alert('Unable to get video source.');
            return;
        }

        // Create download link
        const link = document.createElement('a');
        link.href = videoSrc;
        link.download = 'secret-message.mp4' || videoSrc.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Show feedback
        const originalText = videoDownloadBtn.innerHTML;
        videoDownloadBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg><span>Downloaded!</span>';
        videoDownloadBtn.style.background = 'linear-gradient(135deg, #a78bfa, #7c3aed)';

        setTimeout(() => {
            videoDownloadBtn.innerHTML = originalText;
            videoDownloadBtn.style.background = '';
        }, 2000);
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    function init() {
        initLoading();
        initCursor();
        initScrollProgress();
        initParticles();
        initFireflies();
        initMouseTrail();
        initStoryObserver();
        initLetterObserver();
        initTiltCards();
        initMagneticButtons();
        initParallax();
        initButtonRipples();
        initPhotosGallery();
        initSecretVideo();
        createEndingDecorations();

        // Close music panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!musicPlayer.contains(e.target)) {
                musicPanel.classList.add('hidden');
            }
        });
    }

    // Start everything when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();