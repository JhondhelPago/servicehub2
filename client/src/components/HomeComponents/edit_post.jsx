import React from 'react';
import { ImageStringUtils } from '../../utils';



const EditFormComponent = (props) => {

    const imagefiles = props.EditingData.imagefiles.split(',');

    
    
    
    return (
        <>

            <div className="pb-8 pt-8 flex flex-row flex-grow bg-gray-100 text-darkColor justify-center">
                <div className="flex flex-col">
                    <div className="py-5 px-5 mb-3 gap-2 flex items-center justify-between bg-gray-100 ">
                        <h1 className="text-2xl md:text-4xl font-medium">Edit Post</h1>
                    </div>
                    <div className="px-5 flex flex-col gap-5 md:items-center">
                        <form className="flex flex-col gap-3" method="post" encType="multipart/form-data" id="postForm"> 
                            <div className="flex flex-col md:flex-row gap-3">
                                <div className="flex flex-col gap-3">
                                    
                                    {/* <!-- Title Input --> */}
                                    <input className="w-full border border-gray-200 bg-white py-4 px-3 rounded-lg" type="text" name="title" placeholder="Title"  value={props.EditingData.event_title} required/>
                                    {/* <!-- Date and Time Input --> */}
                                    <div className="flex flex-col md:flex-row gap-3">
                                        <div className="w-full md:w-1/2">
                                            <input className="w-full border border-gray-200 bg-white py-4 px-3 rounded-lg mr-5" type="date" name="date" value={props.EditingData.scheduled_date}/>
                                        </div>
                                        <div className="w-full md:w-1/2">
                                            <input className="w-full border border-gray-200 bg-white py-4 px-3 rounded-lg" type="time" name="time" placeholder="01/01/2024" value={props.EditingData.scheduled_time}/>
                                        </div>
                                    </div>
                                    {/* <!-- location --> */}
                                    <input className="w-full border border-gray-200 bg-white rounded-lg py-4 px-3 " name="location" placeholder="Location" value={props.EditingData.location}/>
                                </div>
                                {/* <!-- this area is for file uploading --> */}
                                <div className="">
                                    {/* <!-- image here --> */}
                                    <div className="relative flex">
                                        {/* <!-- Image display sample here  -->
                                        
                                        <!-- upload button --> */}
                                        <div className="h-52 w-full md:w-52 flex items-center justify-center border border-gray-200 bg-white rounded-lg " >
                                            {/* <!-- image upload icon --> */}
                                            <img className="h-20" src={require(`../../../../server/FileUpload/${ImageStringUtils.FirstImageElement(props.EditingData.imagefiles)}`)} alt={ImageStringUtils.FirstImageElement(props.EditingData.imagefiles)} alt="upload image icon"/>
                                            <input id="imageInput" className="absolute inset-0 opacity-0 cursor-pointer" type="file" name="uploadImages" placeholder="upload file"  multiple/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Textarea for event description --> */}
                            <textarea className="border border-gray-200 rounded-md py-2 px-3" type="textarea" name="description" placeholder="Event Description" rows="10" value={props.EditingData.description}></textarea>

                            {/* <!-- select tag for selecting audience or selection multiple audience --> */}
                            <div className="rounded-lg">
                                <label className="">Target Audience Selection</label>
                                <select id="targetAudienceSelection" name="targetAudience" value={props.EditingData.Target_group} required multiple>
                                    <option value="Disability 1" >Select All</option>
                                    <option value="Disability 2">Disability 1</option>
                                    <option value="Disability 3">Disability 2</option>
                                    <option value="Disability 4">Disability 3</option>
                                    <option value="Disability 5">Disability 4</option>
                                </select>
                            </div>
                            <input id="creator_id" type="hidden" name="creator_id"/>
                            <button className="w-2/4 mx-auto p-3 my-3 bg-primary-light rounded-lg text-white scaleHover" type="submit">Post</button>
                        </form>                
                    </div>
                </div>
                <div id="imageContainerDiv" className="h-full  w-auto  overflow-y-hidden ">
                    
                    {imagefiles.map(filename => (
                        
                        <img className='w-[600px] h-[300px] rounded-lg mb-4' src={require(`../../../../server/FileUpload/${filename}`)} alt={filename}/>

                    ))}
                   
                
                </div>
            </div>
        
        </>
    ) 
}


export default EditFormComponent;