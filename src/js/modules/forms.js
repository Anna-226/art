//import checkNumInput from "./checkNumInput";

const forms = (state) => {
   const form = document.querySelectorAll('form'),
         inputs = document.querySelectorAll('input');

  // checkNumInput('input[name="user_phone"]');

   const message = {
      loading: 'Загрузка...',
      success: "Спасибо! С Вами свяжется специалист!",
      failure: "Что-то пошло не так...",
      spinner: 'assets/img/spinner.gif',
      ok: 'assets/img/ok.png',
      fail: 'assets/img/fail.png', 
   };

   const postData = async (url, data) => {
      //document.querySelector('.status').innerHTML = message.loading;
      let res = await fetch(url, {
         method: 'POST', 
         //headers: {
         //   'content-type': 'application/json',
         //} в случае, если данные передаются в формате Json
         body: data
      });

      return await res.text();
   };
   
   const clearInputs = () => {
      inputs.forEach(item => {
         item.value = '';
      });
   }; 
   form.forEach(item => {
      item.addEventListener('submit', (e) => {
         e.preventDefault();
         
         let statusMessage = document.createElement('div');
         statusMessage.classList.add('status');
         item.classList.add('fadeOutUp'); /////////
         setTimeout(() => {
            item.style.display = 'none';
         }, 400);
         item.parentNode.appendChild(statusMessage);
         statusMessage.classList.add('fadeInUp'); ///////
         let statusImg = document.createElement('img');
         statusImg.setAttribute('src', message.spinner);
         statusMessage.appendChild(statusImg);
         let statusText = document.createElement('div');
         statusText.textContent = message.loading;
         statusMessage.appendChild(statusText);

         const formData =  new FormData(item);

         postData('assets/server.php', formData)
            .then(res => {
               console.log(res);
               statusMessage.innerHTML = message.success;
            })
            .catch(() => {
               statusMessage.innerHTML = message.failure;
            })
            .finally(() => {
               clearInputs();
               setTimeout(() => {
                  statusMessage.remove();
               }, 5000);
               if (item.getAttribute('data-calc') === 'end') {
                  setTimeout(() => {
                     document.querySelectorAll('[data-modal]').forEach(item => {
                        item.style.display = 'none';
                     });
               }, 5000);
               }
            });
      });
   });
   
};

export default forms;