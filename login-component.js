// not use page

import { authoriz } from "./scriptApi.js";



const regHtml = `
<div id="registration" class="registration">
<input id="login" type="text" class="reg__input" placeholder="Введите login"><br>
<input id="password" class="reg__input" type="password" placeholder="Введите password"><br>
<button id="login-button" class="registration__button">Войти</button><br>
<button id="registrationButton" class="registration__button">Зарегистрироваться</button>
</div>
`

document.getElementById("login-button").addEventListener("click", () => {
    const login = document.getElementById("login-input").value;
    const password = document.getElementById("password-input").value;


if (login.value === "") {
    alert ("Введите логин");
    return;
}

if (password.value === "") {
    alert ("Введите пароль");
    return;
}



authoriz(
    login.value, 
    password.value
).then((answer) => { 

    // когда получаю ответ от сервера, можно закрывать форму входа
    regHtml.classList
   const takeToken =  // обращаемся по ключу user чтобы достать токен

})
.catch ((error) => {
    alert(error);
})


}) 
// // ниже рыба, все меняем в зависимости от созданных переменных
// loginUser({
//     login: login,
//     password: password,
// })
//     .then((user) => {
//         setToken(`Bearer ${user.user.token}`);
//         fetchTodosAndRender();
//     })
//     .catch ((error) => {
//         alert(error.message);
//     })
export {takeToken};