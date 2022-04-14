import React, {useCallback, useEffect, useState} from "react";
import {PlusIcon} from "@heroicons/react/solid";
import ToDoLists from "./ToDoLists";
import AddTaskModal from "./AddTaskModal";
import { supabase } from "../../repository/supabase";
import ConfirmModal from "./ConfirmModal";

const TasksPart = () => {
    const randomId = (length) => {
        let result = '';
        let char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charLength = char.length;
        for (let i = 0; i < length ;i++) {
            result += char.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
    };
    const generateId = () => {
        const token = randomId(30);
        localStorage.setItem('id', token);
    };
    const today = new Date(new Date().setHours(0,0,0,0));
    const tmr = new Date(today);
    tmr.setDate(tmr.getDate() + 1)
    const id = localStorage.getItem('id') ? localStorage.getItem('id') : generateId();
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [addTask, setAddTask] = useState(false);
    const [action, setAction] = useState('');
    const [confirm, setConfirm] = useState(false);
    const addTasks = async (enteredTitle, enteredDescription) => {
        await supabase
            .from('to_do_lists')
            .insert([
                { title: enteredTitle, description: enteredDescription ? enteredDescription : null, completed_at: null, deleted_at: null, user_id: id }
            ]);
        setAction("add")
    };
    const deleteTask = async (taskNo) => {
        await supabase
            .from('to_do_lists')
            .update({ deleted_at: new Date() })
            .eq('task_no', taskNo);
        setAction("delete")
    };
    const finishTask = async (taskNo) => {
        console.log(taskNo);
        await supabase
            .from('to_do_lists')
            .update({ completed_at: new Date() })
            .eq('task_no', taskNo);
        setAction("finish");
    };
    // load tasks
    const loadTasks = useCallback(async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('to_do_lists')
            .select('*')
            .eq('user_id',id)
            .is('deleted_at', null)
            .is('completed_at', null)
            .lt('created_at', tmr.toISOString())
            .gt('created_at', today.toISOString())
            .order('created_at', { ascending: true })
        if (error) {
            setTasks([]);
            return;
        }
        setTasks(data);
        setIsLoading(false);
        // console.log(data)
    }, [])
    useEffect(()=>{
        loadTasks()
    },[loadTasks, action])
    const toggleConfirm = () => {
        setConfirm(confirm => !confirm)
    };

    const toggleDialog = () => {
        setAddTask(addTask => !addTask)
    };

    return (
        <div className="sm:w-full sm:mx-auto lg:w-1/2">
            <div className="flow-root">
                <div className="text-2xl font-normal float-left select-none">
                    Tasks
                </div>
                <div className="float-right">
                    <button onClick={toggleDialog} className="w-7 h-7 flex justify-center items-center bg-emerald-900 rounded-lg">
                        <PlusIcon className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
            { addTask &&
                <AddTaskModal onToggle={toggleDialog} onAddTasks={addTasks} />
            }
            <ToDoLists tasks={tasks} isLoading={isLoading} onDelete={deleteTask} onFinish={finishTask}/>
        </div>
    );
};

export default TasksPart;