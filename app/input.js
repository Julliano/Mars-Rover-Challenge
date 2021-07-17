/** An interface that identifies text or command line input and transforms it into a format we expect */
const { readFile } = require('fs');
const { defer } = require('q');

/**
 * Process the input text file or command line and reject on error
 * @returns {*|promise}
 */
const getInput = () => {
    const deferred = defer();

    // If more than 3 args are given it will be treated as a command line arguments
    // Otherwise the input.txt file will be read to start the process
    if (process.argv.length > 2) {
        // Removing first 2 args (as it will always be node and index file) then merge all into one
        // Big string and split each by Rover as a delimiter creating the same input structure as if using txt file
        const args = process.argv.slice(2).join(' ').split(/(?=Rover)/g).join('\n');
        try {
            console.log(args);
            // processInput(args, deferred.resolve);
        } catch (error) {
            console.log('error processing command line inputs', error);
            deferred.reject();
        }
    } else {
        readFile('./input.txt', 'utf8', (error, data) => {
            if (error) {
                console.log(error);
                deferred.reject();
            } else {
                try {
                    console.log(data);
                    // processInput(data, deferred.resolve);
                } catch (error) {
                    console.log('error processing file input', error);
                    deferred.reject();
                }
            }
        });
    }

    return deferred.promise;
}

module.exports = {
    getInput
}
