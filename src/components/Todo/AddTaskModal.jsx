import React, {useRef} from "react";
import BaseModal from "../UI/BaseModal";

const AddTaskModal = props => {
    const enteredTitle = useRef();
    const enteredTag = useRef();
    const enteredDescription = useRef();
    let mode;
    if (props.mode === "backlog") {
        mode = "Backlog";
    } else if (props.mode === "wip") {
        mode = "Work-In-Progress";
    } else {
        mode = "Done";
    }
    const toggleDialog = () => {
        props.onToggle();
    };
    const submitHandler = (e) => {
        e.preventDefault();
        props.onAddTask({
            taskId: Math.random().toString(),
            title: enteredTitle.current.value,
            description: enteredDescription.current.value,
            tag: enteredTag.current.value,
            status: props.mode
        });
        props.onToggle();
    };

    return (
        <BaseModal title={`Add ${mode}`} onAction={toggleDialog}>
            <form onSubmit={submitHandler}>
            <div className="w-full max-h-fit flex flex-col p-4">
                <div className="flex flex-row items-center justify-between">
                    <input
                        type="text"
                        id="taskTitle"
                        className="bg-gray-200 outline-primary-200 rounded-md w-3/4 py-0.5 px-2 mt-1 mr-1"
                        placeholder="Task title"
                        ref={enteredTitle}
                    />
                    <input
                        type="text"
                        id="taskTag"
                        className="bg-gray-200 outline-primary-200 rounded-md w-1/4 py-0.5 px-2 mt-1 ml-1"
                        placeholder="Tag"
                        ref={enteredTag}
                    />
                </div>
                <div className="border-t border-t-gray-500 border-opacity-70 my-3" />
                <div>
                    <textarea
                        rows={5}
                        id="taskDesc"
                        className="bg-gray-200 outline-primary-200 rounded-md w-full py-0.5 px-2 mt-1"
                        placeholder="Description"
                        ref={enteredDescription}
                    />
                </div>

            </div>
            <div className="px-4 py-2 border-t border-t-gray-500 flex justify-end items-center space-x-4">
                <button className="bg-primary-100 text-white px-4 py-2 rounded-md hover:bg-primary-200 transition duration-200" type="submit">OK</button>
            </div>
            </form>
        </BaseModal>
    );
};

export default AddTaskModal;