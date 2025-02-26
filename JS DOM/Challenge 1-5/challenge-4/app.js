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
    if(totalTasks !== 0){
      emptyStatus.style.display = "none"
    }else{
      emptyStatus.style.display = "block"
    }
    totalTaskSpan.textContent = `Total tasks: ${totalTasks}`
    completedTaskSpan.textContent = `Completed tasks: ${completedTasks}`
  }
  
  
  

  addTask.addEventListener('click', ()=>{
    
   
    let task = taskInput.value.trim();
    if(task !== ''){
      
      

      const li = document.createElement('li');
      li.classList.add('task-item')

      const span = document.createElement('input')
      span.type = "text"
      span.disabled = true
      span.value = task;
      span.classList.add('input-disabled')
      
      const dltButton = document.createElement('button');
      dltButton.classList.add('delete-button')
      dltButton.textContent = "Delete"
      dltButton.addEventListener('click',()=>{
        taskList.removeChild(li)
        updateTaskStatus()

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

      const updateBtn = document.createElement('button')
      updateBtn.textContent = "Edit"
      let Edit = true
      updateBtn.addEventListener('click', ()=>{
        if(Edit){
          span.disabled = false
          span.classList.remove('input-disabled')
          updateBtn.textContent = "Save"
          Edit = false
        }else{
          console.log("In Save")
          updateBtn.textContent = "Edit"

          span.disabled = true
          span.classList.add('input-disabled')
          Edit= true
        }
      })

      li.appendChild(checkBox)
      li.appendChild(span)
      li.appendChild(dltButton)
      li.appendChild(updateBtn)
      taskList.appendChild(li)
      taskInput.value = ''
    }
    updateTaskStatus()
  })
})