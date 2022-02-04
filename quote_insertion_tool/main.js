var fs = require('fs');
const { exit } = require('process');

function process_file(filename) {
    // Read file and parse to json array
    let data = fs.readFileSync(filename);
    let json_array = JSON.parse(data);

    // Process each quote in the file individually
    json_array.forEach((quote) => {
        // Run tests
        // .... (call previously defined function here)


        // If all tests passed, upload quote to the database



        console.log(quote);
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
    }
});