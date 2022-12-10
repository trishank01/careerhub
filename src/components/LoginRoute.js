

const LoginRoute = ({children}) => {
 const user = JSON.parse(localStorage.getItem('user'))
if(user && user.id !== "public"){
     window.location.href  = "/"
}else {
    return  children
}
}

export default LoginRoute