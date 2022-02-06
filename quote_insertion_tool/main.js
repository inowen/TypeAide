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
        console.log("\tQuote: " + quote.substring(0,50) + (quote.length>50 ? "..." : "")); 

        // Run tests
        let tester = new Tester();
        let failed = tester.whichTestFails(quote);
        if (failed != null) {
            console.log("\t \\_Failed test: " + failed);
        }
        else {
            console.log("\t \\_Passes all tests.");
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
    // Counters for report 
    let num_total_quotes = 0;
    let num_total_passed = 0;
    let num_total_inserted = 0;
    let num_total_duplicates = 0;

    let files = argv;
    files.shift(); files.shift();
    console.log("-------- PROCESSING YOUR FILES --------");
    for (let i=0; i<files.length; ++i) {
        let filename = files[i];
        try {
            console.log("*** FILE: " + filename);
            let quote_objects = process_file(filename);
            // Write to the database
            console.log("Attempting to write " + quote_objects.length + " quotes to the database.");
            let num_inserted = await write_to_db(quote_objects);
            console.log("Inserted " + num_inserted + " texts (the rest were duplicates).");
            // Accounting
            num_total_passed += quote_objects.length;
            num_total_inserted += num_inserted;
            num_total_duplicates += quote_objects.length - num_inserted;
            // Read in file (again) to count how many quotes there were to begin with
            // (quickest way to do this, not the most efficient)
            num_total_quotes += JSON.parse(fs.readFileSync(filename)).length;
        }
        catch (exception) {
            console.error("Couldn't read file: " + filename);
        }
        console.log("");
    }

    console.log(" -------- SUMMARY -------- ");
    console.log("Failed tests: " + (num_total_quotes-num_total_passed) + "/" + num_total_quotes)
    console.log("Quotes inserted: " + num_total_inserted + "/" + num_total_quotes);
    console.log("Duplicates: " + num_total_duplicates + "/" + num_total_quotes);
}

await main();