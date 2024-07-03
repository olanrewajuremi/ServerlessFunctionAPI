const { MongoClient } = require("mongodb");

const uri = process.env.CosmosDBConnectionString;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Extract report details from the request body
    const report = req.body;

    // Validate the required fields
    if (!report || !report.title || !report.content || !report.author || !report.date) {
        context.res = {
            status: 400,
            body: "Please provide all necessary fields: title, content, author, date."
        };
        return;
    }

    try {
        // Connect to the MongoDB client
        await client.connect();
        const database = client.db('ReportsDatabase');
        const collection = database.collection('ReportsCollection');

        // Insert the report into the collection
        const result = await collection.insertOne(report);

        // Return a successful response with the created report
        context.res = {
            status: 201,
            body: result.ops[0]
        };
    } catch (error) {
        // Return an error response in case of failure
        context.res = {
            status: 500,
            body: `Error: ${error.message}`
        };
    } finally {
        // Close the MongoDB client
        await client.close();
    }
};
