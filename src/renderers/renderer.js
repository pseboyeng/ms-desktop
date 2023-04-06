const information = document.querySelector('.app-title');

const func = async () => {
    const response = await window.appAPI.showHeading();
    information.innerText = response;
}

func();

//Caching DOM element selectors
const userMobile = document.querySelector('.user-mobile');
const userPassword = document.querySelector('.user-password');

const userMobileMessage = document.querySelector('.user-mobile-message');
const userPasswordMessage = document.querySelector('.user-password-message');
const submitButton = document.querySelector('.form-submit');
const submitMessage = document.querySelector('.submit-message');
const userPasswordCheckbox = document.querySelector('.user-password-checkbox');
const cancelButton = document.querySelector('.form-submit-cancel');

submitButton.style.visibility = 'hidden';
cancelButton.style.visibility = 'hidden';

let mobile;
let password;

const userLogin =() => {
    
    userMobile.addEventListener('keyup', (event) => {
        mobile = event.target.value;
        console.log(mobile);
        validateMobileInput(event.target.value);
    });

    userPassword.addEventListener('keyup', (event)=> {
        password = event.target.value;
        console.log(password);
        validatePasswordInput(event.target.value);
    });

}

const validateMobileInput = (mobile) => {
    if(mobile.length < 10 || mobile.length > 10){
        userMobileMessage.innerHTML = "mobile must be 10 characters long";
        userMobileMessage.style.color = "red";
    }else{
        userMobileMessage.innerHTML = `${mobile.length} characters`;
        userMobileMessage.style.color = "blue";
    }
}

const validatePasswordInput = (password) => { 
    if(password.length < 10){
        userPasswordMessage.innerHTML = "password must be 10 characters minimum";
        userPasswordMessage.style.color = "red";
        submitButton.style.visibility = 'hidden';
        cancelButton.style.visibility = 'hidden';
    }else{
        userPasswordMessage.innerHTML = `${password.length} characters`;
        userPasswordMessage.style.color = "blue";
        submitButton.style.visibility = 'visible';
        cancelButton.style.visibility = 'visible';
    }
}

userLogin();

userPasswordCheckbox.addEventListener('click',() =>{
    if(userPassword.type === 'password'){
        userPassword.type = 'text';
    } else {
        userPassword.type = 'password';
    }
});

cancelButton.addEventListener('click', () => {
    window.reload();
});

submitButton.addEventListener('click',(event) => {
    event.preventDefault();
    const user = { mobile: mobile, password: password };
    console.log(user);

    if(mobile === '0638676077' && password === 'JavaAssociate@2022'){
        setTimeout(()=>{
          submitMessage.innerHTML = '... logging you in ...';
          submitMessage.style.color = '#248ff3';   
          console.log(submitMessage);
          window.appAPI.setProfile(user);
          
          new Notification("new login",{
            body:`You successfully logged in at ${ new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`
          });

        },5000); 
    
    }else{
        setTimeout(() =>{
           submitMessage.innerHTML = '... failed to login, please check your mobile or password ..'
           submitMessage.style.color = 'red'; 
           console.log(submitMessage);
        },5000);
        
    }
});

