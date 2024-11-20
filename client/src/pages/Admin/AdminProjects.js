import React from 'react';
import { Form, Input, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ShowLoading, HideLoading, ReloadData } from "../../redux/rootSlice";
import { Modal } from "antd";
import axios from 'axios';

function AdminProjects() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { projects } = portfolioData;
    const [showAddEditModal, setShowAddEditModal] = React.useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
    const [type, setType] = React.useState("add");

    const onFinish = async (values) => {
        try {
            const tempTechnologies = values?.technologies?.split(",") || [];
            values.technologies = tempTechnologies;
            dispatch(ShowLoading());
            let response;
            if (selectedItemForEdit) {
                response = await axios.post('/api/portfolio/update-project', {
                    ...values,
                    _id: selectedItemForEdit._id,
                });
            } else {
                response = await axios.post('/api/portfolio/add-project', values);
            }

            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                setShowAddEditModal(false);
                setSelectedItemForEdit(null);
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const onDelete = async (item) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post('/api/portfolio/delete-project', {
                _id: item._id,
            });
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    return (
        <div>
            <div className='flex justify-end'>
                <button className='bg-primary px-5 py-2 text-white'
                    onClick={() => {
                        setSelectedItemForEdit(null);
                        setShowAddEditModal(true);
                    }}>
                    Add Project
                </button>
            </div>
            <div className='grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1'>
                {projects.map((project, index) => {
                    const isURL = project.image.startsWith('http') || project.image.startsWith('https');
                    return (
                        <div key={index} className='shadow border p-5 border-gray-400 flex flex-col gap-5'>
                            <h1 className='text-primary text-xl font-bold'>{project.title}</h1>
                            <hr />
                            <img src={isURL ? project.image : `/assets/${project.image}`} alt="" className="h-60 w-80" />
                            <div><h1 className='font-bold'>Role :</h1> <p>{project.title}</p></div>
                            <div><h1 className='font-bold'>Description :</h1><p>{project.description}</p></div>
                            <p>{project.technologies.join(", ")}</p>
                            <div className='flex justify-end gap-5 mt-5'>
                                <button className='bg-red-500 text-white px-5 py-2'
                                    onClick={() => {
                                        onDelete(project);
                                    }}>Delete</button>
                                <button className='bg-primary text-white px-5 py-2'
                                    onClick={() => {
                                        setSelectedItemForEdit(project);
                                        setShowAddEditModal(true);
                                        setType("edit");
                                    }}>Edit</button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {(type === "add" || selectedItemForEdit) && (
                <Modal
                    open={showAddEditModal}
                    title={selectedItemForEdit ? "Edit Project" : "Add Project"}
                    footer={null}
                    onCancel={() => {
                        setShowAddEditModal(false);
                        setSelectedItemForEdit(null);
                    }}
                >
                    <Form layout="vertical" onFinish={onFinish}
                        initialValues={{
                            ...selectedItemForEdit,
                            technologies: selectedItemForEdit?.technologies?.join(" , ") || "",
                        }}>
                        <Form.Item name="title" label="Title">
                            <Input placeholder="Title" />
                        </Form.Item>
                        <Form.Item name="image" label="Image URL">
                            <Input placeholder="Image URL" />
                        </Form.Item>
                        <Form.Item name="description" label="Description">
                            <Input.TextArea placeholder="Description" />
                        </Form.Item>
                        <Form.Item name="link" label="Link">
                            <Input placeholder="Link" />
                        </Form.Item>
                        <Form.Item name="technologies" label="Technologies">
                            <Input placeholder="Technologies (comma separated)" />
                        </Form.Item>
                        <div className='flex justify-end'>
                            <button className="border-primary text-primary px-5 py-2"
                                onClick={() => {
                                    setShowAddEditModal(false);
                                    setSelectedItemForEdit(null);
                                }}>Cancel</button>
                            <button type="submit" className="bg-primary text-white px-5 py-2">
                                {selectedItemForEdit ? "Update" : "Add"}
                            </button>
                        </div>
                    </Form>
                </Modal>
            )}
        </div>
    );
}

export default AdminProjects;
