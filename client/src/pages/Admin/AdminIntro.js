import React from 'react'
import { Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from 'axios';

function AdminIntro() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
   const onFinish = async (values) => {
        try{
            dispatch(ShowLoading());
            const response = await axios.post('https://portfolix.onrender.com/api/portfolio/update-intro',{
                ...values,
                _id: portfolioData.intro._id,
            });
            console.log(response.data);
            dispatch(HideLoading())
            if(response.data.success){ 
                dispatch({
                    type: 'UPDATE_PORTFOLIO',
                    payload: {
                    ...portfolioData,
                    intro: response.data.data, // Update the intro part of portfolioData
                },
            });
                message.success(response.data.message)
            }else{
                message.error(response.data.message);
            }
        }catch(error){
            dispatch(HideLoading());
           message.error(error.message);
        }
   };

  return (
    <div>
        <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData.intro}>
            <Form.Item name='welcomeText' label='Welcome Text'>
                <input placeholder='WelcomeText'/>
            </Form.Item>
            <Form.Item name='firstName' label='First Name'>
                <input placeholder='Firstname'/>
            </Form.Item>
            <Form.Item name='lastName' label='Last Name'>
                <input placeholder='Lastname'/>
            </Form.Item>
            <Form.Item name='caption' label='Caption'>
                <input placeholder='Caption'/>
            </Form.Item>
            <Form.Item name='description' label='Description'>
                <textarea placeholder='Description'/>
            </Form.Item>
            <div className='flex justify-end  w-full'>
                <button className='px-10 py-2 bg-primary text-white' type='submit'>SAVE</button>
            </div>
        </Form>
    </div>
  )
}

export default AdminIntro
