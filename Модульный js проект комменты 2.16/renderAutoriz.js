import { checkButtonAutorize, deleteCom, buttonEditText, answerOnComments, likesButton} from "./general.js";


function authorizationBox(checkEnter, registration) {
    switch (checkEnter) {
        case "enter":
            
registration.innerHTML = `
<input id="login" type="text" class="reg__input" placeholder="Введите login"><br>
<input id="password" class="reg__input" type="password" placeholder="Введите password"><br>
<button id="login-button" class="registration__button">Войти</button><br>
<button id="reg-button" class="registration__button">Зарегистрироваться</button>
`
            break;
            case "registration":
 registration.innerHTML = `

 <input id="name" type="text" class="reg__name" placeholder="Введите имя"><br>
 <input id="login" type="text" class="reg__input" placeholder="Введите login"><br>
<input id="password" class="reg__input" type="password" placeholder="Введите password"><br>
<button id="reg-button" class="registration__button">Зарегистрироваться</button>
<button id="login-button" class="registration__button">Войти</button><br>
 `               
            break;
    
        default:
            break;
    }
    checkButtonAutorize();
}

function renderIcomments(newBox, icomments) { 
        

    newBox.innerHTML  = icomments.map((elementOfdata, index) => {
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
   
  
    deleteCom(); 
    buttonEditText();
    answerOnComments();
    likesButton();
};

export { authorizationBox, renderIcomments }