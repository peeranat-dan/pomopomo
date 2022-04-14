import React, {useState} from "react";
import BaseModal from "../UI/BaseModal";

const ConfirmModal = props => {
    const [isLoading, setIsLoading] = useState(false);
    const toggleDialog = () => {
        props.onToggle();
    };
    const deleteTask =  () => {

        props.onDelete();

    }
    return (
        <BaseModal
            title={"Confirm ?"}
            onAction={toggleDialog}
        >
            <div className="p-4 text-xl">
                Are you sure?
            </div>
            <div className="px-4 py-2 border-t border-t-gray-500 flex justify-end items-center space-x-4">
                <button className="bg-timerMain-100 text-white px-4 py-2 rounded-md hover:bg-timerMain-200 transition duration-200" type="button" onClick={toggleDialog}>No</button>
                <button className="bg-primary-100 text-white px-4 py-2 rounded-md hover:bg-primary-200 transition duration-200" type="button" onClick={deleteTask}>
                    {!isLoading && "Yes"}
                </button>
            </div>
        </BaseModal>
    )
};

export default ConfirmModal;