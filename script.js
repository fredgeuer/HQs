document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const fadeInElements = document.querySelectorAll('.fade-in');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const liveNotification = document.getElementById('live-notification');

    let countdownTime = 15 * 60;
    let spotsLeft = 47;
    let viewersCount = Math.floor(Math.random() * 50) + 100;

    const cities = [
        'São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG', 'Curitiba, PR',
        'Porto Alegre, RS', 'Salvador, BA', 'Brasília, DF', 'Recife, PE',
        'Fortaleza, CE', 'Campinas, SP', 'Florianópolis, SC', 'Goiânia, GO'
    ];

    const names = [
        'Carlos', 'Ana', 'Pedro', 'Mariana', 'Lucas', 'Julia', 'Rafael', 
        'Beatriz', 'Gabriel', 'Fernanda', 'Bruno', 'Amanda', 'Felipe',
        'Camila', 'Ricardo', 'Patricia', 'Diego', 'Letícia'
    ];

    function updateCountdown() {
        const minutes = Math.floor(countdownTime / 60);
        const seconds = countdownTime % 60;
        const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        const countdownElements = document.querySelectorAll('#countdown, #hero-countdown, #purchase-countdown');
        countdownElements.forEach(el => {
            if (el) {
                el.textContent = timeString;
                if (countdownTime < 300) {
                    el.style.color = '#ef4444';
                }
            }
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
        const randomDecrease = Math.random() < 0.12;
        if (randomDecrease && spotsLeft > 12) {
            spotsLeft--;
            const spotElements = document.querySelectorAll('#spots-left, #final-spots');
            spotElements.forEach(el => {
                if (el) {
                    el.textContent = spotsLeft;
                    el.style.color = spotsLeft < 25 ? '#ef4444' : '#fbbf24';
                    
                    el.style.transform = 'scale(1.3)';
                    el.style.transition = 'transform 0.3s ease';
                    setTimeout(() => {
                        el.style.transform = 'scale(1)';
                    }, 300);
                }
            });
        }
    }

    setInterval(updateSpots, 7000);

    function updateViewers() {
        const change = Math.random() < 0.5 ? 1 : -1;
        const variation = Math.floor(Math.random() * 5);
        viewersCount = Math.max(85, Math.min(155, viewersCount + (change * variation)));
        
        const viewersElement = document.getElementById('viewers-count');
        if (viewersElement) {
            viewersElement.textContent = viewersCount;
            viewersElement.style.transition = 'color 0.3s ease';
            viewersElement.style.color = '#fbbf24';
            setTimeout(() => {
                viewersElement.style.color = '';
            }, 300);
        }
    }

    setInterval(updateViewers, 12000);

    function showPurchaseNotification() {
        if (!liveNotification) return;

        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        const randomMinutes = Math.floor(Math.random() * 15) + 1;
        
        const messages = [
            `${randomName} de ${randomCity} acabou de garantir o acesso!`,
            `${randomName} de ${randomCity} comprou há ${randomMinutes} min`,
            `${randomName} de ${randomCity} garantiu a vaga agora`,
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        const notificationText = document.getElementById('notification-text');
        if (notificationText) {
            notificationText.textContent = randomMessage;
        }
        
        liveNotification.classList.add('show');
        
        setTimeout(() => {
            liveNotification.classList.remove('show');
        }, 5000);
    }

    setTimeout(showPurchaseNotification, 8000);
    setInterval(showPurchaseNotification, 25000);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        fadeInElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight - 80 && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    });

    const initialCheck = () => {
        fadeInElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight - 80 && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    };
    
    initialCheck();
    setTimeout(initialCheck, 100);

    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight + 50;
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
            this.style.transform = 'translateY(-12px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.08}s`;
    });

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('pulse')) {
                this.style.transform = 'translateY(-3px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('pulse')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    const createParallax = () => {
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                heroBackground.style.transform = `translateY(${scrolled * 0.4}px)`;
            });
        }
    };
    
    createParallax();

    const stats = document.querySelectorAll('.stat-animated .stat-number');
    let hasAnimated = false;
    
    const animateStats = () => {
        if (hasAnimated) return;
        
        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            hasAnimated = true;
            stats.forEach(stat => {
                const target = parseFloat(stat.getAttribute('data-target'));
                const isDecimal = target % 1 !== 0;
                const suffix = stat.parentElement.querySelector('.stat-label').textContent.includes('Nota') ? '★' : 
                               stat.parentElement.querySelector('.stat-label').textContent.includes('Recomendam') ? '%' : '';
                
                if (isDecimal) {
                    animateNumber(stat, 0, target, 2500, suffix, true);
                } else {
                    animateNumber(stat, 0, target, 2500, suffix, false);
                }
            });
        }
    };
    
    function animateNumber(element, start, end, duration, suffix = '', isDecimal = false) {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            let current;
            if (isDecimal) {
                current = start + (end - start) * easeOutQuart;
                element.textContent = current.toFixed(1) + suffix;
            } else {
                current = Math.floor(start + (end - start) * easeOutQuart);
                element.textContent = current.toLocaleString('pt-BR') + suffix;
            }
            
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
                const text = stat.textContent.trim();
                
                if (text.includes('%')) {
                    animateNumber(stat, 0, 98, 2800, '%', false);
                } else if (text.includes('★')) {
                    animateNumber(stat, 0, 4.8, 2800, '★', true);
                } else {
                    animateNumber(stat, 0, 22847, 2800, '', false);
                }
            });
        }
    };
    
    window.addEventListener('scroll', animateBigStats);
    animateBigStats();

    if (mobileMenuBtn) {
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
                nav.style.borderTop = '2px solid rgba(139, 92, 246, 0.3)';
                nav.style.zIndex = '999';
                nav.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.5)';
            }
            
            this.classList.toggle('active');
        });
    }

    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        answer.style.maxHeight = '500px';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'all 0.4s ease';
        
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
            ripple.style.width = '25px';
            ripple.style.height = '25px';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple-animation 0.7s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 700);
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(25);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    const purchaseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const purchaseBtn = entry.target.querySelector('.btn-purchase');
                if (purchaseBtn && !purchaseBtn.classList.contains('pulse')) {
                    purchaseBtn.classList.add('pulse');
                }
            }
        });
    }, { threshold: 0.3 });

    const purchaseSection = document.querySelector('.purchase');
    if (purchaseSection) {
        purchaseObserver.observe(purchaseSection);
    }


    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100 + (index * 150));
    });

    const bonusItems = document.querySelectorAll('.bonus-item');
    bonusItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const guaranteeBadge = document.querySelector('.guarantee-badge');
    if (guaranteeBadge) {
        setInterval(() => {
            guaranteeBadge.style.transform = 'scale(1.05)';
            setTimeout(() => {
                guaranteeBadge.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }

    console.log('🎨 HQs Premium - Landing Page ULTRA PREMIUM carregada!');
    console.log('✨ Versão 2.0 - Persuasão Máxima Ativada');
    console.log('⏰ Contador regressivo: ATIVO');
    console.log('📊 Sistema de escassez dinâmico: ATIVO');
    console.log('👥 Contador de visualizações ao vivo: ATIVO');
    console.log('🔔 Notificações de compra em tempo real: ATIVAS');
    console.log('🎯 Persuasão otimizada para conversão MÁXIMA');
    console.log(`📈 Números atualizados: 22.847 leitores | Nota 4.8★`);
});
