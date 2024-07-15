// import React , { useEffect, useState }from 'react';

// import childCom from './sampeReact';

// import Chart from "react-apexcharts";
// import axios from 'axios';

// //images from assests
// import Male from '../../assets/man.png';
// import Female from '../../assets/woman.png';
// import Unemployed from '../../assets/unemployment.png';
// import Employed from '../../assets/businessman.png';
// import Senior from '../../assets/senior.png';
// import Adult from '../../assets/adult.png';
// import Children from '../../assets/children.png';


// // chart link
// // https://www.material-tailwind.com/docs/react/plugins/charts
// const barChartConfig = {
//     type: "bar",
//     height: 240,
//     series: [
//         {
//             name: "Sales",
//             data: [500, 40, 300, 320, 500, 350, 200, 230, 1000],
//         },
//     ],
//     options: {
//         chart: {
//             toolbar: {
//                 show: false,
//             },
//         },
//         title: {
//             // graph title
//             text: "Bar Graph",
//             style: {
//                 fontSize: "20",
//                 fontFamily: "Poppins, sans-serif",
//                 fontWeight: 500,
//                 color: "#424B54",
//             }
//         },
//         dataLabels: {
//             enabled: false,
//         },
//         colors: ["#3A4147"],
//         plotOptions: {
//             bar: {
//                 columnWidth: "50%",
//                 borderRadius: 2,
//             },
//         },
//         xaxis: {
//             axisTicks: {
//                 show: false,
//             },
//             axisBorder: {
//                 show: false,
//             },
//             labels: {
//                 style: {
//                     colors: "#424B54",
//                     fontSize: "12px",
//                     fontFamily: "inherit",
//                     fontWeight: 400,
//                 },
//             },
//             categories: [
//                 "Apr",
//                 "May",
//                 "Jun",
//                 "Jul",
//                 "Aug",
//                 "Sep",
//                 "Oct",
//                 "Nov",
//                 "Dec",
//             ],
//         },
//         yaxis: {
//             labels: {
//                 style: {
//                     colors: "#424B54",
//                     fontSize: "12px",
//                     fontFamily: "inherit",
//                     fontWeight: 400,
//                 },
//             },
//         },
//         grid: {
//             show: true,
//             borderColor: "#dddddd",
//             strokeDashArray: 5,
//             xaxis: {
//                 lines: {
//                     show: true,
//                 },
//             },
//             padding: {
//                 top: 5,
//                 right: 20,
//             },
//         },
//         fill: {
//             opacity: 0.8,
//         },
//         tooltip: {
//             theme: "dark",
//         },
//     },

// };

// // const pieChartConfig = {
// //     type: "pie",
// //     width: 350,
// //     height: 350,
// //     series: [20, 10, 5, 5, 40, 20], // how do assign dynamic data on this list from my database
// //     options: {
// //         chart: {
// //             toolbar: {
// //                 show: false,
// //             },
// //         },
// //         title: {
// //             // graph title
// //             text: "Pie Graph",
// //             style: {
// //                 fontSize: "20",
// //                 fontFamily: "Poppins, sans-serif",
// //                 fontWeight: 500,
// //                 color: "#424B54",
// //             }
// //         },
// //         dataLabels: {
// //             enabled: true,
// //             // textAnchor: 'start',
// //             // style: { fontSize: "18" }
// //         },
// //         colors: ["#CD890A", "#B17709", "#966D22", "#A44F00", "#424B54", "#3A4147"],
// //         legend: {
// //             show: false,
// //             fontFamily: "Poppins, sans-serif",
// //             customLegendItems: ["Legend 1", "Legend 1", "Legend 1", "Legend 1", "Legend 1", "Legend 1"],
// //             onItemClick: { toggleDataSeries: true, },
// //             labels: { useSeriesColors: true },
// //             onItemHover: { highlightDataSeries: true },
// //         },
// //     },
// // };

// const Homeprompt = () => {


//     const [UserInformation, SetUserInformation] = useState(null);

//     const FetchUserInformation = async() =>{

//         try{

//             const response = await axios.get(`/Fetch/Dashboard`);
//             SetUserInformation(response.data);

//             console.log(response.data);

//         }catch(error){
//             throw error;
//         }
//     }

//     const convertToRoundedHundred = (num) => {
//         return Math.round(num * 100);
//     };

//     // pieChartConfig
//     // const pieChartConfig = {
//     //     type: "pie",
//     //     width: 350,
//     //     height: 350,
//     //     series: [
//     //         convertToRoundedHundred(UserInformation.Disability.IntellectualDisability_percentage),
//     //         convertToRoundedHundred(UserInformation.Disability.InvisibleDisability_percentage),
//     //         convertToRoundedHundred(UserInformation.Disability.LearningDisability_percentage),
//     //         convertToRoundedHundred(UserInformation.Disability.MentalHealthDisability_percentage),
//     //         convertToRoundedHundred(UserInformation.Disability.PhysicalDisability_percentage),
//     //         convertToRoundedHundred(UserInformation.Disability.SensoryDisability_percentage)], // how do assign dynamic data on this list from my database
//     //     options: {
//     //         chart: {
//     //             toolbar: {
//     //                 show: false,
//     //             },
//     //         },
//     //         title: {
//     //             // graph title
//     //             text: "Pie Graph",
//     //             style: {
//     //                 fontSize: "20",
//     //                 fontFamily: "Poppins, sans-serif",
//     //                 fontWeight: 500,
//     //                 color: "#424B54",
//     //             }
//     //         },
//     //         dataLabels: {
//     //             enabled: true,
//     //             // textAnchor: 'start',
//     //             // style: { fontSize: "18" }
//     //         },
//     //         colors: ["#CD890A", "#B17709", "#966D22", "#A44F00", "#424B54", "#3A4147"],
//     //         legend: {
//     //             show: false,
//     //             fontFamily: "Poppins, sans-serif",
//     //             customLegendItems: ["Legend 1", "Legend 1", "Legend 1", "Legend 1", "Legend 1", "Legend 1"],
//     //             onItemClick: { toggleDataSeries: true, },
//     //             labels: { useSeriesColors: true },
//     //             onItemHover: { highlightDataSeries: true },
//     //         },
//     //     },
//     // };

//     const getPieChartConfig = () => {
//         if (!UserInformation) return null;
//         return {
//             type: "pie",
//             width: 350,
//             height: 350,
//             series: [
//                 convertToRoundedHundred(UserInformation.Disability.IntellectualDisability_percentage),
//                 convertToRoundedHundred(UserInformation.Disability.InvisibleDisability_percentage),
//                 convertToRoundedHundred(UserInformation.Disability.LearningDisability_percentage),
//                 convertToRoundedHundred(UserInformation.Disability.MentalHealthDisability_percentage),
//                 convertToRoundedHundred(UserInformation.Disability.PhysicalDisability_percentage),
//                 convertToRoundedHundred(UserInformation.Disability.SensoryDisability_percentage)
//             ],
//             options: {
//                 chart: {
//                     toolbar: {
//                         show: false,
//                     },
//                 },
//                 title: {
//                     text: "Pie Graph",
//                     style: {
//                         fontSize: "20",
//                         fontFamily: "Poppins, sans-serif",
//                         fontWeight: 500,
//                         color: "#424B54",
//                     }
//                 },
//                 dataLabels: {
//                     enabled: true,
//                 },
//                 colors: ["#CD890A", "#B17709", "#966D22", "#A44F00", "#424B54", "#3A4147"],
//                 legend: {
//                     show: false,
//                     fontFamily: "Poppins, sans-serif",
//                     customLegendItems: ["Legend 1", "Legend 1", "Legend 1", "Legend 1", "Legend 1", "Legend 1"],
//                     onItemClick: { toggleDataSeries: true, },
//                     labels: { useSeriesColors: true },
//                     onItemHover: { highlightDataSeries: true },
//                 },
//             },
//         };
//     };


//     useEffect(() => {
//         FetchUserInformation();

//         // const pieChartConfig = {
//         //     type: "pie",
//         //     width: 350,
//         //     height: 350,
//         //     series: [
//         //         convertToRoundedHundred(UserInformation.Disability.IntellectualDisability_percentage),
//         //         convertToRoundedHundred(UserInformation.Disability.InvisibleDisability_percentage),
//         //         convertToRoundedHundred(UserInformation.Disability.LearningDisability_percentage),
//         //         convertToRoundedHundred(UserInformation.Disability.MentalHealthDisability_percentage),
//         //         convertToRoundedHundred(UserInformation.Disability.PhysicalDisability_percentage),
//         //         convertToRoundedHundred(UserInformation.Disability.SensoryDisability_percentage)], // how do assign dynamic data on this list from my database
//         //     options: {
//         //         chart: {
//         //             toolbar: {
//         //                 show: false,
//         //             },
//         //         },
//         //         title: {
//         //             // graph title
//         //             text: "Pie Graph",
//         //             style: {
//         //                 fontSize: "20",
//         //                 fontFamily: "Poppins, sans-serif",
//         //                 fontWeight: 500,
//         //                 color: "#424B54",
//         //             }
//         //         },
//         //         dataLabels: {
//         //             enabled: true,
//         //             // textAnchor: 'start',
//         //             // style: { fontSize: "18" }
//         //         },
//         //         colors: ["#CD890A", "#B17709", "#966D22", "#A44F00", "#424B54", "#3A4147"],
//         //         legend: {
//         //             show: false,
//         //             fontFamily: "Poppins, sans-serif",
//         //             customLegendItems: ["Legend 1", "Legend 1", "Legend 1", "Legend 1", "Legend 1", "Legend 1"],
//         //             onItemClick: { toggleDataSeries: true, },
//         //             labels: { useSeriesColors: true },
//         //             onItemHover: { highlightDataSeries: true },
//         //         },
//         //     },
//         // };
//     }, [])

//     return (
//         <>
//             <head>
//                 <title>Dashboard</title>
//             </head>
//             <div id="mainContentContainer" Class="pb-5 flex flex-col flex-grow bg-gray-100 text-darkColor">
//                 <div className="sticky top-0 flex items-center justify-between gap-2 px-5 py-5 mb-5 bg-gray-100 ">
//                     <div className='flex flex-col gap-2'>
//                         <h1 className="flex text-2xl font-medium md:text-4xl">
//                             Dashboard
//                         </h1>
//                     </div>
//                 </div>
//                 <div className="flex flex-col items-center gap-5 px-5">
//                     <Chart className="flex items-center justify-center w-full rounded-lg hover:shadow-lg hover:bg-white bg-gray-50" {...barChartConfig} />
//                     <div className='flex flex-col w-full gap-5 md:flex-row'>
//                         <Chart className="flex items-center justify-center rounded-lg hover:shadow-lg hover:bg-white bg-gray-50" {...getPieChartConfig()} />
//                         <div className='flex flex-wrap flex-grow gap-5'>
//                             {/* add or remove lang ng div depende sa kailangan */}
//                             <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
//                                 <h3 className='text-2xl'>Count: {UserInformation && UserInformation.Gender.male_count}</h3>
//                                 <h3 className='text-2xl'> {UserInformation && UserInformation.Gender.male_percentage}</h3>

//                                 <img className='h-24 w-18' src={Male}></img>
//                                 <h6>Male</h6>
//                             </div>
//                             <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
//                                 <h3 className='text-2xl'>Count: {UserInformation && UserInformation.Gender.female_count}</h3>
//                                 <h3 className='text-2xl'> {UserInformation && UserInformation.Gender.female_percentage}</h3>
//                                 <img className='h-24 w-18' src={Female}></img>
//                                 <h6>Female</h6>
//                             </div>
//                             {/* <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
//                                 <h3 className='text-4xl'>Count: {UserInformation && UserInformation.Disability.physical.count}</h3>
//                                 <h3 className='text-4xl'>Percent: {UserInformation && UserInformation.Disability.physical_percentage}</h3>
//                                 <h6>With Physical Disability</h6>
//                             </div>
//                             <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
//                                 <h3 className='text-4xl'>Count: {UserInformation && UserInformation.Disability.mental.count}</h3>
//                                 <h3 className='text-4xl'>Percent: {UserInformation && UserInformation.Disability.mental_percentage}</h3>
//                                 <h6>With Mental Disability</h6>
//                             </div> */}
//                             {/* <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
//                                 <h3 className='text-4xl'>40%</h3>
//                                 <h6>Label</h6>
//                             </div> */}
//                         </div>
//                     </div>
//                     <div className='flex flex-wrap w-full'>
//                         <div className='flex flex-wrap flex-grow gap-5'>
//                             {/* add or remove lang ng div depende sa kailangan */}
//                             {/* <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
//                                 <h3 className='text-4xl'>Count: {UserInformation && UserInformation.Civil.single.count}</h3>
//                                 <h3 className='text-4xl'>Percent: {UserInformation && UserInformation.Civil.single_percentage}</h3>
//                                 <h6>Single</h6>
//                             </div>
//                             <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
//                                 <h3 className='text-4xl'>Count: {UserInformation && UserInformation.Civil.married.count}</h3>
//                                 <h3 className='text-4xl'>Percent: {UserInformation && UserInformation.Civil.married_percentage}</h3>
//                                 <h6>Married</h6>
//                             </div> */}
//                             <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
//                                 <h3 className='text-2xl'>Count: {UserInformation && UserInformation.Employment.unemployed}</h3>
//                                 <h3 className='text-2xl'> {UserInformation && UserInformation.Employment.unemployment_percentage}</h3>
//                                 <img className='h-24 w-18' src={Unemployed}></img>
//                                 <h6>Unemployed</h6>
//                             </div>
//                             <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
//                                 <h3 className='text-2xl'>Count: {UserInformation && UserInformation.Employment.employed}</h3>
//                                 <h3 className='text-2xl'> {UserInformation && UserInformation.Employment.employment_percentage}</h3>
//                                 <img className='h-24 w-18' src={Employed}></img>
//                                 <h6>Employed</h6>
//                             </div>
//                             <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
//                                 <h3 className='text-2xl'>Count: {UserInformation && UserInformation.Age.minor_count}</h3>
//                                 <h3 className='text-2xl'>{UserInformation && UserInformation.Age.minor_percentage}</h3>
//                                 <img className='h-24 w-18' src={Children}></img>
//                                 <h6>minor</h6>
//                             </div>
//                             <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
//                                 <h3 className='text-2xl'>Count: {UserInformation && UserInformation.Age.adult_count}</h3>
//                                 <h3 className='text-2xl'> {UserInformation && UserInformation.Age.adult_percentage}</h3>
//                                 <img className='h-24 w-18' src={Adult}></img>
//                                 <h6>Adult</h6>
//                             </div>
//                             <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
//                                 <h3 className='text-2xl'>Count: {UserInformation && UserInformation.Age.senior_count}</h3>
//                                 <h3 className='text-2xl'>{UserInformation && UserInformation.Age.senior_percentage}</h3>
//                                 <img className='h-24 w-18' src={Senior}></img>
//                                 <h6>Senior</h6>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Homeprompt;  




import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import axios from 'axios';

//importing the ph_province_cities json
import { PH_province_cities } from '../../utils';

import Male from '../../assets/man.png';
import Female from '../../assets/woman.png';
import Unemployed from '../../assets/unemployment.png';
import Employed from '../../assets/businessman.png';
import Senior from '../../assets/senior.png';
import Adult from '../../assets/adult.png';
import Children from '../../assets/children.png';
import Population1 from '../../assets/totalPopulation1.png';
import Population2 from '../../assets/totalPopulation2.png';
import Population3 from '../../assets/totalPopulation3.png';

const barChartConfig = {
    type: "bar",
    height: 240,
    series: [
        {
            name: "Events",
            data: [500, 40, 300, 320, 500, 350, 200, 230, 1000],
        },
    ],
    options: {
        chart: {
            toolbar: {
                show: false,
            },
        },
        title: {
            text: "Bar Graph",
            style: {
                fontSize: "20",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                color: "#424B54",
            }
        },
        dataLabels: {
            enabled: false,
        },
        colors: ["#3A4147"],
        plotOptions: {
            bar: {
                columnWidth: "50%",
                borderRadius: 2,
            },
        },
        xaxis: {
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            labels: {
                style: {
                    colors: "#424B54",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                    fontSize: "16",
                },
            },
            categories: [
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#424B54",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                    fontSize: "16",
                },
            },
        },
        grid: {
            show: true,
            borderColor: "#dddddd",
            strokeDashArray: 5,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            padding: {
                top: 5,
                right: 20,
            },
        },
        fill: {
            opacity: 0.8,
        },
        tooltip: {
            theme: "dark",
        },
    },
};

const Homeprompt = () => {

    const [UserInformation, SetUserInformation] = useState(null);

    const FetchUserInformation = async () => {
        try {
            const response = await axios.get(`/Fetch/Dashboard`);
            SetUserInformation(response.data);
            console.log(response.data);
        } catch (error) {
            throw error;
        }
    }

    const Philippine_prov_cities = PH_province_cities;

    const handleFilterFetch = async() => {


    }

    const convertToRoundedHundred = (num) => {
        return Math.round(num * 100);
    };

    const getPieChartConfig = () => {
        if (!UserInformation) return null;
        return {
            type: "pie",
            width: 450,
            height: 450,
            series: [
                // convertToRoundedHundred(UserInformation.Disability.IntellectualDisability_percentage),
                // convertToRoundedHundred(UserInformation.Disability.InvisibleDisability_percentage),
                // convertToRoundedHundred(UserInformation.Disability.LearningDisability_percentage),
                // convertToRoundedHundred(UserInformation.Disability.MentalHealthDisability_percentage),
                // convertToRoundedHundred(UserInformation.Disability.PhysicalDisability_percentage),
                // convertToRoundedHundred(UserInformation.Disability.SensoryDisability_percentage)
                UserInformation.Disability.IntellectualDisability_count,
                UserInformation.Disability.InvisibleDisability_count,
                UserInformation.Disability.LearningDisability_count,
                UserInformation.Disability.MentalHealthDisability_count,
                UserInformation.Disability.PhysicalDisability_count,
                UserInformation.Disability.SensoryDisability_count,
            ],
            options: {
                chart: {
                    toolbar: {
                        show: false,
                    },
                },
                title: {
                    text: "Pie Graph",
                    style: {
                        fontSize: "20",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 500,
                        color: "#424B54",
                    }
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: "16",
                        fontWeight: 300,
                    },
                },
                colors: [
                    "#000000",
                    "#3A4147",
                    "#5E6F7C",
                    "#E4AB0E",
                    "#A44F00",
                    "#4C2000",
                ],
                legend: {
                    show: true,
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "16",
                    customLegendItems: ["Intellectual", "Invisible", "Learning", "Mental", "Physical", "Sensory"],
                    onItemClick: { toggleDataSeries: true, },
                    labels: { useSeriesColors: true },
                    onItemHover: { highlightDataSeries: true },
                },
            },
        };
    };

    useEffect(() => {
        FetchUserInformation();
        console.log(Philippine_prov_cities);
    }, []);

    return (
        <>
            <head>
                <title>Dashboard</title>
            </head>
            <div id="mainContentContainer" className="flex flex-col flex-grow pb-5 bg-gray-100 text-darkColor">
                <div className="sticky top-0 z-10 flex items-center justify-between gap-2 px-5 py-5 mb-5 bg-gray-100">
                    <div className='flex flex-row flex-wrap w-full ustify-between'>
                        <h1 className="flex mr-auto text-2xl font-medium md:text-4xl">
                            Dashboard
                        </h1>

                        {/* filter */}
                        <div className='flex flex-wrap gap-5 mt-2'>
                            {/* city */}
                            <select className='flex rounded border-darkColor text-darkColor' name="" id="city">
                                <option defaultValue>-Filter by City-</option>
                            </select>

                             {/* district */}
                             <select className='flex rounded border-darkColor text-darkColor' name="" id="district">
                                <option defaultValue>-Filter by District-</option>
                                <option value="">aosdioasjd</option>
                                <option value="">aosdioasjd</option>
                                <option value="">aosdioasjd</option>
                                <option value="">aosdioasjd</option>
                                <option value="">aosdioasjd</option>
                            </select>

                            {/* export btn */}
                            <button className='px-5 py-2 text-white rounded scaleHover bg-primary-light'>Export to CSV</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-5 px-5">
                    <Chart className="flex items-center justify-center w-full rounded-lg hover:shadow-lg hover:bg-white bg-gray-50" {...barChartConfig} />
                    <div className='flex flex-col w-full gap-5 md:flex-row'>
                        {UserInformation && <Chart className="flex items-center justify-center rounded-lg hover:shadow-lg hover:bg-white bg-gray-50" {...getPieChartConfig()} />}
                        <div className='flex flex-wrap flex-grow gap-5'>
                        <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
                                <h3 className='text-2xl'>Registed Members: {UserInformation && UserInformation.MetaInfo.length}</h3>
                                <img className='w-18 h-24' src={Population2}></img>
                                <h6>Total Population</h6>
                            </div>
                            <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
                                <h3 className='text-2xl'>Count: {UserInformation && UserInformation.Gender.male_count}</h3>
                                <h3 className='text-2xl'> {UserInformation && UserInformation.Gender.male_percentage}</h3>
                                <img className='h-24 w-18' src={Male}></img>
                                <h6>Male</h6>
                            </div>
                            <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
                                <h3 className='text-2xl'>Count: {UserInformation && UserInformation.Gender.female_count}</h3>
                                <h3 className='text-2xl'> {UserInformation && UserInformation.Gender.female_percentage}</h3>
                                <img className='h-24 w-18' src={Female}></img>
                                <h6>Female</h6>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-wrap w-full'>
                        <div className='flex flex-wrap flex-grow gap-5'>
                            <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
                                <h3 className='text-2xl'>Count: {UserInformation && UserInformation.Employment.unemployed}</h3>
                                <h3 className='text-2xl'> {UserInformation && UserInformation.Employment.unemployment_percentage}</h3>
                                <img className='h-24 w-18' src={Unemployed}></img>
                                <h6>Unemployed</h6>
                            </div>
                            <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
                                <h3 className='text-2xl'>Count: {UserInformation && UserInformation.Employment.employed}</h3>
                                <h3 className='text-2xl'> {UserInformation && UserInformation.Employment.employment_percentage}</h3>
                                <img className='h-24 w-18' src={Employed}></img>
                                <h6>Employed</h6>
                            </div>
                            <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
                                <h3 className='text-2xl'>Count: {UserInformation && UserInformation.Age.minor_count}</h3>
                                <h3 className='text-2xl'>{UserInformation && UserInformation.Age.minor_percentage}</h3>
                                <img className='h-24 w-18' src={Children}></img>
                                <h6>Minor</h6>
                            </div>
                            <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
                                <h3 className='text-2xl'>Count: {UserInformation && UserInformation.Age.adult_count}</h3>
                                <h3 className='text-2xl'>{UserInformation && UserInformation.Age.adult_percentage}</h3>
                                <img className='h-24 w-18' src={Adult}></img>
                                <h6>Adult</h6>
                            </div>
                            <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
                                <h3 className='text-2xl'>Count: {UserInformation && UserInformation.Age.senior_count}</h3>
                                <h3 className='text-2xl'>{UserInformation && UserInformation.Age.senior_percentage}</h3>
                                <img className='h-24 w-18' src={Senior}></img>
                                <h6>Senior</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Homeprompt;
