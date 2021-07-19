const { MOVES } = require('./utils/contants');

const { in: inputMoves } = MOVES;

/**
 * Creates a plateau and keeps track of the bounds of it as well as existing rovers
 * @param x The height of the rectangle
 * @param y The width of the rectangle
 * @constructor
 */
class Plateau {
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._rovers = {};
        this._roverId = 0;
    }

    addRover(rover) {
        const roverPosition = rover.getPosition();

        if (this.isValidPosition(roverPosition.x, roverPosition.y)) {
            const roverId = this._roverId++;
            this._rovers[roverId] = rover;
            return roverId;
        } else {
            throw new Error('The placing position is not valid in the plateou');
        }
    }

    /**
     * Checks a position against the boundaries of the plateau and other rovers position
     * @param x
     * @param y
     * @param roverId The current rover id
     * @returns {*|boolean}
     */
    isValidPosition(x, y, roverId) {
        return isOnPlateau(x, y, this._x, this._y) && !isColliding(x, y, this._rovers, roverId);
    }

    executeDirections(roverId, action) {
        const rover = this._rovers[roverId];

        if (action === inputMoves['L']) {
            rover.turnLeft();
        } else if (action === inputMoves['R']) {
            rover.turnRight();
        } else if (action === inputMoves['M']) {
            const projectedMove = rover.checkPosition();
            if (this.isValidPosition(projectedMove.x, projectedMove.y, roverId)) {
                rover.move();
            } else {
                throw new Error('The moving action requested is to a invalid position');
            }
        }
    }
}

const isOnPlateau = (x, y, width, height) => {
    return x >= 0 && y >= 0 && x <= width && y <= height;
}

const isColliding = (x, y, rovers, roverId) => {
    for (const rover in rovers) {
        if (rover !== roverId) {
            const roverPosition = rovers[rover].getPosition();

            if (x === roverPosition.x && y === roverPosition.y) {
                return true;
            }
        }
    }

    return false;
}

module.exports = Plateau;
