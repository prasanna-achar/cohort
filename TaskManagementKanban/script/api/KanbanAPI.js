export default class KanbanAPI{
    
    static getKanban(){
        return readKanban()
    }

    static createColumn(columnTitle, desrciption){
        const existingKanban = readKanban()
        const findColumn = existingKanban.find(column => column.title.toLowerCase() === columnTitle.toLowerCase())
        if(findColumn){
            throw new Error("A column already exist with this title")
        }
        const newColumn = {
            columnId: existingKanban.length + 1,
            title: columnTitle,
            desrciption,
            items:[
            ],
        }

        existingKanban.push(newColumn)
        saveKanban(existingKanban)

    }
    static deleteColumn(columnId){
        const data = readKanban()
        const updatedData = data.filter(column => column.columnId !== columnId)
        saveKanban(updatedData)
    }
    static insertItem(columnId, item){
        if(!item){
            throw new Error("Task can't be empty")
        }
        const data = readKanban()
        const column = data.find(column => column.columnId === columnId)
        column.items.push({
            itemId: Date.now(),
            content:item
        })
        saveKanban(data)
        return true
    }
    static getItemsByColumnId(columnId){
        if(!columnId){
            throw new Error("Column Doesn't exist")
        }
        const data = readKanban()
        const column = data.find(column => column.columnId === columnId)
        if(column.items){
            return column.items
        }
        return []
    }
    static getAllItems(){
        const data = readKanban()
        const AllTasks = []
        data.forEach((column) =>{
            column.items.forEach((item) =>{
                AllTasks.push(item)
            })
        })
        return AllTasks
    }
    static deleteItem(itemId){
        const data = readKanban()
        data.forEach((column) =>{
            column.items = column.items.filter(item => item.itemId !== itemId)
        })

        saveKanban(data)
    }
    static updateItem(itemId, content){
        const data = readKanban()
        data.forEach((column) =>{
            column.items.forEach((item) =>{
                if(item.itemId === itemId){
                    item.content = content
                }
            })
        })
        saveKanban(data)
    }
}

function readKanban(){
    const json = localStorage.getItem('kanban-items')

    if(json){
        return JSON.parse(json)
    }
    return [
        {
            columnId: 1,
            title: "Todo",
            name:"todoItems",
            desrciption:"Add Todo Tasks",
            items:[
                
            ],
        },
        {
            columnId: 2,
            title: "In progress",
            name:"progressItems",
            desrciption:"Work in progress stage",
            items:[
                
            ],
        },
        {
            columnId: 3,
            title: "Completed",
            name:"completedItems",
            desrciption:"This task has been completed",
            items:[
                
                
            ],
        },
    ]
}

function saveKanban(data){
    if(data){
        localStorage.setItem('kanban-items', JSON.stringify(data))
    }
}