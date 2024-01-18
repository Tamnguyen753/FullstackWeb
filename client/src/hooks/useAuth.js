import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App';
import { request } from '../utils/axios-http';
import { toast } from 'react-toastify';
import { extractMessageFromErr } from '../utils/error';

const useAuth = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AppContext)
    const { setIsLoggedIn } = useContext(AppContext)
    const login = async (data) => {
        try {
            const { username, password } = data;
            const res = await request({
                data: {
                    username,
                    password,
                },
                method: "post",
                url: "/login"
            });

            const token = JSON.stringify(res.data.data);
            localStorage.setItem("access_token", token)
            toast.success("Login success");
            setUser(data)
            setIsLoggedIn(true)
            navigate("/");
        } catch (err) {
            toast.error(extractMessageFromErr(err))
            console.log(extractMessageFromErr(err));
        }
    }
    const register = async (data) => {
        try {
            const { username, password } = data;
            const res = await request({
                data: {
                    username,
                    password,
                },
                method: "post",
                url: "/register"
            });

            toast.success("Register success");
            navigate("/login");
        } catch (err) {
            toast.error(extractMessageFromErr(err))
        }
    }
    const logout = () => {
        localStorage.removeItem("access_token");
        setUser(null);
        setIsLoggedIn(false)
    };
    // const booking = async (data) => {
    //     try {
    //         const res = await request({
    //             data: {
    //                 username,
    //                 seat,
    //                 showtime
    //             },
    //             method: "post",
    //             url: "/booking"
    //         })
    //     } catch (err) {
    //         console.log(extractMessageFromErr(err));
    //     }

    // }

    return { login, register, logout }
}

export default useAuth
