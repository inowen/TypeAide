import fs from 'fs';
import exit from 'process';
import Tester from './tester.js';
import crypto from 'crypto';
import mongodb from 'mongodb'

/**
 * Returns an array of quote objects to write to the database
 */
function process_file(filename) {
    let res_quotes = [];

    // Read file and parse to json array
    let data = fs.readFileSync(filename);
    let json_array = JSON.parse(data);

    // Process each quote in the file individually
    json_array.forEach((quote) => {
        console.log("\tChecking quote: " + quote); 

        // Run tests
        let tester = new Tester();
        let failed = tester.whichTestFails(quote);
        if (failed != null) {
            console.log("\t\tFailed test: " + failed);
        }
        else {
            console.log("\t\tTests succesful, adding to upload list.");
            let hash = crypto.createHash('md5').update(quote).digest('hex');
            res_quotes.push({text:quote, length:(quote.length), _id:hash});
        }
    });
    return res_quotes;
}

/**
 * Write an array of quote objects to the database
 * @returns Number of quotes that were inserted
 */
async function write_to_db(quote_objects) {
    let url = "mongodb://localhost:27017/";
    let MongoClient = mongodb.MongoClient;
    let connection = await MongoClient.connect(url);
    let db = connection.db("typinglite");
    let insert_counter = 0;

    for (let i_quote=0; i_quote<quote_objects.length; ++i_quote) {
        let quote = quote_objects[i_quote];
        let found = await db.collection("quotes").findOne({_id:quote._id});
        if (found == null) {
            await db.collection("quotes").insertOne(quote);
            insert_counter += 1;
        }
    }
    connection.close();
    return insert_counter;
}


async function main() {
    // Get the list of files from the command line arguments
    let argv = process.argv;
    if (argv.length <= 2) {
        console.error("You must pass in one or more file names.");
        exit(-1);
    }
    let files = argv;
    files.shift(); files.shift();
    for (let i=0; i<files.length; ++i) {
        let filename = files[i];
        try {
            console.log("Processing " + filename);
            let quote_objects = process_file(filename);
            // Write to the database
            console.log("Attempting to write " + quote_objects.length + " quotes to the database.");
            let num_inserted = await write_to_db(quote_objects);
            console.log("Inserted " + num_inserted + " texts (the rest were duplicates).");
        }
        catch (exception) {
            console.error("Couldn't read file: " + filename);
            // debug
            console.log(exception);
        }
        console.log("");
    }
}

await main();