const { ORIENTATION } = require('./utils/contants');

const { in: inputOrientation } = ORIENTATION;

const directions = {
    north: {
        left: inputOrientation['W'],
        right: inputOrientation['E'],
        move: function () {
            this._y++;
        }
    },
    south: {
        left: inputOrientation['E'],
        right: inputOrientation['W'],
        move: function () {
            this._y--;
        }
    },
    east: {
        left: inputOrientation['N'],
        right: inputOrientation['S'],
        move: function () {
            this._x++;
        }
    },
    west: {
        left: inputOrientation['S'],
        right: inputOrientation['N'],
        move: function () {
            this._x--;
        }
    }
};

/**
 * Creates a single mars rover
 * @param orientation The orientation the rover is facing
 * @param x The x coordinate of the rover
 * @param y The y coordinate of the rover
 * @constructor
 */
class Rover {
    constructor(orientation, x, y) {
        this._orientation = orientation;
        this._x = x;
        this._y = y;
    }

    turnLeft() {
        this._orientation = directions[this._orientation].left;
    }

    turnRight() {
        this._orientation = directions[this._orientation].right;
    }

    move() {
        directions[this._orientation].move.call(this);
    }

    /**
     * Simulate a move in advance returning the projected position
     * @returns {{x, y}} for projected position
     */
    checkPosition() {
        const x = this._x;
        const y = this._y;
        directions[this._orientation].move.call(this);
        const projectedPosition = this.getPosition();
        this._x = x;
        this._y = y;
        return projectedPosition;
    }

    getOrientation() {
        return this._orientation;
    }

    getPosition() {
        return {
            x: this._x,
            y: this._y
        };
    }
}

module.exports = Rover;
