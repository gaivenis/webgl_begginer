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

	static randomInt(range: number): number
	{
		return Math.floor(Math.random() * range);
	}

	static isArraysEqual(firstArray: any[], secondArray: any[])
	{
		return Array.isArray(firstArray) && Array.isArray(secondArray)
			&& firstArray.length === secondArray.length
			&& firstArray.every((val, index) => val === secondArray[index]);
	}
}