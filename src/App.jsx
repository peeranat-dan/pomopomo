import React from "react";
import PomodoroCard from "./components/Pomodoro/PomodoroCard";
import ToDoLists from "./components/Todo/ToDoLists";


function App() {
  return (
    <div className="w-full h-screen overflow-y-auto px-[1.5em] sm:px-0 bg-background pt-[2em]">
        <div className="sm:w-full sm:mx-auto lg:w-1/2">
            <div className="text-3xl font-normal lg:hidden select-none">
                Pomodoro <span className="text-primary-100">Timer</span>
            </div>
            <div className="text-3xl font-normal hidden lg:block select-none">
                Pomo<span className="text-primary-100">Pomo</span>
            </div>
            <PomodoroCard />
        </div>
        <div className="sm:w-full sm:mx-auto lg:w-1/2">
            <ToDoLists />
        </div>
    </div>
  );
};

export default App;
