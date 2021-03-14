export class UtilsService
{
    static resizeCanvasToDispalySize(canvas: HTMLCanvasElement): boolean
    {
        const dpr = window.devicePixelRatio;
        const displayWidth = Math.round(canvas.clientWidth * dpr);
        const displayHeight = Math.round(canvas.clientHeight * dpr);
        const needResize = canvas.width != displayWidth || canvas.height != displayHeight;
       
        if (needResize) {
          canvas.width = displayWidth;
          canvas.height = displayHeight;
        }
       
        return needResize;
    }
    
    static randomTest(): number
    {
      return (Math.floor(Math.random() * 201) -100) / 100;
    }
}