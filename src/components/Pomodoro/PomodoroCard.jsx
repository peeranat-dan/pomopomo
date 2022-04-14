import React, {useEffect, useState} from "react";
import {AdjustmentsIcon, PauseIcon, PlayIcon} from "@heroicons/react/solid";
import TimerConfigModal from "./TimerConfigModal";

const PomodoroCard = props => {
    const [time, setTime] = useState();
    const [timeDisplay, setTimeDisplay] = useState();
    const mode = ['p','s','p','s','p','s','p','l'];
    const [isRunning, setIsRunning] = useState(false);
    const [n, setN] = useState(0);
    const [timeReference, setTimeReference] = useState(!localStorage.getItem('timeReference') ? {p: 1500, s:300, l: 900}: JSON.parse(localStorage.getItem('timeReference')) );
    const [timerBackground, setTimerBackground] = useState({p: 'bg-timerMain-100', s: 'bg-primary-100', l: 'bg-secondary-100'});
    const [settingDialog, setSettingDialog] = useState(false);
    const toggle = () => {
        setIsRunning(!isRunning);
    };
    const modeName = {p: 'Pomodoro', s: 'Short Break', l: 'Long Break'};
    useEffect(() => {
        let interval = null;
        setTimeDisplay(Math.floor(time/60) + ":" +(time%60 >= 10 ? time%60 : "0" + time%60));
        document.title = "("+ Math.floor(time/60) + ":" +(time%60 >= 10 ? time%60 : "0" + time%60) + ") - PomoPomo";
        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime(time => time - 1);
            }, 1000);
        } else if (!isRunning) {
            clearInterval(interval);
        } else if (time === 0) {
            clearInterval(interval);
            setN(n => n + 1);
            setIsRunning(false);
        }
        return () => { clearInterval(interval) };
    }, [isRunning, time]);

    useEffect(()=> { // init session
        setTime(timeReference[mode[n]]);
        localStorage.setItem('timeReference', '{"p":'+timeReference["p"] + ',"s":' + timeReference["s"]  + ',"l":' + timeReference["l"]  + '}');
        setTimeDisplay(Math.floor(time/60) + ":" +(time%60 >= 10 ? time%60 : "0" + time%60));
        if (n > 7) {
            setN(0);
        }
    },[n,timeReference]);
    const setting = () => {
        setSettingDialog(settingDialog => !settingDialog);
    };
    const setNewReference = (pomodoroTime, shortBreakTime, longBreakTime) => {
        setTimeReference(() => {
            const updatedRefs = {p: pomodoroTime * 60, s: shortBreakTime * 60, l: longBreakTime * 60};
            return updatedRefs;
        })
        localStorage.setItem('timeReference', '{"p":'+pomodoroTime * 60 + ',"s":' + shortBreakTime * 60 + ',"l":' + longBreakTime * 60 + '}');
        setSettingDialog(settingDialog => !settingDialog);
    };
    return (
        <>
            { settingDialog &&
                <TimerConfigModal
                    onToggleDialog={setting}
                    onSetNewRef={setNewReference}
                    pomodoroTime={timeReference["p"]}
                    shortBreakTime={timeReference.s}
                    longBreakTime={timeReference.l}
                />}
            <div className="bg-white w-full p-1.5 mt-10 mb-10 rounded-xl flex flex-col items-center shadow-md space-y-2">
                <div className={`${timerBackground[mode[n]]} w-full rounded-xl flex flex-col justify-center items-center transition-colors duration-300`}>
                    <div className="text-6xl sm:text-8xl mt-10 sm:mt-20 text-white select-none">{timeDisplay}</div>
                    <div className={"text-xl sm:text-2xl mb-10 sm:mb-20 text-white select-none flex items-center mt-1"}>
                        {"Mode: " +modeName[mode[n]]}
                        <button className="bg-white rounded-md ml-[1em] disabled:opacity-60 transition-opacity duration-200" onClick={setting} disabled={isRunning}>
                            <AdjustmentsIcon className="text-timerMain-100 hover:text-timerMain-300 transition-colors duration-200 w-8 h-8 p-1" />
                        </button>
                    </div>
                </div>
                <div>
                    <button className="mt-1" onClick={toggle}>
                        { !isRunning ? <PlayIcon className="text-primary-300 hover:text-primary-500 transition-colors duration-200 w-10 h-10"/> : <PauseIcon className="text-timerMain-100 hover:text-timerMain-300 transition-colors duration-200 w-10 h-10" />}
                    </button>
                </div>
            </div>
        </>
    );
};

export default PomodoroCard;