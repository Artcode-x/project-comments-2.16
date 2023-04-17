import { checkButtonAutorize, deleteCom, buttonEditText, answerOnComments, likesButton} from "./general.js";
import { formatDateToRu, formatDateToUs } from "./lib/formatDate/formatDate.js"
import { format } from "date-fns";


function authorizationBox(checkEnter, registration) {
    switch (checkEnter) {
        case "enter":
            
registration.innerHTML = `

<div class = "add-form">
<input id="login" type="text" class="reg-input-name" placeholder="Введите login"><br>
<input id="password" class="reg-input-name" type="password" placeholder="Введите password"><br>
<div class="reg-input-name">
<button id="login-button" class="reg-button">Войти</button><br>
<button id="reg-button" class="reg-button">Зарегистрироваться</button>
</div>
</div>

`
            break;
            case "registration":
 registration.innerHTML = `
 <div class = "add-form">
 <input id="name" type="text" class="reg-input-name" placeholder="Введите имя"><br>
 <input id="login" type="text" class="reg-input-name" placeholder="Введите login"><br>
<input id="password" class="reg-input-name" type="password" placeholder="Введите password"><br>
<button id="reg-button" class="reg-button">Зарегистрироваться</button>
<button id="login-button" class="reg-button">Войти</button><br>
</div>
 `               
            break;
    
        default:
            break;
    }
    checkButtonAutorize();
}

function renderIcomments(newBox, icomments) { 
        
const country = "ru";
    newBox.innerHTML  = icomments.map((elementOfdata, index) => {
        return `
        <li data-text = '&gt ${elementOfdata.name} \n ${elementOfdata.text}' class="comment">
    <div class="comment-header">
      <div id="quote__name">${elementOfdata.name}</div>
      <div>${format(new Date(elementOfdata.date), "yyyy-MM-dd hh.mm.ss")}</div>
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
   
  
    deleteCom(); 
    buttonEditText();
    answerOnComments();
    likesButton();
};

export { authorizationBox, renderIcomments }