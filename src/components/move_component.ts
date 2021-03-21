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

    constructor(direction: Directions, coordinates: number[])
    {
        this.direction = direction;
        this.coordinates = coordinates;
    }
}