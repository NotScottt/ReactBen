import { formatNumber } from "./NumberFormatter";
import RainbowText from "./RainbowText";

export default function BenClickerControls({
    onBuyMultiplier,
    onBuyAutoClicker,
    multiplierCost,
    autoClickerCost,
    rainbowText
}) {
    return (
        <div className='benClickControls'>
            <button onClick={onBuyMultiplier}>
                {rainbowText ? (
                    <>
                        Multiplier (
                        <RainbowText children={
                            `${formatNumber(multiplierCost)} Bens`
                        }
                        />)
                    </>
                ) : (
                    <>{`Multiplier (${formatNumber(multiplierCost)} Bens`})</>

                )}

            </button>
            <button onClick={onBuyAutoClicker}>
                {rainbowText ? (
                    <>
                        Auto Benclicker (
                        <RainbowText children={
                            `${formatNumber(autoClickerCost)} Bens`
                        } />
                        )
                    </>
                ) : (
                    <>{`Auto Benclicker (${formatNumber(autoClickerCost)} Bens`})</>

                )}
            </button>
        </div>
    );
}
