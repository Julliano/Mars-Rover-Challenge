const { readFile } = require('fs');
const { _inputParser, _removePrefix, _parseArgs } = require('../app/input');
const Plateau = require('../app/plateau');
const Rover = require('../app/rover');

describe('input', () => {
    const expectedSetup = {
        plateau: new Plateau(5, 5),
        roverPlans: [
            {
                rover: new Rover('north', 1, 2),
                moves: [
                    'left', 'move', 'left', 'move', 'left', 'move', 'left', 'move',
                    'move'
                ]
            }, {
                rover: new Rover('east', 3, 3),
                moves: [
                    'move', 'move', 'right', 'move', 'move', 'right', 'move', 'right',
                    'right', 'move'
                ]
            }
        ]
    };

    it('should parse args from command line returning expected format', () => {
        const expectedParsedArgs = 'Plateau:5 5 \nRover1 Landing:1 2 N \nRover1 Instructions:LMLMLMLMM \nRover2 Landing:3 3 E \nRover2 Instructions:MMRMMRMRRM';
        const commandLine = 'npm start Plateau:5 5 Rover1 Landing:1 2 N Rover1 Instructions:LMLMLMLMM Rover2 Landing:3 3 E Rover2 Instructions:MMRMMRMRRM'.split(' ');

        const parsedArgs = _parseArgs(commandLine);
        expect(parsedArgs).toEqual(expectedParsedArgs);
    });

    it('should remove all unused prefix from the initial input', () => {
        const commandLine = 'npm start Plateau:5 5 Rover1 Landing:1 2 N Rover1 Instructions:LMLMLMLMM Rover2 Landing:3 3 E Rover2 Instructions:MMRMMRMRRM'.split(' ');
        const parsedArgs = _parseArgs(commandLine);
        const result = '5 5 \n1 2 N \nLMLMLMLMM \n3 3 E \nMMRMMRMRRM';

        const expectedNoPrefix = _removePrefix(parsedArgs);
        expect(result).toEqual(expectedNoPrefix)
    });

    it('should parse input from command line', () => {
        const commandLine = 'npm start Plateau:5 5 Rover1 Landing:1 2 N Rover1 Instructions:LMLMLMLMM Rover2 Landing:3 3 E Rover2 Instructions:MMRMMRMRRM'.split(' ');
        const parsedArgs = _parseArgs(commandLine);

        const result = _inputParser(_removePrefix(parsedArgs));
        expect(result).toEqual(expectedSetup);
    });

    it('should parse input from a given file', (done) => {
        const filePath = './input.txt';

        readFile(filePath, 'utf8', (_, data) => {
            const result = _inputParser(_removePrefix(data));

            expect(result).toEqual(expectedSetup);

            done();
        });
    });

    it('should rejects when invalid inputs are given', () => {
        const input = 'this should not work';
        const error = new Error('Plateau not valid, please fix the input data.');

        expect(() => _inputParser(input)).toThrow(error);
    });
});