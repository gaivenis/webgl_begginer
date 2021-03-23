import { VerticesService } from '../services/vertices_service';
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

        square.coordinates = VerticesService.translate(square.coordinates, 0, this.squareSize);

        if (square.coordinates[7] > canvasHeight) {
            square.coordinates = VerticesService.translateTo(square.coordinates, square.coordinates[0], 0);
        }

        square.x = square.coordinates[0];
        square.y = square.coordinates[1];
        this.squares[index] = square;
    }

    moveUp(index: number)
    {
        const square = this.squares[index];
        const canvasHeight = this.context.canvas.height;
        
        square.coordinates = VerticesService.translate(square.coordinates, 0, -this.squareSize);

        if (square.coordinates[1] < 0) {
            square.coordinates = VerticesService.translateTo(square.coordinates, square.coordinates[0], canvasHeight - this.squareSize);
        }
        
        square.x = square.coordinates[0];
        square.y = square.coordinates[1];
        this.squares[index] = square;
    }

    moveRight(index: number)
    {
        const square = this.squares[index];
        const canvasWidth = this.context.canvas.width;

        square.coordinates = VerticesService.translate(square.coordinates, this.squareSize, 0);
        
        if (square.coordinates[6] > canvasWidth) {
            square.coordinates = VerticesService.translateTo(square.coordinates, 0, square.coordinates[1]);
        }

        square.x = square.coordinates[0];
        square.y = square.coordinates[1];
        this.squares[index] = square;
    }

    moveLeft(index: number)
    {
        const square = this.squares[index];
        const canvasWidth = this.context.canvas.width;

        square.coordinates = VerticesService.translate(square.coordinates, -this.squareSize, 0);

        if (square.coordinates[0] < 0) {
            square.coordinates = VerticesService.translateTo(square.coordinates, canvasWidth - this.squareSize, square.coordinates[1])
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