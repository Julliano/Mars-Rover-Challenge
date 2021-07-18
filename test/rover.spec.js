const Rover = require('../app/rover');

describe('Rover', () => {
    it('should create the rover with correct values', () => {
        const rover = new Rover('north', 1, 2);

        expect(rover.getOrientation()).toEqual('north');
        expect(rover.getPosition()).toEqual({ x: 1, y: 2 });
    });

    it('should turn the rover correctly', () => {
        const rover = new Rover('north', 1, 2);

        rover.turnRight();
        expect(rover.getOrientation()).toEqual('east');
        expect(rover.getPosition()).toEqual({ x: 1, y: 2 });

        rover.turnLeft();
        expect(rover.getOrientation()).toEqual('north');
        expect(rover.getPosition()).toEqual({ x: 1, y: 2 });
    });

    it('should move forward in the correct direction', () => {
        const rover = new Rover('south', 1, 2);

        rover.move();
        expect(rover.getPosition()).toEqual({ x: 1, y: 1 });

        rover.turnRight();
        rover.move();
        expect(rover.getOrientation()).toEqual('west');
        expect(rover.getPosition()).toEqual({ x: 0, y: 1 });
    });

    it('should project a valid move position without actually moving the rover', () => {
        const rover = new Rover('east', 1, 2);

        expect(rover.checkPosition()).toEqual({ x: 2, y: 2 });
        expect(rover.getPosition()).toEqual({ x: 1, y: 2 });
    });
});