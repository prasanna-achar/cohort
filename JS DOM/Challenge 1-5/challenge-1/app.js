/**
 * Write your challenge solution here
 */
const toggleButton = document.getElementById('toggleButton')


toggleButton.addEventListener('click',(e)=>{
    const body = document.getElementById('body')
    const bulb = document.getElementById('bulb')
    const status = document.getElementById('status')
    
    if(status.innerHTML === "Status: Off"){
        status.innerHTML = "Status: On";
        toggleButton.innerHTML = "Turn Off"
        body.classList.add('dark-mode')
        bulb.classList.remove('off')
    }else{
        status.innerHTML = "Status: Off";
        toggleButton.innerHTML = "Turn On"
        body.classList.remove('dark-mode')
        bulb.classList.add('off')
    }
})