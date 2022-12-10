import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import moment from "moment/moment";
import { db } from "../../firebase/config";

export const addNewJobPost = async (payload) => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    await addDoc(collection(db, "jobs"), {
      ...payload,
      status: "pending",
      PostedByUserId: user.id,
      PostedByUserName: user.name,
      postedOn: moment().format("DD-MM-YYYY HH:mm A"),
    });
    return {
      success: true,
      message: "Job Posted Successfully",
    };
  } catch (error) {
    console.log(error.message)
    return {
      success: false,
      message: "Something went Wrong",
      
    };
  }
};


export const getPostedJobsByUserId = async (userId) => {
   try {
    const job = []
    const qry = query(collection(db , "jobs") , orderBy("postedOn" , "desc"))
    const querySnapShot = await getDocs(qry)
    querySnapShot.forEach((doc) => {
      if(doc.data().PostedByUserId === userId){
        job.push({id : doc.id , ...doc.data()})
      }
    })
    return {
      success : true,
      data : job
    }
   } catch (error) {
     return {
      success : false,
      message : "Something went Wrong"
     }
   }
}

export const getJobById = async (id) => {
  try {
    const docRef = doc(db , "jobs" , id)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
         return {
          success : true,
          data : docSnap.data()
         }
    }else {
      return {
        success : false,
        message : "No Such Job!"
      }
    }
  } catch (error) {
    return {
      success : false,
      message : "Something went wrong"
    }
  }
}


export const editJobsDetails = async (payload) => {
     try {
        await updateDoc(doc(db , "jobs", payload.id), {
          ...payload,
          updateOn : moment().format("DD-MM-YYYY HH:mm A")
        });
        return {
          success : true,
          message : "Job updated Successfully"
        }
     } catch (error) {
          return {
            success : false ,
            message : "Something went wrong"
          }
     }
}



export const deleteJobById  = async (id) => {
  try {
      await deleteDoc(doc(db , "jobs" , id))
      return {
        success :true,
        message : "job deleted Successfully"
      }
  } catch (error) {
      return {
        success : false,
        message : "Something went wrong"
      }
  }
}


export const getAllJobs = async () => {
  try {
    const job = []
    const qry = query(collection(db , "jobs") , orderBy("postedOn" , "desc"))
    const querySnapShot = await getDocs(qry)
    querySnapShot.forEach((doc) => {
        job.push({id : doc.id , ...doc.data()})
    })
    return {
      success : true,
      data : job
    }
   } catch (error) {
     return {
      success : false,
      message : "Something went Wrong"
     }
   }
}

 