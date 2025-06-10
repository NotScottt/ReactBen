import React from "react";

function BenClickControls({
  onBuyMultiplier,
  onBuyMultiplierX5,
  onBuyMultiplierX10,
  onBuyMultiplierX100,
  onBuyMultiplierX1000,
  onBuyMultiplierX10000,
  onBuyMultiplierX100000,
  onBuyAutoClicker,
  onBuyAutoClickerX5,
  onBuyAutoClickerX10,
  onBuyAutoClickerX100,
  onBuyAutoClickerX1000,
  onBuyAutoClickerX10000,
  onBuyAutoClickerX100000,
  multiplierCost,
  autoClickerCost,
  totalMultiplierCostX5,
  totalMultiplierCostX10,
  totalMultiplierCostX100,
  totalMultiplierCostX1000,
  totalMultiplierCostX10000,
  totalMultiplierCostX100000,
  totalAutoClickerCostX5,
  totalAutoClickerCostX10,
  totalAutoClickerCostX100,
  totalAutoClickerCostX1000,
  totalAutoClickerCostX10000,
  totalAutoClickerCostX100000,
  ultraRebirths
}) {
  return (
    <div className="controls">
      <div className="multiplierSection">
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
          x1.000 Multiplier ({totalMultiplierCostX1000})
        </button>
        {ultraRebirths >= 20 ? (
          <div className="ultraUpgradeSection">
            <button onClick={onBuyMultiplierX10000}>
              x10.000 Multiplier ({totalMultiplierCostX10000})
            </button>
            {ultraRebirths >= 20 && (
              <button onClick={onBuyMultiplierX100000}>
                x100.000 Multiplier ({totalMultiplierCostX100000})
              </button>
            )}
          </div>
        ) : (
          <button onClick={onBuyMultiplierX10000}>
            x10.000 Multiplier ({totalMultiplierCostX10000})
          </button>
        )}
      </div>

      <div className="autoClickerSection">
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
          x1.000 Auto Clicker ({totalAutoClickerCostX1000})
        </button>
        {ultraRebirths >= 20 ? (
          <div className="ultraUpgradeSection">
            <button onClick={onBuyAutoClickerX10000}>
              x10.000 Auto Clicker ({totalAutoClickerCostX10000})
            </button>
            {ultraRebirths >= 20 && (
              <button onClick={onBuyAutoClickerX100000}>
                x100.000 Auto Clicker ({totalAutoClickerCostX100000})
              </button>
            )}
          </div>
        ) : (
          <button onClick={onBuyAutoClickerX10000}>
            x10.000 Auto Clicker ({totalAutoClickerCostX10000})
          </button>
        )}
      </div>
    </div>
  );
}

export default BenClickControls;
