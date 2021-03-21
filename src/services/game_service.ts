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
    static readonly snakeLength: number = 5.0;
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
        for (let i = 0, length = squareList.length; i < length; i++) {
            const squareComponent = squareList[i];
            const dx = squareComponent.x - square.x;
            const dy = squareComponent.y - square.y;
            const hypotenuse = Math.sqrt(dx * dx + dy * dy);

            if (hypotenuse < GameService.snakePartSize) {
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
                if (e.key === Directions.right && this.currentDirection !== Directions.right && this.currentDirection !== Directions.left) {
                    move = new MoveComponent(Directions.right, coordinates);
                    this.currentDirection = Directions.right;
                }

                if (e.key === Directions.left && this.currentDirection !== Directions.left && this.currentDirection !== Directions.right) {
                    move = new MoveComponent(Directions.left, coordinates);
                    this.currentDirection = Directions.left;
                }

                if (e.key === Directions.down && this.currentDirection !== Directions.down && this.currentDirection !== Directions.up) {
                    move = new MoveComponent(Directions.down, coordinates);
                    this.currentDirection = Directions.down;
                }

                if (e.key === Directions.up && this.currentDirection !== Directions.up && this.currentDirection !== Directions.down) {
                    move = new MoveComponent(Directions.up, coordinates);
                    this.currentDirection = Directions.up;
                }

                if (move) {
                    this.movesList.push(move);
                }
                
                this.renderingService.snake = this.snake;
            }
        });
        
        this.animationService = new AnimationService(20, () => {
            this._handleMoveBySquare();
            this.renderingService.snake = this.snake;
        }, true, this.renderingService);
    }

    protected _handleMoveBySquare()
    {
        const firstSquare = this.snake.squares.shift();
        const collisionList = [...this.snake.squares];
        this.snake.squares.push(firstSquare!)
        let length = this.snake.squares.length;
        const lastSquare = this.snake.squares[length - 2];
        firstSquare!.coordinates = [...lastSquare.coordinates];
        firstSquare!.direction = this.currentDirection;
        
        collisionList.pop();
        if (this.isCollision(this.snake.snakeHeadPart, collisionList)) {
            this.animationService.stop = true;
            if (document.getElementById('modal')) {
                document.getElementById('modal')!.style.display = 'block';
            }
        }
        this.snake.move(length - 1);
    }

    protected _handleByMoves()
    {
        let i = this.snake.length - 1;
        let removeMove: boolean = false;
        const movesLength = this.movesList.length;
        const collisionList = [...this.snake.squares];

        for (i = 0; i < GameService.snakeLength; i++) {
            const square = this.snake.squares[i];
            for (let moveI = 0; moveI < movesLength; moveI++) {
                removeMove = false;
                const move = this.movesList[moveI];
                
                if (move && this.isCollision(square, [move])) {
                    square.direction = move.direction;
                    if (i === 0 && moveI === 0) {
                       removeMove = true;
                    }
                }
            }
            
            this.snake.move(i);
            if (removeMove) {
                this.movesList.shift();
            }

            collisionList.pop();
            if (this.isCollision(this.snake.snakeHeadPart, collisionList)) {
                this.animationService.stop = true;
                if (document.getElementById('modal')) {
                    document.getElementById('modal')!.style.display = 'block';
                }
            }
        }
    }

    createApple()
    {
        
    }
}