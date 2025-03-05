import KanbanAPI from "./api/KanbanAPI.js";

const root = document.querySelector('.container')

updateKanban()

function createBoard(target) {
    const board = document.createElement('div');
    board.classList.add("kanban-board");

    board.addEventListener('dragover', ()=>{})

    const boardTitle = document.createElement('h2');
    boardTitle.classList.add('kanban-title');
    boardTitle.textContent = target.title;

    const description = document.createElement('p')
    description.className = 'description'
    description.textContent = target.desrciption

    // Content Container
    const itemsContainer = document.createElement('div');
    itemsContainer.classList.add("items");
    console.log(target)
    itemsContainer.setAttribute('id', target.name);

    if (target.items && target.items.length > 0) {
        target.items.forEach((item) => {
            const itemSection = document.createElement('div');
            itemSection.classList.add('item');

            itemSection.addEventListener('dragstart', () =>{
                itemSection.classList.add('flying')
            })
            itemSection.addEventListener('dragend', () =>{
                itemSection.classList.remove('flying')
            })
            itemSection.setAttribute('draggable', true)

            const textSection = document.createElement('input');
            textSection.setAttribute('type', 'text')
            textSection.value = item.content;
            textSection.setAttribute('disabled', true);

            const buttonSection = document.createElement('div');
            buttonSection.classList.add('buttonSection')
            // Edit Button
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('editButton');
            editButton.addEventListener('click', () => {
                if (textSection.disabled) {
                    textSection.disabled = false;
                    editButton.textContent = 'Save';
                } else {
                    textSection.disabled = true;
                    editButton.textContent = 'Edit';
                    // Call API to update item content
                    KanbanAPI.updateItem(item.itemId, textSection.value);
                }
            });

            // Delete Button
            const dltButton = document.createElement('button');
            dltButton.textContent = 'Delete';
            dltButton.classList.add('dltButton');
            dltButton.addEventListener('click', () => {
                // Call API to delete item
                KanbanAPI.deleteItem(item.itemId);
                itemSection.remove();  // Remove from DOM
            });

            buttonSection.appendChild(editButton);
            buttonSection.appendChild(dltButton);

            itemSection.appendChild(textSection);
            itemSection.appendChild(buttonSection);

            itemsContainer.appendChild(itemSection);
        });
    } else {
        const noTasksMessage = document.createElement('p');
        noTasksMessage.textContent = "No tasks available.";
        noTasksMessage.classList.add('no-tasks');
        itemsContainer.appendChild(noTasksMessage);
    }

    const addButton = document.createElement('button')
    addButton.classList.add('addButton')
    addButton.textContent = "+Add Item"
    addButton.addEventListener('click',()=>{})

    board.appendChild(boardTitle);
    board.appendChild(description)
    board.appendChild(itemsContainer);
    board.appendChild(addButton)
    

    root.appendChild(board);
}


function updateKanban(){
    try {
        const data = KanbanAPI.getKanban()
        console.log(data)
        data.forEach((board) =>createBoard(board))
    } catch (error) {
        console.log(error)
    }
}