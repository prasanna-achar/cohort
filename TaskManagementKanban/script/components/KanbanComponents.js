import KanbanAPI from "../api/KanbanAPI.js";
import Popup from "../popup/Popup.js";
export default class KanbanComponents{

    

    static  createBoard(target) {
        const board = document.createElement('div');
        console.log(target.columnId);
        
        board.classList.add("kanban-board");
        board.setAttribute('id', target['columnId'])
        board.addEventListener('dragover', ()=>{

        })
        


        const boardTitle = document.createElement('h2');
        boardTitle.classList.add('kanban-title');
        boardTitle.textContent = target.title;
    
        const description = document.createElement('p')
        description.className = 'description'
        description.textContent = target.desrciption
    
        // Content Container
        const itemsContainer = document.createElement('div');
        itemsContainer.classList.add("items");
        itemsContainer.setAttribute('id', target.columnId);
    
        if (target.items && target.items.length > 0) {
            target.items.forEach((item) => 
                itemsContainer.appendChild(this.createTaskCard(item))
        );
        } else {
            const noTasksMessage = document.createElement('p');
            noTasksMessage.textContent = "No tasks available.";
            noTasksMessage.classList.add('no-tasks');
            itemsContainer.appendChild(noTasksMessage);
        }
    
        const addButton = this.createButton("+Add Item", "addButton", () =>{
            const popup = document.querySelector('popup-container')
            if(!popup){
                Popup.addNewItem(target.columnId)
            }
        })
        // addButton.classList.add('addButton')
        // addButton.textContent = "+Add Item"
        // addButton.addEventListener('click',()=>{})
    
        board.appendChild(boardTitle);
        board.appendChild(description)
        board.appendChild(itemsContainer);
        board.appendChild(addButton)
        

        


        // root.appendChild(board);
        return board;
    }
    static createTaskCard(item) {
        const itemSection = document.createElement('div');
        itemSection.classList.add('item');
        itemSection.setAttribute('id', item.itemId);


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
       

        const editButton = this.createButton( "Edit", "editButton",() => {
            if (textSection.disabled) {
                textSection.disabled = false;
                editButton.textContent = 'Save';
            } else {
                textSection.disabled = true;
                editButton.textContent = 'Edit';
                // Call API to update item content
                KanbanAPI.updateItem(item.itemId, textSection.value);
            }   
        })


        const dltButton = this.createButton("Delete", 'dltButton', () => {
            KanbanAPI.deleteItem(item.itemId);
            itemSection.remove(); 
        });
        itemSection.addEventListener('dragstart',() =>{
            itemSection.classList.add('flying')
        })
        itemSection.addEventListener('dragend',() =>{
            itemSection.classList.remove('flying')
        })


        buttonSection.appendChild(editButton);
        buttonSection.appendChild(dltButton);

        itemSection.appendChild(textSection);
        itemSection.appendChild(buttonSection);

        return itemSection;    
        
    }

    static createButton(
        textContent = "",
        classList = [],
        onClickEventFunction,
        id =""
    ){
        const button = document.createElement('button')
        button.textContent = textContent;
        if(id){
            button.setAttribute('id', id)
        }
        if(Array.isArray(classList)){
            classList.forEach((list) => button.classList.add(list))
        }else{
            button.classList.add(classList)
        }
        button.addEventListener('click', onClickEventFunction)
        return button
    }
    
}