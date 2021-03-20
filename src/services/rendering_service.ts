import { mat3, mat4 } from 'gl-matrix';
import { SnakeComponent } from '../components/snake_component';
import { ProgramComponent } from './../components/program_component';
import { UtilsService } from './utils_serlvice';



export class RenderingService
{
    context: WebGL2RenderingContext;
    programComponent: ProgramComponent;
    snake: SnakeComponent;
    matrix: number[] = [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1,
    ];
   
    directionsList?: [];

    public get x(): number
    {
        return this.matrix[6];
    }

    public get y(): number
    {
        return this.matrix[7];
    }

    constructor(context: WebGL2RenderingContext, program: ProgramComponent)
    {
        this.context = context;
        this.programComponent = program;
        this.snake = new SnakeComponent(10, 10);
        this.draw();
    }

    setDirection()
    {

    }

    draw()
    {
        const { context, programComponent } = this;
        UtilsService.resizeCanvasToDispalySize(<HTMLCanvasElement>context.canvas);
        context.viewport(0, 0, context.canvas.width, context.canvas.height);
        context.clearColor(0, 0, 0, 0);
        context.clear(context.COLOR_BUFFER_BIT);
        context.useProgram(programComponent.program);
        const location = context.getUniformLocation(programComponent.program, 'u_resolution');
        context.uniform2f(location, context.canvas.width, context.canvas.height);
        const matrixLocation = context.getUniformLocation(programComponent.program, 'u_matrix');
        context.uniformMatrix3fv(matrixLocation, false, this.matrix!);
        // context.drawArrays(context.TRIANGLES, 0, 3);
        const colorLocation = context.getUniformLocation(programComponent.program, "u_color");
        
        // for (let ii = 0; ii < 300; ++ii) {
            for (let i = 0, length = this.snake.parts.length; i < length; i++) {
                programComponent.setAttribute('a_position', this.snake.parts[i]);
                context.uniform4f(colorLocation, 0.5, 0.5, 0.5, 1);
                var primitiveType = context.TRIANGLES;
                var offset = 0;
                var count = 6;
                context.drawArrays(primitiveType, offset, count);
            }
            

            

            // programComponent.setAttribute('a_position', [
            //     0.0, 0.0,
            //     0.0, squereSize,
            //     squereSize, squereSize,
            //     0.0, 0.0,
            //     squereSize, 0.0,
            //     squereSize, squereSize,
            // ]);

            // context.uniform4f(colorLocation, 0.5, 0.5, 0.5, 1);
            // var primitiveType = context.TRIANGLE_FAN;
            // var offset = 0;
            // var count = 6;
            // context.drawArrays(primitiveType, offset, count);

            // programComponent.setAttribute('a_position', [
            //     0.0, 0.0,
            //     30.0, 0.0,
            //     30.0, 30.0,
            // ]);

            // const matrix2Location = context.getUniformLocation(programComponent.program, 'u_matrix');
            // context.uniformMatrix3fv(matrix2Location, false, [
            //     1, 0, 0,
            //     0, 1, 0,
            //     100, 150, 1,
            // ]);


            // programComponent.setAttribute('a_position', [
            //     200, 140,
            //     100.7, 200.5,
            //     35.0, 180.7,
            // ])
            // context.uniform4f(colorLocation, 0.5, 0.5, 0.5, 1);
            // var primitiveType = context.TRIANGLES;
            // var offset = 0;
            // var count = 3;
            // context.drawArrays(primitiveType, offset, count);
        //   }
        

        // window.requestAnimationFrame(() => {
        //     // programComponent.setAttribute('a_position', [
        //     //   UtilsService.randomTest(), UtilsService.randomTest(),
        //     //   0, 0.5,
        //     //   0.7, 0,
        //     // ]);
        
        //     this.draw();
        //   });
    }

    setProgramComponent(programComponent: ProgramComponent)
    {
        this.programComponent = programComponent;
    }
}