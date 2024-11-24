import React from 'react'
import { Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from 'axios';

function AdminAbout() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    console.log(portfolioData);
    
   const onFinish = async (values) => {
    console.log("Submitted values:", values); // Add this
    console.log("About ID:", portfolioData.about._id); // Log ID    
    try{
            const tempSkills = values.skills.split(",");
            values.skills= tempSkills;
            dispatch(ShowLoading());
            const response = await axios.post('https://portfolix.onrender.com/api/portfolio/update-about',{
                ...values,
                _id: portfolioData.about._id,
            });
            console.log("About ID:", portfolioData.about._id); // Log ID
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
   if (!portfolioData.about) {
    return <div>Loading...</div>;
   }

  return (
    <div>
        <Form onFinish={onFinish} layout='vertical'
         initialValues=
         {{...portfolioData.about,skills: portfolioData.about.skills.join(",")}}>
            <Form.Item name='lottieURL' label='Lottie URL'>
                <input placeholder='Lottie URL'/>
            </Form.Item>
            <Form.Item name='description1' label='Description1'>
                <textarea placeholder='Description1'/>
            </Form.Item>
            <Form.Item name='description2' label='Description2'>
                <textarea placeholder='Description2'/>
            </Form.Item>
            <Form.Item name='skills' label='Skills'>
                <textarea placeholder='Skills'/>
            </Form.Item>
            <div className='flex justify-end  w-full'>
                <button className='px-10 py-2 bg-primary text-white' type='submit'>SAVE</button>
            </div>
        </Form>
    </div>
  )
}

export default AdminAbout
