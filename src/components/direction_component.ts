export enum Directions {
    up,
    down,
    left,
    right
}

export class DirectionComponent
{
    direction: Directions;
    x: number;
    y: number;

    constructor(direction: Directions, x: number, y: number)
    {
        this.direction = direction;
        this.x = x;
        this.y = y;
    }
}