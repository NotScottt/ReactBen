import { formatNumber } from "./NumberFormatter";

export default function BenClickerControls({
    onBuyMultiplier,
    onBuyAutoClicker,
    multiplierCost,
    autoClickerCost,
}) {
    return (
        <div className='benClickControls'>
            <button onClick={onBuyMultiplier}>
                Multiplier ({formatNumber(multiplierCost)} Bens)
            </button>
            <button onClick={onBuyAutoClicker}>
                Auto Benclicker ({formatNumber(autoClickerCost)} Bens)
            </button>
        </div>
    );
}
