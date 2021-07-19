const { loadInput } = require('./input');
const { ORIENTATION } = require('./utils/contants');

const { out: outputOrientation } = ORIENTATION;

const missionOutput = rovers => {
    let output = '';

    rovers.forEach((rover, index) => {
        const direction = rover.getOrientation();
        const { x, y } = rover.getPosition();
        output += `Rover${index+1}:${x} ${y} ${outputOrientation[direction]} \n`;
    });

    return output;
}

const startMission = async() => {
    const data = await loadInput();

    const { plateau, roverPlans } = data;
    const rovers = [];

    roverPlans.forEach(roverPlan => {
        try {
            const { rover, moves } = roverPlan;
            const roverId = plateau.addRover(rover);

            rovers.push(rover);

            moves.forEach(move => {
                plateau.executeDirections(roverId, move);
            });
        } catch (error) {
            rovers.pop();
            console.log(error);
        }
    });

    console.log(missionOutput(rovers));
}

startMission();
