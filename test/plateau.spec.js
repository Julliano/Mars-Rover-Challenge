const Plateau = require('../app/plateau');
const Rover = require('../app/rover');

describe('Plateau', function () {
    it('should create a plateau correctly', () => {
        const plateau = new Plateau(1, 2);

        expect(plateau._x).toEqual(1);
        expect(plateau._y).toEqual(2);
    });

    it('should adds a rover in a valid position', () => {
        const plateau = new Plateau(4, 4);
        const rover = new Rover('west', 2, 2);
        const roverId = plateau.addRover(rover);

        expect(plateau._rovers[roverId]).toEqual(rover);
    });

     it('should reject a rover placed in a invalid position', () => {
        const plateau = new Plateau(3, 3);
        const rover = new Rover('north', 5, 5);
        const error = Error('The placing position is not valid in the plateou');

        expect(() => plateau.addRover(rover)).toThrow(error);
    });

    it('should validate a valid posistion', () => {
        const plateau = new Plateau(2, 2);

        expect(plateau._isValidPosition(2, 2)).toEqual(true);
    });

    it('should invalidate a position if colliding with another rover', () => {
        const plateau = new Plateau(2, 2);
        const rover = new Rover('east', 1, 1);

        plateau.addRover(rover);
        expect(plateau._isValidPosition(1, 1)).toEqual(false);
    });

    it('should invalidate any position given if outside plateau`s boundaries', () => {
        const plateau = new Plateau(2, 2);

        expect(plateau._isValidPosition(3, 2)).toEqual(false);
        expect(plateau._isValidPosition(2, 3)).toEqual(false);
    });

    it('should move the rover to a valid position', () => {
        const plateau = new Plateau(3, 3);
        const rover = new Rover('north', 1, 1);
        const roverId = plateau.addRover(rover);

        plateau.executeDirections(roverId, 'move');
        expect(plateau._rovers[roverId].getPosition().y).toEqual(2);
    });

    it('should turn move the rover to a valid position', () => {
        const plateau = new Plateau(3, 3);
        const rover = new Rover('north', 1, 1);
        const roverId = plateau.addRover(rover);

        plateau.executeDirections(roverId, 'right');
        plateau.executeDirections(roverId, 'move');
        plateau.executeDirections(roverId, 'move');

        expect(plateau._rovers[roverId].getPosition().y).toEqual(1);
        expect(plateau._rovers[roverId].getPosition().x).toEqual(3);

        plateau.executeDirections(roverId, 'left');
        plateau.executeDirections(roverId, 'left');
        plateau.executeDirections(roverId, 'left');
        plateau.executeDirections(roverId, 'move');

        expect(plateau._rovers[roverId].getPosition().y).toEqual(0);
        expect(plateau._rovers[roverId].getPosition().x).toEqual(3);
    });

    it('should reject a colliding move', () => {
        const error = Error('The moving action requested is to a invalid position');
        const plateau = new Plateau(3, 3);
        const rover = new Rover('north', 1, 2);
        plateau.addRover(rover);

        const roverId = plateau.addRover(new Rover('west', 2, 2));

        expect(() => plateau.executeDirections(roverId, 'move')).toThrow(error);
    });

    it('should reject a move that goes off the plateau', () => {
        const error = Error('The moving action requested is to a invalid position');
        const plateau = new Plateau(3, 3);
        const roverId = plateau.addRover(new Rover('north', 3, 3));

        expect(() => plateau.executeDirections(roverId, 'move')).toThrow(error);
    });
});