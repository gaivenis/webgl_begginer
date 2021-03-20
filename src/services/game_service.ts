const availableKeys = [
    'ArrowLeft',
    'ArrowRigth',
    'ArrowDown',
    'ArrowUp'
];

export class GameService
{
    constructor()
    {
        this._bindEvents();
    }

    protected _bindEvents()
    {
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            if (availableKeys.includes(e.key)) {
                
            }
        });
    }
}