import { ChevronLeftIcon } from "@heroicons/react/solid";
import { useState } from "react";
const LeftNavBar = () => {
    
    const [open, setOpen] = useState(true);

    const Menus = [

    ]

    return <div>
        <div className={`${open ? "w-72" : "w-20"} hidden lg:block first-letter:duration-300 h-screen bg-purple-1 relative`}>
            <ChevronLeftIcon
            onClick={() => setOpen(!open)}
            className={` absolute cursor-pointer -right-3 top-9 w-7 border-2 border-purple-1 rounded-full bg-white text-dark-1 ${!open && "rotate-180"}`}/>
            <div className="flex gap-x-4 items-center pl-4 py-6">
                <img
                src="https://svgshare.com/i/hDh.svg" alt=""
                className={`cursor-pointer h-11 w-11`} />
                <h2
                    className={`text-white origin-left font-bold text-xl duration-300 ${!open && "scale-0"}`}
                >
                    Meny
                </h2>
            </div>
            <ul>

            </ul>
        </div>

    </div>
};

export default LeftNavBar;