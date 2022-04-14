import React, {useEffect, useRef, useState} from "react";
import BaseModal from "../UI/BaseModal";

const TimerConfigModal = (props) => {
  // const [pomodoroTime, setPomodoroTime] = useState();
  // const [shortBreakTime, setShortBreakTime] = useState();
  // const [longBreakTime, setLongBreakTime] = useState();
  const enteredPomodoro = useRef();
  const enteredShortBreak = useRef();
  const enteredLongBreak = useRef();
  const title = "Timer Config";
  const [error, setError] = useState({});
  useEffect(()=> {
      enteredPomodoro.current.value = props.pomodoroTime/60;
      enteredShortBreak.current.value = props.shortBreakTime/60;
      enteredLongBreak.current.value = props.longBreakTime/60;
  },[]);
  const validateEnteredPomodoro = () => {
      if (enteredPomodoro.current.value.trim().length === 0) {
          setError(prevErrors => {
              const updatedErrors = {...prevErrors, 'p': 'Please enter pomodoro time'};
              console.log(updatedErrors)
              return updatedErrors
          });
      } else {
          setError(prevErrors => {
              let updatedErrors = {...prevErrors};
              delete updatedErrors.p;
              return updatedErrors;
          });
      }
  };
  const validateEnteredShortBreak = () => {
      if (String(enteredShortBreak.current.value).trim().length === 0) {
          setError(prevErrors => {
              const updatedErrors = {...prevErrors, 's': 'Please enter short break time'};
              return updatedErrors
          });
      } else {
          setError(prevErrors => {
              let updatedErrors = {...prevErrors};
              delete updatedErrors.s;
              return updatedErrors;
          });
      }
  };
  const validateEnteredLongBreak = () => {
      if (String(enteredLongBreak.current.value).trim().length === 0) {
          setError(prevErrors => {
              const updatedErrors = {...prevErrors, 'l': 'Please enter long break time'};
              return updatedErrors
          });
      } else {
          setError(prevErrors => {
              let updatedErrors = {...prevErrors};
              delete updatedErrors.l;
              return updatedErrors;
          });
      }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (Object.keys(error).length !== 0) {
        return;
    } else {
        props.onSetNewRef(enteredPomodoro.current.value, enteredShortBreak.current.value, enteredLongBreak.current.value);
    }
  };


  return (
      <BaseModal title={title} onAction={props.onToggleDialog}>
          <form onSubmit={submitHandler}>
            <div className="w-full max-h-fit flex flex-col p-4">
                <label className="text-xl" >Pomodoro Time (minute)</label>
                <input
                    min={1}
                    type="text"
                    className="bg-gray-200 outline-primary-200 rounded-md w-3/4 py-0.5 px-2 mt-1"
                    ref={enteredPomodoro}
                    onBlur={validateEnteredPomodoro}
                />
                {error['p'] && <div className="text-red-500 ml-2">{ error['p'] }</div>}
                <label className="text-xl" >Short Break Time (minute)</label>
                <input
                    min={1}
                    type="number"
                    className="bg-gray-200 rounded-md w-3/4 py-0.5 px-2 mt-1"
                    ref={enteredShortBreak}
                    onBlur={validateEnteredShortBreak}
                />
                {error['s']  && <div className="text-red-500 ml-2">{ error['s'] }</div>}
                <label className="text-xl" >Long Break Time (minute)</label>
                <input
                    min={1}
                    type="number"
                    className="bg-gray-200 rounded-md w-3/4 py-0.5 px-2 mt-1"
                    ref={enteredLongBreak}
                    onBlur={validateEnteredLongBreak}
                />
                {error['l'] && <div className="text-red-500 ml-2">{ error['l'] }</div>}
            </div>
            <div className="px-4 py-2 border-t border-t-gray-500 flex justify-end items-center space-x-4">
              <button className="bg-primary-100 text-white px-4 py-2 rounded-md hover:bg-primary-200 transition duration-200" type="submit">OK</button>
            </div>
          </form>
      </BaseModal>
  );
};

export default TimerConfigModal;