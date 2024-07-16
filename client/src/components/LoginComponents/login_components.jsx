import React, {useContext, useState} from 'react';
// import nagigate here
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

import icon_logo from '../../assets/icon logo.png';
import adminIcon from '../../assets/adminIcon.png';

const LoginComponents = () => {

    const nagivateHome = useNavigate();

    const {setAdminId} = useContext(UserContext);  // set user id to the

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Admin'); // Assuming default role is Admin
    const [error, setError] = useState('');
    

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('/adminLoginSession', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    module: role,
                }),
            });

            const data = await response.json();
            console.log(data);
            if (data.status) {
                // If login is successful, redirect to the homepage
                // history.push('/'); // Redirect to the homepage route

                const UserAdminId = data.id;

                setAdminId(UserAdminId); 


                nagivateHome('/AdminHome')
            } else {
                // If login fails, display an error message
                setError('Invalid email or password');

                alert('Invalid email or password');
            }
        } catch (error) {
            console.log(error);
            setError('Something went wrong. Please try again.');
        }

        

    };


    return (
        <>
            <section className="container lg:min-h-[100vh] flex flex-col lg:flex-row items-center justify-between gap-2 mx-auto px-5 font-poppins text-darkColor">
                {/* <!-- hero text -->
                <!-- <div class="flex flex-col text-center items-center space-y-2 lg:space-y-7 my-5">
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
                    <img className="min-h-[60px] h-[10%] lg:h-[60%] 2xl:h-[45%] min-w-[60px] w-[10%] lg:w-[60%] 2xl:w-[45%]" src={icon_logo} alt="icon logo jd"/>
                    <div className="flex flex-col items-center -space-y-1 lg:-space-y-2">
                    {/* <h6 className="text-sm sm:text-xl lg:text-2xl xl:text-2xl tracking-widest">KAINAKAP</h6> */}
                    <h6 className="text-sm sm:text-xl lg:text-2xl xl:text-2xl tracking-wides">KAINAKAP</h6>
                    <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-7xl font-bold font-noto">Service<span className="text-primary-light font-poppins">Hub</span></h1>
                    </div>
                </div>
                {/* <!-- <p class="text-sm w-[50vw] xl:text-lg lg:w-auto lg:mx-10">Login to join Kainakap events and stay up-to-date with the latest updates.</p> --> */}
                </div>

                <div className="flex flex-col lg:flex-row items-center text-center 2xl lg:mb-0 gap-1">
                <div className="order-4 lg:order-none h-8 lg:h-[35vh] w-[35vw] lg:w-10 rounded-b-2xl lg:rounded-tr-none lg:rounded-l-2xl opacity-70 bg-gradient-to-r lg:bg-gradient-to-b from-gradient-primary-light-from to-transparent"></div>
                <div className="order-3 lg:order-none h-8 lg:h-[50vh] w-[50vw] lg:w-10 rounded-b-2xl lg:rounded-tr-none lg:rounded-l-2xl opacity-70 bg-gradient-to-r lg:bg-gradient-to-b from-gradient-primary-light-from to-transparent"></div>
                <div className="order-2 lg:order-none h-8 lg:h-[65vh] w-[65vw] lg:w-10 rounded-b-2xl lg:rounded-tr-none lg:rounded-l-2xl opacity-70 bg-gradient-to-r lg:bg-gradient-to-b from-gradient-primary-light-from to-transparent"></div>
                {/* <!-- form --> */}
                <form id="adminLogForm" onSubmit={handleSubmit} method="post" className="flex flex-col justify-center w-[80vw] lg:w-[40vw] xl:w-[30vw] 2xl:max-w-[500px] lg:h-[80vh] min-h-[200px] px-5 py-10 gap-10 rounded-2xl lg:overflow-auto relative bg-gradient-to-br from-gradient-dark-from to-gradient-dark-to text-white">
                    <div className="flex flex-col items-center gap-5">
                    <img className="w-10 lg:w-16 object-contain" src={adminIcon} alt="member icon"/>
                    <div className="gap-1">
                        <h2 className="mx-5 text-4xl font-medium">WELCOME BACK</h2>
                        <p className="mx-5 text font-extralight">Please login to your account to continue.</p>
                    </div>
                    </div>
                    <div className="flex flex-col mx-3 gap-5 text-start">

                    {/* <div className="flex flex-col">
                        <label className="" htmlFor="module">Login as...</label>
                        <select className="px-2 py-2 rounded-md text-lg text-darkColor" name="module" id="module" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option className="hover:bg-red-300" value="Admin">Admin</option>
                        <option className="hover:bg-red-300" value="Manager">Manager</option>
                        </select>
                    </div> */}

                    {/* <!-- email --> */}
                    <div className="flex flex-col">
                        <label className="font-light" htmlFor="email">Email</label>
                        <input className="px-3 py-2 rounded-md text-lg text-darkColor" type="text" name="email" id="email" value={email} onChange={handleEmailChange} placeholder="you@example.com"/>
                    </div>

                    {/* <!-- pass --> */}
                    <div className="flex flex-col">
                        <label className="font-light" htmlFor="pass">Password</label>
                        <input className="px-3 py-2 rounded-md text-lg text-darkColor" type="password" name="password" id="pass" value={password} onChange={handlePasswordChange} placeholder="Password@123"/>
                    </div>

                    </div>
                    <div className="flex flex-col gap-2 mx-3">
                    {/* <!-- <p class="font-extralight">Not a member? <a class="text-primary-extraDark font-medium" href="#">Sign-up</a></p> --> */}
                    <button className="py-3 rounded-md font-noto text-xl bg-primary-light shadow-sm hover:shadow-lg hover:scale-105 transition-all">Login</button>
                    </div>
                </form>
                </div>
            </section>
        
        </>
    )
}


export default LoginComponents;