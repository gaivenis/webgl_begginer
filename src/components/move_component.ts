export enum Directions {
    up = 'ArrowUp',
    down = 'ArrowDown',
    left = 'ArrowLeft',
    right = 'ArrowRight',
    default = 'ArrowRight'
}

export class MoveComponent
{
    direction: Directions;
    coordinates: number[];
    x: number;
    y: number;

    constructor(direction: Directions, coordinates: number[])
    {
        this.direction = direction;
        this.coordinates = coordinates;
        this.x = this.coordinates[0];
        this.y = this.coordinates[1];
    }
}