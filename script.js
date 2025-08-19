// JavaScript for language selection and navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar partículas flutuantes (respeita preferências de redução de movimento)
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
        initParticles();
    }
    
    // Efeito 3D sutil na logo principal (aplicado no container para compor com animação CSS da img)
    const homeContainer = document.querySelector('.container');
    const homeLogo = document.querySelector('.container .logo');
    if (homeContainer && homeLogo && !prefersReducedMotion) {
        let rafIdLogo = null;
        const maxTilt = 6; // graus
        const parallax = 8; // px

        const resetLogo = () => {
            homeContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
            // a img mantém sua própria animação CSS; evitamos sobrescrever transform dela
            homeLogo.style.filter = '';
        };

        const onMoveLogo = (e) => {
            const rect = homeLogo.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);  // -1..1
            const dy = (e.clientY - cy) / (rect.height / 2); // -1..1

            if (rafIdLogo) cancelAnimationFrame(rafIdLogo);
            rafIdLogo = requestAnimationFrame(() => {
                homeContainer.style.transform = `perspective(1000px) rotateX(${-dy * maxTilt}deg) rotateY(${dx * maxTilt}deg)`;
                // sutil destaque de luz
                homeLogo.style.filter = 'drop-shadow(0 12px 28px rgba(0,0,0,0.18)) drop-shadow(0 0 12px rgba(0,102,204,0.35))';
            });
        };

        const onLeaveLogo = () => {
            if (rafIdLogo) cancelAnimationFrame(rafIdLogo);
            homeContainer.style.transition = 'transform 160ms ease';
            resetLogo();
            setTimeout(() => { homeContainer.style.transition = ''; }, 180);
        };

        // Eventos no container, mas usando bounds da logo para direção
        homeContainer.addEventListener('mousemove', onMoveLogo);
        homeContainer.addEventListener('mouseleave', onLeaveLogo);
        homeContainer.addEventListener('focus', resetLogo, true);
        homeContainer.addEventListener('blur', resetLogo, true);

        // Suporte a movimento do dispositivo (mobile) para o efeito da logo
        const enableDeviceOrientationForLogo = () => {
            if (prefersReducedMotion) return;
            if (!('DeviceOrientationEvent' in window)) return;

            const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
            const handleOrientation = (e) => {
                const beta = e.beta || 0;   // inclinação frente-trás (-180..180)
                const gamma = e.gamma || 0; // inclinação esquerda-direita (-90..90)
                const dx = clamp(gamma / 45, -1, 1); // normaliza para -1..1
                const dy = clamp(beta / 45, -1, 1);

                if (rafIdLogo) cancelAnimationFrame(rafIdLogo);
                rafIdLogo = requestAnimationFrame(() => {
                    homeContainer.style.transform = `perspective(1000px) rotateX(${-dy * maxTilt}deg) rotateY(${dx * maxTilt}deg)`;
                    homeLogo.style.filter = 'drop-shadow(0 12px 28px rgba(0,0,0,0.18)) drop-shadow(0 0 12px rgba(0,102,204,0.35))';
                });
            };

            window.addEventListener('deviceorientation', handleOrientation, { passive: true });
        };

        // iOS 13+ requer permissão do usuário
        const tryRequestiOSPermission = () => {
            const DOE = window.DeviceOrientationEvent;
            if (DOE && typeof DOE.requestPermission === 'function') {
                const onFirstTouch = () => {
                    DOE.requestPermission().then((state) => {
                        if (state === 'granted') enableDeviceOrientationForLogo();
                    }).catch(() => {}).finally(() => {
                        window.removeEventListener('touchstart', onFirstTouch);
                    });
                };
                window.addEventListener('touchstart', onFirstTouch, { once: true });
            } else {
                // Android/desktop mobile sim: habilita direto
                enableDeviceOrientationForLogo();
            }
        };

        // Ativar apenas em dispositivos com toque
        if ('ontouchstart' in window) {
            tryRequestiOSPermission();
        }
    }
    
    console.log('Página carregada com sucesso!');

    // Prompt visível para habilitar movimento no iOS (iOS 13+ exige permissão)
    (function setupIOSMotionPrompt(){
        const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
        const DOE = window.DeviceOrientationEvent;
        if (!isIOS || !DOE || typeof DOE.requestPermission !== 'function' || prefersReducedMotion) return;

        const btn = document.createElement('button');
        btn.id = 'motion-permission-btn';
        btn.type = 'button';
        btn.textContent = 'Ativar efeitos de movimento';
        btn.style.position = 'fixed';
        btn.style.left = '50%';
        btn.style.bottom = '16px';
        btn.style.transform = 'translateX(-50%)';
        btn.style.zIndex = '9999';
        btn.style.padding = '10px 14px';
        btn.style.borderRadius = '999px';
        btn.style.border = 'none';
        btn.style.background = 'linear-gradient(135deg, #0066cc, #00cc99)';
        btn.style.color = '#fff';
        btn.style.fontSize = '14px';
        btn.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
        btn.style.cursor = 'pointer';

        const removeBtn = () => {
            if (btn && btn.parentNode) btn.parentNode.removeChild(btn);
            window.removeEventListener('deviceorientation', onAnyOrientation, true);
        };
        const onAnyOrientation = () => removeBtn();
        window.addEventListener('deviceorientation', onAnyOrientation, { once: true, passive: true });

        btn.addEventListener('click', () => {
            // Solicitar permissão explicitamente
            DOE.requestPermission().then(() => {
                // Após a permissão, nossos listeners por seção (registrados no touchstart) serão acionados
                // pelo próprio toque no botão. O botão será removido quando chegar algum evento de orientação.
            }).catch(() => {
                // Se negar, escondemos depois de um tempo para não ficar preso na tela
                setTimeout(removeBtn, 2000);
            });
        });

        document.body.appendChild(btn);
    })();
    
    // Hamburger menu functionality
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburgerMenu.contains(event.target) && 
                !navMenu.contains(event.target) && 
                navMenu.classList.contains('active')) {
                hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }

    // Header shadow on scroll
    const headerEl = document.querySelector('header');
    const toggleHeaderShadow = () => {
        if (!headerEl) return;
        if (window.scrollY > 10) headerEl.classList.add('scrolled');
        else headerEl.classList.remove('scrolled');
    };
    toggleHeaderShadow();
    window.addEventListener('scroll', toggleHeaderShadow, { passive: true });
        });
    }

    // Efeito 3D tilt/parallax na seção equipe
    const teamCards = document.querySelectorAll('#equipe .team-member');
    if (teamCards.length && !prefersReducedMotion) {
        teamCards.forEach(card => {
            const img = card.querySelector('.member-image img');
            let rafId = null;

            const reset = () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
                if (img) img.style.transform = 'scale(1) translate(0, 0)';
            };

            const onMove = (e) => {
                const rect = card.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = (e.clientX - cx) / (rect.width / 2);
                const dy = (e.clientY - cy) / (rect.height / 2);
                const maxTilt = 9; // maior inclinação para sensação mais rápida

                if (rafId) cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => {
                    card.style.transform = `perspective(1000px) rotateX(${-dy * maxTilt}deg) rotateY(${dx * maxTilt}deg)`;
                    if (img) {
                        const parallax = 9; // mais deslocamento para resposta mais dinâmica
                        img.style.transform = `scale(1.05) translate(${dx * parallax}px, ${dy * parallax}px)`;
                    }
                });
            };

            const onLeave = () => {
                if (rafId) cancelAnimationFrame(rafId);
                card.style.transition = 'transform 160ms ease';
                if (img) img.style.transition = 'transform 160ms ease';
                reset();
                setTimeout(() => {
                    card.style.transition = '';
                    if (img) img.style.transition = '';
                }, 180);
            };

            card.addEventListener('mousemove', onMove);
            card.addEventListener('mouseleave', onLeave);
            card.addEventListener('focus', reset, true);
            card.addEventListener('blur', reset, true);

            // Suporte a DeviceOrientation para cartões da equipe (mobile)
            const enableDeviceOrientationForTeam = () => {
                if (!('DeviceOrientationEvent' in window)) return;
                const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
                const maxTilt = 9;
                const parallax = 9;
                const handleOrientation = (e) => {
                    const beta = e.beta || 0;
                    const gamma = e.gamma || 0;
                    const dx = clamp(gamma / 45, -1, 1);
                    const dy = clamp(beta / 45, -1, 1);
                    if (rafId) cancelAnimationFrame(rafId);
                    rafId = requestAnimationFrame(() => {
                        card.style.transform = `perspective(1000px) rotateX(${-dy * maxTilt}deg) rotateY(${dx * maxTilt}deg)`;
                        if (img) img.style.transform = `scale(1.05) translate(${dx * parallax}px, ${dy * parallax}px)`;
                    });
                };
                window.addEventListener('deviceorientation', handleOrientation, { passive: true });
            };

            if ('ontouchstart' in window && !prefersReducedMotion) {
                const DOE = window.DeviceOrientationEvent;
                if (DOE && typeof DOE.requestPermission === 'function') {
                    const onFirstTouch = () => {
                        DOE.requestPermission().then((state) => {
                            if (state === 'granted') enableDeviceOrientationForTeam();
                        }).catch(() => {}).finally(() => {
                            window.removeEventListener('touchstart', onFirstTouch);
                        });
                    };
                    window.addEventListener('touchstart', onFirstTouch, { once: true });
                } else {
                    enableDeviceOrientationForTeam();
                }
            }
        });
    }
    
    // Get all flag elements
    const flags = document.querySelectorAll('.flag');
    
    // Add click event to each flag
    flags.forEach(flag => {
        flag.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            console.log(`Idioma selecionado: ${lang}`);
            
            // Call the translatePage function from translations.js
            if (typeof window.translatePage === 'function') {
                window.translatePage(lang);
            } else {
                console.error('Translation function not found!');
            }
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcular a posição considerando o header fixo
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Funcionalidade para o carrossel de depoimentos
    const testimonials = document.querySelectorAll('.testimonial-card');
    const testimonialsContainer = document.querySelector('#depoimento .testimonials-container');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    const indicators = document.querySelectorAll('.testimonial-indicator');
    let currentTestimonialIndex = 0;
    let autoRotateTimer = null;

    // Inicializa estados (primeiro ativo)
    if (testimonials.length > 0) {
        testimonials.forEach((el, idx) => {
            if (idx === 0) {
                el.classList.add('active');
                el.style.display = 'flex';
            } else {
                el.classList.remove('active');
                el.style.display = 'none';
            }
        });
        indicators.forEach((dot, idx) => dot.classList.toggle('active', idx === 0));
    }

    // Mostrar depoimento atual com classe .active
    function showTestimonial(index) {
        if (!testimonials.length) return;
        currentTestimonialIndex = (index + testimonials.length) % testimonials.length;

        testimonials.forEach((el, i) => {
            if (i === currentTestimonialIndex) {
                el.style.display = 'flex';
                // força reflow para transição suave quando adiciona .active
                void el.offsetWidth;
                el.classList.add('active');
            } else {
                el.classList.remove('active');
                // aguardar fim da transição antes de esconder para evitar salto
                setTimeout(() => { el.style.display = 'none'; }, 200);
            }
        });

        indicators.forEach((dot, i) => dot.classList.toggle('active', i === currentTestimonialIndex));
    }
    
    // Evento para o botão anterior
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showTestimonial(currentTestimonialIndex - 1);
            restartAutoRotate();
        });
    }
    
    // Evento para o botão próximo
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showTestimonial(currentTestimonialIndex + 1);
            restartAutoRotate();
        });
    }
    
    // Adicionar eventos de clique aos indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showTestimonial(index);
            restartAutoRotate();
        });
    });

    // Auto-rotação com pausa ao passar o mouse
    function startAutoRotate() {
        if (autoRotateTimer) return;
        autoRotateTimer = setInterval(() => {
            showTestimonial(currentTestimonialIndex + 1);
        }, 5000);
    }

    function stopAutoRotate() {
        if (autoRotateTimer) {
            clearInterval(autoRotateTimer);
            autoRotateTimer = null;
        }
    }

    function restartAutoRotate() {
        stopAutoRotate();
        startAutoRotate();
    }

    if (testimonialsContainer) {
        testimonialsContainer.addEventListener('mouseenter', stopAutoRotate);
        testimonialsContainer.addEventListener('mouseleave', startAutoRotate);
        startAutoRotate();
    }
    
    // Formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Coleta de dados do formulário
            const formData = new FormData(contactForm);
            const name = formData.get('name') || '';
            const email = formData.get('email') || '';
            const phone = formData.get('phone') || '';
            const subject = formData.get('subject') || '';
            const message = formData.get('message') || '';

            // Monta texto para WhatsApp
            const text = `Olá, sou ${name}.%0A` +
                         `Assunto: ${subject}%0A` +
                         `Telefone: ${phone}%0A` +
                         `E-mail: ${email}%0A%0A` +
                         `Mensagem:%0A${message}`;

            const waNumber = '5511992671271';
            const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

            // Redireciona para WhatsApp (abre WhatsApp Web/mobile)
            window.location.href = waUrl;
        });
    }
    
    // Animação de scroll para mostrar elementos quando visíveis
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    };
    
    // Executar animação no carregamento e no scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Código para a seção de projetos
    const projectCards = document.querySelectorAll('#projeto .project-card');
    
    // Intercept denied buttons (access restricted)
    document.querySelectorAll('.project-btn[data-denied="true"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = (window.currentLanguage || 'pt');
            const dict = (window.translations && window.translations[lang]) ? window.translations[lang] : {};
            const msg = dict['access_denied'] || 'Acesso negado.';
            alert(msg);
        });
    });
    
    // Função para verificar se o elemento está visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Função para animar os cards quando estiverem visíveis
    function animateProjectCards() {
        projectCards.forEach((card, index) => {
            if (isElementInViewport(card)) {
                // Adiciona classe com delay baseado no índice
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }
    // Executar animação de projetos no carregamento e em eventos de rolagem/redimensionamento
    animateProjectCards();
    window.addEventListener('scroll', animateProjectCards, { passive: true });
    window.addEventListener('resize', animateProjectCards);

    // Efeito 3D tilt/parallax nos cards de projetos
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (projectCards.length && !reduceMotion) {
        projectCards.forEach(card => {
            const img = card.querySelector('.project-image-container img');

            let rafId = null;
            const reset = () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
                if (img) img.style.transform = 'scale(1) translate(0, 0)';
            };

            const onMove = (e) => {
                const rect = card.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = (e.clientX - cx) / (rect.width / 2);  // -1..1
                const dy = (e.clientY - cy) / (rect.height / 2); // -1..1
                const maxTilt = 9; // graus - mais rápido/dinâmico

                // Usar RAF para suavizar
                if (rafId) cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => {
                    card.style.transform = `perspective(1000px) rotateX(${-dy * maxTilt}deg) rotateY(${dx * maxTilt}deg)`;
                    if (img) {
                        const parallax = 9; // deslocamento maior
                        img.style.transform = `scale(1.06) translate(${dx * parallax}px, ${dy * parallax}px)`;
                    }
                });
            };

            const onLeave = () => {
                if (rafId) cancelAnimationFrame(rafId);
                card.style.transition = 'transform 160ms ease';
                if (img) img.style.transition = 'transform 160ms ease';
                reset();
                setTimeout(() => {
                    card.style.transition = '';
                    if (img) img.style.transition = '';
                }, 180);
            };

            card.addEventListener('mousemove', onMove);
            card.addEventListener('mouseleave', onLeave);
            // Acessibilidade: focos via teclado resetam o tilt
            card.addEventListener('focus', reset, true);
            card.addEventListener('blur', reset, true);

            // Suporte a DeviceOrientation para cartões de projetos (mobile)
            const enableDeviceOrientationForProject = () => {
                if (!('DeviceOrientationEvent' in window)) return;
                const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
                const maxTilt = 9;
                const parallax = 9;
                const handleOrientation = (e) => {
                    const beta = e.beta || 0;
                    const gamma = e.gamma || 0;
                    const dx = clamp(gamma / 45, -1, 1);
                    const dy = clamp(beta / 45, -1, 1);
                    if (rafId) cancelAnimationFrame(rafId);
                    rafId = requestAnimationFrame(() => {
                        card.style.transform = `perspective(1000px) rotateX(${-dy * maxTilt}deg) rotateY(${dx * maxTilt}deg)`;
                        if (img) img.style.transform = `scale(1.06) translate(${dx * parallax}px, ${dy * parallax}px)`;
                    });
                };
                window.addEventListener('deviceorientation', handleOrientation, { passive: true });
            };

            if ('ontouchstart' in window && !reduceMotion) {
                const DOE = window.DeviceOrientationEvent;
                if (DOE && typeof DOE.requestPermission === 'function') {
                    const onFirstTouch = () => {
                        DOE.requestPermission().then((state) => {
                            if (state === 'granted') enableDeviceOrientationForProject();
                        }).catch(() => {}).finally(() => {
                            window.removeEventListener('touchstart', onFirstTouch);
                        });
                    };
                    window.addEventListener('touchstart', onFirstTouch, { once: true });
                } else {
                    enableDeviceOrientationForProject();
                }
            }
        });
    }
    
});

// Sistema de partículas flutuantes
function initParticles() {
    // Criar elemento canvas para as partículas
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    document.body.insertBefore(canvas, document.body.firstChild);
    
    // Estilizar o canvas para cobrir toda a tela
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Configurações das partículas
    const particlesArray = [];
    const numberOfParticles = 50;
    const colors = [
        'rgba(0, 102, 204, 0.3)',  // Azul (primário)
        'rgba(0, 204, 153, 0.3)',   // Verde (secundário)
        'rgba(255, 255, 255, 0.3)'   // Branco
    ];
    
    // Classe Partícula
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.glow = Math.random() * 5 + 3;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Verificar limites da tela
            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = this.glow;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.closePath();
        }
    }
    
    // Criar partículas
    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    // Animar partículas
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            
            // Conectar partículas próximas
            connectParticles(particlesArray[i], particlesArray);
        }
        
        requestAnimationFrame(animate);
    }
    
    // Conectar partículas com linhas
    function connectParticles(p1, particles) {
        const maxDistance = 150;
        
        for (let i = 0; i < particles.length; i++) {
            const p2 = particles[i];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
                const opacity = 1 - (distance / maxDistance);
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
    
    // Redimensionar canvas quando a janela for redimensionada
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Iniciar animação
    init();
    animate();
}
