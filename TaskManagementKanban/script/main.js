import KanbanAPI from "./api/KanbanAPI.js";
import KanbanComponents from "./components/KanbanComponents.js";
import Popup from "./popup/Popup.js";

const root = document.querySelector('.container')

updateKanban()


const createBoardButton = KanbanComponents.createButton("+ Add new Board", "create-board", Popup.addNewBoard)
// createBoardButton.textContent = "+ Add new Board"
// createBoardButton.classList.add('create-board')
root.appendChild(createBoardButton)





function updateKanban(){
    try {
        const data = KanbanAPI.getKanban()
        // data.forEach((board) =>createBoard(board))
        data.forEach((board) =>{
            root.appendChild(KanbanComponents.createBoard(board))
        })
    } catch (error) {
        console.log(error)
    }
}