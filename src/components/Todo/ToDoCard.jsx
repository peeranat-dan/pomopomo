import React from "react";
import { useDrag } from "react-dnd";
import { ITEM_TYPES } from "../../Constant";

const ToDoCard = ({ isDragging, obj}) => {
    const [{opacity}, dragRef] = useDrag(()=> ({
        type: ITEM_TYPES.CARD,
        item: {obj},
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        }),
    }),[]);
    let tagColor;
    if (obj.status === "backlog") {
        tagColor = "bg-primary-100";
    } else if (obj.status === "wip") {
        tagColor = "bg-timerMain-100";
    } else {
        tagColor = "bg-secondary-100";
    }
    return (
        <div key={obj.taskId} ref={dragRef} style={{ opacity }} className="px-2 py-3 bg-white rounded-lg shadow-md cursor-pointer mx-1 my-0.5">

            <div className="flex justify-between items-baseline">
                {obj.title}
                <div className={`${tagColor} text-sm px-2 py-1 rounded-md text-white mb-1`}> {obj.tag} </div>
            </div>
            <div className="text-sm ml-2">
                {obj.description}
            </div>

        </div>
    );
};

export default ToDoCard;

