// Custom cursor effect
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Create cursor elements
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');

    cursorDot.classList.add('cursor-dot');
    cursorOutline.classList.add('cursor-outline');

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    let posX = 0;
    let posY = 0;
    let dotX = 0;
    let dotY = 0;

    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
      try {
        posX = e.clientX;
        posY = e.clientY;

        // Move the outline with a delay for a trailing effect
        setTimeout(() => {
          try {
            cursorOutline.style.left = posX + 'px';
            cursorOutline.style.top = posY + 'px';
          } catch (err) {
            console.warn('Error updating cursor outline position:', err);
          }
        }, 10);

        // Move the dot immediately
        cursorDot.style.left = posX + 'px';
        cursorDot.style.top = posY + 'px';
      } catch (err) {
        console.warn('Error handling mousemove event:', err);
      }
    });

    // Handle hover effects
    document.addEventListener('mouseover', function(e) {
      try {
        if (e.target && (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList && e.target.classList.contains('project-card'))) {
          cursorOutline.classList.add('hover');
        }
      } catch (err) {
        console.warn('Error handling mouseover event:', err);
      }
    });

    document.addEventListener('mouseout', function(e) {
      try {
        if (e.target && (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList && e.target.classList.contains('project-card'))) {
          cursorOutline.classList.remove('hover');
        }
      } catch (err) {
        console.warn('Error handling mouseout event:', err);
      }
    });

    // Scroll-based animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      try {
        entries.forEach(entry => {
          if (entry && entry.isIntersecting) {
            entry.target.classList.add('appear');
          }
        });
      } catch (err) {
        console.warn('Error in intersection observer callback:', err);
      }
    }, observerOptions);

    // Observe elements that should animate on scroll
    try {
      document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .hero, #about, #skills, #projects, #contact').forEach(el => {
        if (el) {
          observer.observe(el);
        }
      });
    } catch (err) {
      console.warn('Error observing elements for animation:', err);
    }

    // Navbar active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', function() {
      try {
        let current = '';

        sections.forEach(section => {
          if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
              current = section.getAttribute('id');
            }
          }
        });

        navLinks.forEach(link => {
          if (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') && link.getAttribute('href').includes(current)) {
              link.classList.add('active');
            }
          }
        });
      } catch (err) {
        console.warn('Error in scroll event handler:', err);
      }
    });

    // Back to top button
    try {
      const backToTopButton = document.createElement('a');
      backToTopButton.href = '#';
      backToTopButton.classList.add('back-to-top');
      backToTopButton.innerHTML = '↑';
      document.body.appendChild(backToTopButton);

      window.addEventListener('scroll', function() {
        try {
          if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
          } else {
            backToTopButton.classList.remove('visible');
          }
        } catch (err) {
          console.warn('Error in scroll event for back-to-top button:', err);
        }
      });

      // Back to top functionality
      backToTopButton.addEventListener('click', function(e) {
        try {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        } catch (err) {
          console.warn('Error in back-to-top click handler:', err);
        }
      });
    } catch (err) {
      console.warn('Error creating back-to-top button:', err);
    }

    // Smooth scrolling for anchor links
    try {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor) {
          anchor.addEventListener('click', function(e) {
            try {
              e.preventDefault();

              const targetId = this.getAttribute('href');
              const targetElement = document.querySelector(targetId);

              if (targetElement) {
                window.scrollTo({
                  top: targetElement.offsetTop - 80, // Account for fixed header
                  behavior: 'smooth'
                });
              }
            } catch (err) {
              console.warn('Error in anchor link click handler:', err);
            }
          });
        }
      });
    } catch (err) {
      console.warn('Error setting up anchor link handlers:', err);
    }
  } catch (err) {
    console.error('Error initializing custom cursor effect:', err);
  }
});