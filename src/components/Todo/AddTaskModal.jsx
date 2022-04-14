import React, {useRef, useState} from "react";
import BaseModal from "../UI/BaseModal";

const AddTaskModal = props => {
    const enteredTitle = useRef();
    // const enteredDescription = useRef('');
    const [error, setError] = useState({});
    const validateTitle = (title) => {
        if (title.trim().length === 0) {
            setError({'title': 'No entered title'});
            return;
        } else {
            setError({});
        }
    }
    const submitHandler = e => {
        e.preventDefault();
        validateTitle(enteredTitle.current.value);
        if (Object.keys(error).length !== 0) {
            return;
        } else {
            props.onAddTasks(enteredTitle.current.value, '');
            props.onToggle();
        }

    };
    return (
        <BaseModal title="Add new task" onAction={props.onToggle}>
            <form onSubmit={submitHandler}>
                <div className="w-full max-h-fit flex flex-col p-4">
                    <input type="text" className="text-xl w-[100%] bg-gray-200 outline-primary-200 rounded-md w-3/4 py-1 px-2 mt-1" placeholder="Task title" ref={enteredTitle} />
                    { error['title'] && <div className="text-red-500 ml-2">{error['title']}</div>}
                    {/*<div className="h-0.5 bg-gray-100 my-2" />*/}
                    {/*<textarea rows="5" className="text-xl w-[100%] bg-gray-200 outline-primary-200 rounded-md w-3/4 px-2 mt-1" placeholder="Task description" ref={enteredDescription}/>*/}
                </div>
                <div className="px-4 py-2 border-t border-t-gray-500 border-opacity-70 flex justify-end items-center space-x-4">
                    <button className="bg-primary-100 text-white px-4 py-2 rounded-md hover:bg-primary-200 transition duration-200" type="submit">OK</button>
                </div>
            </form>
        </BaseModal>
    );
};

export default AddTaskModal;