import {createModal, isValid} from "./util/utils.js";
import {Question} from "./question.js";
import {authWithEmailAndPassword, getAuthForm} from "./auth.js";

const form = document.getElementById('question-form');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');
const allBtn = document.getElementById('all');

allBtn.addEventListener('click',openModal)
form.addEventListener('submit', submitFormHandler);
input.addEventListener('input', function (){
    submitBtn.disabled = !isValid(input.value);
})

window.addEventListener('load',Question.renderList)



function openModal () {
createModal('Authorisation',getAuthForm())
    document.getElementById('auth-form')
        .addEventListener('submit',authFormHandler, {once: true});
}

function authFormHandler(event) {
    event.preventDefault();
    const email = event.target.querySelector('#email-input').value;
    const password = event.target.querySelector('#password-input').value;
    authWithEmailAndPassword(email, password)
        .then(Question.fetch)
        .then(renderModalAfterAuth)

}

function renderModalAfterAuth (content) {
if(typeof content === 'string'){
    console.log(typeof content)
    createModal('Error',content)
}
else {
    createModal('Questions',Question.listToHtml(content))
}
}

function submitFormHandler (event) {
    event.preventDefault();
    if(isValid(input.value)){
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }
        submitBtn.disabled = true;
        Question.create(question).then(()=>{
            input.value = '';
            input.className = '';
        })




    }
}

