export class ProgramService
{
    static create(context: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null
    {
        const program = context.createProgram();
        if (program) {
            context.attachShader(program, vertexShader);
            context.attachShader(program, fragmentShader);
            context.linkProgram(program);
            const success = context.getProgramParameter(program, context.LINK_STATUS);

            if (success) {
                return program;
            }
            
            console.log(context.getProgramInfoLog(program));
            context.deleteProgram(program);
        }
        
        return null;
    }
}