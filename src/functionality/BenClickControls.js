export default function BenClickerControls({
    onBuyMultiplier,
    onBuyAutoClicker,
    multiplierCost,
    autoClickerCost,
}) {
    return (
        <div className='benClickControls'>
            <button onClick={onBuyMultiplier}>
                Multiplier ({multiplierCost} Bens)
            </button>
            <button onClick={onBuyAutoClicker}>
                Auto Benclicker ({autoClickerCost} Bens)
            </button>
        </div>
    );
}
