import { formatNumber } from "./NumberFormatter";
import RainbowText from "./RainbowText";

export default function BenClickerControls({
    onBuyMultiplier,
    onBuyAutoClicker,
    multiplierCost,
    autoClickerCost,
}) {
    return (
        <div className='benClickControls'>
            <button onClick={onBuyMultiplier}>
                Multiplier (
                <RainbowText children={
                    `${formatNumber(multiplierCost)} Bens`
                }/>
                )
            </button>
            <button onClick={onBuyAutoClicker}>
                Auto Benclicker (
                <RainbowText children={
                    `${formatNumber(autoClickerCost)} Bens`
                }/>
                )
            </button>
        </div>
    );
}
