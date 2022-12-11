import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
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
    console.log(error.message);
    return {
      success: false,
      message: "Something went Wrong",
    };
  }
};

export const getPostedJobsByUserId = async (userId) => {
  try {
    const job = [];
    const qry = query(collection(db, "jobs"), orderBy("postedOn", "desc"));
    const querySnapShot = await getDocs(qry);
    querySnapShot.forEach((doc) => {
      if (doc.data().PostedByUserId === userId) {
        job.push({ id: doc.id, ...doc.data() });
      }
    });
    return {
      success: true,
      data: job,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went Wrong",
    };
  }
};

export const getJobById = async (id) => {
  try {
    const docRef = doc(db, "jobs", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        success: true,
        data: docSnap.data(),
      };
    } else {
      return {
        success: false,
        message: "No Such Job!",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const editJobsDetails = async (payload) => {
  try {
    await updateDoc(doc(db, "jobs", payload.id), {
      ...payload,
      updateOn: moment().format("DD-MM-YYYY HH:mm A"),
    });
    return {
      success: true,
      message: "Job updated Successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const deleteJobById = async (id) => {
  try {
    await deleteDoc(doc(db, "jobs", id));
    return {
      success: true,
      message: "job deleted Successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getAllJobs = async () => {
  try {
    const job = [];
    const qry = query(collection(db, "jobs"), orderBy("postedOn", "desc"));
    const querySnapShot = await getDocs(qry);
    querySnapShot.forEach((doc) => {
      job.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      data: job,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went Wrong",
    };
  }
};

export const applyJobPost = async (payload) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const job = payload;

  try {
    await addDoc(collection(db, "applications"), {
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      userId: user.id,
      userName: user.name,
      email: user.email,
      status: "pending",
      phoneNumber: user?.phoneNumber || "",
      appliedOn: moment().format("DD-MM-YYYY HH:mm A"),
    });
    return {
      success: true,
      message: "Job Applied Successfully",
    };
  } catch (error) {
    console.log(error.message);
    return {
      success: false,
      message: "Something went Wrong",
    };
  }
};

export const getApplicationByUserId = async (userId) => {
  try {
    const applications = [];
    const qry = query(
      collection(db, "applications"),
      where("userId", "==", userId)
    );
    const querySnapShot = await getDocs(qry);
    querySnapShot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getApplicationByJobId = async (jobId) => {
  try {
    const applications = [];
    const qry = query(
      collection(db, "applications"),
      where("jobId", "==", jobId)
    );
    const querySnapShot = await getDocs(qry);
    querySnapShot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getAllApplications = async () => {
  try {
    const applications = [];
    const qry = query(collection(db, "applications"));
    const querySnapShot = await getDoc(qry);
    querySnapShot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const changeApplicationsStatus = async (payload) => {
  try {
    await updateDoc(doc(db, "applications", payload.id), {
      status: payload.status,
    });
    return {
      success: true,
      message: "Applications status updated Successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Somethin Went wrong",
    };
  }
};
