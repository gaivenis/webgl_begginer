export class ProgramComponent
{
    context: WebGL2RenderingContext;
    program: WebGLProgram;
    vertexData?: WebGLVertexArrayObject | null;

    constructor(context: WebGL2RenderingContext, program: WebGLProgram)
    {
        this.context = context;
        this.program = program;
    }

    setAttribute(name: string, value: number[]): void
    {
        const { context, program } = this;
        const location = context.getAttribLocation(program, name);
        const buffer = context.createBuffer();
        context.bindBuffer(context.ARRAY_BUFFER, buffer);
        context.bufferData(context.ARRAY_BUFFER, new Float32Array(value), context.STATIC_DRAW);
        this.vertexData = context.createVertexArray();
        context.bindVertexArray(this.vertexData)
        context.enableVertexAttribArray(location);
        context.vertexAttribPointer(location, 2, context.FLOAT, false, 0, 0);
    }
}