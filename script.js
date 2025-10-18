document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const fadeInElements = document.querySelectorAll('.fade-in');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');

    let countdownTime = 15 * 60;
    let spotsLeft = 47;

    function updateCountdown() {
        const minutes = Math.floor(countdownTime / 60);
        const seconds = countdownTime % 60;
        const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        const countdownElements = document.querySelectorAll('#countdown, #hero-countdown, #purchase-countdown');
        countdownElements.forEach(el => {
            if (el) el.textContent = timeString;
        });

        if (countdownTime > 0) {
            countdownTime--;
        } else {
            countdownTime = 15 * 60;
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    function updateSpots() {
        const randomDecrease = Math.random() < 0.15;
        if (randomDecrease && spotsLeft > 15) {
            spotsLeft--;
            const spotElements = document.querySelectorAll('#spots-left, #final-spots');
            spotElements.forEach(el => {
                if (el) {
                    el.textContent = spotsLeft;
                    el.style.color = spotsLeft < 30 ? '#ef4444' : '#fbbf24';
                    
                    el.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        el.style.transform = 'scale(1)';
                    }, 300);
                }
            });
        }
    }

    setInterval(updateSpots, 8000);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        fadeInElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    });

    const initialCheck = () => {
        fadeInElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    };
    
    initialCheck();

    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight + 40;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const comicCards = document.querySelectorAll('.comic-card');
    comicCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    const createParallax = () => {
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
            });
        }
    };
    
    createParallax();

    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const animateStats = () => {
        if (hasAnimated) return;
        
        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            hasAnimated = true;
            stats.forEach(stat => {
                const text = stat.textContent;
                const match = text.match(/(\d+)/);
                if (match) {
                    const number = parseInt(match[1]);
                    const suffix = text.replace(/[\d,.]/g, '');
                    animateNumber(stat, 0, number, 2000, suffix);
                }
            });
        }
    };
    
    function animateNumber(element, start, end, duration, suffix = '') {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            let displayValue = current.toLocaleString('pt-BR');
            
            if (suffix.includes('%')) {
                displayValue = current + suffix;
            } else if (suffix.includes('+')) {
                displayValue = current.toLocaleString('pt-BR') + '+';
            } else if (suffix.includes('★')) {
                displayValue = (current / 10).toFixed(1) + '★';
            } else {
                displayValue += suffix;
            }
            
            element.textContent = displayValue;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats();

    const bigStats = document.querySelectorAll('.stat-big');
    let hasBigStatsAnimated = false;
    
    const animateBigStats = () => {
        if (hasBigStatsAnimated) return;
        
        const statsSection = document.querySelector('.testimonial-stats');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            hasBigStatsAnimated = true;
            bigStats.forEach(stat => {
                const text = stat.textContent;
                const match = text.match(/(\d+)/);
                if (match) {
                    const number = parseInt(match[1].replace(/\./g, ''));
                    const suffix = text.replace(/[\d,.]/g, '');
                    animateNumber(stat, 0, number, 2500, suffix);
                }
            });
        }
    };
    
    window.addEventListener('scroll', animateBigStats);
    animateBigStats();

    mobileMenuBtn.addEventListener('click', function() {
        const nav = document.querySelector('.nav');
        const isVisible = nav.style.display === 'flex';
        
        if (isVisible) {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'flex';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.background = 'var(--darker-bg)';
            nav.style.flexDirection = 'column';
            nav.style.padding = '2rem';
            nav.style.gap = '1.5rem';
            nav.style.borderTop = '1px solid rgba(139, 92, 246, 0.2)';
            nav.style.zIndex = '999';
        }
        
        this.classList.toggle('active');
    });

    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        answer.style.maxHeight = '500px';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'all 0.3s ease';
        
        question.style.cursor = 'pointer';
        
        question.addEventListener('click', function() {
            item.classList.toggle('active');
        });
    });

    const ctaButtons = document.querySelectorAll('.btn-cta');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple-animation 0.6s ease-out';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(20);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    const purchaseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const purchaseBtn = entry.target.querySelector('.btn-purchase');
                if (purchaseBtn) {
                    purchaseBtn.style.animation = 'pulse 1.5s ease-in-out infinite';
                }
            }
        });
    }, { threshold: 0.5 });

    const purchaseSection = document.querySelector('.purchase');
    if (purchaseSection) {
        purchaseObserver.observe(purchaseSection);
    }

    window.addEventListener('beforeunload', function(e) {
        if (window.scrollY > 500) {
            e.preventDefault();
            e.returnValue = 'Tem certeza que deseja sair? Você perderá esta oferta especial de R$10!';
            return e.returnValue;
        }
    });

    let userInteracted = false;
    document.addEventListener('mousemove', function() {
        if (!userInteracted) {
            userInteracted = true;
        }
    });

    console.log('🎨 HQs Premium - Landing Page 2.0 carregada!');
    console.log('✨ Versão com gatilhos mentais e design nostálgico ativada');
    console.log('⏰ Contador regressivo iniciado');
    console.log('📊 Sistema de escassez ativado');
    console.log('🎯 Persuasão otimizada para conversão máxima');
});
