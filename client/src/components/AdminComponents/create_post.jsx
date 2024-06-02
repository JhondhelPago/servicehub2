import React, {Component, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import upload_icon from '../../assets/upload.png'
import { renderIntoDocument } from 'react-dom/test-utils';


import { useContext } from 'react';
import { UserContext } from '../LoginComponents/UserContext';

const PostForm = ({onClick}) => {
    
    const {AdminId} = useContext(UserContext);

    const [RenderingComponent, setRenderingComponent] = useState(null);
    
    const navigateHome = useNavigate();

    const handleParentSelectedComponent = () =>{
        onClick('dashboard');
    }

    useEffect(() => {
        const inputElement = document.getElementById('imageInput');
        inputElement.addEventListener('change', handleImageUpload);
    
        return () => {
          // Cleanup: Remove the event listener when the component unmounts
          inputElement.removeEventListener('change', handleImageUpload);
        };
      }, []); // Empty dependency array ensures the effect runs only once

    const handleImageUpload = (event) => {
        let files = event.target.files;
        const imageContainerDiv = document.getElementById('imageContainerDiv');
        imageContainerDiv.innerHTML = '';

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const imageUrl = event.target.result;
                    const imgElement = document.createElement("img");
                    imgElement.src = imageUrl;
                    imgElement.alt = 'Uploaded Image';
                    imgElement.classList.add('w-[600px]', 'h-[300px]', 'rounded-lg', 'mb-4');
                    imageContainerDiv.appendChild(imgElement);
                };
                reader.readAsDataURL(file);
            }
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);


        try{
            
            const response = await fetch('/Posting', {
                method: 'POST',
                body: formData
            });

            
            const feedback = await response.json();
            console.log(feedback)
            if(feedback.status){
                console.log('Successful submission!');
                // setRenderingComponent(true);
                alert('Post is uploaded')
                handleParentSelectedComponent();

            }
            

        } catch(error) {
            throw error
        }

    }

    
    
        return (
            <>
                
                {RenderingComponent === true && (
                    <p>Rendering new Component</p>
                )}


                {RenderingComponent === null && (

                

                <div className="pb-8 pt-8 flex flex-row flex-grow bg-gray-100 text-darkColor justify-center">
    
                    <div className="flex flex-col">
    
                        <div className="py-5 px-5 mb-3 gap-2 flex items-center justify-between bg-gray-100 ">
                            <h1 className="text-2xl md:text-4xl font-medium">Create Post</h1>
                            <p>{AdminId}</p> 
                        </div>
                        
                        
                        <div className="px-5 flex flex-col gap-5 md:items-center">
                            <form className="flex flex-col gap-3" method="post" encType="multipart/form-data" id="postForm" onSubmit={handleSubmit}> 
                                <div className="flex flex-col md:flex-row gap-3">
                                    <div className="flex flex-col gap-3">
                                        {/* <!-- post type selection --> */}
                                        <select className="w-full border border-gray-200 bg-white py-2 pl-2 rounded-lg" name="category" required>
                                            <option defaultValue>-Choose Post Type-</option>
                                            <option value="event">Event Posting</option>
                                            <option value="job">Job Posting</option>
                                        </select>
                                        {/* <!-- Title Input --> */}
                                        <input className="w-full border border-gray-200 bg-white py-2 px-3 rounded-lg" type="text" name="title" placeholder="Title" required/>
                                        {/* <!-- Date and Time Input --> */}
                                        <div className="flex flex-col md:flex-row gap-3">
                                            <div className="w-full md:w-1/2">
                                                <input className="w-full border border-gray-200 bg-white  py-2  px-3 rounded-lg mr-5" type="date" name="date"/>
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <input className="w-full border border-gray-200 bg-white  py-2 px-3 rounded-lg" type="time" name="time" placeholder="01/01/2024" />
                                            </div>
                                        </div>
                                        {/* <!-- location --> */}
                                        <input className="w-full border border-gray-200 bg-white rounded-lg py-2 px-3 " name="location" placeholder="Location"/>
                                    </div>
                                    {/* <!-- this is area is for file uploading --> */}
                                    <div className="">
                                        {/* <!-- image here --> */}
                                        <div className="relative flex">
                                            {/* <!-- Image display sample here  -->
                                            
                                            <!-- upload button --> */}
                                            <div className="h-52 w-full md:w-52 flex items-center justify-center border border-gray-200 bg-white rounded-lg " >
                                                {/* <!-- image upload icon --> */}
                                                <img className="h-20" src={upload_icon} alt="upload image icon"/>
                                                <input id="imageInput" className="absolute inset-0 opacity-0 cursor-pointer" type="file" name="uploadImages" placeholder="upload file"  multiple/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Textarea for event description --> */}
                                <textarea className="border border-gray-200 rounded-md py-2 px-3" type="textarea" name="description" placeholder="Event Description" rows="10"></textarea>
    
                                {/* <!-- select tag for selecting audience or selection multiple audience --> */}
                                <div className="rounded-lg">
                                    <label className="">Target Audience Selection</label>
                                    <select id="targetAudienceSelection" name="targetAudience" required multiple>
                                        <option value="Disability 1" >Select All</option>
                                        <option value="Disability 2">Disability 1</option>
                                        <option value="Disability 3">Disability 2</option>
                                        <option value="Disability 4">Disability 3</option>
                                        <option value="Disability 5">Disability 4</option>
                                    </select>
                                </div>
                                <input id="creator_id" type="hidden" name="creator_id" value={AdminId}/>
                                <button className="w-2/4 mx-auto p-3 my-3 bg-primary-light rounded-lg text-white scaleHover" type="submit" >Post</button>
                            </form>                
                        </div>
    
                    </div>
    
                    <div id="imageContainerDiv" className="h-full  w-auto  overflow-y-hidden ">
                    
                    </div>

                      
                </div>
                )}     
            </>
        );
    
    
}

export default PostForm;