const text =
"Create your account today. Connect your team. Build productivity. Achieve success together.";

let index = 0;

function typingEffect(){

    if(index < text.length){

        document.getElementById("typing-text").innerHTML +=
        text.charAt(index);

        index++;

        setTimeout(typingEffect,40);
    }
}

window.onload = () =>{
    typingEffect();
};

function register(){

    const email =
    document.getElementById("email").value.trim();

    const username =
    document.getElementById("username").value.trim();

    const password =
    document.getElementById("password").value.trim();

    const role =
    document.getElementById("role").value;

    const error =
    document.getElementById("error-message");

    error.style.display = "none";

    if(
        email === "" ||
        username === "" ||
        password === "" ||
        role === ""
    ){

        error.innerHTML =
        "Vui lòng nhập đầy đủ thông tin.";

        error.style.display = "block";

        return;
    }

    const gmailRegex =
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if(!gmailRegex.test(email)){

        error.innerHTML =
        "Gmail không hợp lệ.";

        error.style.display = "block";

        return;
    }

    localStorage.setItem(
        "userEmail",
        email
    );

    localStorage.setItem(
        "userName",
        username
    );

    localStorage.setItem(
        "userPassword",
        password
    );

    localStorage.setItem(
        "userRole",
        role
    );

    alert("Đăng ký thành công!");

    window.location.href =
    "login.html";
}