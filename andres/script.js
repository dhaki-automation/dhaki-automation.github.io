document.addEventListener('DOMContentLoaded', () => {

    // Elements
    const saveBtn = document.getElementById('save-contact');
    const shareBtn = document.getElementById('share-toggle');
    const modal = document.getElementById('qr-modal');
    const closeBtn = document.querySelector('.close-btn');

    // VCard Data
    const vCardData = `BEGIN:VCARD
VERSION:3.0
N:Bolivar;Andres;;;
FN:Andres Bolivar
ORG:Dhaki Technologies
TITLE:Co-Founder and Head of Technology and Innovation
TEL;TYPE=cell:+971525673553
EMAIL;TYPE=work:andres@dhaki.ai
URL:https://dhaki.ai
END:VCARD`;

    // Handle "Save Contact" click
    saveBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const file = new File([vCardData], "Andres_Dhaki.vcf", { type: "text/vcard" });

        // Try Web Share API first (Best for Mobile: iOS/Android)
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    files: [file],
                    title: 'Andres Bolivar',
                    text: 'Contact card for Andres Bolivar',
                });
                return; // Interaction complete if share was successful
            } catch (err) {
                console.log('Share failed or canceled, falling back to download', err);
            }
        }

        // Fallback: Download for Desktop or browsers without Share API
        const url = URL.createObjectURL(file);
        const newLink = document.createElement('a');
        newLink.download = "Andres_Dhaki.vcf";
        newLink.textContent = "Download vCard";
        newLink.href = url;

        // Append to body just in case (sometimes needed for Firefox/old browsers)
        document.body.appendChild(newLink);
        newLink.click();
        document.body.removeChild(newLink);

        // Clean up
        setTimeout(() => URL.revokeObjectURL(url), 100);
    });

    // Handle Modal
    shareBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
        // Small timeout to allow display:flex to apply before adding active class for transition
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    });

    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // Match transition duration
    };

    closeBtn.addEventListener('click', closeModal);

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Removed tilt effect as requested


    // --- Particle System ---
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    let particlesArray;
    let mouse = {
        x: null,
        y: null,
        radius: 150
    };

    // Handle global mouse move for particles (works on entire window)
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    // Handle touch for mobile
    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        }
    });

    window.addEventListener('touchend', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }

    window.addEventListener('resize', resizeCanvas);


    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
            this.baseX = x; // Store initial position if we wanted to return, but we want free float
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            // Check boundaries
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            // Mouse interaction
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (mouse.x != null && distance < mouse.radius) {
                // Move away from mouse
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                    this.x += 3;
                }
                if (mouse.x > this.x && this.x > this.size * 10) {
                    this.x -= 3;
                }
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                    this.y += 3;
                }
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y -= 3;
                }
            }

            // Move particle
            this.x += this.directionX;
            this.y += this.directionY;

            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        // Calculate number of particles based on screen size (less on mobile)
        let numberOfParticles = (canvas.height * canvas.width) / 9000;

        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1; // Random size between 1 and 3
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.4) - 0.2; // Slow random speed
            let directionY = (Math.random() * 0.4) - 0.2;

            // Tech colors: Cyan and Green
            let color = Math.random() > 0.5 ? 'rgba(0, 201, 255, 0.6)' : 'rgba(146, 254, 157, 0.6)';

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }

        connectParticles();
    }

    // Connect particles with lines if they are close
    function connectParticles() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                    ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = 'rgba(0, 201, 255,' + opacityValue * 0.15 + ')'; // Faint cyan lines
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Initialize
    resizeCanvas();
    animateParticles();
});
