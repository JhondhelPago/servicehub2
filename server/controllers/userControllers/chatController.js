const {
    NewFetchInboxClient: FetchInboxClient // the source function should be refactor for fetching names
} = require('../../mysqlmodule.js');


exports.FetchInboxClient = async (req, res) => {
    try {
        
        const clientId = req.query.clientuserId;

        let adminIdArray = [];
        let adminUsernameArray = [];

        const clientInboxArray = await FetchInboxClient(clientId);

        clientInboxArray.forEach((mailObj) => {
            
            if(!adminIdArray.includes(mailObj.receiverID)){
                adminIdArray.push(mailObj.receiverID);
                adminUsernameArray.push(mailObj.username);
            }

        });

        const id_username  = adminIdArray.map((id, index) => ({
            id: id,
            username: adminUsernameArray[index]
        }));

        res.send(id_username);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}