document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');

            const isOpen = nav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isOpen);
            menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');

            // Icon transition
            const icon = menuToggle.querySelector('i');
            if (isOpen) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            if (menuToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Open navigation menu');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Smooth Scrolling with Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.principle-card, .philosophy-text, .philosophy-visual, .solution-item, .section-title');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    }

    // Add class for animation triggers
    document.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const header = document.querySelector('.header');

        if (scrolled > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    }, { passive: true });

    // CSS to support the js animations
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .in-view {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);

    // Video Sequencing (Crossfade Loop)
    const video1 = document.getElementById('hero-video-1');
    const video2 = document.getElementById('hero-video-2');

    if (video1 && video2) {
        // Helper to switch videos
        const switchVideo = (currentVideo, nextVideo) => {
            nextVideo.currentTime = 0;
            nextVideo.play().then(() => {
                nextVideo.classList.add('active');
                requestAnimationFrame(() => {
                    currentVideo.classList.remove('active');
                });
            }).catch(e => console.error("Video play error:", e));
        };

        video1.addEventListener('ended', () => {
            switchVideo(video1, video2);
        });

        video2.addEventListener('ended', () => {
            switchVideo(video2, video1);
        });
    }

    // Content Protection
    document.addEventListener('contextmenu', event => event.preventDefault());

    document.addEventListener('dragstart', event => event.preventDefault());

    document.addEventListener('keydown', event => {
        // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        if (event.key === 'F12' ||
            (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'J')) ||
            (event.ctrlKey && event.key === 'u') ||
            // Mac specific: Cmd+Opt+I, Cmd+Opt+U
            (event.metaKey && event.altKey && event.key === 'i') ||
            (event.metaKey && event.key === 'u')) {
            event.preventDefault();
        }
    });

});

// === HERO 3D PARTICLE NETWORK ===============================
(function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const N = 72;
    const LINK_DIST = 160;
    const SPREAD = 460;
    const FOV = 860;

    let W, H, cx, cy;
    let autoRotY = 0;
    let tiltX = 0, tiltY = 0, targetTiltX = 0, targetTiltY = 0;

    // Interpolate brand gradient: teal → cyan → blue
    function gradColor(t, a) {
        let r, g, b;
        if (t < 0.5) {
            const u = t * 2;
            r = (33 + (27 - 33) * u) | 0;
            g = (209 + (200 - 209) * u) | 0;
            b = (195 + (230 - 195) * u) | 0;
        } else {
            const u = (t - 0.5) * 2;
            r = 27;
            g = (200 + (103 - 200) * u) | 0;
            b = (230 + (198 - 230) * u) | 0;
        }
        return `rgba(${r},${g},${b},${a})`;
    }

    const nodes = Array.from({ length: N }, (_, i) => ({
        ox: (Math.random() - 0.5) * SPREAD * 2,
        oy: (Math.random() - 0.5) * SPREAD * 1.3,
        oz: (Math.random() - 0.5) * SPREAD * 2,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.16,
        vz: (Math.random() - 0.5) * 0.2,
        size: i < 6 ? Math.random() * 1.8 + 2.4 : Math.random() * 1.1 + 0.7,
        ct: Math.random(),
        ph: Math.random() * Math.PI * 2,
        hub: i < 6,
    }));

    function resize() {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
        cx = W / 2;
        cy = H / 2;
    }

    function project(x, y, z) {
        const d = FOV / (FOV + z + 400);
        return { sx: x * d + cx, sy: y * d + cy, d };
    }

    function xform(n) {
        const ry = autoRotY + tiltY;
        const cosY = Math.cos(ry), sinY = Math.sin(ry);
        const x1 = n.ox * cosY - n.oz * sinY;
        const z1 = n.ox * sinY + n.oz * cosY;
        const cosX = Math.cos(tiltX), sinX = Math.sin(tiltX);
        const y1 = n.oy * cosX - z1 * sinX;
        const z2 = n.oy * sinX + z1 * cosX;
        return { x: x1, y: y1, z: z2 };
    }

    function frame() {
        ctx.clearRect(0, 0, W, H);

        autoRotY += 0.0013;
        tiltX += (targetTiltX - tiltX) * 0.035;
        tiltY += (targetTiltY - tiltY) * 0.035;

        nodes.forEach(n => {
            n.ox += n.vx;
            n.oy += n.vy;
            n.oz += n.vz;
            if (Math.abs(n.ox) > SPREAD)        n.vx *= -1;
            if (Math.abs(n.oy) > SPREAD * 0.65) n.vy *= -1;
            if (Math.abs(n.oz) > SPREAD)        n.vz *= -1;
            n.ph += 0.016;
        });

        const proj = nodes.map(n => {
            const { x, y, z } = xform(n);
            return { ...project(x, y, z), n };
        });

        // Draw connections
        for (let i = 0; i < proj.length; i++) {
            for (let j = i + 1; j < proj.length; j++) {
                const pi = proj[i], pj = proj[j];
                const dx = pi.sx - pj.sx, dy = pi.sy - pj.sy;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < LINK_DIST) {
                    const alpha = (1 - dist / LINK_DIST) * 0.25 * Math.min(pi.d, pj.d);
                    ctx.beginPath();
                    ctx.moveTo(pi.sx, pi.sy);
                    ctx.lineTo(pj.sx, pj.sy);
                    ctx.strokeStyle = gradColor((pi.n.ct + pj.n.ct) / 2, alpha);
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
        }

        // Draw nodes back-to-front
        proj.slice().sort((a, b) => a.d - b.d).forEach(({ sx, sy, d, n }) => {
            const pulse = n.hub ? 1 + Math.sin(n.ph) * 0.2 : 1;
            const r = n.size * d * 1.85 * pulse;
            const alpha = 0.4 + d * 0.6;

            // Glow halo
            const glowR = r * 5.5;
            const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowR);
            grd.addColorStop(0, gradColor(n.ct, alpha * 0.28));
            grd.addColorStop(1, gradColor(n.ct, 0));
            ctx.beginPath();
            ctx.arc(sx, sy, glowR, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();

            // Node core
            ctx.beginPath();
            ctx.arc(sx, sy, r, 0, Math.PI * 2);
            ctx.fillStyle = gradColor(n.ct, alpha);
            ctx.fill();
        });

        requestAnimationFrame(frame);
    }

    document.addEventListener('mousemove', e => {
        targetTiltY = (e.clientX / window.innerWidth - 0.5) * 0.32;
        targetTiltX = (e.clientY / window.innerHeight - 0.5) * 0.16;
    });

    window.addEventListener('resize', resize);
    resize();
    requestAnimationFrame(frame);
})();
