/**
 * Write your challenge solution here
 */
// Image data
const images = [
  {
    url: 'https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Beautiful Mountain Landscape',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1690576837108-3c8343a1fc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Ocean Sunset View',
  },
  {
    url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Autumn Forest Path',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1680466057202-4aa3c6329758?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Urban City Skyline',
  },
];

const track = document.getElementById('carouselTrack');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const caption = document.getElementById('caption');
const carouselNav = document.getElementById('carouselNav');
const autoPlayButton = document.getElementById('autoPlayButton');
const timerDisplay = document.getElementById('timerDisplay');

let currentIndex = 0;
let autoPlayInterval = null;
let autoPlayTimer = 5; // seconds
const autoPlayDelay = 5000; // milliseconds

// Initialize the carousel
function initializeCarousel() {
  // Create and append images
  images.forEach((image, index) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    
    const img = document.createElement('img');
    img.src = image.url;
    img.alt = image.caption;
    img.loading = 'lazy';
    
    slide.appendChild(img);
    track.appendChild(slide);

    // Create navigation indicators
    const indicator = document.createElement('button');
    indicator.className = 'carousel-indicator';
    indicator.setAttribute('data-index', index);
    indicator.addEventListener('click', () => goToSlide(index));
    carouselNav.appendChild(indicator);
  });

  updateCarousel();
}

// Update carousel display with smooth animation
function updateCarousel() {
  // Add transition for smooth sliding
  track.style.transition = 'transform 0.5s ease-in-out';
  // track.style.transform = `translateX(-${currentIndex * 100}%)`;
  
  // Update caption with fade effect
  caption.style.opacity = '0';
  setTimeout(() => {
    caption.textContent = images[currentIndex].caption;
    caption.style.opacity = '1';
  }, 250);
  
  // Update indicators with active state animation
  const indicators = carouselNav.getElementsByClassName('carousel-indicator');
  Array.from(indicators).forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentIndex);
  });
}

// Navigation functions with animation
function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();
}

// Auto-play functions with smooth timer animation
function toggleAutoPlay() {
  if (autoPlayInterval) {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
}

function startAutoPlay() {
  autoPlayButton.textContent = 'Stop Auto Play';
  autoPlayTimer = 5;
  updateTimerDisplay();
  
  // Smooth countdown animation
  autoPlayInterval = setInterval(() => {
    autoPlayTimer--;
    updateTimerDisplay();
    
    if (autoPlayTimer === 0) {
      nextSlide();
      autoPlayTimer = 5;
    }
  }, 1000);
}

function stopAutoPlay() {
  autoPlayButton.textContent = 'Start Auto Play';
  clearInterval(autoPlayInterval);
  autoPlayInterval = null;
  
  // Fade out timer display
  timerDisplay.style.opacity = '0';
  setTimeout(() => {
    timerDisplay.textContent = '';
    timerDisplay.style.opacity = '1';
  }, 250);
}

function updateTimerDisplay() {
  if (autoPlayInterval) {
    timerDisplay.style.opacity = '0';
    setTimeout(() => {
      timerDisplay.textContent = `Next slide in ${autoPlayTimer}s`;
      timerDisplay.style.opacity = '1';
    }, 150);
  }
}

// Event listeners
prevButton.addEventListener('click', () => {
  prevSlide();
  stopAutoPlay();
});

nextButton.addEventListener('click', () => {
  nextSlide();
  stopAutoPlay();
});

autoPlayButton.addEventListener('click', toggleAutoPlay);

// Initialize the carousel when the page loads
document.addEventListener('DOMContentLoaded', initializeCarousel);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevSlide();
    stopAutoPlay();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
    stopAutoPlay();
  }
});

// Add touch support for mobile devices with smooth animations
// let touchStartX = 0;
// let touchEndX = 0;

// track.addEventListener('touchstart', (e) => {
//   touchStartX = e.touches[0].clientX;
//   // Disable transition during touch
//   track.style.transition = 'none';
// });

// track.addEventListener('touchmove', (e) => {
//   const currentTouch = e.touches[0].clientX;
//   const diff = touchStartX - currentTouch;
//   const offset = -(currentIndex * 100 + (diff / track.offsetWidth) * 100);
//   track.style.transform = `translateX(${offset}%)`;
// });

// track.addEventListener('touchend', (e) => {
//   touchEndX = e.changedTouches[0].clientX;
//   // Re-enable transition
//   track.style.transition = 'transform 0.5s ease-in-out';
//   handleSwipe();
// });

// function handleSwipe() {
//   const swipeThreshold = 50;
//   const swipeDistance = touchEndX - touchStartX;
  
//   if (Math.abs(swipeDistance) > swipeThreshold) {
//     if (swipeDistance > 0) {
//       prevSlide();
//     } else {
//       nextSlide();
//     }
//     stopAutoPlay();
//   } else {
//     // Return to current slide if swipe wasn't long enough
//     updateCarousel();
//   }
// }