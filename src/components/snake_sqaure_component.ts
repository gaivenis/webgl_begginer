import { Directions } from './move_component';

export class SnakeSquareComponent
{
    direction: Directions = Directions.default;
    coordinates: number[];

    constructor(coordinates: number[])
    {
        this.coordinates = coordinates;
    }
}