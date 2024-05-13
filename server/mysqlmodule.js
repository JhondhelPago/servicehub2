const mysql = require('mysql2');
const { StringManipulate } = require('./utilities');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'servicehub'
}).promise();


//user queries
async function get_userId(email, password){
    try{
        const [row] = await pool.query(`SELECT id FROM user WHERE email = ? AND password = ? `, [email, password]);
        return row;

    }catch(error){
        console.log(error);
        throw error;
    }
}




//admin queries
async function get_adminId(email, password, role){
    //role parameter -> possible value [Admin, Manager]

    //switch statement where
    let adminRole;

    switch(role){
        case 'Admin':
            adminRole = 'regular';
            break;
        
        case 'Manager':
            adminRole = 'manager';
            break;

        default:
            throw new Error('Invalid Module Entered  from admin login form');
    }


    try{
        const [row] = await pool.query(`SELECT id FROM admin WHERE email = ? AND password = ? AND role = ?`, [email, password, adminRole]);
        return row;

    }catch(error){
        console.log(error);
        throw error;
    }
}


async function EventPosting(){
    
}


async function post_EventJob(Type, Creator_id, EventTitle, ScheduledDate, ScheduledTime, Location, Description, Disability, filesArray){

    Disability = JSON.stringify(Disability);
    filesArray = JSON.stringify(filesArray);

    const Table = (Type === 'event') ? 'event_post' : 'job_post';

    // const DateNow = MyDateTime.Datenow();

    try{

        await pool.execute(`
        INSERT INTO ${Table}
        (creator,
        date_created,
        time_created,
        scheduled_date,
        scheduled_time,
        location,
        event_title,
        description,
        target_group,
        post_type,
        imagefiles)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [Creator_id, MyDateTime.Datenow(), MyDateTime.Timenow(), ScheduledDate, ScheduledTime, Location, EventTitle, Description, Disability, Table, filesArray]); 
    
    }catch(error){

        console.log('Error in \'post_Event\' function in mysqlmodule.js');
        throw error;
        
    }


}


// async function post_Job(Creator_id, EventTitle, ScheduledDate, ScheduledTime, Location, Description, Disability, filesArray){
    
//     Disability = JSON.stringify(Disability);
//     filesArray = JSON.stringify(filesArray);

//     try{

//         await pool.execute(`
        
//         `)

//     }catch(error){

//         console.log('Error in \'post_Job\' function in mysqlmodule.js');
//         throw error;
       
//     }
// }

async function job_post_edit(para_postID, para_Event, para_Date, para_Time, para_Description, para_PostType){

    //query for editing the post in the MySQL Server

    try{

        await pool.execute(`
        UPDATE ${para_PostType}
        SET scheduled_date = ?,
            scheduled_time = ?,
            event_title = ?,
            description = ?
        WHERE id = ?`, [para_Date, para_Time, para_Event, para_Description, para_postID]);


    }catch(error){
        console.log('Error in the post_edit function @ mysqlmodule.js');
        throw error;
    }

}




async function fetchEvent(){

    try{

        const [row] = await pool.execute(`SELECT * FROM event_post`);

        let newRow = row.map((record) => {
            record.imagefiles = StringManipulate.RemoveQuotation(record.imagefiles);
            record.target_group = StringManipulate.RemoveQuotation(record.target_group);

            return record;
        })

        return newRow;

    }catch(error){
        console.log('Error in \'fetchEventPosting() function\' in mysqlmodule.js');
        throw error;
    }
}


async function fetchJob(){

    try{

        const [row] = await pool.execute('SELECT job_post.* , admin.firstName, admin.lastName  FROM job_post INNER JOIN admin ON job_post.creator = admin.id COLLATE utf8mb4_general_ci');

        //cleaning the uncertain format of column value

        let newRow = row.map(function(record) {

            record.imagefiles = StringManipulate.RemoveQuotation(record.imagefiles);
            record.target_group = StringManipulate.RemoveQuotation(record.target_group);

            return record;

        });

        return newRow;

    }catch(error){
        console.log('Error in \'fetchJob() function\' in mysqlmodule.js');
        throw error;
    }

}


async function deletePost(id, post_type){

    let table;

    post_type === 'event_post' ? (table = 'event_post') : (table = 'job_post');


    try{

        await pool.execute(`DELETE FROM ${table} WHERE id = ${id}`);

    }catch(error){

    }


}

async function FetchMail(adminId){

    try{

        const [row] = await pool.execute(`SELECT * FROM mail_sent WHERE receiverID = ?`,[adminId]);
            
        if(row.length > 0){
            return row;
        }else{
            return null;
        }

    }catch(error){
        throw error;
    }
}

const MyDateTime = {
    Timenow: () => {
        const TheDateTime = new Date();
        const option = {
            timeZone: 'Asia/Manila',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }


        let timeString =  TheDateTime.toLocaleTimeString('en-US', option);

        return timeString;
    },

    Datenow: () => {
        const TheDateTime = new Date();
        
        let year = TheDateTime.getFullYear();
        let month = TheDateTime.getMonth() + 1;
        let day = TheDateTime.getDate();

        return `${year}-${month}-${day}`;
    }
}





// async function show(){
//     console.log(await get_userId('sample1000@gmail.com', '1234'));
// }

// show();

module.exports = {
    //user function exports
    get_userId,



    //admin function exports

    MyDateTime, // Object


    get_adminId, //gettig the adminId
    post_EventJob, //inserting the Event or Job data information to the database
    fetchEvent,
    fetchJob,
    job_post_edit,
    deletePost,
    FetchMail
};