import { mat3, mat4 } from 'gl-matrix';
import { SnakeComponent } from '../components/snake_component';
import { ProgramComponent } from './../components/program_component';
import { UtilsService } from './utils_serlvice';



export class RenderingService
{
    context: WebGL2RenderingContext;
    programComponent: ProgramComponent;
    snake: SnakeComponent;
    target: number[] = [];
    matrix: number[] = [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1,
    ];

    public get x(): number
    {
        return this.matrix[6];
    }

    public get y(): number
    {
        return this.matrix[7];
    }

    constructor(context: WebGL2RenderingContext, program: ProgramComponent, snake: SnakeComponent)
    {
        this.context = context;
        this.programComponent = program;
        this.snake = snake;
        this.draw();
    }

    draw()
    {
        const { context, programComponent } = this;
        context.clearColor(0.4, 1.0, 0.7, 1);
        context.clear(context.COLOR_BUFFER_BIT);
        context.useProgram(programComponent.program);
        const location = context.getUniformLocation(programComponent.program, 'u_resolution');
        context.uniform2f(location, context.canvas.width, context.canvas.height);
        const colorLocation = context.getUniformLocation(programComponent.program, "u_color");
        
        const coordinates: number[] = [];
        for (let i = 0, length = this.snake.squares.length; i < length; i++) {
            coordinates.push(...this.snake.squares[i].coordinates)
        }

        programComponent.setAttribute('a_position', coordinates);
        context.uniform4f(colorLocation, 0.860, 0.846, 0.00, 1);
        context.drawArrays(context.TRIANGLES, 0, 6 * this.snake.squares.length);

        programComponent.setAttribute('a_position', this.target);
        context.uniform4f(colorLocation, 0.640, 0.00, 0.00, 1);
        context.drawArrays(context.TRIANGLES, 0, 6);
    }

    setProgramComponent(programComponent: ProgramComponent)
    {
        this.programComponent = programComponent;
    }
}