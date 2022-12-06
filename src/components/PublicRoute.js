//import {useNavigate } from 'react-router-dom'

const PublicRoute = ({children}) => {
    //const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
         window.location.href  = "/"
    }else {
        return children
    }
}

export default PublicRoute

