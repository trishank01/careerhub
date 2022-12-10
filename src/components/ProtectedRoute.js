import DefaultLayout from "./DefaultLayout"

const ProtectedRoute = ({children}) => {
 const user = JSON.parse(localStorage.getItem('user'))

 if(user){
    return  <DefaultLayout>
      {children}
    </DefaultLayout>
 }else {
   return  window.location.href  = "/"
 }
}

export default ProtectedRoute