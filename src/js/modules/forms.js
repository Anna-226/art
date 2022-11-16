import { postData } from "../services/requests";

const forms = (state) => {
   const form = document.querySelectorAll('form'),
         inputs = document.querySelectorAll('input'),
         upload = document.querySelectorAll("[name='upload']");

   const message = {
      loading: 'Загрузка...',
      success: "Спасибо! С Вами свяжется специалист!",
      failure: "Что-то пошло не так...",
      spinner: 'assets/img/spinner.gif',
      ok: 'assets/img/ok.png',
      fail: 'assets/img/fail.png', 
   };
   
   const path = {
      designer: 'assets/server.php',
      question: 'assets/question.php',
   };

   const clearInputs = () => {
      inputs.forEach(item => {
         item.value = '';
      });
      upload.forEach(item => {
         item.previousElementSibling.textContent = 'Файл не выбран';
      });
   }; 

   upload.forEach(item => {
      item.addEventListener('input', ()=>{
         let dots;
         let arr = item.files[0].name.split('.');
         (arr[0].length > 5) ? (dots = '...') : (dots = '.');
         let name = arr[0].slice(0, 5) + dots + arr[1];
         item.previousElementSibling.textContent = name;
      });
   });
     
   form.forEach(item => {
      item.addEventListener('submit', (e) => {
         e.preventDefault();
         
         let statusMessage = document.createElement('div');
         statusMessage.classList.add('status');
         item.classList.add('animated', 'fadeOutUp');
         setTimeout(() => {
            item.style.display = 'none';
         }, 400);
         item.parentNode.appendChild(statusMessage);

         let statusImg = document.createElement('img');
         statusImg.setAttribute('src', message.spinner);
         statusImg.classList.add('animated', 'fadeInUp');
         statusMessage.appendChild(statusImg);


         let statusText = document.createElement('div');
         statusText.textContent = message.loading;
         statusMessage.appendChild(statusText);

         const formData =  new FormData(item); 

         if (item.classList.contains('.button-calc')) {
            for (let key in state) {
               formData.append(key, state[key]);
               console.log(formData)
            }
  
         };
         let api;

         item.closest('.popup-design') || item.classList.contains('form-calc') ? api = path.designer : api = path.question;
         console.log(api);

         postData(api, formData)
            .then(res => {
               console.log(res);
               statusImg.setAttribute('src', message.ok);
               statusText.textContent = message.success;
            })
            .catch(() => {
               statusImg.setAttribute('src', message.fail);
               statusText.textContent = message.failure;
            })
            .finally(() => {
               clearInputs();
               setTimeout(() => {
                  statusMessage.remove();
                  item.style.display = 'block';
                  item.classList.remove('fadeOutUp');
                  item.classList.add('fadeInUp');
               }, 5000);
            });
      });
   });
   
};

export default forms;