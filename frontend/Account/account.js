function toggleForm(formId) {
    const buttons = document.querySelectorAll('.toggle-btn');
    const formWrapper = document.querySelector('.form-wrapper');
    const tabIndicator = document.querySelector('.tab-indicator');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (formId === 'signUp') {
        formWrapper.style.transform = 'translateX(-50%)';
        tabIndicator.style.transform = 'translateX(100%)';
    } else {
        formWrapper.style.transform = 'translateX(0)';
        tabIndicator.style.transform = 'translateX(0)';
    }
}


const signInForm = document.querySelector('#signIn');
const signUpForm = document.querySelector('#signUp');

signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let username = e.target[0].value;
    let password = e.target[1].value;
    console.log(username, password);
});