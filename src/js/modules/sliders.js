const sliders = (slideSelector, dir, prev, next) => {
   let slideIndex = 1;
   const slides = document.querySelectorAll(slideSelector),
         prevBtn = document.querySelector(prev),
         nextBtn = document.querySelector(next);

   function showSlide(n) {
      if (n > slides.length) {
         slideIndex = 1;
      }
      if (n < 1) {
         slideIndex = slides.length;
      }
      slides.forEach(slide => {
         slide.classList.add('animated');
         slide.style.display = 'none';
         slide.classList.remove('slideInUp');
         slide.classList.remove('slideInLeft');
         slide.classList.remove('slideInDown');
         slide.classList.remove('slideInRight');
      });
      slides[slideIndex-1].style.display = 'block';
   }
   
   showSlide(slideIndex);

   try {
      prevBtn.addEventListener('click', () => {
         slideIndex--;
         showSlide(slideIndex);
         if (dir === 'vertical') {
            slides[slideIndex-1].classList.add('slideInUp');
         } else {
            slides[slideIndex-1].classList.add('slideInLeft');
         }
      });
      nextBtn.addEventListener('click', () => {
         slideIndex++;
         showSlide(slideIndex);
         if (dir === 'vertical') {
            slides[slideIndex-1].classList.add('slideInDown');
         } else {
            slides[slideIndex-1].classList.add('slideInRight');
         }
      });
   } catch (error) {
   }
   /* let paused = setInterval(() => {
      slideIndex++;
      showSlide(slideIndex);
      if (dir === 'vertical') {
         slides[slideIndex-1].classList.add('slideInDown');
      } else {
         slides[slideIndex-1].classList.add('slideInRight');
      }
   }, 3000);

   slides[0].parentNode.addEventListener('mouseenter', () => {
      clearInterval(paused);
   });
   slides[0].parentNode.addEventListener('mouseleave', () => {
      paused = setInterval(() => {
      slideIndex++;
      showSlide(slideIndex);
      if (dir === 'vertical') {
         slides[slideIndex-1].classList.add('slideInDown');
      } else {
         slides[slideIndex-1].classList.add('slideInRight');
      }
   }, 3000);
   }); */
}; 

export default sliders;