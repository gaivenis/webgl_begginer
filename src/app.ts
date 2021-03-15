import vertexSource from './shaders/vertex.glsl';
import fragmentSource from './shaders/fragment.glsl';
import { RenderingService } from './services/rendering_service';
import { ShaderService } from './services/shader_service';
import { ProgramService } from './services/program_service';
import { ProgramComponent } from './components/program_component';
import { UtilsService } from './services/utils_serlvice';

const canvas = <HTMLCanvasElement>document.getElementById('glCanvas');
const context = canvas.getContext('webgl2');

const resizeObserver = new ResizeObserver(() => {
  UtilsService.resizeCanvasToDispalySize(canvas);
  context?.viewport(0, 0, canvas.width, canvas.height);
});


try {
  resizeObserver.observe(canvas, {box: 'device-pixel-content-box'});
} catch (ex) {
  resizeObserver.observe(canvas, {box: 'content-box'});
}

if (canvas && context) {
    const vertexShader = ShaderService.create(context, context.VERTEX_SHADER, vertexSource);
    const fragmentShader = ShaderService.create(context, context.FRAGMENT_SHADER, fragmentSource);
    if (vertexShader && fragmentShader) {
        const program = ProgramService.create(context, vertexShader, fragmentShader);
        if (program) {
            const programComponent = new ProgramComponent(context, program);
            // programComponent.setAttribute('u_resolution', [canvas.width, canvas.height]);
            // programComponent.setAttribute('a_position', [
            //   10, 20,
            //   60, 770,
            //   450, 770,
            // ]);
            const renderingService = new RenderingService(context, programComponent);
        }
    }
}