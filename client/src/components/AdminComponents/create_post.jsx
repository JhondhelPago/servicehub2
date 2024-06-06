import React, { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import upload_icon from '../../assets/upload.png'
import { renderIntoDocument } from 'react-dom/test-utils';


import { useContext } from 'react';
import { UserContext } from '../LoginComponents/UserContext';

const PostForm = ({ onClick }) => {

    const { AdminId } = useContext(UserContext);

    const [RenderingComponent, setRenderingComponent] = useState(null);

    const navigateHome = useNavigate();

    const handleParentSelectedComponent = () => {
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
                reader.onload = function (event) {
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


        try {

            const response = await fetch('/Posting', {
                method: 'POST',
                body: formData
            });


            const feedback = await response.json();
            console.log(feedback)
            if (feedback.status) {
                console.log('Successful submission!');
                // setRenderingComponent(true);
                alert('Post is uploaded')
                handleParentSelectedComponent();

            }


        } catch (error) {
            throw error
        }

    }



    return (
        <>

            {RenderingComponent === true && (
                <p>Rendering new Component</p>
            )}


            {RenderingComponent === null && (



                <div className="flex flex-row justify-center flex-grow pt-8 pb-8 bg-gray-100 text-darkColor">

                    <div className="flex flex-col">

                        <div className="flex items-center justify-between gap-2 px-5 py-5 mb-3 bg-gray-100 ">
                            <h1 className="flex text-2xl font-medium md:text-4xl">
                                Create Post
                            </h1>
                            <p>{AdminId}</p>
                        </div>


                        <div className="flex flex-col gap-5 px-5 md:items-center">
                            <form className="flex flex-col gap-3" method="post" encType="multipart/form-data" id="postForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-3 md:flex-row">
                                    <div className="flex flex-col gap-3">
                                        {/* <!-- post type selection --> */}
                                        <select className="w-full py-2 pl-2 bg-white border border-gray-200 rounded-lg" name="category" required>
                                            <option defaultValue>-Choose Post Type-</option>
                                            <option value="event">Event Posting</option>
                                            <option value="job">Job Posting</option>
                                        </select>
                                        {/* <!-- Title Input --> */}
                                        <input className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg" type="text" name="title" placeholder="Title" required />
                                        {/* <!-- Date and Time Input --> */}
                                        <div className="flex flex-col gap-3 md:flex-row">
                                            <div className="w-full md:w-1/2">
                                                <input className="w-full px-3 py-2 mr-5 bg-white border border-gray-200 rounded-lg" type="date" name="date" />
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <input className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg" type="time" name="time" placeholder="01/01/2024" />
                                            </div>
                                        </div>
                                        {/* <!-- location --> */}
                                        <input className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg " name="location" placeholder="Location" />
                                    </div>
                                    {/* <!-- this is area is for file uploading --> */}
                                    <div className="">
                                        {/* <!-- image here --> */}
                                        <div className="relative flex">
                                            {/* <!-- Image display sample here  -->
                                            
                                            <!-- upload button --> */}
                                            <div className="flex items-center justify-center w-full bg-white border border-gray-200 rounded-lg h-52 md:w-52 " >
                                                {/* <!-- image upload icon --> */}
                                                <img className="h-20" src={upload_icon} alt="upload image icon" />
                                                <input id="imageInput" className="absolute inset-0 opacity-0 cursor-pointer" type="file" name="uploadImages" placeholder="upload file" multiple />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Textarea for event description --> */}
                                <textarea className="px-3 py-2 border border-gray-200 rounded-md" type="textarea" name="description" placeholder="Event Description" rows="10"></textarea>

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
                                <input id="creator_id" type="hidden" name="creator_id" value={AdminId} />
                                <button className="w-2/4 p-3 mx-auto my-3 text-white rounded-lg bg-primary-light scaleHover" type="submit" >Post</button>
                            </form>
                        </div>

                    </div>

                    <div id="imageContainerDiv" className="w-auto h-full overflow-y-hidden ">

                    </div>


                </div>
            )}
        </>
    );


}

export default PostForm;