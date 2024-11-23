import React from 'react'
import axios from 'axios';
import { message } from 'antd';
import { HideLoading, ShowLoading } from '../../redux/rootSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [ user, setUser] =React.useState({
        username: "",
        password: ""
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const login = async() => {
        try{
            dispatch(ShowLoading())
            const response = await axios.post('https://portfolix.onrender.com/api/portfolio/admin-login',user);
            dispatch(HideLoading());
            if(response.data.success){
                message.success(response.data.message);
                localStorage.setItem('token',JSON.stringify(response.data));
                navigate("/admin");
            }else{
                message.error(response.data.message);
            }
        }catch(error){
            message.error(error.message);
            dispatch(HideLoading());
        }
    }
  return (
    <div className='flex justify-center items-center h-screen bg-primary'>
    <div className='w-96 flex gap-5 p-5 shadow border boder-gray-500 flex-col bg-white'>
        <h1 className='text-2xl'>Admin Login</h1>
        <hr/>
        <input
        type="text"
        value={user.username}
        placeholder='Username'
        onChange={(e)=> setUser({...user, username: e.target.value})}/>
         <input
        type="text"
        value={user.password}
        placeholder='password'
        onChange={(e)=> setUser({...user, password: e.target.value})}/>
        <button className='bg-primary text-white p-2' onClick={login}>Login</button>
    </div>
    </div>
  )
}

export default Login
