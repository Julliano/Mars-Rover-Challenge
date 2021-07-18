const { startMission } = require('./input');
const { ORIENTATION } = require('./utils/contants');

const { out: outputOrientation } = ORIENTATION;

const finalOutput = rovers => {
    let output = '';

    rovers.forEach((rover, index) => {
        const direction = rover.getOrientation();
        const { x, y } = rover.getPosition();
        output += `Rover${index+1}:${x} ${y} ${outputOrientation[direction]} \n`;
    });

    return output;
}

startMission().then(data => {
    const { plateau, roverPlans } = data;
    const rovers = [];

    roverPlans.forEach(roverPlan => {
        try {
            const { rover, moves } = roverPlan;
            rovers.push(rover);

            const roverId = plateau.addRover(rover);

            moves.forEach(move => {
                plateau.executeDirections(roverId, move);
            });

        } catch (error) {
            rovers.pop();
            console.log(error);
        }
    });

    console.log(finalOutput(rovers));
});
