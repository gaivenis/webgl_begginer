import { ProgramComponent } from './../components/program_component';

export class RenderingService
{
    context: WebGL2RenderingContext;
    program: ProgramComponent;

    constructor(context: WebGL2RenderingContext, program: ProgramComponent)
    {
        this.context = context;
        this.program = program;
    }
}