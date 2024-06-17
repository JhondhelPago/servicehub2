import React , { useEffect, useState }from 'react';

import childCom from './sampeReact';

import Chart from "react-apexcharts";
import axios from 'axios';

// chart link
// https://www.material-tailwind.com/docs/react/plugins/charts
const barChartConfig = {
    type: "bar",
    height: 240,
    series: [
        {
            name: "Sales",
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
            // graph title
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

const pieChartConfig = {
    type: "pie",
    width: 350,
    height: 350,
    series: [20, 10, 5, 5, 40, 20],
    options: {
        chart: {
            toolbar: {
                show: false,
            },
        },
        title: {
            // graph title
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
            // textAnchor: 'start',
            // style: { fontSize: "18" }
        },
        colors: ["#CD890A", "#B17709", "#966D22", "#A44F00", "#424B54", "#3A4147"],
        legend: {
            show: false,
            fontFamily: "Poppins, sans-serif",
            customLegendItems: ["Legend 1", "Legend 1", "Legend 1", "Legend 1", "Legend 1", "Legend 1"],
            onItemClick: { toggleDataSeries: true, },
            labels: { useSeriesColors: true },
            onItemHover: { highlightDataSeries: true },
        },
    },
};

const Homeprompt = () => {


    const [UserInformation, SetUserInformation] = useState(null);

    const FetchUserInformation = async() =>{
        
        try{

            const response = await axios.get(`/Fetch/Dashboard`);
            SetUserInformation(response.data);

            console.log(response.data);

        }catch(error){
            throw error;
        }
    }

    useEffect(() => {
        FetchUserInformation();
    }, [])

    return (
        <>
            <head>
                <title>Dashboard</title>
            </head>
            <div id="mainContentContainer" Class="pb-5 flex flex-col flex-grow bg-gray-100 text-darkColor">
                <div className="sticky top-0 flex items-center justify-between gap-2 px-5 py-5 mb-5 bg-gray-100 ">
                    <div className='flex flex-col gap-2'>
                        <h1 className="flex text-2xl font-medium md:text-4xl">
                            Dashboard
                        </h1>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-5 px-5">
                    <Chart className="flex items-center justify-center w-full rounded-lg hover:shadow-lg hover:bg-white bg-gray-50" {...barChartConfig} />
                    <div className='flex flex-col w-full gap-5 md:flex-row'>
                        <Chart className="flex items-center justify-center rounded-lg hover:shadow-lg hover:bg-white bg-gray-50" {...pieChartConfig} />
                        <div className='flex flex-wrap flex-grow gap-5'>
                            {/* add or remove lang ng div depende sa kailangan */}
                            <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
                                <h3 className='text-4xl'>Count:{UserInformation && UserInformation.Gender.male_count}</h3>
                                <h3 className='text-4xl'>Percent: {UserInformation && UserInformation.Gender.male_percentage}</h3>
                                <h6>Male</h6>
                            </div>
                            <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
                                <h3 className='text-4xl'>{UserInformation && UserInformation.Gender.female_count}</h3>
                                <h3 className='text-4xl'>{UserInformation && UserInformation.Gender.female_percentage}</h3>
                                <h6>Female</h6>
                            </div>
                            <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
                                <h3 className='text-4xl'>{UserInformation && UserInformation.Disability.physical.count}</h3>
                                <h6>With Physical Disability</h6>
                            </div>
                            <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
                                <h3 className='text-4xl'>40%</h3>
                                <h6>With Mental Disability</h6>
                            </div>
                            {/* <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
                                <h3 className='text-4xl'>40%</h3>
                                <h6>Label</h6>
                            </div> */}
                        </div>
                    </div>
                    <div className='flex flex-wrap w-full'>
                        <div className='flex flex-wrap flex-grow gap-5'>
                            {/* add or remove lang ng div depende sa kailangan */}
                            <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
                                <h3 className='text-4xl'>40%</h3>
                                <h6>Minor</h6>
                            </div>
                            <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
                                <h3 className='text-4xl'>40%</h3>
                                <h6>Adult</h6>
                            </div>
                            <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
                                <h3 className='text-4xl'>40%</h3>
                                <h6>Senior</h6>
                            </div>
                            <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
                                <h3 className='text-4xl'>40%</h3>
                                <h6>Lorem ipsum dolor sit amet.</h6>
                            </div>
                            <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
                                <h3 className='text-4xl'>40%</h3>
                                <h6>Label</h6>
                            </div>
                            <div className='flex flex-col items-center justify-center flex-grow rounded-lg p-7 bg-gray-50 hover:shadow-lg hover:bg-white'>
                                <h3 className='text-4xl'>40%</h3>
                                <h6>Label</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Homeprompt;  