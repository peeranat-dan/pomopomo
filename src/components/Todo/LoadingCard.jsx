import React from "react";
import {PencilIcon, XIcon} from "@heroicons/react/solid";
import {SparklesIcon} from "@heroicons/react/outline";

const LoadingCard = () => {
    return (
        <>
            <div className="p-3">
                <div className="flex items-center">
                    <SparklesIcon className="animate-spin w-6 h-6 mr-2 text-primary-100" />
                    <div className="text-lg font-thai">
                        Loading...
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoadingCard;