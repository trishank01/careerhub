import {addDoc, collection,  doc,  getDocs,  query, where} from 'firebase/firestore'
import { db } from '../../firebase/config'
import CryptoJS from 'crypto-js'



export const LoginUser = async(payload) => {
    try {
        //check if user exists  
        const qry = query(collection(db , "users") , where("email" , "==" , payload.email))
        const querySnapShot = await getDocs(qry)
        if(querySnapShot.empty){
            return {
                success : false, 
                message : "User not found"
            }
        }else {
            const snapshotData = querySnapShot.docs.map(doc => ({id : doc.id , ...doc.data()}))
       
            const user = snapshotData[0]
            const decryptedPassword = CryptoJS.AES.decrypt(
                user.password,
                'careerhub'
            ).toString(CryptoJS.enc.Utf8)
            if(decryptedPassword === payload.password){
                return {
                    success : true , 
                    message : "Login Successfull...",
                    data : {
                        ...user,
                        password : '',
                        isAdmin : '',
                     
                    }
                }
            }else {
                return {
                     success : false,
                     message : "Email password not Matched"
                }
            }
        }


    } catch (error) {
        
    }
   
}

export const RegisterUser = async(payload) => {
    try {

        //check if email already exists
        const qry = query(collection(db , "users") , where("email" , "==" , payload.email))
        const querySnapShot = await getDocs(qry)
        if(querySnapShot.size > 0){
            return {
                success : false, 
                message : "Email already exists"
            }
        }
         //encrypting Password
        const encryptedPassword = CryptoJS.AES.encrypt(
            payload.password,
            "careerhub"
         ).toString()
         payload.password = encryptedPassword

         //adding user in db
       const response = await addDoc(collection(db , "users") ,{
        name : payload.name,
        email : payload.email,
        password : payload.password,
        isAdmin : false
       })
       return {
        success : true,
        message : "User Registered Successfully",
        data : response
       }
    } catch (error) {
        
    }
}