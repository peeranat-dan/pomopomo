import React, {useContext} from "react";
import {useDrop} from "react-dnd";
import {ITEM_TYPES} from "../../Constant";
import {CardContext} from "./ToDoLists";

const BacklogDropArea = props => {
    const { moveStatus } = useContext(CardContext);
    const [{opacity}, drop] = useDrop(() => ({
        accept: ITEM_TYPES.CARD,
        drop: (item, monitor) => moveStatus(item.obj.taskId, "backlog"),
        collect: (monitor) =>( {
            opacity: !!monitor.isOver() ? 0.5 : 1,
        })
    }));
    return (
        <div ref={drop} className="w-full h-full flex flex-col" style={{opacity}}>
            {props.children}
        </div>
    );
};

export default BacklogDropArea;