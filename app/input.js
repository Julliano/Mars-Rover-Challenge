const { readFile } = require('fs');
const { defer } = require('q');

const Plateau = require('./plateau');
const Rover = require('./rover');
const { DIRECTIONS, MOVES } = require('./utils/contants');

const { in: inputDirections } = DIRECTIONS;
const { in: inputMovements } = MOVES;

// Logic to remove prefix before the commands itself as they follow a standart
const removePrefix = commands => commands.split('\n').map(line => line.split(":").pop()).join('\n');

/**
 * Process the input text file or command line and reject on error
 * @returns {*|promise}
 */
const getInput = () => {
    const deferred = defer();

    // If more than 3 args are given it will be treated as a command line arguments
    // Otherwise the input.txt file will be read to start the process
    if (process.argv.length > 2) {
        try {
            // Removing first 2 args (as it will always be node and index.js file) then merge all into one
            // Big string and split each by Rover as a delimiter creating the same input structure as if using txt file
            const args = process.argv.slice(2).join(' ').split(/(?=Rover)/g).join('\n');
            deferred.resolve(inputParser(removePrefix(args)));
        } catch (error) {
            console.log('Error processing command line inputs', error);
            deferred.reject();
        }
    } else {
        readFile('./input.txt', 'utf8', (error, data) => {
            if (error) {
                console.log(error);
                deferred.reject();
            } else {
                try {
                    deferred.resolve(inputParser(removePrefix(data)));
                } catch (error) {
                    console.log('Error processing file input', error);
                    deferred.reject();
                }
            }
        });
    }

    return deferred.promise;
}

/**
 * Turn initial input (by file or command line) into a set of rovers and a map
 * @param data The input string
 */
const inputParser = data => {
    const lines = data.trim().split('\n');
    const map = setupPlateau(lines.shift());
    const roverPlans = [];

    while (lines.length > 0) {
        roverPlans.push({
            rover: setupRover(lines.shift()),
            moves: setupMoves(lines.shift())
        });
    }

    return {
        map: map,
        roverPlans: roverPlans
    };
}

const setupPlateau = plateauLine => {
    const [ widthLimit, heightLimit ] = plateauLine.split(' ');
    const width = parseInt(widthLimit, 10);
    const height = parseInt(heightLimit, 10);

    if (isNaN(width) || isNaN(height)) {
        throw new Error('Map not valid, please fix the input data.')
    }

    return new Plateau(width, height);
}

const setupRover = roverLine => {
    const [ xAxis, yAxis, initDirection ] = roverLine.trim().split(' ');
    const x = parseInt(xAxis, 10);
    const y = parseInt(yAxis, 10);
    const direction = inputDirections[initDirection];

    if (isNaN(x) || isNaN(y) || typeof direction === 'undefined') {
       throw new Error('Rover definition not valid, please fix the input data');
    }

    return new Rover(direction, x, y);
}

const setupMoves = movesLine => {
    return movesLine.trim().split('').map(move => {
        if (inputMovements[move]) {
           return inputMovements[move];
        } else {
           throw new Error('Movement not valid, please fix the input data');
        }
   });
}

module.exports = { getInput };
