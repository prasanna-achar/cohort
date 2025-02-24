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

const carouselTrack = document.getElementById('carouselTrack')
const carouselCaption = document.getElementById('caption')
const carouselNav = document.getElementById('carouselNav')
const prevButton = document.getElementById('prevButton')
const nextButton = document.getElementById('nextButton')
const autoPlayButton = document.getElementById('autoPlayButton')
const timerDisplay = document.getElementById('timerDisplay')

let autoplay = true
let autoPlayTimer = 5
let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () =>{
  images.map((image, index) =>{
    const slide = document.createElement('div')
    slide.classList.add('carousel-slide')

    const img = document.createElement('img')
    img.src = image.url
    img.alt = img.caption

    slide.appendChild(img)
    carouselTrack.appendChild(slide)

    const indicator = document.createElement('button')
    indicator.classList.add('carousel-indicator')
    indicator.setAttribute('data-index', index)
    indicator.addEventListener('click' , () => gotoSlide(index))
    carouselNav.appendChild(indicator)
  })
  updateImageSlide();
})

function updateImageSlide(){
  carouselTrack.style.transition = 'transform 0.7s ease-in-out'
  carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`

  carouselCaption.style.opacity = '0'
  setTimeout(()=>{
    carouselCaption.textContent = images[currentIndex].caption
    carouselCaption.style.opacity = '1'
  }, 200);
}

const indicators = carouselNav.getElementsByClassName('carousel-indicator')
Array.from(indicators).forEach((indicator, index) =>{
  indicator.classList.toggle('active', index === currentIndex)
})

function gotoSlide(index){
  currentIndex = index;
  updateImageSlide()
}

function nextSlide(){
  currentIndex = (currentIndex + 1) % images.length;
  updateImageSlide()
}
function prevSlide(){
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImageSlide()
}
nextButton.addEventListener('click',() => nextSlide())
prevButton.addEventListener('click',() => prevSlide())


// autoPlayButton.addEventListener('click', (e)=>{
  
//   const startAutoPlay = ()=>{
//     nextSlide();
//   }
//   const getTimer = ()=>{
//     timerDisplay.innerHTML = `next slide in ${autoPlayTimer !== 0 ? autoPlayTimer-- : autoPlayTimer = 4}s`
//   }
//   console.log(autoplay)
//   if(autoplay){
//     autoPlayButton.innerHTML = "Stop Auto Play"
//     setInterval(startAutoPlay
//     , 5*1000)
    
//     setInterval(getTimer, 1000)
//     autoplay = false

//   }else if(!autoplay){
//     autoPlayButton.innerHTML = "Start Auto Play"

//     // clearInterval(startAutoPlay)
//     // clearInterval(getTimer)
//     clearInterval(startAutoPlay())
//     clearInterval(getTimer())
//     timerDisplay.innerHTML = ""
//     autoplay = true
//   }

  
  
// })


autoPlayButton.addEventListener('click', () => {
  
  const startAutoPlay = () => {
    nextSlide();
  };

  const getTimer = () => {
    timerDisplay.innerHTML = `next slide in ${autoPlayTimer !== 1 ? --autoPlayTimer : autoPlayTimer = 5}s`;
  };

  if (autoplay) {
    autoPlayButton.innerHTML = "Stop Auto Play";
    
    // Start Intervals and store their IDs
    autoPlayInterval = setInterval(startAutoPlay, 5000);
    timerInterval = setInterval(getTimer, 1000);
    
    autoplay = false; // Mark autoplay as running
  } else {
    autoPlayButton.innerHTML = "Start Auto Play";

    // Clear intervals using stored IDs
    clearInterval(autoPlayInterval);
    clearInterval(timerInterval);
    autoPlayTimer = 5;
    timerDisplay.innerHTML = "";
    autoplay = true; // Mark autoplay as stopped
  }
});