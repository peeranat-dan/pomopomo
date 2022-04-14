import React from "react";
import ToDoCard from "./ToDoCard";
import LoadingCard from "./LoadingCard";

const ToDoLists = props => {
    const isLoading = props.isLoading;
    const tasks = props.tasks;
    const deleteTasks = (taskId) => {
        props.onDelete(taskId);
    };
    const finishTask = (taskId) => {
        props.onFinish(taskId);
    };
    let content;
    if (isLoading) {
        content = <LoadingCard />;
    } else if (!isLoading && tasks.length === 0) {
        content = <div className="text-xl p-3">No tasks ;(</div>
    } else if (!isLoading && tasks.length !== 0) {
        content = tasks.map(task => {
            return <ToDoCard key={task.task_no} task={task} onDelete={deleteTasks} onFinish={finishTask} />;
        })
    }
    return (
        <div className="mt-4 lg:mt-10 mb-5 bg-white p-2 shadow-lg rounded-xl">
            {content}
        </div>
    );
};

export default ToDoLists;