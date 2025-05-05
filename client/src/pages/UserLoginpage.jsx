import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClientUserContext } from './ClientUserContext';
import logo from "../assets/icon logo.png";
import memberIcon from "../assets/memberIcon.png";
import LoadingIcons from 'react-loading-icons';

const UserLoginpage = () => {

    const { set_clientuserId } = useContext(ClientUserContext); // from the setup file of the ClientUserContext

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

    const [isLoading, setIsLoading] = useState(false)

    const clientLogValidation = async (event) => {

        setIsLoading(true)

        event.preventDefault();




        const reqbody = {
            email: Email,
            password: Password
        }
        const UrlServer = `api/user/loginsession`;


        try {

            const response = await axios.post(UrlServer, reqbody);
            console.log(response);
            let clientuserId_session = response.data.IdLogSession;



            if (clientuserId_session == null) {
                setIsLoading(false)

                alert('incorrect username and password');

            } else {
                setIsLoading(false)

                // console.log(clientuserId_session);
                set_clientuserId(clientuserId_session);
                //navigating tot the HomePage
                NavigateHome('/home');
                // console.log('redirecting to the client home');

            }
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
            throw error;
        }



    }


    // useEffect(() => {

    //     console.log('hello world');
    // });

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
                <div className="flex flex-col items-center my-5 space-y-2 text-center lg:space-y-7">
                    <div className="flex flex-col items-center justify-center gap-1 lg:-space-y-2">
                        <img className="min-h-[60px] h-[10%] lg:h-[60%] 2xl:h-[45%] min-w-[60px] w-[10%] lg:w-[60%] 2xl:w-[45%]" src={logo} alt="icon logo" />
                        <div className="flex flex-col items-center -space-y-1 lg:-space-y-2">
                            <h6 className="text-sm tracking-widest sm:text-xl lg:text-2xl xl:text-2xl">KAINAKAP</h6>
                            <h1 className="text-2xl font-bold sm:text-3xl lg:text-5xl xl:text-7xl font-noto">Service<span className="text-primary-light font-poppins">Hub</span></h1>
                        </div>
                    </div>
                    <p className="text-sm w-[50vw] xl:text-lg lg:w-auto lg:mx-10">Login to join Kainakap events and stay up-to-date with the latest updates.</p>
                </div>

                <div className="flex flex-col items-center gap-1 text-center lg:flex-row 2xl lg:mb-0">
                    <div className="order-4 lg:order-none h-8 lg:h-[35vh] w-[35vw] lg:w-10 rounded-b-2xl lg:rounded-tr-none lg:rounded-l-2xl opacity-70 bg-gradient-to-r lg:bg-gradient-to-b from-gradient-primary-light-from to-transparent"></div>
                    <div className="order-3 lg:order-none h-8 lg:h-[50vh] w-[50vw] lg:w-10 rounded-b-2xl lg:rounded-tr-none lg:rounded-l-2xl opacity-70 bg-gradient-to-r lg:bg-gradient-to-b from-gradient-primary-light-from to-transparent"></div>
                    <div className="order-2 lg:order-none h-8 lg:h-[65vh] w-[65vw] lg:w-10 rounded-b-2xl lg:rounded-tr-none lg:rounded-l-2xl opacity-70 bg-gradient-to-r lg:bg-gradient-to-b from-gradient-primary-light-from to-transparent"></div>
                    {/* <!-- form --> */}
                    <form id="loginform" onSubmit={clientLogValidation} method="post" className="flex flex-col justify-center w-[80vw] lg:w-[40vw] xl:w-[30vw] 2xl:max-w-[500px] lg:h-[80vh] min-h-[200px] px-5 py-10 gap-10 rounded-2xl lg:overflow-auto relative bg-gradient-to-br from-gradient-primary-dark-from to-gradient-primary-dark-to text-white">
                        <div className="flex flex-col items-center gap-5">
                            <img className="object-contain w-10 lg:w-16" src={memberIcon} alt="member icon" />
                            <div className="gap-1">
                                <h2 className="mx-5 text-4xl font-medium">WELCOME BACK</h2>
                                <p className="mx-5 text font-extralight">Please login to your account to continue.</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 mx-3 text-start">

                            {/* <!-- email --> */}
                            <div className="flex flex-col">
                                <label className="font-light" htmlFor="email">Email</label>
                                <input className="px-3 py-2 text-lg rounded-md text-darkColor" type="text" name="email" id="email" placeholder="you@example.com" onChange={handleChangesEmail} />
                            </div>

                            {/* <!-- pass --> */}
                            <div className="flex flex-col">
                                <label className="font-light" htmlFor="pass">Password</label>
                                <input className="px-3 py-2 text-lg rounded-md text-darkColor" type="password" name="pass" id="pass" placeholder="Password@123" onChange={handleChangesPassword} />
                            </div>

                        </div>
                        <div className="flex flex-col gap-2 mx-3">
                            <p className="font-extralight">Not a member? <a className="font-medium text-primary-extraDark" href="#">Sign-up</a></p>
                            {isLoading ? (
                                <LoadingIcons.TailSpin stroke="#fff" className="mx-auto w-7 h-7" strokeWidth={2}></LoadingIcons.TailSpin >
                            ) : (
                                <button type="submit" className="py-3 text-xl transition-all rounded-md shadow-sm font-noto bg-primary-extraDark hover:shadow-lg hover:scale-105">Login</button>
                            )}
                        </div>
                    </form>
                </div>
            </section>
        </>
    )

}



export default UserLoginpage;