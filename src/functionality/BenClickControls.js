import React from "react";

function BenClickControls({
  onBuyMultiplier,
  onBuyMultiplierX5,
  onBuyMultiplierX10,
  onBuyMultiplierX100,
  onBuyMultiplierX1000,
  onBuyAutoClicker,
  onBuyAutoClickerX5,
  onBuyAutoClickerX10,
  onBuyAutoClickerX100,
  onBuyAutoClickerX1000,
  multiplierCost,
  autoClickerCost,
  totalMultiplierCostX5,
  totalMultiplierCostX10,
  totalMultiplierCostX100,
  totalMultiplierCostX1000,
  totalAutoClickerCostX5,
  totalAutoClickerCostX10,
  totalAutoClickerCostX100,
  totalAutoClickerCostX1000,
  rainbowText
}) {
  return (
    <div className="controls">
      <h2 style={{ color: rainbowText ? "rainbow" : "inherit" }}>
        Upgrades
      </h2>

      <div>
        <h3>Multiplier</h3>
        <button onClick={onBuyMultiplier}>
          +1 Multiplier ({multiplierCost})
        </button>
        <button onClick={onBuyMultiplierX5}>
          x5 Multiplier ({totalMultiplierCostX5})
        </button>
        <button onClick={onBuyMultiplierX10}>
          x10 Multiplier ({totalMultiplierCostX10})
        </button>
        <button onClick={onBuyMultiplierX100}>
          x100 Multiplier ({totalMultiplierCostX100})
        </button>
        <button onClick={onBuyMultiplierX1000}>
          x1000 Multiplier ({totalMultiplierCostX1000})
        </button>
      </div>

      <div>
        <h3>Auto Clicker</h3>
        <button onClick={onBuyAutoClicker}>
          +1 Auto Clicker ({autoClickerCost})
        </button>
        <button onClick={onBuyAutoClickerX5}>
          x5 Auto Clicker ({totalAutoClickerCostX5})
        </button>
        <button onClick={onBuyAutoClickerX10}>
          x10 Auto Clicker ({totalAutoClickerCostX10})
        </button>
        <button onClick={onBuyAutoClickerX100}>
          x100 Auto Clicker ({totalAutoClickerCostX100})
        </button>
        <button onClick={onBuyAutoClickerX1000}>
          x1000 Auto Clicker ({totalAutoClickerCostX1000})
        </button>
      </div>
    </div>
  );
}

export default BenClickControls;
