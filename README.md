# Mars Rover Challenge

### How to run
Before being able to run start the mission you need to jump into the root folder and run `npm i` to install all packages related.
After that a simple `npm start` will start the mission.
Please check `INPUT` section to understand how inputs will be processed.

## Timeline
- 20 min structuring the project (thinking about libraries and folder structure)
- 60 min to standarize inputs types
- 250 min create all logic (plateau, rover, moves, output)
- 140 min creating all tests
- 20 min adding README description

### The Problem
A squad of robotic rovers are to be landed by NASA on a plateau on Mars.

This plateau, which is curiously rectangular, must be navigated by the rovers so that their on board cameras can get a complete view of the surrounding terrain to send back to Earth.

A rover's position is represented by a combination of an x and y co-ordinates and a letter representing one of the four cardinal compass points. The plateau is divided up into a grid to simplify navigation. An example position might be 0, 0, N, which means the rover is in the bottom left corner and facing North.

In order to control a rover, NASA sends a simple string of letters. The possible letters are 'L', 'R' and 'M'. 'L' and 'R' makes the rover spin 90 degrees left or right respectively, without moving from its current spot.

'M' means move forward one grid point, and maintain the same heading.

Assume that the square directly North from (x, y) is (x, y+1).

Input:

Configuration Input: The first line of input is the upper-right coordinates of the plateau, the lower-left coordinates are assumed to be 0,0.

Per Rover Input:

Input 1: Landing co-ordinates for the named Rover. The position is made up of two integers and a letter separated by spaces, corresponding to the x and y co-ordinates and the rover's orientation.

Input 2: Navigation instructions for the named rover. i.e a string containing ('L', 'R', 'M').

Test Input:
```
Plateau:5 5
Rover1 Landing:1 2 N
Rover1 Instructions:LMLMLMLMM
Rover2 Landing:3 3 E
Rover2 Instructions:MMRMMRMRRM
```

Expected Output:
```
Rover1:1 3 N
Rover2:5 1 E
```
Task:

Develop a command line app that can take the various inputs from the command line and generate the desired outputs. The application must accept a sequence of inputs from the command line or a file.
See `input.txt` in this repo for a sample test input.

## Input
### From file:
`npm start` (will load the 'input.txt' file as standart, the file can be updated to test different inputs)
```
Output expected:
Rover1:1 3 N
Rover2:5 1 E

```

### From Command line:
`npm start Plateau:5 5 Rover1 Landing:1 2 N Rover1 Instructions:LMLMLMLMM Rover2 Landing:3 3 E Rover2 Instructions:MMRMMRMRRM`
```
Output expected:
Rover1:1 3 N
Rover2:5 1 E
```

## Assumptions
```
# Nodejs
    I decided to use node as language to develop this code problem as is the one I'm more familiar at the moment after working
    with javascript for more than 6 years now and being a backend (NodeJs) engineer for the past 1,5 almost 2.

# Jasmine-node
    I choose to use jasmine as I already use it on my daily-bases routine and I know that it would handle the challange easily.
```

## My approach
I decided to go with objects and interfaces for this solution. I thought it would be easier to keep the track of every rover / plateau doing like this.

### Interfaces
I've choosen to create one interface to setup every section input/output, moving and directions.

### Objects
 - Plateau object keep the track of all borders and all rovers placed on it. It will controll and validated any missplacement rovers or any invalid move of a rover due to a possible       collision or to a coordinate out of the plateau.
 - Rover object knows about it own orientation and position (coordinates). It will update the current position or orientation from requests of the Tableau on which it's located. It also
 has a function to check if a position is valid in advance avoinding any colision or moving to ousite of Plateau's borders

### Output
If all inputs are valid the output will contain all rovers / positions / orientation on it, if any rover in the input has a invalid plan this rover will be removed from the final results.
If the input is invalid at all the mission will not run and will throw an error.
