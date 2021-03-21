import { SnakeComponent } from '../components/snake_component';
import { SnakeSquareComponent } from '../components/snake_sqaure_component';
import { Directions, MoveComponent } from './../components/move_component';
import { AnimationService } from './animation_service';
import { RenderingService } from './rendering_service';
import { UtilsService } from './utils_serlvice';

const availableKeys = [
    'ArrowLeft',
    'ArrowRight',
    'ArrowDown',
    'ArrowUp'
];

type Coordinates = number[];

export class GameService
{
    static readonly snakeLength: number = 10.0;
    static readonly snakePartSize: number = 10.0;

    movesList: MoveComponent[] = [];
    snake: SnakeComponent;
    renderingService: RenderingService;
    currentDirection: Directions;
    animationService!: AnimationService;
    
    constructor(renderingService: RenderingService, snake: SnakeComponent)
    {
        this.renderingService = renderingService;
        this.snake = snake;
        this.currentDirection = this.snake.direction;
        this._bindEvents();
    }

    public get lastMove(): MoveComponent | null
    {
        const length = this.movesList.length;

        if (length > 0) {
            return this.movesList[length - 1];
        }
        
        return null;
    }

    isCollision(square: SnakeSquareComponent, squareList: SnakeSquareComponent[]): boolean
    {
        const squareCoordinates = square.coordinates;

        for (let i = 0, length = squareList.length; i < length; i++) {
            const squareComponent = squareList[i]; 
            if (UtilsService.isArraysEqual(squareComponent.coordinates, squareCoordinates)) {
                return true;
            }
        }
        
        return false;
    }

    protected _bindEvents()
    {
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            if (availableKeys.includes(e.key)) {
                let move: MoveComponent | null = null;
                const coordinates = [...this.snake.snakeHeadPart.coordinates];
                if (e.key === Directions.right && this.currentDirection !== Directions.right) {
                    move = new MoveComponent(Directions.right, coordinates);
                    this.currentDirection = Directions.right;
                }

                if (e.key === Directions.left && this.currentDirection !== Directions.left) {
                    move = new MoveComponent(Directions.left, coordinates);
                    this.currentDirection = Directions.left;
                }

                if (e.key === Directions.down && this.currentDirection !== Directions.down) {
                    move = new MoveComponent(Directions.down, coordinates);
                    this.currentDirection = Directions.down;
                }

                if (e.key === Directions.up && this.currentDirection !== Directions.up) {
                    move = new MoveComponent(Directions.up, coordinates);
                    this.currentDirection = Directions.up;
                }

                if (move) {
                    this.movesList.push(move);
                }
                
                this.renderingService.snake = this.snake;
                console.log(this.movesList)
            }
        });
        
        this.animationService = new AnimationService(20, () => {
            this._handleMoves();
            this.renderingService.draw();
        }, true);
    }

    protected _handleMoves()
    {
        let i = this.snake.length - 1;
        const movesLength = this.movesList.length;
        const collisionList = [...this.snake.squares];

        for (i; i > -1; i--) {
            const square = this.snake.squares[i];
            for (let moveI = 0; moveI < movesLength; moveI++) {
                const move = this.movesList[moveI];
                if (move && UtilsService.isArraysEqual(move.coordinates, square.coordinates)) {
                    square.direction = move.direction;
                    if (i === 0 && moveI === 0) {
                        this.movesList.shift();
                    }
                }
            }
            
            this.snake.move(i);
            collisionList.pop();
            
            if (this.isCollision(this.snake.snakeHeadPart, collisionList)) {
                this.animationService.stop = true;
            }
        }
    }
}