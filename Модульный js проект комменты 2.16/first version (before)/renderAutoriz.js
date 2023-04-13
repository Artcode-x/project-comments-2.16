import { checkButtonAutorize, } from "./general.js";


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



export { authorizationBox }