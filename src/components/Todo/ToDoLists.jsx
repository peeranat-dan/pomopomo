import React, {createContext, useEffect, useRef, useState} from "react";
import ToDoCard from "./ToDoCard";
import BacklogDropArea from "./BacklogDropArea";
import WipDropArea from "./WipDropArea";
import DoneDropArea from "./DoneDropArea";
import AddTaskButton from "./AddTaskButton";
import AddTaskModal from "./AddTaskModal";

export const CardContext = createContext({
    moveStatus: null
})

const ToDoLists = props => {
    const [tasks, setTasks] = useState([]);
    const moveStatus = (_id, status) => {
        setTasks(tasks => {
            let task = tasks.filter(t => t.taskId === _id);
            task[0].status = status;
            return tasks.filter(t => t.taskId !== _id).concat(task[0]);
        });
    };
    const [toggle, setToggle] = useState(false);
    const [mode, setMode] = useState('');
    const toggleDialog = () => {
        setToggle(toggle => !toggle);
    };
    const toggleTaskModal = (mode) => {
        toggleDialog();
        setMode(mode);
    };
    const addTasks = (obj) => {
        setTasks(prevTasks => [...prevTasks, obj ]);
    };

    return (
        <CardContext.Provider value={{moveStatus}}>
            { toggle && <AddTaskModal mode={mode} onToggle={toggleDialog} onAddTask={addTasks}/>}
        <div className="bg-white w-full p-1.5 mt-10 mb-10 rounded-xl flex shadow-md">
            <div className="w-1/3 bg-backlog px-2 py-2 rounded-lg mx-0.5">
                <div className="text-xl font-medium mb-2">
                    Backlog
                </div>
                <BacklogDropArea>
                    {tasks
                        .filter(task => task.status === "backlog")
                        .map(task => <ToDoCard key={task.taskId} obj={task}/>)
                    }
                    <AddTaskButton status="backlog" onAction={toggleTaskModal} />
                </BacklogDropArea>
            </div>
            <div className="w-1/3 bg-wip px-2 py-2 rounded-lg mx-0.5" >
                <div className="text-xl font-medium mb-2">
                    Work-in-progress
                </div>
                <WipDropArea>
                    {tasks.filter(task => task.status === "wip")
                        .map(task => {
                            return <ToDoCard key={task.taskId} obj={task}/>
                        })}
                    <AddTaskButton status="wip" onAction={toggleTaskModal} />
                </WipDropArea>
            </div>
            <div className="w-1/3 bg-done px-2 py-2 rounded-lg mx-0.5">
                <div className="text-xl font-medium mb-2">
                    Done
                </div>
                <DoneDropArea>
                    {tasks
                        .filter(task => task.status === "done")
                        .map(task => <ToDoCard key={task.taskId} obj={task}/>)
                    }
                    <AddTaskButton status="done" onAction={toggleTaskModal} />
                </DoneDropArea>
            </div>
        </div>
        </CardContext.Provider>
    )
};

export default ToDoLists;