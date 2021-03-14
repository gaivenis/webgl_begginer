export class ShaderService
{
    static create(context: WebGL2RenderingContext, type: GLenum, source: string): WebGLShader | null
    {
        const shader = context.createShader(type)!;
        context.shaderSource(shader, source);
        context.compileShader(shader);

        const success = context.getShaderParameter(shader, context.COMPILE_STATUS);
        if (success) {
            return shader;
        }

        console.log(context.getShaderInfoLog(shader));
        context.deleteShader(shader);

        return null;
    }
}