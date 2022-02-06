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
 */
async function write_to_db(quote_objects) {
    let url = "mongodb://localhost:27017/";
    let MongoClient = mongodb.MongoClient;
    let connection = await MongoClient.connect(url);
    let db = connection.db("typinglite");

    for (let i_quote=0; i_quote<quote_objects.length; ++i_quote) {
        let quote = quote_objects[i_quote];
        // Check if there's one in the db already

        // Insert into db
    }

    connection.close();
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
            console.log(quote_objects);
            // Write to the database
            console.log("Writing " + quote_objects.length + " quotes to the database.");
            await write_to_db(quote_objects);
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