import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App';
import { request } from '../utils/axios-http';
import { toast } from 'react-toastify';
import { extractMessageFromErr } from '../utils/error';

const useAuth = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AppContext)
    const login = async (data) => {
        try {
            const {email,password} = data;
            const res = await request({
                data: {
                    email,
                    password,
                },
                method: "post",
                url:"/login"
            });
            
            const token = JSON.stringify(res.data.data);
            console.log(token);
            localStorage.setItem("access_token",token)
            toast.success("Login success");
            navigate("/");
        } catch (err) {
            toast.error(extractMessageFromErr(err))
            console.log(extractMessageFromErr(err));
        }
        } 
    const register = async (data) => {
        try {
            const {email,password} = data;
            const res = await request({
                data: {
                    email,
                    password,
                },
                method: "post",
                url:"/register"
            });
            
            toast.success("Register success");
            navigate("/login");
        } catch (err) {
            toast.error(extractMessageFromErr(err))
        }
        } 

  return {login , register}
}

export default useAuth
