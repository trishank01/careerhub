import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BsCardChecklist, BsCardList } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";

const Sidebar = ({isOpen}) => {
  const navigate = useNavigate();
  const userMenu = [
    {
      title: "Home",
      onClick: () => navigate("/"),
      icon: <AiOutlineHome />,
      path : "/"
    },
    {
      title: "Applied Job",
      onClick: () => navigate("/applied-jobs"),
      icon: <BsCardChecklist />,
      path : "/applied-jobs"
    },
    {
      title: "Posted Jobs",
      onClick: () => navigate("/posted-jobs"),
      icon: <BsCardList />,
      path : "/posted-jobs"
    },
    {
      title: "Profile",
      onClick: () => navigate("/profile"),
      icon: <ImProfile />,
      path : "/profile"
    },
    {
      title: "Logout",
      onClick: () => localStorage.removeItem("user"),
      icon : <FiLogOut/>,
      path : "Logout"
    },
  ];
  return (
    <div>
      {userMenu.map((item, index) => {
        const isActive = window.location.pathname === item.path
        return (
          <div className={`flex gap-3 m-4 p-1 cursor-pointer items-center ${isActive ? "border-brand-green-light border-3 border-solid rounded-lg" : ""}`} onClick={item.onClick} key={index}>
            <span className="text-[24px] pt-2">{item.icon}</span>
            {isOpen &&  <span className="text-[14px] tracking-wide font-semibold">{item.title}</span>}
           
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
