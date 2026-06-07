function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const burger = document.getElementById('burger');
    
    if (navLinks && burger) {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    }
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.getElementById('navLinks');
        const burger = document.getElementById('burger');
        
        if (window.innerWidth <= 992 && navLinks && burger) {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        }
    });
});

document.addEventListener('click', (event) => {
    const navLinks = document.getElementById('navLinks');
    const burger = document.getElementById('burger');
    const navbar = document.querySelector('.navbar');
    
    if (window.innerWidth <= 992 && navLinks && navLinks.classList.contains('active')) {
        if (!navbar.contains(event.target)) {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        }
    }
});

function switchTab(btn, tabId) {
    // Hapus active dari semua tab button
    document.querySelectorAll('.hukum-tab-btn').forEach(b => {
        b.classList.remove('active');
    });

    document.querySelectorAll('.hukum-tab-panel').forEach(p => {
        p.classList.remove('active');
        p.style.opacity = '0';
    });

    btn.classList.add('active');

    const panel = document.getElementById('tab-' + tabId);
    if (panel) {
        panel.classList.add('active');
        requestAnimationFrame(() => {
            panel.style.transition = 'opacity 0.35s ease';
            panel.style.opacity = '1';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.hukum-tab-panel').forEach(p => {
        p.style.opacity = p.classList.contains('active') ? '1' : '0';
    });
});

function toggleAccordion(btn) {
    const item = btn.closest('.k3-accordion-item');
    if (!item) return;
    
    const body = item.querySelector('.k3-accordion-body');
    const icon = btn.querySelector('.acc-icon');
    const isOpen = item.classList.contains('active');
    
    // Tutup semua accordion
    document.querySelectorAll('.k3-accordion-item').forEach(el => {
        el.classList.remove('active');
        const elBody = el.querySelector('.k3-accordion-body');
        const elIcon = el.querySelector('.acc-icon');
        if (elBody) elBody.style.maxHeight = null;
        if (elIcon) elIcon.style.transform = '';
    });
    
    // Buka yang diklik jika belum terbuka
    if (!isOpen && body && icon) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
    }
}

(function() {
    const revealEls = document.querySelectorAll('.reveal');
    
    if (revealEls.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        
        revealEls.forEach(el => observer.observe(el));
    }
})();


(function() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    let started = false;

    function startCounters() {
        if (started) return;
        started = true;
        
        counters.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'));
            const prefix = el.getAttribute('data-prefix') || '';
            const suffix = el.getAttribute('data-suffix') || '';
            const duration = 1800;
            const steps = 60;
            const increment = target / steps;
            let current = 0;
            let step = 0;
            
            const timer = setInterval(() => {
                step++;
                current = Math.min(Math.round(increment * step), target);
                
                const formatted = target >= 1000 
                    ? current.toLocaleString('id-ID')
                    : current;
                el.textContent = prefix + formatted + suffix;
                
                if (step >= steps) clearInterval(timer);
            }, duration / steps);
        });
    }

    const statRow = document.querySelector('.tentang-stat-row');
    if (statRow) {
        const obs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(startCounters, 300);
                obs.disconnect();
            }
        }, { threshold: 0.3 });
        obs.observe(statRow);
    }
})();

document.querySelector('.btn-hero-primary')?.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
});

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'var(--white)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '0.5rem 5%';
        } else {
            navbar.style.background = 'var(--white)';
            navbar.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.08)';
            navbar.style.padding = '0.75rem 5%';
        }
    }
});