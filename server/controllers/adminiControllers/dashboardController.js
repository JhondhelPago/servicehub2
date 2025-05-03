// Required modules
const fs = require('fs');
const path = require('path');
const os = require('os');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// mysql funtions abstracted queries
const {
    dashboardQuery,
    filteredDashboardQuery,
} = require('../../mysqlmodule.js');

// utility class
const {
    Dashboard
} = require('../../utilities.js');

exports.getDashboardData = async (req, res) => {
    try {

        const userAllData = await dashboardQuery();

        let myDashboard = new Dashboard(userAllData);;

        res.send(
            myDashboard.ProcessedSelfInfo()
        );

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.getDashboardCity = async (req, res) => {
    try {

        const city = req.params.city;
        console.log(city);

        const userAllData = await filteredDashboardQuery(city);

        let myDashboard = new Dashboard(userAllData);

        res.send(
            myDashboard.ProcessedSelfInfo()
        );

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}


exports.downloadDashboardData = async (req, res) => {
    try {

        const userAllDat = await dashboardQuery();

        if (!userAllData || userAllData.length === 0) {
            return res.status(404).json({ message: 'No data found for the selected city.' });
        }

        const csvWriter = createCsvWriter({
            path: 'data.csv',
            header: Object.keys(userAllDat[0]).map((key) => ({ id: key, title: key }))
        });

        await csvWriter.writeRecords(userAllDat);
        const filePath = path.join(__dirname, 'data.csv');
        
        res.download(filePath, 'data.csv', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error downloading file');
            } else {
                // Optionally, delete the file after download
                fs.unlink(filePath, (err) => {
                    if (err) console.error(err);
                });
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.downloadDashboardCity = async (req, res) => {
    try {
        const city = req.params.city;

        const userAllData = await filteredDashboardQuery(city);

        if (!userAllData || userAllData.length === 0) {
            return res.status(404).json({ message: 'No data found for the selected city.' });
        }

        // Use OS temp directory
        const filePath = path.join(os.tmpdir(), `dashboard_data_${Date.now()}.csv`);

        const csvWriter = createCsvWriter({
            path: filePath,
            header: Object.keys(userAllData[0]).map((key) => ({ id: key, title: key }))
        });

        await csvWriter.writeRecords(userAllData);

        res.download(filePath, 'data.csv', (err) => {
            if (err) {
                console.error('Download error:', err);
                res.status(500).send('Error downloading file');
            } else {
                fs.unlink(filePath, (err) => {
                    if (err) console.error('Cleanup error:', err);
                });
            }
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}