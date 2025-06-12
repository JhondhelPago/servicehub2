// Required modules
const fs = require('fs');
const path = require('path');
const os = require('os');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { createObjectCsvStringifier } = require('csv-writer');
const { Readable } = require('stream');
// mysql functions abstracted queries
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

        console.log("getDashboardData called");

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

        const city = req.query.city;
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

        console.log("downloadDashboardData called");

        const userAllData = await dashboardQuery();
        if (!userAllData || userAllData.length === 0) {
            return res.status(404).json({ message: 'No data found for the selected city.' });
        }

        const csvStringifier = createObjectCsvStringifier({
            header: Object.keys(userAllData[0]).map(key => ({ id: key, title: key }))
        });

        const csvHeader = csvStringifier.getHeaderString();
        const csvBody = csvStringifier.stringifyRecords(userAllData);
        const csvData = csvHeader + csvBody;

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');
        res.status(200).send(csvData);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.downloadDashboardCity = async (req, res) => {
    try {
        const city = req.query.city;
        console.log("downloadDashboardCity called for city:", city);

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