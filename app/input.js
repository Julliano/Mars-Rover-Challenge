const { readFile } = require('fs');
const Plateau = require('./plateau');
const Rover = require('./rover');
const { ORIENTATION, MOVES } = require('./utils/contants');

const { in: inputOrientation } = ORIENTATION;
const { in: inputMovements } = MOVES;

// Removing first 2 args (as it will always be node and index.js file) then merge all into one
// Big string and split each by Rover as a delimiter creating the same input structure as if using .txt file
const parseArgs = args => args.slice(2).join(' ').split(/(?=Rover)/g).join('\n')

// Logic to remove prefix before the commands itself as they follow a standart
const removePrefix = commands => commands.split('\n').map(line => line.split(":").pop()).join('\n');

/**
 * Process the input text file or command line and reject on error
 * @returns {*|promise}
 */
const startMission = () => {
    return new Promise((resolve, reject) => {
        if (process.argv.length > 2) {
            try {
                const args = parseArgs(process.argv);

                resolve(inputParser(removePrefix(args)));
            } catch (error) {
                console.log('Error processing command line inputs', error);
                reject(error);
            }
        } else {
            readFile('./input.txt', 'utf8', (error, data) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    try {
                        resolve(inputParser(removePrefix(data)));
                    } catch (error) {
                        console.log('Error processing file input', error);
                        reject(error);
                    }
                }
            });
        }
    });
}

/**
 * Turn initial input (by file or command line) into a set of rovers and a plateau
 * @param data The input string
 */
const inputParser = data => {
    const lines = data.trim().split('\n');
    const plateauBounds = establishBounds(lines.shift());
    const roverPlans = [];

    while (lines.length > 0) {
        roverPlans.push({
            rover: createRovers(lines.shift()),
            moves: setupMoves(lines.shift())
        });
    }

    return {
        plateau: plateauBounds,
        roverPlans: roverPlans
    };
}

const establishBounds = plateauLine => {
    const [ widthLimit, heightLimit ] = plateauLine.split(' ');
    const width = parseInt(widthLimit, 10);
    const height = parseInt(heightLimit, 10);

    if (isNaN(width) || isNaN(height)) {
        throw new Error('Plateau not valid, please fix the input data.')
    }

    return new Plateau(width, height);
}

const createRovers = roverLine => {
    const [ xAxis, yAxis, initOrientation ] = roverLine.trim().split(' ');
    const x = parseInt(xAxis, 10);
    const y = parseInt(yAxis, 10);
    const orientation = inputOrientation[initOrientation];

    if (isNaN(x) || isNaN(y) || typeof orientation === 'undefined') {
       throw new Error('Rover definition not valid, please fix the input data');
    }

    return new Rover(orientation, x, y);
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

module.exports = {
    startMission,
    _inputParser: inputParser,
    _removePrefix: removePrefix,
    _parseArgs: parseArgs
};
