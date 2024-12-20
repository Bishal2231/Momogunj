import {create} from "zustand"
import axios from "axios"
axios.defaults.withCredentials = true;

const API_URL="http://localhost:3000"
export const userAuthStore=create((set)=>({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,
    signup: async (formData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/signup`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }, // Ensure correct headers
          });
          set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Error signing up',
            isLoading: false,
          });
          throw error;
        }
      },
      
    verifyEmail:async(code)=>{
        set({isLoading:true,error:null});
        try {
            const response=await axios.post(`${API_URL}/verify-email`,{code});
            set({user:response.data.user,isAuthenticated:true,isLoading:false})
            return response.data;
        } catch (error) {
            set({error:error.response.data.message || "error verifying email",isLoading:false})
            throw error 
        }
    },
    checkAuth:async()=>{
        set({isCheckingAuth:true,error:null})
    try {
        const response=await axios.get(`${API_URL}/check-auth`)
        set({user:response.data.user,isAuthenticated:true,isCheckingAuth:false})
        
    } catch (error) {
        console.log(error)
   set({error:null,isCheckingAuth:false,isAuthenticated:false})    }


    },
    login:async(email,password)=>{
        set({isLoading:true,error:null})
    try {
        const response=await axios.post(`${API_URL}/login`,{email,password})
        console.log("response",response)
        set({
            isAuthenticated:true,
            user:response.data.user,
            error:null,
            isLoading:false
        })

    } catch (error) {
        set({error:error.response?.data?.message || "error logging in",isLoading:false})
        throw error
    }
    
    
    }

}))
