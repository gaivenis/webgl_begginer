import { ProgramComponent } from './../components/program_component';
import { UtilsService } from './utils_serlvice';

export class RenderingService
{
    context: WebGL2RenderingContext;
    programComponent: ProgramComponent;

    constructor(context: WebGL2RenderingContext, program: ProgramComponent)
    {
        this.context = context;
        this.programComponent = program;
        this.draw();
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
        context.drawArrays(context.TRIANGLES, 0, 3);
        const colorLocation = context.getUniformLocation(programComponent.program, "u_color");

        for (let ii = 0; ii < 300; ++ii) {
            
            programComponent.setAttribute('a_position', [
                UtilsService.randomInt(context.canvas.width), UtilsService.randomInt(context.canvas.height),
                UtilsService.randomInt(context.canvas.width), UtilsService.randomInt(context.canvas.height),
                UtilsService.randomInt(context.canvas.width), UtilsService.randomInt(context.canvas.height),
            ])
            context.uniform4f(colorLocation, Math.random(), Math.random(), Math.random(), 1);
            var primitiveType = context.TRIANGLES;
            var offset = 0;
            var count = 3;
            context.drawArrays(primitiveType, offset, count);
          }
        
        window.requestAnimationFrame(() => {
            // programComponent.setAttribute('a_position', [
            //   UtilsService.randomTest(), UtilsService.randomTest(),
            //   0, 0.5,
            //   0.7, 0,
            // ]);
        
            this.draw();
          });
    }

    setProgramComponent(programComponent: ProgramComponent)
    {
        this.programComponent = programComponent;
    }
}