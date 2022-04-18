import React from "react";

const AddTaskButton = props => {
    const addTask = () => {
        props.onAction(props.status);
    };
    let borderColor;
    if (props.status === "backlog") {
        borderColor = "primary-100";
    } else if (props.status === "wip") {
        borderColor = "timerMain-100";
    } else {
        borderColor = "secondary-100";
    }
    return (
        <button className={`bg-${borderColor} w-full py-1 text-white rounded-lg mt-2 shadow-md`} onClick={addTask}>
            + Add new task
        </button>
    )
};

export default AddTaskButton;