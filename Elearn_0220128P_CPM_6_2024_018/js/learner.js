
/* Learner progress and assignment submission features */
const Progress = (() => {
 const key="elearn_progress",all=()=>JSON.parse(localStorage.getItem(key)||"{}");
 const get=id=>all()[id]||0;
 const set=(id,value)=>{const a=all();a[id]=Math.max(0,Math.min(100,value));localStorage.setItem(key,JSON.stringify(a));};
 const completedCount=()=>Object.values(all()).reduce((n,v)=>n+Math.floor(v/20),0);
 const certificates=()=>Object.entries(all()).filter(([id,v])=>v>=100).map(([id])=>Courses.find(id)).filter(Boolean);
 return {get,set,completedCount,certificates};
})();
const Learner = (() => {
 const key="elearn_submissions",submissions=()=>JSON.parse(localStorage.getItem(key)||"[]");
 function submitAssignment(e){e.preventDefault();const title=document.querySelector("#assignment-title").value.trim(),course=document.querySelector("#assignment-course").value,link=document.querySelector("#assignment-link").value.trim();if(title.length<3||!link){Elearn.toast("Please complete the required fields.");return;}const list=submissions();list.push({id:Date.now(),title,course,link,notes:document.querySelector("#assignment-notes").value.trim(),student:Elearn.getUser().name,date:new Date().toLocaleDateString(),grade:""});localStorage.setItem(key,JSON.stringify(list));e.target.reset();renderAssignments();Elearn.toast("Assignment submitted successfully.");}
 function renderAssignments(){const body=document.querySelector("#assignment-rows");if(!body)return;const list=submissions();body.innerHTML=list.length?list.map(s=>`<tr><td>${Elearn.escapeHTML(s.title)}</td><td>${Elearn.escapeHTML(s.course)}</td><td>${s.date}</td><td><span class="status ${s.grade?"":"pending"}">${s.grade?"Graded: "+s.grade:"Submitted"}</span></td></tr>`).join(""):`<tr><td colspan="4">No submissions yet.</td></tr>`;}
 return {submissions,submitAssignment,renderAssignments};
})();
