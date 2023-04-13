import { getAllCom, sendCom, authoriz, registr, dell} from "./scriptApi.js"
//import { takeToken} from "./login-component.js"
import { authorizationBox } from "./renderAutoriz.js"

    const buttonElement = document.getElementById('add-button'); // +
    //const listElement = document.getElementById('list');
    const nameInputElement = document.getElementById('name-input'); // +
    const textInputElement = document.getElementById('text-input'); // +
    const newBox = document.getElementById('box'); // +
    const genForm = document.getElementById('send-form');
    const loaderStartElement = document.getElementById('loader-start');
    const mainForm = document.querySelector(".add-form");
    const loaderPostElement = document.getElementById("loader-post");
    const quoteNameElement = document.getElementById("quote__name")
    const registration = document.getElementById('registration');
    loaderStartElement.textContent = 'Данные с сервера загружаются...';
    // Создаем функцию, в которой запрашиваем данные из хранилища
   
    let token;
   // token = takeToken
    let commentName;
    let checkEnter = "enter";

    

 const getAllComments = () => {
   
        getAllCom().then((responseData) => {
            icomments = responseData.comments.map((comment) => {

                return {
                    id: comment.id,
                    name: comment.author.name,
                    date: new Date(comment.date).toLocaleString("ru-RU", options),
                    text: comment.text,
                    counter: comment.likes,
                    isliked: false,
                };
            });
            authorizationBox(checkEnter, registration);



            renderIcomments();
        })
        .then(() => {
            loaderStartElement.style.display = "none";
        });
};




    // Делаем невидимым сообщение "комментарии добавляются" 
    // если закомментить - постоянно будет отображаться
    loaderPostElement.style.display = "none";
    // Оживляем кнопку лайков
    function likesButton() {
        const likeButtonElements = document.querySelectorAll(".like-button");
        for (const likeButtonElement of likeButtonElements) {
            // for (Элемент of итерируемый обьект) { тело цикла for of }       
            likeButtonElement.addEventListener("click", (event) => {
                event.stopPropagation();
                const index = likeButtonElement.dataset.index;
            
                if (icomments[index].isLiked === false) {
                    icomments[index].isLiked = true;
                    icomments[index].counter += 1;
                } else {
                    (icomments[index].isLiked === true)
                    icomments[index].isLiked = false;
                    icomments[index].counter = 0;
                }
                renderIcomments();
                // }); // с функиции delay
            });
        }
    };

    
    
    buttonElement.addEventListener('click', () => {  // Добавляем обработчик события "клик" на элемент buttonElement.
        
        sendCom(protectHtmlString(textInputElement.value), token ).then((response) => { // в ф-ии then, в обработчике, мы ответ преобразовали в json строку
         //     console.log(response);

             if (response.status === 400) {
                throw new Error("Имя и комментарий должны быть не короче 3 символов"); 
              }
               if (response.status === 500) {
                throw new Error("Сервер упал");
              //  throw new Error("Кажется у вас сломался интернет - попробуйте позже"); 
              }

              
                console.log('Сообщение успешно отправлено');
                mainForm.style.display = "none"; // скрыть (display:none)
                loaderPostElement.style.display = "flex"; // отобразить (display:flex;)
                return response.json();
            })
            .then(() => {

                //nameInputElement.value = "";
                textInputElement.value = ""; 
                return getAllComments(); // тут лежит GET запрос комментов

                // переносим сюда инпуты чтобы информация в них сохранялась после обновления страницы


            })
            .then(() => {
                loaderPostElement.style.display = "none"; // когда отрисовались комменты, мы должны скрыть надпись 'комментарии добавляются'
                mainForm.style.display = "flex";

            //    throw new Error("Some error");
            }).catch((error) => {
                console.log(error.message);

                switch (error.message) {
                    case "Имя и комментарий должны быть не короче 3 символов":
                        alert("Имя и комментарий должны быть не короче 3 символов");
                        break; // закрывает switch
                    case "Сервер упал":
                        alert("Сервер упал");
                        break;
                    default: 
                    alert("Кажется у вас сломался интернет - попробуйте позже");
                   //если switch не нашел подходящее сообщение, то могу добавить тут условие
                        break;
                }



                return console.warn(error); 
            }); 
    });


    // блокировка кнопки - она блокируется когда пустые поля
    const goodInput = () => {
      // Если поле ввода имени пустое или текста 
      if (textInputElement.value === "") {
       //отключаем кнопку
        buttonElement.disabled = true; 
      } else {
        buttonElement.disabled = false;
      }
    };
    const buttonBlock = () => {
      goodInput();
      document.querySelectorAll("#name-input,#text-input").forEach((el) => {
        el.addEventListener("input", () => {    // поиск по тегу ? окно ввода 
          goodInput();  
        });
      });
  }
    // ввод по кнопке enter
    // ф-ия чтобы можно было отправлять по нажатию ENTER
    mainForm.addEventListener('keydown', (e) => { //  keydown - нажатие по клавше
        // keyup - отпускание клавиши
        if (!e.shiftKey && e.key === 'Enter') {// если шифт и ентер нажать вместе - 
            // e.key - если нажимаем ентер - отправить коммент
            buttonElement.click();
            // коммент не отправится, а будет отступ
           // nameInputElement.value = '';
            textInputElement.value = '';
        }
    });
    
    let icomments = [];// данные о комментариях хранятся тут   
    const options = {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
        timezone: "UTC",
        hour: "numeric",
        minute: "2-digit",
    };
    // Функция ответа на комментарии
    function answerOnComments() {  // Функция ответа на комментарии
        const answerComments = document.querySelectorAll(".comment");
        const textInputElement = document.getElementById("text-input");
        for (const answerComment of answerComments) {
            answerComment.addEventListener("click", () => {
                const textComment = answerComment.dataset.text; // comments использовал который в рендер форме, но ошибка/  не понятно к какой переменной обращаться?  на answerComment возвращает underfined
                textInputElement.value = textComment;
            });
        }
    }
    // Функция редактирования 
    function buttonEditText(buttonRedacts) { // обернул в ф-ию чтобы было удобно вызывать где нужно
        buttonRedacts = document.querySelectorAll(".redact");
        // for ( берем Элемент из итерируемого объекта) {тело цикла}
        for (const buttonRedact of buttonRedacts) {
            buttonRedact.addEventListener("click", () => {
                // с пом-ю св-ва dataset получаем доступ к data-атрибуту redact (который указали в рендер-html форме, в кнопке редактирования) 
                const index = buttonRedact.dataset.redact;
                if (buttonRedacts[index].innerHTML === "Редактировать") {
                    buttonRedacts[index].innerHTML = "Сохранить";
                    icomments[index].txtRedact = false;
                    const commentBodyElements = document.querySelectorAll(".comment-text");
                    const commentBodyElement = commentBodyElements[index];
                    const textareaElement = `<textarea type="textarea" class="redactor-txt" rows="4">${icomments[index].text}</textarea>`;
                    commentBodyElement.innerHTML = textareaElement;
                } else {
                    icomments[index].txtRedact = true;
                    const redactCommentElement = document.querySelectorAll(".redactor-txt");
                    icomments[index].text = protectHtmlString(redactCommentElement[0].value);
                    renderIcomments();
                }
            });
        }
        return buttonEditText;
    }
    // Функция защиты для полей ввода
    function protectHtmlString(someEdit) {
        someEdit = someEdit
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;");
        return someEdit;
    }
    // функция задержки для лайков
    function delay(interval = 300) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, interval);
        });
    }
    const giveMeTime = 'ru-RU';
    let todayData = { day: 'numeric', month: 'numeric', year: '2-digit' };
    let todayTime = { hour: 'numeric', minute: '2-digit' };
    let date = new Date();

function deleteCom() {
   // начало реализации кнопки удаления положено :)
  const deleteButtons = document.querySelectorAll(".delete-button");
     for (const deleteButton of deleteButtons) {
         deleteButton.addEventListener("click", (event) => {
            event.stopPropagation();
            // локальное удаление
//             console.log(deleteButton);
//             event.stopPropagation();
 //            const index = deleteButton.dataset.id;
//           //  console.log(index);
//             icomments.splice(index, 1); 
//             renderIcomments();
  
const numberId = deleteButton.dataset.id; // тут обращение к форме отдельного комментария получаем его номер с массива , начинаются с 0
// но это не тот id который нужно получить, для получения id с апи реализуем сл шаг
//console.log(numberId);

console.log(icomments[numberId].id); // обр-ие к лок-му массиву icomments, далее к номеру комментария из массива, только затем к его id
const id = icomments[numberId].id;
 dell(token, id) // отсюда передаем в скриптапи
 .then((answer) => {
console.log(answer);
 //isearchId = answer.comments.id;
 return getAllComments();

         })
         
     })
    }
    
}


   export function checkButtonAutorize() {
        
  const buttonEnter = document.getElementById("login-button");
  const buttonReg = document.getElementById("reg-button");

        buttonEnter.addEventListener("click", () => {
            //логика выполнения при нажатии на кнопку войти в авторизации
           const login = document.getElementById("login");
           const password = document.getElementById("password");
           if (checkEnter === "enter") {
            authoriz(login.value, password.value) // передаем в ф-ию лог и пасс
           
            .then((answer) => {
                commentName = answer.user.name;
                nameInputElement.value = commentName;
                nameInputElement.disabled = true;
              token = `Bearer ${answer.user.token}`;
              // получаем токен во время авторизации
  
              // далее нужно скрыть форму авторизации и открыть форму написания текста
              genForm.classList.remove("-display-none") // при авторизации открываем блок с комментами
              registration.classList.add("-display-none") // при авторизации скрыли блок с авториз
  
            }) 
           } else {
            checkEnter = "enter" ;
            authorizationBox(checkEnter, registration); 
           }
         
            
           

        });
    

       buttonReg.addEventListener("click", () => {
        
            //логика выполнения при нажатии на кнопку регистрации в авторизации
           // чтобы вызвать рендер формы рег
        

        if (checkEnter === "enter") {
            checkEnter = "registration"; // поменяли на рег -ию 
            authorizationBox(checkEnter, registration) ;
        } else {
            // эти данные нужны только после 2 нажатия на кн-ку
           const login = document.getElementById("login");
           const password = document.getElementById("password");
            const name = document.getElementById('name'); // тут поле ввода имени будет видимо
            registr(login.value, name.value, password.value,)
            .then((answer) => {
                
                commentName = answer.user.name;
                nameInputElement.value = commentName;
                nameInputElement.disabled = true;
               // console.log(commentName);
                token = `Bearer ${answer.user.token}`;
                genForm.classList.remove("-display-none")
                registration.classList.add("-display-none")
            })
        }
        });


    }
 
    const renderIcomments = () => { 
        
        // if (!token) {
        //     //Отобразим форму входа - авторизации
        // }

        //  elementOfdata - 1 комментарий, elementOfdata.name - часть одного комментария 
        const icommentsHTML = icomments.map((elementOfdata, index) => {
            return `
            <li data-text = '&gt ${elementOfdata.name} \n ${elementOfdata.text}' class="comment">
        <div class="comment-header">
          <div id="quote__name">${elementOfdata.name}</div>
          <div>${elementOfdata.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text" data-text>${elementOfdata.text} </div>
          </div>
          <div class="comment-footer">
          <button data-redact="${index}" class="redact">Редактировать</button>
          <button data-id="${index}" class="delete-button">Удалить</button>
          <div class="likes">
            <span class="likes-counter">${elementOfdata.counter}</span>
            <button data-index="${index}" class="${elementOfdata.isLiked ? 'like-button -active-like' : 'like-button'}"></button> 
            
            </div>
        </div>
      </li>`;
        })
            .join('');  // а после этого проверяем через консоль и кладем в innerHTML полученную строку
        // console.log(icommentsHTML); // Тут видно данные с массива
        newBox.innerHTML = icommentsHTML; // Рендерим данные с массива
        // };
        console.log(newBox);
        deleteCom(); 
        buttonEditText();
        answerOnComments();
        likesButton();
    };
    getAllComments();
    buttonBlock();



    getAllComments();
    buttonBlock();

