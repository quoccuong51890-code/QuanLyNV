const text =
"Let's start a productive workday! Log in now. Connect achievements - Create success.";

let index = 0;

function typingEffect(){

    if(index < text.length){

        document.getElementById("typing-text").innerHTML +=
        text.charAt(index);

        index++;

        setTimeout(typingEffect, 40);
    }
}

window.onload = () =>{
    typingEffect();
};

document.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        login();
    }

});

function login(){

    const username =
    document.getElementById("username").value.trim();

    const password =
    document.getElementById("password").value.trim();

    const error =
    document.getElementById("error-message");

    error.style.display = "none";

    if(username === "" && password === ""){

        error.innerHTML =
        "Vui lòng nhập Username/Gmail và Password.";

        error.style.display = "block";
        return;
    }

    if(username === ""){

        error.innerHTML =
        "Username hoặc Gmail không được để trống.";

        error.style.display = "block";
        return;
    }

    if(password === ""){

        error.innerHTML =
        "Password không được để trống.";

        error.style.display = "block";
        return;
    }

    /* Tài khoản demo */
    /* Tk Nhân viên */
    if(
        username === "NguyenVanA" &&
        password === "123456"
    ){

        sessionStorage.setItem(
            "isLoggedIn",
            "true"
        );

        alert("Đăng nhập thành công!");

        window.location.href =
        "employee.html";
    }
    else{

        error.innerHTML =
        "Sai Username/Gmail hoặc Password.";

        error.style.display = "block";
    }

    /*Tài khoản manager */
    if(
        username === "NguyenVanB" &&
        password === "78910"
    ){

        sessionStorage.setItem(
            "isLoggedIn",
            "true"
        );

        alert("Đăng nhập thành công!");

        window.location.href =
        "manager.html";
    }
    else{

        error.innerHTML =
        "Sai Username/Gmail hoặc Password.";

        error.style.display = "block";
    }
}