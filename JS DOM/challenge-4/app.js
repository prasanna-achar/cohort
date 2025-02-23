document.addEventListener('DOMContentLoaded', ()=>{
  const taskInput = document.getElementById('taskInput');
  const addTask = document.getElementById('addButton');
  const totalTaskSpan = document.querySelector('#totalTasks');
  const completedTaskSpan = document.querySelector('#completedTasks')
  const taskList = document.getElementById('taskList')
  const emptyStatus = document.getElementById('empty-list')

  function updateTaskStatus(){
    const totalTasks = document.querySelectorAll('.task-item').length;
    const completedTasks = document.querySelectorAll('.task-item input:checked').length
    console.log(completedTasks);
    
    totalTaskSpan.textContent = `Total tasks: ${totalTasks}`
    completedTaskSpan.textContent = `Completed tasks: ${completedTasks}`
  }

  if(taskList.children.length === 0){
    taskList.innerHTML = `<li id='empty-list'> No tasks yet, Add on above!</li>`
  }
  updateTaskStatus()

  addTask.addEventListener('click', ()=>{
    let task = taskInput.value.trim();
    if(task !== ''){

      

      const li = document.createElement('li');
      li.classList.add('task-item')

      const span = document.createElement('span')
      span.textContent = task;
      span.classList.add('task-test')
      
      const dltButton = document.createElement('button');
      dltButton.classList.add('delete-button')
      dltButton.textContent = "Delete"
      dltButton.addEventListener('click',()=>{
        taskList.removeChild(li)
        

      })
      const checkBox = document.createElement('input')
      checkBox.type = "checkbox"
      checkBox.addEventListener('change', ()=>{
        if(span.classList.contains('completed')){
          span.classList.remove('completed')
        }else{
          span.classList.add('completed')
        }
        updateTaskStatus()

      })

      li.appendChild(checkBox)
      li.appendChild(span)
      li.appendChild(dltButton)
      taskList.appendChild(li)
      taskInput.value = ''
    }
    updateTaskStatus()
  })
})