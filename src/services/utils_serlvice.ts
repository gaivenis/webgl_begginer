export class UtilsService
{
    static resizeCanvasToDispalySize(canvas: HTMLCanvasElement)
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
}