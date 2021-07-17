const { getInput } = require('./input');
const { DIRECTIONS } = require('./utils/contants');

const { out: outputDirections } = DIRECTIONS;

const finalOutput = rovers => {
    let output = '';

    rovers.map((rover, index) => {
        const direction = rover.getDirection();
        const position = rover.getPosition();
        output += `Rover${index+1}:${position.x} ${position.y} ${outputDirections[direction]} \n`;
    });

    return output;
}

getInput().then(data => {
    const map = data.map;
    const roverPlans = data.roverPlans;
    const rovers = [];

    roverPlans.forEach(roverPlan => {
        try {
            const rover = roverPlan.rover;
            const moves = roverPlan.moves;
            rovers.push(rover);

            const roverId = map.addRover(rover);

            moves.forEach(function (move) {
                map.moveRover(roverId, move);
            });

        } catch (error) {
            rovers.pop();
            console.log(error);
        }
    });

    console.log(finalOutput(rovers));
});
