/**
 * Write your challenge solution here
 */
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('.accordion-button')
    const contents = document.querySelectorAll('.accordion-content')
    console.log(buttons, contents)
    buttons.forEach((button, index) =>{
        for(let content of contents){
            console.log(content);
            
            if(content.classList.contains('active'))
            content.classList.remove('active')
        }
        for(let content of buttons){
            console.log(content);

            if(content.classList.contains('active'))
            content.classList.remove('active')   
        }
        button.addEventListener('click', (e) =>{
            
            if(button.classList.contains('active')){
                button.classList.remove('active')
                contents[index].classList.remove('active')
            }else{
                button.classList.add('active')
                contents[index].classList.add('active')

            }
        })
    })
  });
  