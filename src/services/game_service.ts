import { SnakeComponent } from '../components/snake_component';
import { SnakeSquareComponent } from '../components/snake_sqaure_component';
import { Directions, MoveComponent } from './../components/move_component';
import { AnimationService } from './animation_service';
import { RenderingService } from './rendering_service';
import { UtilsService } from './utils_serlvice';
import { VerticesService } from './vertices_service';

const availableKeys = [
    'ArrowLeft',
    'ArrowRight',
    'ArrowDown',
    'ArrowUp'
];

type Coordinates = number[];

export class GameService
{
    static readonly snakeLength: number = 10;
    static readonly snakePartSize: number = 10.0;

    movesList: MoveComponent[] = [];
    snake: SnakeComponent;
    renderingService: RenderingService;
    currentDirection: Directions;
    animationService!: AnimationService;
    context: WebGL2RenderingContext;
    isMoveAvailable: boolean = true;

    constructor(renderingService: RenderingService, snake: SnakeComponent, context: WebGL2RenderingContext)
    {
        this.renderingService = renderingService;
        this.snake = snake;
        this.context = context;
        this._initGameSize();
        this.currentDirection = this.snake.direction;
        this.renderingService.target = this._generateTarget();
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
            const dx = (squareComponent.x + 5) - (square.x + 5);
            const dy = (squareComponent.y + 5) - (square.y + 5);
            const hypotenuse = Math.sqrt(dx * dx + dy * dy);

            if (hypotenuse < GameService.snakePartSize / 2) {
                return true;
            }
        }
        
        return false;
    }

    protected _initGameSize()
    {
        const canvas = <HTMLCanvasElement>this.context.canvas;
        const resizeObserver = new ResizeObserver(() => {
            canvas.width = Math.floor(window.innerWidth / 10) * 10;
            canvas.height = Math.floor(window.innerHeight / 10) * 10;
            this.context?.viewport(0, 0, canvas.width, canvas.height);
        });

        try {
            resizeObserver.observe(canvas, {box: 'device-pixel-content-box'});
        } catch (ex) {
            resizeObserver.observe(canvas, {box: 'content-box'});
        }
    }

    protected _bindEvents()
    {
        
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            if (availableKeys.includes(e.key)) {
                if (this.isMoveAvailable) {
                    this.isMoveAvailable = false;
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
                }
            }
        });
        
        this.animationService = new AnimationService(30, () => {
            this._handleMoveBySquare();
            this.renderingService.snake = this.snake;
            this.isMoveAvailable = true;
        }, true, this.renderingService);
    }

    protected _generateTarget()
    {
        const x = UtilsService.randomInt(Math.floor(window.innerWidth / 10)) * 10;
        const y = UtilsService.randomInt(Math.floor(window.innerHeight / 10)) * 10;
        const vertices = [
            x, y,
            x, y + GameService.snakePartSize,
            x + GameService.snakePartSize, y,

            x + GameService.snakePartSize, y + GameService.snakePartSize,
            x + GameService.snakePartSize, y,
            x, y + GameService.snakePartSize
        ]

        return vertices;
    }

    protected _handleMoveBySquare()
    {
        const snakeTarget = new SnakeSquareComponent(this.renderingService.target);
        if (this.isCollision(this.snake.squares[this.snake.squares.length - 1], [snakeTarget])) {
            this._handleTargetCollision();
            this.renderingService.target = this._generateTarget();
        }

        const firstSquare = this.snake.squares.shift();
        const collisionList = [...this.snake.squares];
        this.snake.squares.push(firstSquare!)
        let length = this.snake.squares.length;
        const lastSquare = this.snake.squares[length - 2];
        firstSquare!.coordinates = [...lastSquare.coordinates];
        firstSquare!.direction = this.currentDirection;
        
        collisionList.pop();

        if (this.isCollision(lastSquare, collisionList)) {
            this.animationService.stop = true;
            if (document.getElementById('modal')) {
                document.getElementById('modal')!.style.display = 'block';
            }
        }

        this.snake.move(length - 1);
    }

    protected _handleTargetCollision()
    {
        const firstSquare = this.snake.squares[0];
        let coordinates = [...firstSquare.coordinates];

        if (firstSquare.direction === Directions.down) {
            coordinates = VerticesService.translate(coordinates, 0, GameService.snakePartSize);
        }

        if (firstSquare.direction === Directions.up) {
            coordinates = VerticesService.translate(coordinates, 0, -GameService.snakePartSize);
        }

        if (firstSquare.direction === Directions.right) {
            coordinates = VerticesService.translate(coordinates, GameService.snakePartSize, 0);
        }

        if (firstSquare.direction === Directions.left) {
            coordinates = VerticesService.translate(coordinates, -GameService.snakePartSize, 0);
        }

        this.snake.squares.splice(1, 0, new SnakeSquareComponent(coordinates));
        this.snake.length++;
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

            const snakeTarget = new SnakeSquareComponent(this.renderingService.target);
            if (this.isCollision(this.snake.squares[this.snake.squares.length - 2], [snakeTarget])) {
                this._handleTargetCollision();
                this.renderingService.target = this._generateTarget();
            }
        }
    }

    createApple()
    {
        
    }
}