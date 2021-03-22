import { Directions } from './move_component';
import { SnakeSquareComponent } from './snake_sqaure_component';

export type square = number[];

export class SnakeComponent
{
    length: number;
    squareSize: number;
    squares: SnakeSquareComponent[] = [];
    direction: Directions = Directions.default;
    context: WebGL2RenderingContext;

    constructor(length: number, squareSize: number, context: WebGL2RenderingContext)
    {
        this.length = length;
        this.squareSize = squareSize;
        this.createParts();
        this.context = context;
    }

    moveDown(index: number)
    {
        const square = this.squares[index];
        const canvasHeight = this.context.canvas.height;
        square.coordinates[1] = square.coordinates[1] + this.squareSize;
        square.coordinates[3] = square.coordinates[3] + this.squareSize;
        square.coordinates[5] = square.coordinates[5] + this.squareSize;
        square.coordinates[7] = square.coordinates[7] + this.squareSize;
        square.coordinates[9] = square.coordinates[9] + this.squareSize;
        square.coordinates[11] = square.coordinates[11] + this.squareSize;
        if (square.coordinates[7] > canvasHeight) {
            square.coordinates[1] = square.coordinates[1] - canvasHeight;
            square.coordinates[3] = square.coordinates[3] - canvasHeight;
            square.coordinates[5] = square.coordinates[5] - canvasHeight;
            square.coordinates[7] = square.coordinates[7] - canvasHeight;
            square.coordinates[9] = square.coordinates[9] - canvasHeight;
            square.coordinates[11] = square.coordinates[11] - canvasHeight;
        }
        square.x = square.coordinates[0];
        square.y = square.coordinates[1];
        this.squares[index] = square;
    }

    moveUp(index: number)
    {
        const square = this.squares[index];
        const canvasHeight = this.context.canvas.height;
        square.coordinates[1] = square.coordinates[1] - this.squareSize;
        square.coordinates[3] = square.coordinates[3] - this.squareSize;
        square.coordinates[5] = square.coordinates[5] - this.squareSize;
        square.coordinates[7] = square.coordinates[7] - this.squareSize;
        square.coordinates[9] = square.coordinates[9] - this.squareSize;
        square.coordinates[11] = square.coordinates[11] - this.squareSize;
        if (square.coordinates[1] < 0) {
            square.coordinates[1] = canvasHeight - square.coordinates[1];
            square.coordinates[3] = canvasHeight - square.coordinates[3];
            square.coordinates[5] = canvasHeight - square.coordinates[5];
            square.coordinates[7] = canvasHeight - square.coordinates[7];
            square.coordinates[9] = canvasHeight - square.coordinates[9];
            square.coordinates[11] = canvasHeight - square.coordinates[11];
        }
        square.x = square.coordinates[0];
        square.y = square.coordinates[1];
        this.squares[index] = square;
    }

    moveRight(index: number)
    {
        const square = this.squares[index];
        const canvasWidth = this.context.canvas.width;
        square.coordinates[0] = square.coordinates[0] + this.squareSize;
        square.coordinates[2] = square.coordinates[2] + this.squareSize;
        square.coordinates[4] = square.coordinates[4] + this.squareSize;
        square.coordinates[6] = square.coordinates[6] + this.squareSize;
        square.coordinates[8] = square.coordinates[8] + this.squareSize;
        square.coordinates[10] = square.coordinates[10] + this.squareSize;
        if (square.coordinates[8] > canvasWidth) {
            square.coordinates[0] = square.coordinates[0] - canvasWidth;
            square.coordinates[2] = square.coordinates[2] - canvasWidth;
            square.coordinates[4] = square.coordinates[4] - canvasWidth;
            square.coordinates[6] = square.coordinates[6] - canvasWidth;
            square.coordinates[8] = square.coordinates[8] - canvasWidth;
            square.coordinates[10] = square.coordinates[10] - canvasWidth;
        }
        square.x = square.coordinates[0];
        square.y = square.coordinates[1];
        this.squares[index] = square;
    }

    moveLeft(index: number)
    {
        const square = this.squares[index];
        const canvasWidth = this.context.canvas.width;
\
        square.coordinates[0] = square.coordinates[0] - this.squareSize;
        square.coordinates[2] = square.coordinates[2] - this.squareSize;
        square.coordinates[4] = square.coordinates[4] - this.squareSize;
        square.coordinates[6] = square.coordinates[6] - this.squareSize;
        square.coordinates[8] = square.coordinates[8] - this.squareSize;
        square.coordinates[10] = square.coordinates[10] - this.squareSize;
        if (square.coordinates[0] < 0) {
            square.coordinates[0] = canvasWidth - square.coordinates[0];
            square.coordinates[2] = canvasWidth - square.coordinates[2];
            square.coordinates[4] = canvasWidth - square.coordinates[4];
            square.coordinates[6] = canvasWidth - square.coordinates[6];
            square.coordinates[8] = canvasWidth - square.coordinates[8];
            square.coordinates[10] = canvasWidth - square.coordinates[10];
        }
        square.x = square.coordinates[0];
        square.y = square.coordinates[1];
        this.squares[index] = square;
    }

    move(index: number)
    {
        const square = this.squares[index];

        if (square.direction === Directions.right) {
            this.moveRight(index);
        }

        if (square.direction === Directions.left) {
            this.moveLeft(index);
        }

        if (square.direction === Directions.up) {
            this.moveUp(index);
        }

        if (square.direction === Directions.down) {
            this.moveDown(index);
        }
    }

    private createParts()
    {
        const { squareSize } = this;
        let startAt = 0.0;

        for (let i = 0; i < this.length; i++) {
            const square = [
                startAt, 0.0,
                startAt, squareSize, 
                startAt + squareSize, 0.0,

                startAt + squareSize, squareSize,
                startAt + squareSize, 0.0,
                startAt, squareSize,
            ];

            startAt += squareSize;
            this.squares.push(new SnakeSquareComponent(square));
        }
    }

    public get snakeHeadPart(): SnakeSquareComponent
    {
        return this.squares[this.length - 1];
    } 
}