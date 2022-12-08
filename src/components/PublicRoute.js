//import {useNavigate } from 'react-router-dom'

import DefaultLayout from "./DefaultLayout"

const PublicRoute = ({children}) => {
    return  <DefaultLayout> {children} </DefaultLayout>  
}

export default PublicRoute




