import React from 'react';
import {useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import { ImageStringUtils } from '../../utils';



const EditFormComponent = (props) => {

    const navigate = useNavigate();

    // deconstructive function from the parent component set as the props of this child Componet
    const {SetComponent} = props;

    const OriginalData = props.EditingData;
   

    const [InputData, setInputData] = useState({
        id: props.EditingData.id,
        event_title : props.EditingData.event_title,
        scheduled_date : props.EditingData.scheduled_date,
        scheduled_time : props.EditingData.scheduled_time,
        location : props.EditingData.location,
        description : props.EditingData.description,
        post_type : props.EditingData.post_type
    });

    

    const imagefiles = props.EditingData.imagefiles.split(',');

    const HandleInputChange = (e) => {
        // deconstructing the name and the value of the selected event target
        const {name, value} = e.target;

        setInputData(prevData => ({...prevData, [name] : value}));

    };


    const SaveChanges = () => {

        // check the variable if there is changes
        // if there is a change execute the backend
        // if there no changes simple set the active component to the job_posting

        if (
            (OriginalData.event_title === InputData.event_title) &&
            (OriginalData.scheduled_date === InputData.scheduled_date) &&
            (OriginalData.scheduled_time === InputData.scheduled_time) && 
            (OriginalData.location === InputData.location) &&
            (OriginalData.description === InputData.description)
        ){

            SetComponent('job_posting');

        }else{



            fetch('/jobeditpost', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(InputData)
            })
            .then(response => {
                if(response.ok){
                    return response.json();
                }else{
                    throw new Error('response is not ok in edit_post at SaveChanges() function');
                }
            })
            .catch(error => {
                console.log(error);
            })

            alert('The Post has been updated.');

            if(InputData.post_type === 'event_post'){
                SetComponent('event_posting')
            }else{
                SetComponent('job_posting');
            }
            

        }
        
        



        

    }

    
    
    
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
                                    <input className="w-full border border-gray-200 bg-white py-4 px-3 rounded-lg" type="text" name="event_title" placeholder="Title"  value={InputData.event_title} onChange={HandleInputChange}/>
                                    {/* <!-- Date and Time Input --> */}
                                    <div className="flex flex-col md:flex-row gap-3">
                                        <div className="w-full md:w-1/2">
                                            <input className="w-full border border-gray-200 bg-white py-4 px-3 rounded-lg mr-5" type="date" name="scheduled_date" value={InputData.scheduled_date} onChange={HandleInputChange} />
                                        </div>
                                        <div className="w-full md:w-1/2">
                                            <input className="w-full border border-gray-200 bg-white py-4 px-3 rounded-lg" type="time" name="scheduled_time" placeholder="01/01/2024" value={InputData.scheduled_time} onChange={HandleInputChange} />
                                        </div>
                                    </div>
                                    {/* <!-- location --> */}
                                    <input className="w-full border border-gray-200 bg-white rounded-lg py-4 px-3 " name="location" placeholder="Location" value={InputData.location} onChange={HandleInputChange}/>
                                </div>
                                {/* <!-- this area is for file uploading --> */}
                                <div className="">
                                    {/* <!-- image here --> */}
                                    <div className="relative flex">
                                        {/* <!-- Image display sample here  -->
                                        
                                        <!-- upload button --> */}
                                        <div className="h-52 w-full md:w-52 flex items-center justify-center border border-gray-200 bg-white rounded-lg " >
                                            {/* <!-- image upload icon --> */}
                                            <img className="h-20" src={require(`../../../../server/FileUpload/${ImageStringUtils.FirstImageElement(props.EditingData.imagefiles)}`)} alt={ImageStringUtils.FirstImageElement(props.EditingData.imagefiles)}/>
                                            <input id="imageInput" className="absolute inset-0 opacity-0 cursor-pointer" type="file" name="uploadImages" placeholder="upload file"  multiple/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Textarea for event description --> */}
                            <textarea className="border border-gray-200 rounded-md py-2 px-3" type="textarea" name="description" placeholder="Event Description" rows="10" value={InputData.description} onChange={HandleInputChange}></textarea>

                            {/* <!-- select tag for selecting audience or selection multiple audience --> */}
                            <div className="rounded-lg">
                                <label className="">Target Audience Selection</label>
                                <select id="targetAudienceSelection" name="targetAudience" value={props.EditingData.Target_group} multiple>
                                    <option value="Disability 1" >Select All</option>
                                    <option value="Disability 2">Disability 1</option>
                                    <option value="Disability 3">Disability 2</option>
                                    <option value="Disability 4">Disability 3</option>
                                    <option value="Disability 5">Disability 4</option>
                                </select>
                            </div>
                            <input id="creator_id" type="hidden" name="creator_id"/>
                            <button className="w-2/4 mx-auto p-3 my-3 bg-primary-light rounded-lg text-white scaleHover" type='button' onClick={() => {SaveChanges()}}>Save Changes</button>
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