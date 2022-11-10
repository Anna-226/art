const modal = () => {
   function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
   
      const triggers = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            closeBtns = document.querySelectorAll(closeSelector),
            modalWindows = document.querySelectorAll('[data-modal]'),
            scrollbar = calcScrollbar();
      
      let clickBtnCount; //undefined
       
      triggers.forEach(item =>{
         item.addEventListener('click', (e) =>{
            e.preventDefault();
               clickBtnCount = true;
            modalWindows.forEach(item => {
               item.style.display = 'none';
            });
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scrollbar}px`;
            if (destroy) {
               item.remove();
            }
         });
      });
      
      function openModalByScroll(selector){
         if (clickBtnCount && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
            document.querySelector(selector).click();
         }
      }
      
      openModalByScroll('.fixed-gift');
      
      function closeModal() {
         modalWindows.forEach(item => {
               item.style.display = 'none';
         });
         document.querySelector(modalSelector).style.display = 'none';
         document.body.style.overflow = 'auto';
         document.body.style.marginRight = `0px`;
      }

      closeBtns.forEach(item =>{
         item.addEventListener('click', ()=>{
            closeModal();
         });
      });

      document.addEventListener('click', (e) => {
         if (e.target && e.target === modal) {
            closeModal();
         }
      });

      document.addEventListener('keydown', function (e) {
         if(e.key === 'Escape') {
            closeModal();
         }
      }); 
   }
   function showModalByTime(modalSelector, time) {
      setTimeout(() => {
         let display;

         document.querySelectorAll('[data-modal]').forEach(item => {
            if (window.getComputedStyle(item).display !== 'none') {
               display = 'block';
            }
         });
         if (!display) {
            let scrollbar = calcScrollbar();
            document.querySelector(modalSelector).style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scrollbar}px`;
         }
      }, time);
   }
   function calcScrollbar() {
      let techDiv = document.createElement('div');
      techDiv.style.width = '50px';
      techDiv.style.height = '50px';
      techDiv.style.overflowY = 'scroll';
      techDiv.style.visibility = 'hidden';
      document.body.append(techDiv);
      let scrollbarWidth = techDiv.offsetWidth - techDiv.clientWidth;
      techDiv.remove();
      return scrollbarWidth;
   }

   bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
   bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
   bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
   
  // showModalByTime('.popup-consultation', 3000);
};


export default modal;