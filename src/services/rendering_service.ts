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
        
        
        // window.requestAnimationFrame(() => {
        //     programComponent.setAttribute('a_position', [
        //       UtilsService.randomTest(), UtilsService.randomTest(),
        //       0, 0.5,
        //       0.7, 0,
        //     ]);
        
        //     this.draw();
        //   });
    }

    setProgramComponent(programComponent: ProgramComponent)
    {
        this.programComponent = programComponent;
    }
}