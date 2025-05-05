// Importing required modules
const bcrypt = require('bcrypt'); 

// mysql function asbstarcted queries
const { 
    clientuserLoginSession,
} = require('../../mysqlmodule.js');

exports.clientuser_login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await clientuserLoginSession(email, password);

        // if the email is not found return a 404 here and this will terminal the function executiong below
        if(!user) {
            return res.status(404).json({
                message: 'User not found with this email'
            });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            res.send({ status: true, id: user.id });
        } else {
            res.send({ status: false, id: null });
        }

        

    } catch (error) { 
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}