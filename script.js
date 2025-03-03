const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let currentSlide = 0;

function goToSlide(n) {
    currentSlide = n;
    
    // Update slider position with smooth movement
    slider.style.transform = `translateX(-${currentSlide * 33.33}%)`;
    
    // Update active states
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });

    // Trigger video play/pause
    slides.forEach(slide => {
        const video = slide.querySelector('video');
        if (video) {
            if (slide.classList.contains('active')) {
                video.play();
            } else {
                video.pause();
            }
        }
    });
}

// Add hover effect to slides
slides.forEach(slide => {
    slide.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = slide.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        slide.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    });
    
    slide.addEventListener('mouseleave', () => {
        slide.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    });
});

prev.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
});

next.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
});

// Initialize first slide
goToSlide(0);
