import { formatNumber } from "./NumberFormatter";
import RainbowText from "./RainbowText";

export default function BenClickerControls({
    onBuyMultiplier,
    onBuyMultiplierX5,
    onBuyMultiplierX10,
    onBuyAutoClicker,
    onBuyAutoClickerX5,
    onBuyAutoClickerX10,
    totalMultiplierCostX5,
    totalMultiplierCostX10,
    totalAutoClickerCostX5,
    totalAutoClickerCostX10,
    multiplierCost,
    autoClickerCost,
    rainbowText,
}) {
    return (
        <div className='benClickControls'>
            <button onClick={onBuyMultiplier}>
                x1 Multiplier ({multiplierCost})
            </button>
            <button onClick={onBuyMultiplierX5}>
                x5 Multiplier ({formatNumber(totalMultiplierCostX5)})
            </button>
            <button onClick={onBuyMultiplierX10}>
                x10 Multiplier ({formatNumber(totalMultiplierCostX10)})
            </button>

            <button onClick={onBuyAutoClicker}>
                x1 Auto Clicker ({autoClickerCost})
            </button>
            <button onClick={onBuyAutoClickerX5}>
                x5 Auto Clicker ({formatNumber(totalAutoClickerCostX5)})
            </button>
            <button onClick={onBuyAutoClickerX10}>
                x10 Auto Clicker ({formatNumber(totalAutoClickerCostX10)})
            </button>


        </div>
    );
}
