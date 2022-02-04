import extra_spaces from './tests/extra_spaces.js';

class Tester {
    constructor() {
        this.tests = [];
        // Register the tests
        this.tests.push(extra_spaces);
    }

    /**
     * Name of the test that fails for this quote, or null if none fails.
     */
    whichTestFails(quote) {
        let failed_test = null;
        this.tests.forEach(test => {
            console.log("Result: " + test(quote));
            if ( !test(quote) ) {
                failed_test = test.name;
            }
        });
        return failed_test;
    }
};

export default Tester;