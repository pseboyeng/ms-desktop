// console.log(window.appAPI.getProfile((event, data) => {
//     console.log(data);
// }));

const userMobile = document.querySelector('.user-mobile');
const userPass = document.querySelector('.user-pass');

window.appAPI.getProfile((event, data) => {
 userMobile.innerHTML = `mobile : ${data.mobile}`;
 userPass.innerHTML = `pass : ${data.password}`;
 console.log(data);

//  window.localStorage.setItem('mobile',data.mobile);
 
});

