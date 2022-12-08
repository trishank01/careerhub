import React, { useState } from "react";
import { RiShieldUserLine } from "react-icons/ri";
import { HiMenuAlt1 } from "react-icons/hi";
import Sidebar from "./Sidebar";
import { AiOutlineClose } from "react-icons/ai";

const DefaultLayout = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex p-4 w-[100%] h-screen gap-4">
      <div className={`flex items-center  ${isOpen ? "w-[200px]" : "w-[50px]"} bg-brand-green justify-center rounded-md duration-300`}>
        <Sidebar isOpen={isOpen} />
    
      </div>
      <div className="w-[100%] flex flex-col gap-5">
        <div className="bg-brand-green p-4 text-white flex justify-between">
          <div className="flex gap-2">
            <HiMenuAlt1
              onClick={() => setIsOpen(true)}
              className={`${isOpen ? "hidden" : "flex"} cursor-pointer`}
            />
            <AiOutlineClose
             onClick={() => setIsOpen(false)}
              className={`${isOpen ? "flex" : "hidden"} cursor-pointer`}
            />
            <span>CareerHub</span>
          </div>
          <div className="flex items-center gap-2">
            <RiShieldUserLine size={28} />
           <span> welcome {user?.name}</span>
          </div>
        </div>
        <div className="w-[100%] min-h-[85vh] bg-white p-4">
          {/* <Home/> */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
