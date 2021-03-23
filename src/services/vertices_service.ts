export class VerticesService
{
    static translate(vertices: number[], dx?: number, dy?: number): number[]
    {
        for (let i = 0, lenght = vertices.length; i < lenght; i++) {
            if (i % 2 === 0 && dx) {
                vertices[i] += dx;
            } else if (i % 2 !== 0 && dy) {
                vertices[i] += dy;
            }
        }
        
        return vertices;
    }

    static translateTo(vertices: number[], x?: number, y?: number): number[]
    {
        const vertexX = vertices[0];
        const vertexY = vertices[1];
        const dx = x !== undefined ?  x - vertexX: 0;
        const dy = y !== undefined ?  y - vertexY: 0;
        
        return VerticesService.translate(vertices, dx, dy);
    }
}