import React from 'react'
import { Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from 'axios';

function AdminContact() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    console.log(portfolioData);
    
   const onFinish = async (values) => {
    console.log("Submitted values:", values); // Add this
    console.log("About ID:", portfolioData.contact._id); // Log ID    
    try{
            dispatch(ShowLoading());
            const response = await axios.post('/api/portfolio/update-contact',{
                ...values,
                _id: portfolioData.contact._id,
            });
            console.log("About ID:", portfolioData.contact._id); // Log ID
            dispatch(HideLoading())
            if(response.data.success){
                message.success(response.data.message)
            }else{
                message.error(response.data.message);
            }
        }catch(error){
            dispatch(HideLoading());
           message.error(error.message);
        }
   };
   if (!portfolioData.contact) {
    return <div>Loading...</div>;
   }

  return (
    <div>
        <Form onFinish={onFinish} layout='vertical'
        initialValues=
        {portfolioData.contact}>
            <Form.Item name='name' label='Name'>
                <input placeholder='Name'/>
            </Form.Item>
            <Form.Item name='gender' label='Gender'>
                <input placeholder='Gender'/>
            </Form.Item>
            <Form.Item name='age' label='Age'>
                <input placeholder='Age'/>
            </Form.Item>
            <Form.Item name='email' label='Email'>
                <input placeholder='Email'/>
            </Form.Item>
            <Form.Item name='mobile' label='Mobile'>
                <input placeholder='Mobile'/>
            </Form.Item>
            <Form.Item name='address' label='Address'>
                <textarea placeholder='Address'/>
            </Form.Item>
            <div className='flex justify-end  w-full'>
                <button className='px-10 py-2 bg-primary text-white' type='submit'>SAVE</button>
            </div>
        </Form>
    </div>
  )
}

export default AdminContact