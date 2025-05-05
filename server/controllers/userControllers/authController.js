// Importing required modules
const bcrypt = require('bcrypt'); 

// mysql function asbstarcted queries
const { 
    clientuserLoginSession,
} = require('../../mysqlmodule.js');

exports.clientuser_login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await clientuserLoginSession(email);

        // if the email is not found return a 404 here and this will terminal the function executiong below
        if(!user) {
            return res.status(401).json({
                message: 'User not found with this email'
            });
        }

        const isPasswordValid = await bcrypt.hash(password, user.password);

        if (!isPasswordValid) {
            // invalid password
            res.send({ status: true, IdLogSession: null });
        } else {
            // valid passsword 
            res.send({ status: false, IdLogSession: user.id});
        }

    } catch (error) { 
        console.error(error);
        console.log(user);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}