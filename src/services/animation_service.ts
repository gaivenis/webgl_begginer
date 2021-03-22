import { RenderingService } from './rendering_service';

export class AnimationService
{
    fps: number;
    stop: boolean = false;
    animation: Function
    startTime: number = Date.now();
    fpsInterval: number;
    renderingService: RenderingService;
    
    constructor(fps: number, animation: Function, autoStart: boolean = false, renderingService: RenderingService)
    {
        this.fps = fps;
        this.fpsInterval = 1000 / fps;
        this.animation = animation;
        this.renderingService = renderingService;
        
        if (autoStart) {
            this.animate();
        }
    }

    animate()
    {
        if (this.stop) {
            return;
        }
                
        window.requestAnimationFrame(() => {
            this.renderingService.draw();
            this.animate();
        });
     

        const nowTime = Date.now();
        const elapsed = nowTime - this.startTime;

        if (elapsed > this.fpsInterval) {
            this.startTime = nowTime - (elapsed % this.fpsInterval);
            this.animation();
        }
    }
}