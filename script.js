const defaultJobs=[
{title:"Sales Executive",company:"",location:"Thane",experience:"",salary:"",description:""},
{title:"Collection",company:"",location:"Thane",experience:"",salary:"",description:""},
{title:"Customer Service",company:"",location:"Thane",experience:"",salary:"",description:""},
{title:"Backend",company:"",location:"Thane",experience:"",salary:"",description:""},
{title:"Banking Job",company:"",location:"Thane",experience:"",salary:"",description:""},
{title:"Tele Calling",company:"",location:"Thane",experience:"",salary:"",description:""}
];
const API_URL = https://script.google.com/a/macros/careerwithus.co.in/s/AKfycbxcpPZM8pgn2uY6DePJfJX3WGbiTp-Z1Jq1oPngQDt0nqSamWjb1H_EJb3D0RjDoFVnWg/exec

async function getJobs(){
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return Array.isArray(data) ? data : defaultJobs;
  } catch(e) {
    return defaultJobs;
  }
}

function saveJobs(j){
  localStorage.setItem("cwu_jobs", JSON.stringify(j));

  fetch(API_URL, {
    method: "POST",
    headers: {"Content-Type":"text/plain"},
    body: JSON.stringify(j[j.length - 1])
  });
}
function jobCard(j){return `<article class="job-card simple-job"><span class="tag">HIRING NOW</span><h3>${escapeHtml(j.title)}</h3><a class="card-link" href="tel:9987388037">Contact / Apply →</a></article>`}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function async renderJobs(){const box=document.getElementById("jobsList");if(!box)return;const q=(document.getElementById("jobSearch")?.value||"").toLowerCase();const loc=document.getElementById("locationFilter")?.value||"";const exp=document.getElementById("experienceFilter")?.value||"";const list=getJobs().filter(j=>(!q||`${j.title} ${j.company} ${j.description}`.toLowerCase().includes(q))&&(!loc||j.location===loc)&&(!exp||j.experience.includes(exp)));box.innerHTML=list.length?list.map(jobCard).join(""):`<div class="notice">No jobs match your search right now.</div>`}
function renderLocation(){const box=document.getElementById("locationJobs");if(!box)return;const loc=box.dataset.location;box.innerHTML=getJobs().filter(j=>j.location===loc).map(jobCard).join("")||`<div class="notice">No current ${loc} openings listed. Please check back soon.</div>`}
function setupCV(){const ids=["cvName","cvPhone","cvEmail","cvLocation","cvSummary","cvEducation","cvExperience","cvSkills"];if(!document.getElementById("cvForm"))return;const update=()=>{document.getElementById("pName").textContent=document.getElementById("cvName").value||"Your Name";document.getElementById("pContact").textContent=[cvPhone.value,cvEmail.value,cvLocation.value].filter(Boolean).join(" • ")||"Phone • Email • Location";document.getElementById("pSummary").textContent=cvSummary.value||"Your professional summary will appear here.";document.getElementById("pEducation").textContent=cvEducation.value||"Add your education details.";document.getElementById("pExperience").textContent=cvExperience.value||"Add your work experience.";document.getElementById("pSkills").textContent=cvSkills.value||"Add your skills."};ids.forEach(id=>document.getElementById(id).addEventListener("input",update));update()}
function setupHR(){const form=document.getElementById("hrJobForm");if(!form)return;const render=()=>{const box=document.getElementById("hrJobsPreview");const jobs=(await getJobs().filter(j=>j.demo);box.innerHTML=jobs.length?jobs.map(jobCard).join(""):`<div class="notice">Your demo-posted jobs will appear here.</div>`};form.addEventListener("submit",e=>{e.preventDefault();const jobs=getJobs();jobs.unshift({title:hrTitle.value,company:hrCompany.value,location:hrLocation.value,experience:hrExperience.value,salary:hrSalary.value,description:hrDescription.value,demo:true});saveJobs(jobs);form.reset();render();alert("Demo job saved in this browser. It is not yet a live public HR posting.");});render()}
document.addEventListener("DOMContentLoaded",()=>{document.querySelector(".nav-toggle")?.addEventListener("click",()=>document.querySelector(".nav")?.classList.toggle("open"));["jobSearch","locationFilter","experienceFilter"].forEach(id=>document.getElementById(id)?.addEventListener("input",renderJobs));renderJobs();renderLocation();setupCV();setupHR()});
