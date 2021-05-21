export function getAuthForm () {

    return `<form id="auth-form" class="mui-form">
        <div class="mui-textfield mui-textfield--float-label">
          <input id="email-input" type="email" required >
          <label for="email-input">Email</label>
        </div>
        <div class="mui-textfield mui-textfield--float-label">
          <input id="password-input" type="password" required >
          <label for="password-input">Password</label>
        </div>
        <button id="submit" type="submit" class="mui-btn mui-btn--primary">Login</button>
      </form>`
}


export function authWithEmailAndPassword (email, password) {
    const apiKey = '***********************************';
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {method: 'POST', body: JSON.stringify({email,password, returnSecureToken: true})
                ,headers: {'Content-Type': 'application/json'}})
        .then(response=>response.json())
        .then(response=>response.idToken)
}
