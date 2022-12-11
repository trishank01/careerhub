import React, { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BsCardChecklist, BsCardList } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import { getUserProfile } from "../pages/apis/users";
import { useDispatch } from "react-redux";
import { HIDE_LOADING, SHOW_LOADING } from "../redux/slice/alertSlice";

const Sidebar = ({isOpen}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("user"));


  const publicMenu = [
    {
      title: "Home",
      onClick: () => navigate("/"),
      icon: <AiOutlineHome />,
      path : "/"
    },
    {
      title: "Login",
      onClick: () => navigate("/login"),
      icon: <AiOutlineHome />,
      path : "/login"
    },
  ];


  const [menuToRender, setmenuToRender] = useState(publicMenu)
  const path = JSON.parse(localStorage.getItem("path"))


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
      onClick: () => navigate(`/profile/${user.id}`),
      icon: <ImProfile />,
      path : "/profile"
    },
    {
      title: "Logout",
      onClick: () => {
        localStorage.removeItem("user")  
        navigate("/login")
      },
      icon : <FiLogOut/>,
      path : "/login"
    },
  ];

   const adminMenu = [
    {
      title: "Home",
      onClick: () => navigate("/"),
      icon: <AiOutlineHome />,
      path : "/"
    },
    {
      title: "Applications",
      onClick: () => navigate("/admin/applications"),
      icon: <BsCardChecklist />,
      path : "/admin/applications"
    },
    {
      title: "Jobs",
      onClick: () => navigate("/admin/jobs"),
      icon: <BsCardList />,
      path : "/admin/jobs"
    },
    {
      title: "Users",
      onClick: () => navigate("/admin/users"),
      icon: <ImProfile />,
      path : "/admin/users"
    },
    {
      title: "Logout",
      onClick: () => {
        localStorage.removeItem("user")  
        navigate("/login")
      },
      icon : <FiLogOut/>,
      path : "/login"
    },
  ];


  const getData  = async() => {
      try {
        if(path === "/login") {
          dispatch(SHOW_LOADING())
          const userId = JSON.parse(localStorage.getItem("user")).id
          const response = await getUserProfile(userId)
          dispatch(HIDE_LOADING())
          if(response.data?.isAdmin === true){
            setmenuToRender(adminMenu)
            
          }
          else {
           
            setmenuToRender(userMenu)    
          }
        }
           
      } catch (error) {
        console.log(error)
      }
  } 

    useEffect(() => {
        getData()
    },[])
  return (
    <div>
      {menuToRender.map((item, index) => {
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
