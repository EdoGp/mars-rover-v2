// Rover Object Goes Here
// ======================
let rover = {
	direction: 'S',
	position: {
		x: 0,
		y: 0,
	},
	travelLog: [],
};

// ======================

let grid = [
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
];

const directionOrder = ['N', 'E', 'S', 'W'];

function turnLeft(rover) {
	rover.direction =
		directionOrder[(directionOrder.indexOf(rover.direction) + 3) % 4];
	console.log(`Rover is now facing ${rover.direction}`);
}

function turnRight(rover) {
	rover.direction =
		directionOrder[(directionOrder.indexOf(rover.direction) + 1) % 4];
	console.log(`Rover is now facing ${rover.direction}`);
}

function moveForward(rover) {
	switch (rover.direction) {
		case 'N':
			if (validPosition(rover.position.x, rover.position.y - 1)) {
				grid[rover.position.x][rover.position.y] = null;
				rover.position.y--;
				rover.travelLog.push([rover.position.x, rover.position.y + 1]);
				grid[rover.position.x][rover.position.y] = rover;
			} else {
				console.log('The position the rover is trying to move is invalid!');
			}
			break;
		case 'S':
			if (validPosition(rover.position.x, rover.position.y + 1)) {
				grid[rover.position.x][rover.position.y] = null;
				rover.position.y++;
				rover.travelLog.push([rover.position.x, rover.position.y - 1]);
				grid[rover.position.x][rover.position.y] = rover;
			} else {
				console.log('The position the rover is trying to move is invalid!');
			}
			break;
		case 'E':
			if (validPosition(rover.position.x + 1, rover.position.y)) {
				grid[rover.position.x][rover.position.y] = null;
				rover.position.x++;
				rover.travelLog.push([rover.position.x - 1, rover.position.y]);
				grid[rover.position.x][rover.position.y] = rover;
			} else {
				console.log('The position the rover is trying to move is invalid!');
			}
			break;
		case 'W':
			if (validPosition(rover.position.x - 1, rover.position.y)) {
				grid[rover.position.x][rover.position.y] = null;
				rover.position.x--;
				rover.travelLog.push([rover.position.x + 1, rover.position.y]);
				grid[rover.position.x][rover.position.y] = rover;
			} else {
				console.log('The position the rover is trying to move is invalid!');
			}
			break;
	}
	console.log(
		`The rover is now in position [${rover.position.x}][${rover.position.y}]`,
	);
	console.log('moveForward was called');
}

function moveBackwards(rover) {
	switch (rover.direction) {
		case 'N':
			if (validPosition(rover.position.x, rover.position.y + 1)) {
				grid[rover.position.x][rover.position.y] = null;
				rover.position.y++;
				rover.travelLog.push([rover.position.x, rover.position.y - 1]);
				grid[rover.position.x][rover.position.y] = rover;
			} else {
				console.log('The position the rover is trying to move is invalid!');
			}
			break;
		case 'S':
			if (validPosition(rover.position.x, rover.position.y - 1)) {
				grid[rover.position.x][rover.position.y] = null;
				rover.position.y--;
				rover.travelLog.push([rover.position.x, rover.position.y + 1]);
				grid[rover.position.x][rover.position.y] = rover;
			} else {
				console.log('The position the rover is trying to move is invalid!');
			}
			break;
		case 'E':
			if (validPosition(rover.position.x, rover.position.x - 1)) {
				grid[rover.position.x][rover.position.y] = null;
				rover.position.x--;
				rover.travelLog.push([rover.position.x + 1, rover.position.y]);
				grid[rover.position.x][rover.position.y] = rover;
			} else {
				console.log('The position the rover is trying to move is invalid!');
			}
			break;
		case 'W':
			if (validPosition(rover.position.x, rover.position.x + 1)) {
				grid[rover.position.x][rover.position.y] = null;
				rover.position.x++;
				rover.travelLog.push([rover.position.x - 1, rover.position.y]);
				grid[rover.position.x][rover.position.y] = rover;
			} else {
				console.log('The position the rover is trying to move is invalid!');
			}
			break;
	}
	console.log(
		`The rover is now in position [${rover.position.x}][${rover.position.y}]`,
	);
	console.log('moveBackwards was called');
}

function validPosition(x, y) {
	if (x < 0 || x > 10 || y < 0 || y > 10) {
		console.log(`Rover cannot move there, position [${x}][${y}] is off grid.`);
		return false;
	} else if (grid[x][y] != null) {
		console.log(
			`Rover cannot go there, position [${x}][${y}] is taken by a ${
				grid[x][y]
			}`,
		);
		return false;
	} else if (grid[x][y] != 'Rock' && grid[x][y] != null) {
		console.log(`Position [${x}][${y}] is taken by a rover`);
		console.log('There is a rover in the way, Stop!');
		return false;
	}
	return true;
}

function moveString(rover, commands) {
	for (let i = 0; i < commands.length; i++) {
		switch (commands[i]) {
			case 'r':
				turnRight(rover);
				break;
			case 'l':
				turnLeft(rover);
				break;
			case 'f':
				moveForward(rover);
				break;
			case 'b':
				moveBackwards(rover);
				break;
			default:
				console.log(`'${commands[i]}' is not a valid command`);
				break;
		}
	}
	console.log(`Rover travel history:`);
	for (let i = 0; i < rover.travelLog.length; i++) {
		console.log(`[${rover.travelLog[i][0]}],[${rover.travelLog[i][1]}]`);
	}
}

console.log(`------------------------------------------`);
console.log('            Mars Rover Kata');
console.log(`Type moveString(rover, 'STRING') and pass
rover and a string as parameters to
the function to start moving the rover`);
console.log(`------------------------------------------`);
