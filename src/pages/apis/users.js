import {collection, doc,  getDoc,  getDocs,  updateDoc} from 'firebase/firestore'
import { db } from '../../firebase/config'

export const updateUserProfile = async (payload) => {
    const user = JSON.parse(localStorage.getItem("user"))
    try {
       await updateDoc(doc(db, "users" , user.id) , payload) 
       return {
        success : true,
        message : "Profile update successfully"
       }
    } catch (error) {
        return {
            success : false,
            message : "Something went wrong"
        }
    }
}


export const getUserProfile = async(id) => {
        try {
            const docRef = doc(db , "users" , id)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                return {
                    success : true,
                    data : docSnap.data()
                }
            }
            else{
                return {
                    success : false,
                    message : "NO such user!"
                }
            }
        } catch (error) {
            
             return {
                success : false,
                message : "Something went wrong"
             }
        }
}

export const getAllUsers = async () => {
    try {
        const users = []
        const querySnapShot = await getDocs(collection(db , "users"))
        querySnapShot.forEach((doc) => {
            users.push({id : doc.id , ...doc.data()})
          
        })
        return {
          success : true,
          data : users
        }
       } catch (error) {
         return {
          success : false,
          message : "Something went Wrong"
         }
       }
}