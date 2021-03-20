import { Directions } from './direction_component';

export type square = number[];

export class SnakeComponent
{
    length: number;
    squareSize: number;
    parts: square[] = [];
    direction?: Directions = Directions.right;

    constructor(length: number, squareSize: number)
    {
        this.length = length;
        this.squareSize = squareSize;
        this.createParts();
    }

    private createParts()
    {
        const { squareSize } = this;
        let startAt = 0.0;

        for (let i = 0; i < this.length; i++) {
            // startAt += 20
            const square = [
                startAt, 0.0,
                startAt, squareSize, 
                startAt + squareSize, 0.0,

                startAt + squareSize, squareSize,
                startAt + squareSize, 0.0,
                startAt, squareSize,
            ];

            startAt += squareSize;
            this.parts.push(square);
        }
    }
}