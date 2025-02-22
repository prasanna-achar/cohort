/**
 * Write your challenge solution here
 */
function dynamicChange(place, input){
    place.innerHTML = input || "Not Provided"
}
const nameInput = document.getElementById('nameInput')
const jobInput = document.getElementById('jobInput')
const ageInput = document.getElementById('ageInput')
const bioInput = document.getElementById('bioInput')

nameInput.addEventListener('input', (e)=>{
    dynamicChange(document.getElementById('nameDisplay'), e.target.value)
})

jobInput.addEventListener('input', (e) =>{
    dynamicChange(document.getElementById('jobDisplay'), e.target.value)
})

ageInput.addEventListener('input', (e) =>{
    dynamicChange(document.getElementById('ageDisplay'), e.target.value)
})

bioInput.addEventListener('input', (e) =>{
    dynamicChange(document.getElementById('bioDisplay'), e.target.value)
})