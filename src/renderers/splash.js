const version = document.querySelector('.version');

window.appAPI.setVersion((event, value) =>{
    version.innerHTML = value;
});
