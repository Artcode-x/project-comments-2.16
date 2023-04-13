


function getAllCom() {
return fetch('https://webdev-hw-api.vercel.app/api/v2/airone/comments', {
    method: "GET",
    
})
    .then((response) => {
        if (response.status === 500) {
            // password = prompt("vvedite vernyi parol");
            // getAllCom();
            throw new Error ("You have not authorization");
        }
        // Запускаем преобразовываем "сырые" данные от API в json формат
        return response.json();
    })
}

function sendCom( text, token) {
return fetch('https://webdev-hw-api.vercel.app/api/v2/airone/comments', {
    method: "POST",
    headers: {
        authorization: token,
    },
    body: JSON.stringify({ // в body запроса мы передали json строку с обьектом, которую требует api
       // name: name,
        text: text,
        // date: date,
        // counter: 0,
        // liked: false,
    }),
})
}

// function authoriz(login, password) {
//     console.log(login);
//     return fetch('https://webdev-hw-api.vercel.app/api/user/login'), {
//         method: "POST",
//         body: JSON.stringify({
//             login: login,
//             password: password,
//         }),
//     }).then((response) => {
            
//             return response.json();
//         })
//     }



    function authoriz(login, password) {
    
        return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
            method: "POST",
            body: JSON.stringify({
                login: login,
                password: password,
            }),
        })
            .then((response) => {
                return response.json();
            })
    }


    function registr(login, name, password) {
        return fetch("https://webdev-hw-api.vercel.app/api/user", {
            method: "POST",
            body: JSON.stringify({
                login: login,
                name: name,
                password: password,
            }),
        })
        .then((response) => {
            //console.log(response);
            return response.json();
            
        })
        
    }

    function dell(token, id) {
        return fetch('https://webdev-hw-api.vercel.app/api/v2/airone/comments/' + id, {
        method: "DELETE",
        headers: {
            authorization: token,
        }
    })
    .then((response) => {
        return response.json();
    })
    }

export {getAllCom, sendCom, authoriz, registr, dell};