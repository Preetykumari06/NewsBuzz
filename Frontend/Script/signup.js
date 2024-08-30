const BaseUrl = "https://news-buzz-backend.onrender.com";
const registrationUrl = `${BaseUrl}/signup`

let firstnameError = document.getElementById("firstname-error")
let lastnameError = document.getElementById("lastname-error")
let emailError = document.getElementById("email-error")
let passwordError = document.getElementById("password-error")
let submitError = document.getElementById("submit-error")

// validation for first name from input
function validationFirstName() {
    let name = document.getElementById("name").value;
    if (name.length <= 2) {
        firstnameError.innerHTML = "First Name is required";
        return false;
    }
    firstnameError.innerHTML = '<i class="fas fa-check-circle"></i>';
    return true;

};


//validation for email id from input
function validationEmail() {
    let email = document.getElementById("email").value;
    if (email.length == 0) {
        emailError.innerHTML = "Email is required";
        return false;
    }
    if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailError.innerHTML = "Email Invalid"
        return false;
    }
    emailError.innerHTML = '<i class="fas fa-check-circle"></i>';
    return true;
};

// validation for password from input
function validationPassword() {
    let password = document.getElementById("password").value;
    if (password.length == 0) {
        passwordError.innerHTML = "Password Invalid!";
        return false;
    }
    if (password.length < 5) {
        passwordError.innerHTML = "5 character is required";
        return false;
    }
    passwordError.innerHTML = '<i class="fas fa-check-circle"></i>';
    return true;
};

// validation for form all inputs are working or data provided working fine or not
function validateSubmit() {
    if (!validationPassword() || !validationEmail() || !validationFirstName()) {
        submitError.innerHTML = "Please fill the data to submit."
        return false
    } else {
        RegisterUser();
        return true;
    }
}

//submit event created here
var Submitbutton = document.getElementById("Submit");
Submitbutton.addEventListener("click", function (e) {
    e.preventDefault();
    validateSubmit()
})

// catching all input values after validation
var username = document.getElementById("name");
var email = document.getElementById("email");
var password = document.getElementById("password");

// posting new Admin user data to server 
function RegisterUser() {
    let newUserObject = {
        "name": username.value,
        "password": password.value,
        "email": email.value
    };
    console.log(newUserObject)
    fetch(`${registrationUrl}`, {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(newUserObject)
    })
        .then((res) => res.json())
        .then((data) => {
            // alert(`${data.msg}`);
            Swal.fire({
                title: data.err ? 'Error!' : 'Success!',
                text: data.msg,
                icon: data.err ? 'error' : 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (!data.err) {
                    redirectToLogin();
                }
            });
        })
};

// redirecting to dashboard
function redirectToLogin() {
    location.href = "./index.html"
};


