export class VerticesService
{
    static translate(vertices: number[], x?: number, y?: number)
    {
        for (let i = 0, lenght = vertices.length; i < lenght; i++) {
            if (i % 2 === 0 && x) {
                vertices[i] += x;
            } else if (i % 2 !== 0 && y) {
                vertices[i] += y;
            }
        }
        
        return vertices;
    }
}