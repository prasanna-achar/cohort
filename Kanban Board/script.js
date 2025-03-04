const addTask = document.getElementById('addTask')
const todoItems = document.getElementById('todoItems')

const allTodos = [
    todoItems,
    document.getElementById('progressItems'),
    document.getElementById('completedItems')
]

const dragChange = (target) =>{
    target.addEventListener('dragstart' ,()=>{
        target.classList.add('flying')
    })
    target.addEventListener('dragend' ,()=>{
        target.classList.remove('flying')
    })
}

addTask.addEventListener('click', () =>{
    const input = prompt("Enter the task")
    if(!input) return

    const task = document.createElement('p')
    task.setAttribute('draggable', true)
    task.classList.add('item')
    todoItems.appendChild(task)
    task.textContent = input
    dragChange(task)
    
})

allTodos.forEach((list) =>{
    list.addEventListener('dragover', () =>{
        const flyingElement = document.querySelector('.flying')
        list.appendChild(flyingElement)
        // console.log(list)
    })
})

// document.querySelectorAll('.items')
//     .forEach((itemSection) =>{
//         itemSection.addEventListener('dragover', () =>{
//             const flyingElement = document.querySelector('.flying')
//             itemSection.appendChild(flyingElement)
//         })
//     })