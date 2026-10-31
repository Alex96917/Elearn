
/* Authentication simulation using localStorage. Never use real passwords. */
const Auth = (() => {
  const usersKey="elearn_users";
  const seed=()=>{if(!localStorage.getItem(usersKey))localStorage.setItem(usersKey,JSON.stringify([
    {name:"Demo Learner",email:"learner@elearn.test",password:"learn123",role:"learner"},
    {name:"Demo Instructor",email:"instructor@elearn.test",password:"teach123",role:"instructor"}
  ]));};
  const users=()=>JSON.parse(localStorage.getItem(usersKey)||"[]");
  function login(e){e.preventDefault();const email=document.querySelector("#login-email").value.trim().toLowerCase(),password=document.querySelector("#login-password").value,role=document.querySelector("#login-role").value;const user=users().find(u=>u.email.toLowerCase()===email&&u.password===password&&u.role===role);if(!user){Elearn.toast("Invalid details or role. Check the demo credentials.");return;}Elearn.setUser({name:user.name,email:user.email,role:user.role});Elearn.toast("Welcome back!");setTimeout(()=>Elearn.go(role==="instructor"?"instructor.html":"dashboard.html"),450);}
  function register(e){e.preventDefault();const name=document.querySelector("#reg-name").value.trim(),email=document.querySelector("#reg-email").value.trim().toLowerCase(),password=document.querySelector("#reg-password").value,role=document.querySelector("#reg-role").value;if(name.length<2||!email.includes("@")||password.length<6){Elearn.toast("Please complete all fields correctly.");return;}if(users().some(u=>u.email.toLowerCase()===email)){Elearn.toast("An account with this email already exists.");return;}const user={name,email,password,role};const all=users();all.push(user);localStorage.setItem(usersKey,JSON.stringify(all));Elearn.setUser({name,email,role});Elearn.toast("Account created successfully!");setTimeout(()=>Elearn.go(role==="instructor"?"instructor.html":"dashboard.html"),450);}
  seed();return {login,register};
})();
