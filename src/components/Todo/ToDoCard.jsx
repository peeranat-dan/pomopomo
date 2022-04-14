import React, {useState} from "react";
import {PencilIcon, XIcon} from "@heroicons/react/solid";
import ConfirmModal from "./ConfirmModal";

const ToDoCard = props => {
    const task = props.task;

    const [toggle, setToggle] = useState(false);
    const toggleDialog = () => {
        setToggle(toggle => !toggle);
    };
    const deleteTask = () => {
        props.onDelete(task.task_no);
    };
    const finishTask = () => {
        props.onFinish(task.task_no);
    }
    return (
        <div key={task.task_no}>
            {toggle && <ConfirmModal onToggle={toggleDialog} onDelete={deleteTask}/>}
            <div className="p-3 flow-root">
                <div className="float-left flex items-center">
                    <input type="checkbox" className="mr-3 w-5 h-5 default:ring-2 accent-primary-200" onChange={finishTask}/>
                    <div className="text-lg font-thai">
                        { task.title }
                    </div>
                </div>
                <div className="float-right flex space-x-2">
                    {/*<button className="bg-primary-100 rounded-lg w-7 h-7 flex justify-center items-center">*/}
                    {/*    <PencilIcon className="w-5 h-5 text-white"/>*/}
                    {/*</button>*/}
                    <button className="bg-secondary-100 rounded-lg w-7 h-7 flex justify-center items-center" onClick={toggleDialog}>
                        <XIcon className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
            <div className="bg-gray-200 h-0.5">
            </div>
        </div>
    );
};

export default ToDoCard;