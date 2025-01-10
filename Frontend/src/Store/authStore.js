import {create} from "zustand"
import axios from "axios"
axios.defaults.withCredentials = true;
export const INITIATE_PAYMENT_URL=`http://localhost:3000/initiate-payment`;
const website_url="http://localhost:5173"
const API_URL="http://localhost:3000"
export const generateUniqueId=()=>{
    return `id-${Date.now()}-${Math.random().toString(36).substr(2,9)}`;
}
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
    
    
    }, 
    logout:async()=>{
        set({isLoading:true,error:null})
    try {
        const response=await axios.post(`${API_URL}/logout`)
        console.log("response",response)
        set({
            isAuthenticated:false,
            user:null,
            error:null,
            isLoading:false
        })

    } catch (error) {
        set({error:error.response?.data?.message || "error logging out",isLoading:false})
        throw error
    }
    
    
    },
    forgotPassword:async(email)=>{
        set({isLoading:true,error:null})
        try {
            const response =await axios.post(`${API_URL}/forget-password`,{email})
            set({isLoading:false,error:null})
        } catch (error) {
            set({error:response.data.error|| "error logging in",isLoading:false})
        }
    },
    EsewaSend:async(amount)=>{
        set({isLoading:true,error:null})
    try {
   const productId=generateUniqueId()
    const response = await axios.post(
        INITIATE_PAYMENT_URL, 
        {
          amount,
          productId
         ,
        }
        
      );

      

      window.location.href = response.data.url;
      set({isLoading:false,error:null})
   
} catch (error) {
    console.log(error)
    set({error:error.response?.data?.message || "error payment",isLoading:false})


}
    },
    khaltiSend:async(itemId,totalPrice)=>{
        set({isLoading:true,error:null})
        try {
            
            const response=await axios.post(`${API_URL}/initialize-khalti`,{itemId,totalPrice,website_url})
            window.location.href=response.data.payment.payment_url
            set({isLoading:false,error:null})


        } catch (error) {
                set({error:error.response?.data?.message || "error payment",isLoading:false})

        }
    },
    getMomoData:async()=>{
        set({isLoading:true,error:null})
        try {
            const response=await axios.get(`${API_URL}/fooditems/momo`)
            set({isLoading:false,error:null})
            return response.data
        } catch (error) {
            set({error:error.response?.data?.message || "error getting momo data",isLoading:false})
        }
    },
    getChowmeinData:async()=>{
        set({isLoading:true,error:null})
        try {
            const response=await axios.get(`${API_URL}/fooditems/chowmein`)
            set({isLoading:false,error:null})
            return response.data
        } catch (error) {
            set({error:error.response?.data?.message || "error getting chowmein data",isLoading:false})
        }
    },
    getSoftDrinkDaTa:async()=>{
        set({isLoading:true,error:null})
        try {
            const response=await axios.get(`${API_URL}/fooditems/softdrinks`)
            set({isLoading:false,error:null})
            return response.data
        } catch (error) {
            set({error:error.response?.data?.message || "error getting softdrink data",isLoading:false})
        }
    },
    getitemDetails:async(id,foodLink)=>{
        set({isLoading:true,error:null})
        try {
            
            const  response = await axios.get(`${API_URL}/fooditems/getfooditemDetail/${foodLink}/${id}`)
            set({isLoading:false,error:null})
            return response.data
        } catch (error) {
            set({error:error.response?.data?.message || "error getting item details",isLoading:false})
        }

         



    },
    addToCart:async(item)=>{
        set({isLoading:true,error:null})
        try {
            const response=await axios.post(`${API_URL}/user/addtocart`,{item})
            set({isLoading:false,error:null})
            return response.data
        } catch (error) {
            set({error:error.response?.data?.message || "error adding to cart",isLoading:false})
        }
    }
}))


