import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClientUserContext } from './ClientUserContext';
import logo from "../assets/icon logo.png";
import memberIcon from "../assets/memberIcon.png";

const Loginpage = () => {

    const {set_clientuserId} = useContext(ClientUserContext); // from the setup file of the ClientUserContext

    const NavigateHome = useNavigate();

    const [Email, setEmail] = useState(null);
    const [Password, setPassword] = useState(null);

    const [Valid, setValid] = useState(null);


    const handleChangesEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangesPassword = (event) => {
        setPassword(event.target.value);
    }


    const [ServerData, setServerData] = useState(null);


    const getData = () => {

        axios.get('/returnboolean')
            .then(response => {
                setServerData([response.data]);
            })
            .catch(error => {
                console.error(error);
            })

    }


    useEffect(() => {
        // setServerData('There is a data');
        getData();
    }, [])



    const clientLogValidation = async (event) => {
        event.preventDefault();
        

        

        const reqbody = {
            email : Email,
            password : Password
        }
        const UrlServer = `/clientuser/loginsession`;
        
        // axios.post(UrlServer, reqbody)
        //     .then(res => {

        //         setValid([res]);

        //         if(Valid[0].data == 'ok'){

        //             NavigateHome('/UserHome');
                
        //         }else{
        //             NavigateHome('/UserLog')
        //         }
                
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });

        try{

            const response = await axios.post(UrlServer, reqbody);
            console.log(response);
            let clientuserId_session = response.data.IdLogSession;

           
            
            if(clientuserId_session == null){

                alert('incorrect username and password');

            }else{

                console.log(clientuserId_session);
                set_clientuserId(clientuserId_session);
                //navigating tot the HomePage
                NavigateHome('/UserHome');

            }
            

        }catch(error){
            throw error;
        }
        
        

    }

    return (
        <>
            
            <section className="container lg:min-h-[100vh] flex flex-col lg:flex-row items-center justify-between gap-2 mx-auto px-5 font-poppins text-darkColor">
                {/* <!-- hero text --> */}
                {/* <!-- <div class="flex flex-col text-center items-center space-y-2 lg:space-y-7 my-5">
                    <div class="flex lg:flex-col justify-center items-center gap-2 lg:-space-y-2">
                        <img class="min-h-[60px] h-[15%] lg:h-[60%] min-w-[60px] w-[15%] lg:w-[60%] " src="assets/icon logo.png" alt="icon logo">
                            <div class="flex flex-col items-start lg:items-center -space-y-1 lg:-space-y-2">
                                <h6 class="text-xl xl:text-4xl tracking-widest">KAINAKAP</h6>
                                <h1 class="text-5xl xl:text-7xl font-bold font-noto">Service<span class="text-primary-light font-poppins">Hub</span></h1>
                            </div>
                    </div>
                    <p class="xl:text-lg w-[60vw] lg:w-auto">Login to join Kainakap events and stay up-to-date with the latest updates.</p>
                </div> --> */}
                <div className="flex flex-col text-center items-center space-y-2 lg:space-y-7 my-5">
                    <div className="flex flex-col justify-center items-center gap-1 lg:-space-y-2">
                        <img className="min-h-[60px] h-[10%] lg:h-[60%] 2xl:h-[45%] min-w-[60px] w-[10%] lg:w-[60%] 2xl:w-[45%]" src={logo} alt="icon logo" />
                        <div className="flex flex-col items-center -space-y-1 lg:-space-y-2">
                            <h6 className="text-sm sm:text-xl lg:text-2xl xl:text-2xl tracking-widest">KAINAKAP</h6>
                            <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-7xl font-bold font-noto">Service<span className="text-primary-light font-poppins">Hub</span></h1>
                        </div>
                    </div>
                    <p className="text-sm w-[50vw] xl:text-lg lg:w-auto lg:mx-10">Login to join Kainakap events and stay up-to-date with the latest updates.</p>
                </div>

                <div className="flex flex-col lg:flex-row items-center text-center 2xl lg:mb-0 gap-1">
                    <div className="order-4 lg:order-none h-8 lg:h-[35vh] w-[35vw] lg:w-10 rounded-b-2xl lg:rounded-tr-none lg:rounded-l-2xl opacity-70 bg-gradient-to-r lg:bg-gradient-to-b from-gradient-primary-light-from to-transparent"></div>
                    <div className="order-3 lg:order-none h-8 lg:h-[50vh] w-[50vw] lg:w-10 rounded-b-2xl lg:rounded-tr-none lg:rounded-l-2xl opacity-70 bg-gradient-to-r lg:bg-gradient-to-b from-gradient-primary-light-from to-transparent"></div>
                    <div className="order-2 lg:order-none h-8 lg:h-[65vh] w-[65vw] lg:w-10 rounded-b-2xl lg:rounded-tr-none lg:rounded-l-2xl opacity-70 bg-gradient-to-r lg:bg-gradient-to-b from-gradient-primary-light-from to-transparent"></div>
                    {/* <!-- form --> */}
                    <form id="loginform" onSubmit={clientLogValidation} method="post" className="flex flex-col justify-center w-[80vw] lg:w-[40vw] xl:w-[30vw] 2xl:max-w-[500px] lg:h-[80vh] min-h-[200px] px-5 py-10 gap-10 rounded-2xl lg:overflow-auto relative bg-gradient-to-br from-gradient-primary-dark-from to-gradient-primary-dark-to text-white">
                        <div className="flex flex-col items-center gap-5">
                            <img className="w-10 lg:w-16 object-contain" src={memberIcon} alt="member icon" />
                            <div className="gap-1">
                                <h2 className="mx-5 text-4xl font-medium">WELCOME BACK</h2>
                                <p className="mx-5 text font-extralight">Please login to your account to continue.</p>
                            </div>
                        </div>
                        <div className="flex flex-col mx-3 gap-5 text-start">

                            {/* <!-- email --> */}
                            <div className="flex flex-col">
                                <label className="font-light" htmlFor="email">Email</label>
                                <input className="px-3 py-2 rounded-md text-lg text-darkColor" type="text" name="email" id="email" placeholder="you@example.com" onChange={handleChangesEmail}/>
                            </div>

                            {/* <!-- pass --> */}
                            <div className="flex flex-col">
                                <label className="font-light" htmlFor="pass">Password</label>
                                <input className="px-3 py-2 rounded-md text-lg text-darkColor" type="password" name="pass" id="pass" placeholder="Password@123" onChange={handleChangesPassword}/>
                            </div>

                        </div>
                        <div className="flex flex-col gap-2 mx-3">
                            <p className="font-extralight">Not a member? <a className="text-primary-extraDark font-medium" href="#">Sign-up</a></p>
                            <button type="submit" className="py-3 rounded-md font-noto text-xl bg-primary-extraDark shadow-sm hover:shadow-lg hover:scale-105 transition-all">Login</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )

}



export default Loginpage;