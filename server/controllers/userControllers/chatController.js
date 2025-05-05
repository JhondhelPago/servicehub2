const {
    NewFetchInboxClient: FetchInboxClient // the source function should be refactor for fetching names
} = require('../../mysqlmodule.js');


exports.FetchInboxClient = async (req, res) => {
    try {
        
        const clientId = req.params.clientuserId;

        let adminIdArray = [];

        const clientInboxArray = await FetchInboxClient(clientId);

        clientInboxArray.forEach((mailObj) => {
            
            if(!adminIdArray.includes(mailObj.receiverID)){
                adminIdArray.push(mailObj.receiverID);
            }

        });

        res.send(adminIdArray)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}