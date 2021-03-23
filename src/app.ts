import vertexSource from './shaders/vertex.glsl';
import fragmentSource from './shaders/fragment.glsl';
import { RenderingService } from './services/rendering_service';
import { ShaderService } from './services/shader_service';
import { ProgramService } from './services/program_service';
import { ProgramComponent } from './components/program_component';
import { UtilsService } from './services/utils_serlvice';
import { GameService } from './services/game_service';
import { SnakeComponent } from './components/snake_component';
import { DialogComponent } from './components/dialog_component';

const canvas = <HTMLCanvasElement>document.getElementById('glCanvas');
const context = canvas.getContext('webgl2');
const sidebarWidth = 200;

if (canvas && context) {
    const vertexShader = ShaderService.create(context, context.VERTEX_SHADER, vertexSource);
    const fragmentShader = ShaderService.create(context, context.FRAGMENT_SHADER, fragmentSource);
    if (vertexShader && fragmentShader) {
        const program = ProgramService.create(context, vertexShader, fragmentShader);
        if (program) {
            const programComponent = new ProgramComponent(context, program);
            const snake = new SnakeComponent(GameService.snakeLength, GameService.snakePartSize, context)
            const renderingService = new RenderingService(context, programComponent, snake);
            new GameService(renderingService, snake, context);
        }
    }
}

new DialogComponent();

const resizeObserver = new ResizeObserver(() => {
    canvas.width = Math.floor(window.innerWidth / GameService.snakePartSize) * 10 - sidebarWidth;
    canvas.height = Math.floor(window.innerHeight / GameService.snakePartSize) * 10;
    context?.viewport(0, 0, canvas.width, canvas.height);
});

try {
    resizeObserver.observe(document.body, {box: 'device-pixel-content-box'});
} catch (ex) {
    resizeObserver.observe(document.body, {box: 'content-box'});
}