import { Directions } from './move_component';

export class SnakeSquareComponent
{
    direction: Directions = Directions.default;
    coordinates: number[];
    x: number;
    y: number;

    constructor(coordinates: number[])
    {
        this.coordinates = coordinates;
        this.x = this.coordinates[0];
        this.y = this.coordinates[1];
    }
}