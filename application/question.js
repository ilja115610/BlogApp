export class Question {

    static create(question) {
        return fetch('https://**************default-rtdb.europe-west1.firebasedatabase.app/questions.json',
            {
                method: 'POST',
                body: JSON.stringify(question),
                headers: {'Content-Type': 'application/json'}
            }).then(response => response.json())
            .then(response => {
                question.id = response.name
                return question;
            }).then(addToLocalstorage)
            .then(Question.renderList)
    }

    static renderList () {
        const questions = getAllQuestionsFromLs()
        let html = questions.length>0
        ? questions.map(toCard).join('')
        : `<div class="mui--text-headline">No questions yet...</div>`

        const list = document.getElementById('list');
        list.innerHTML = html;
    }

    static fetch (token) {
        if(!token){
            return Promise.resolve('<p class="error">Authorisation failed</p>')

        }
       return  fetch(`https://*************default-rtdb.europe-west1.firebasedatabase.app/questions.json?auth=${token}`)
           .then(response=>response.json())
           .then(questions=>{
               if(questions.error){
                   return `<p class="error">${questions.error}</p>`
               }

               return questions ? Object.keys(questions).map(key=>({
                   ...questions[key],id:key
               })) : []
           })
    }

    static listToHtml (questions) {
        return `<ol>${questions.map(q=>`<li>${q.text}</li>`).join('')}</ol>`
    }

    }

    function toCard(question) {
        return `<div class="mui--text-headline">Question:</div>
      <div class="mui--text-black-54">By <a href="#">Username</a> ${new Date(question.date).toLocaleString('fr')}</div>
      <div>${question.text}</div>
       <br>`
    }

    function addToLocalstorage (question) {
        const all = getAllQuestionsFromLs()
        all.push(question)
        localStorage.setItem('questions',JSON.stringify(all))
    }

function getAllQuestionsFromLs () {
    return JSON.parse(localStorage.getItem('questions')||'[]')
}


