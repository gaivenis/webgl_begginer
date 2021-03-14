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
        const location = this.context.getAttribLocation(this.program, name);
        const buffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, buffer);
        this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(value), this.context.STATIC_DRAW);
        this.vertexData = this.context.createVertexArray();
        this.context.bindVertexArray(this.vertexData)
        this.context.enableVertexAttribArray(location);
        this.context.vertexAttribPointer(location, 2, this.context.FLOAT, false, 0, 0);
        console.log('rtrtr');
    }
}