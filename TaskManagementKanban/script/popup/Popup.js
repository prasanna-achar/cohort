import KanbanComponents from "../components/KanbanComponents.js";
import KanbanAPI from "../api/KanbanAPI.js";

export default class Popup{

    static addNewItem(columnId) {
        // Create the popup container
        const popup = document.createElement('div');
        popup.classList.add('popup-container');

        const popupContent = document.createElement('div');
        popupContent.classList.add('popup-content');

        const title = document.createElement('h3');
        title.textContent = 'Add New Item';

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter task description...';

        const addButton = KanbanComponents.createButton("Add", "add-button",  () => {
            const task = input.value.trim();
            if (task) {
                // Call API to insert item
                KanbanAPI.insertItem(columnId, task);
                location.reload(); // Reload to show new item (simple approach)
            } else {
                alert('Task description cannot be empty!');
            }
        })
        // addButton.textContent = 'Add';
        // addButton.addEventListener('click',);

        const cancelButton = KanbanComponents.createButton(
            "Cancel",
            "cancel-button",
            () => popup.remove()

        )

        popupContent.appendChild(title);
        popupContent.appendChild(input);
        popupContent.appendChild(addButton);
        popupContent.appendChild(cancelButton);
        popup.appendChild(popupContent);
        document.body.appendChild(popup);


    }
    static addNewBoard() {
        const popup = document.createElement('div');
        popup.classList.add('popup-container');

        const popupContent = document.createElement('div');
        popupContent.classList.add('popup-content');

        const title = document.createElement('h3');
        title.textContent = 'Add New Board';

        const boardTitleInput = document.createElement('input');
        boardTitleInput.type = 'text';
        boardTitleInput.placeholder = 'Enter board title...';

        const descriptionInput = document.createElement('textarea');
        descriptionInput.placeholder = 'Enter board description...';

        const addButton = document.createElement('button');
        addButton.textContent = 'Add Board';
        addButton.addEventListener('click', () => {
            const boardTitle = boardTitleInput.value.trim();
            const boardDescription = descriptionInput.value.trim();
            if (boardTitle && boardDescription) {
                // Call API to create a new board
                KanbanAPI.createColumn(boardTitle, boardDescription);
                location.reload(); // Reload to show new board (simple approach)
            } else {
                alert('Both title and description are required!');
            }
        });

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', () => {
            popup.remove();  // Remove popup if canceled
        });

        popupContent.appendChild(title);
        popupContent.appendChild(boardTitleInput);
        popupContent.appendChild(descriptionInput);
        popupContent.appendChild(addButton);
        popupContent.appendChild(cancelButton);
        popup.appendChild(popupContent);
        document.body.appendChild(popup);
    }
}