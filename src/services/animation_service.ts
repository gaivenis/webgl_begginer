export class AnimationService
{
    fps: number;
    stop: boolean = false;
    animation: Function
    startTime: number = Date.now();
    fpsInterval: number;
    
    constructor(fps: number, animation: Function, autoStart: boolean = false)
    {
        this.fps = fps;
        this.fpsInterval = 1000 / fps;
        this.animation = animation;
        
        if (autoStart) {
            this.animate();
        }
    }

    animate()
    {
        if (this.stop) {
            return;
        }
        
      

        const nowTime = Date.now();
        const elapsed = nowTime - this.startTime;

        if (elapsed > this.fpsInterval) {
            this.startTime = nowTime - (elapsed % this.fpsInterval);
            this.animation();
        }

        window.requestAnimationFrame(() => {
            this.animate();
        });
    }
}