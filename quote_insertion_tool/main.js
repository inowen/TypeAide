import fs from 'fs';
import exit from 'process';
import Tester from './tester.js';

function process_file(filename) {
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
            console.log("\t\tTests succesful, attempting to upload.");
        }

        // If all tests passed, upload quote to the database
        if (failed == null) {
            // UPLOAD TO THE DATABASE
            
        }
    });
}


// Get the list of files from the command line arguments
let argv = process.argv;
if (argv.length <= 2) {
    console.error("You must pass in one or more file names.");
    exit(-1);
}
let files = argv;
files.shift(); files.shift();
files.forEach((filename) => {
    try {
        console.log("Processing " + filename);
        process_file(filename);
    }
    catch (exception) {
        console.error("Couldn't read file: " + filename);
        // debug
        console.log(exception);
    }
});