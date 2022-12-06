

const ProtectedRoute = ({children}) => {
 const user = JSON.parse(localStorage.getItem('user'))
 if(user){
    return children
 }else {
   return  window.location.href  = "/login"
 }
}

export default ProtectedRoute