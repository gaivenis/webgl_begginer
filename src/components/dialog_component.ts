export class DialogComponent
{
    constructor()
    {
        this._bindEvents();
    }

    protected _bindEvents()
    {
        document.getElementById('restart')?.addEventListener('click', () => {
            window.location.reload();
        });

        document.getElementById('close')?.addEventListener('click', () => {
            window.close();
        });
    }
}