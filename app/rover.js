const { DIRECTIONS } = require('./utils/contants');

const { in: inputDirections } = DIRECTIONS;

const directions = {
    north: {
        left: inputDirections['W'],
        right: inputDirections['E'],
        move: function () {
            this._y++;
        }
    },
    south: {
        left: inputDirections['E'],
        right: inputDirections['W'],
        move: function () {
            this._y--;
        }
    },
    east: {
        left: inputDirections['N'],
        right: inputDirections['S'],
        move: function () {
            this._x++;
        }
    },
    west: {
        left: inputDirections['S'],
        right: inputDirections['N'],
        move: function () {
            this._x--;
        }
    }
};

/**
 * Creates a single mars rover
 * @param direction The direction object the rover is facing
 * @param x The x coordinate of the rover
 * @param y The y coordinate of the rover
 * @constructor
 */
class Rover {
    constructor(direction, x, y) {
        this._direction = direction;
        this._x = x;
        this._y = y;
    }

    turnLeft() {
        this._direction = directions[this._direction].left;
    }

    turnRight() {
        this._direction = directions[this._direction].right;
    }

    move() {
        directions[this._direction].move.call(this);
    }

    /**
     * Simulate a move in advance returning the projected position
     * @returns {{x, y}}
     */
    checkPosition() {
        const x = this._x;
        const y = this._y;
        directions[this._direction].move.call(this);
        const projectedPosition = this.getPosition();
        this._x = x;
        this._y = y;
        return projectedPosition;
    }

    getDirection() {
        return this._direction;
    }

    getPosition() {
        return {
            x: this._x,
            y: this._y
        };
    }
}

module.exports = Rover;
