const bcrypt = require('bcrypt');
const {
    get_adminId
} = require('../../mysqlmodule.js')

exports.login = async(req, res) => {
    try {
        // login logic here

        const { email, password, module } = req.body;
        const role = module;

        const User = await get_adminId(email, password, role);
      
        const isPasswordValid = await bcrypt.hash(password, User.password);
    
    
        if (isPasswordValid) {
            res.send({ status: true, id: User.id });
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