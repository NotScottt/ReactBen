import './App.css';
import './Rainbow.css';
// import Background from "public/BenRoom.jpg"
import useScreenSize from './functionality/ScreenSize';
import Phone from "./assets/phone.png"
import BenClickControls from './functionality/BenClickControls';

import { useBenMovement } from './functionality/BenMovement';
import { playPhoneRing } from './functionality/PhoneRing';
import { formatNumber } from './functionality/NumberFormatter';
import { SkinPicker } from './functionality/SkinPicker';
import { useEffect, useState } from 'react';
import HoldButton from './functionality/HoldButton';
import { ReturnSkins } from './functionality/ReturnSkins';
import Skinlocker from './functionality/SkinLocker';
import { BackgroundPicker } from './functionality/BackgroundPicker';
import BackgroundLocker from './functionality/BackgroundLocker';
import { ReturnBackgrounds } from './functionality/ReturnBackgrounds';


function App() {
  const moveMent = useBenMovement();
  const screenSize = useScreenSize();
  const screenWidth = screenSize["width"];
  const benSound = new Audio("assets/sounds/ben.mp3");
  const skins = ReturnSkins();
  const backGrounds = ReturnBackgrounds();
  const [showSkins, setShowSkins] = useState(false);
  const [showBackgrounds, setShowBackGrounds] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [switchBackground, setSwitchBackground] = useState(false)
  const [unlockedBackgrounds, setUnlockedBackgrounds] = useState(0)

  const [benMoveTrue, setBenMoveTrue] = useState(
    JSON.parse(localStorage.getItem('benMoveTrue')) ?? true
  );

  const [playSound, setPlaySound] = useState(
    JSON.parse(localStorage.getItem('benSound')) ?? true
  );

  const [holdable, setHoldable] = useState(
    JSON.parse(localStorage.getItem('holdable')) ?? true
  );

  // const [rainbow, setRainbow] = useState(
  //   JSON.parse(localStorage.getItem('rainbow')) ?? false
  // );

  const x = -50;
  const y = -65;
  const staticMovement = {
    transform: `translate(${x}%, ${y}%) `,
  }

  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);
  const [ultraRebirths, setUltraRebirths] = useState(0);


  const deleteSave = () => {
    setCount(0);
    setMultiplier(1);
    setAutoClickers(0);
    setUltraRebirths(0);
    localStorage.removeItem('benClickerSave');
    localStorage.removeItem('benMoveTrue');
    localStorage.removeItem('selectedSkin');
    localStorage.removeItem('selectedBackground');
    alert("Dein Spielstand wurde gelöscht!");
    window.location.reload();
  }

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('benClickerSave'));
    if (saved) {
      setCount(saved.count || 0);
      setMultiplier(saved.multiplier || 1);
      setAutoClickers(saved.autoClickers || 0);
      setUltraRebirths(saved.ultraRebirths || 0);
    }
  }, []);

  const saveGame = (newState = {}) => {
    const data = {
      count,
      multiplier,
      autoClickers,
      ultraRebirths,
      ...newState,
    };
    localStorage.setItem('benClickerSave', JSON.stringify(data));
  };

  const handleClick = () => {
    if (playSound) { benSound.play(); }
    const gain = multiplier * (ultraRebirths + 1) * backgroundMultiplier;
    setCount(prev => {
      const updated = prev + gain;
      saveGame({ count: updated });
      return updated;
    });
  };

  const multiplierCost = (level = multiplier) => {
    const base = 40 + Math.pow(level, 1.3) * 10;
    const rebirthFactor = 1 + ultraRebirths * 0.05;
    return Math.floor(base * rebirthFactor);
  };

  const autoClickerCost = (level = autoClickers) => {
    const base = 80 + Math.pow(level, 1.2) * 20;
    const rebirthFactor = 1 + ultraRebirths * 0.05;
    return Math.floor(base * rebirthFactor);
  };

  const totalMultiplierCost = (amount) => {
    let cost = 0;
    for (let i = 0; i < amount; i++) {
      cost += multiplierCost(multiplier + i);
    }
    return cost;
  };

  const totalAutoClickerCost = (amount) => {
    let cost = 0;
    for (let i = 0; i < amount; i++) {
      cost += autoClickerCost(autoClickers + i);
    }
    return cost;
  };

  const getUltraRebirthCost = (ultraRebirths) => {
    let cost = 250000;
    for (let i = 1; i <= ultraRebirths; i++) {
      if (i % 2 === 0) {
        cost *= 4; // jeder 2. = 4× so teuer
      } else {
        cost *= 2; // sonst = 2× so teuer
      }
    }
    return cost;
  };

  const buyMultiplier = () => {
    const cost = multiplierCost();
    if (count >= cost) {
      const newCount = count - cost;
      const newMultiplier = multiplier + 1;
      setCount(newCount);
      setMultiplier(newMultiplier);
      saveGame({ count: newCount, multiplier: newMultiplier });
    }
  };

  const buyAutoClicker = () => {
    const cost = autoClickerCost();
    if (count >= cost) {
      const newCount = count - cost;
      const newAutoClickers = autoClickers + 1;
      setCount(newCount);
      setAutoClickers(newAutoClickers);
      saveGame({ count: newCount, autoClickers: newAutoClickers });
    }
  };


  const buyMultiplierX5 = () => {
    const cost = totalMultiplierCost(5);
    if (count >= cost) {
      const newCount = count - cost;
      const newMultiplier = multiplier + 5;
      setCount(newCount);
      setMultiplier(newMultiplier);
      saveGame({ count: newCount, multiplier: newMultiplier });
    }
  };


  const buyMultiplierX10 = () => {
    let totalCost = 0;
    for (let i = 0; i < 10; i++) {
      totalCost += multiplierCost(multiplier + i);
    }
    if (count >= totalCost) {
      setCount(count - totalCost);
      setMultiplier(multiplier + 10);
      saveGame({ count: count - totalCost, multiplier: multiplier + 10 });
    }
  };

  const buyMultiplierX100 = () => {
    const cost = totalMultiplierCost(100);
    if (count >= cost) {
      const newCount = count - cost;
      const newMultiplier = multiplier + 100;
      setCount(newCount);
      setMultiplier(newMultiplier);
      saveGame({ count: newCount, multiplier: newMultiplier });
    }
  };

  const buyMultiplierX1000 = () => {
    const cost = totalMultiplierCost(1000);
    if (count >= cost) {
      const newCount = count - cost;
      const newMultiplier = multiplier + 1000;
      setCount(newCount);
      setMultiplier(newMultiplier);
      saveGame({ count: newCount, multiplier: newMultiplier });
    }
  };

  const buyMultiplierX10000 = () => {
    const cost = totalMultiplierCost(10000);
    if (count >= cost) {
      const newCount = count - cost;
      const newMultiplier = multiplier + 10000;
      setCount(newCount);
      setMultiplier(newMultiplier);
      saveGame({ count: newCount, multiplier: newMultiplier });
    }
  };

  const buyMultiplierX100000 = () => {
    const cost = totalMultiplierCost(100000);
    if (count >= cost) {
      const newCount = count - cost;
      const newMultiplier = multiplier + 100000;
      setCount(newCount);
      setMultiplier(newMultiplier);
      saveGame({ count: newCount, multiplier: newMultiplier });
    }
  };

  const buyMultiplierX1000000 = () => {
    const cost = totalMultiplierCost(1000000);
    if (count >= cost) {
      const newCount = count - cost;
      const newMultiplier = multiplier + 1000000;
      setCount(newCount);
      setMultiplier(newMultiplier);
      saveGame({ count: newCount, multiplier: newMultiplier });
    }
  };

  const buyAutoClickerX5 = () => {
    let totalCost = 0;
    for (let i = 0; i < 5; i++) {
      totalCost += autoClickerCost(autoClickers + i);
    }
    if (count >= totalCost) {
      setCount(count - totalCost);
      setAutoClickers(autoClickers + 5);
      saveGame({ count: count - totalCost, autoClickers: autoClickers + 5 });
    }
  };

  const buyAutoClickerX10 = () => {
    let totalCost = 0;
    for (let i = 0; i < 10; i++) {
      totalCost += autoClickerCost(autoClickers + i);
    }
    if (count >= totalCost) {
      setCount(count - totalCost);
      setAutoClickers(autoClickers + 10);
      saveGame({ count: count - totalCost, autoClickers: autoClickers + 10 });
    }
  };

  const buyAutoClickerX100 = () => {
    const totalCost = totalAutoClickerCost(100);
    if (count >= totalCost) {
      const newCount = count - totalCost;
      const newAutoClickers = autoClickers + 100;
      setCount(newCount);
      setAutoClickers(newAutoClickers);
      saveGame({ count: newCount, autoClickers: newAutoClickers });
    }
  };

  const buyAutoClickerX1000 = () => {
    const totalCost = totalAutoClickerCost(1000);
    if (count >= totalCost) {
      const newCount = count - totalCost;
      const newAutoClickers = autoClickers + 1000;
      setCount(newCount);
      setAutoClickers(newAutoClickers);
      saveGame({ count: newCount, autoClickers: newAutoClickers });
    }
  };

  const buyAutoClickerX10000 = () => {
    const totalCost = totalAutoClickerCost(10000);
    if (count >= totalCost) {
      const newCount = count - totalCost;
      const newAutoClickers = autoClickers + 10000;
      setCount(newCount);
      setAutoClickers(newAutoClickers);
      saveGame({ count: newCount, autoClickers: newAutoClickers });
    }
  };

  const buyAutoClickerX100000 = () => {
    const totalCost = totalAutoClickerCost(100000);
    if (count >= totalCost) {
      const newCount = count - totalCost;
      const newAutoClickers = autoClickers + 100000;
      setCount(newCount);
      setAutoClickers(newAutoClickers);
      saveGame({ count: newCount, autoClickers: newAutoClickers });
    }
  };

  const buyAutoClickerX1000000 = () => {
    const totalCost = totalAutoClickerCost(1000000);
    if (count >= totalCost) {
      const newCount = count - totalCost;
      const newAutoClickers = autoClickers + 1000000;
      setCount(newCount);
      setAutoClickers(newAutoClickers);
      saveGame({ count: newCount, autoClickers: newAutoClickers });
    }
  };

  const ultraRebirth = () => {
    const required = getUltraRebirthCost(ultraRebirths);
    if (count >= required) {
      playPhoneRing();
      setCount(0);
      setMultiplier(1);
      setAutoClickers(0);
      setSelectedSkin(selectedSkin + 1)
      localStorage.setItem('selectedSkin', selectedSkin + 1);
      const newRebirths = ultraRebirths + 1;
      setUltraRebirths(newRebirths);
      saveGame({
        count: 0,
        multiplier: 1,
        autoClickers: 0,
        ultraRebirths: newRebirths,
      });
    }
  };

  const benMoveToggle = () => {
    setBenMoveTrue(prev => {
      const newValue = !prev;
      localStorage.setItem('benMoveTrue', JSON.stringify(newValue));
      return newValue;
    });
  };

  useEffect(() => {
    localStorage.setItem('benMoveTrue', JSON.stringify(benMoveTrue));
  }, [benMoveTrue]);


  const benSoundToggle = () => {
    setPlaySound(prev => {
      const newValue = !prev;
      localStorage.setItem('benSound', JSON.stringify(newValue));
      return newValue;
    });
  }

  const holdToggler = () => {
    setHoldable(prev => {
      const newValue = !prev;
      localStorage.setItem('holdable', JSON.stringify(newValue));
      return newValue;
    });
  }

  const [selectedSkin, setSelectedSkin] = useState(
    Number(localStorage.getItem('selectedSkin')) || 0
  );

  const [selectedBackground, setSelectedBackGround] = useState(
    Number(localStorage.getItem('selectedBackground')) || 0
  );

  const backgroundMultiplier = backGrounds[selectedBackground]?.multiplier || 1;

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoClickers > 0) {
        const gained = autoClickers * multiplier * (ultraRebirths + 1) * backgroundMultiplier;
        setCount(prev => {
          const updated = prev + gained;
          saveGame({ count: updated });
          return updated;
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [autoClickers, multiplier, ultraRebirths, backgroundMultiplier]);

  const handleSkinSelect = (index) => {
    setSelectedSkin(index);
    localStorage.setItem('selectedSkin', index);
  };

  const handleBackgroundSelect = (index) => {
    setSelectedBackGround(index);
    localStorage.setItem('selectedBackground', index);
  }

  const handleSkinOptionClick = (event) => {
    const clicked = event.target.id

    if (clicked === "skinSetting") {
      setSwitchBackground(false)
    } else {
      setSwitchBackground(true)
    }
  }


  useEffect(() => {
    const backGroundCount = backGrounds.length

    setUnlockedBackgrounds(Math.min(
      Math.floor(ultraRebirths / 5),
      backGroundCount
    ));
  }, [backGrounds.length, ultraRebirths])

  return (
    <>
      <div className='maincontent'>
        <div className='headerContainer'>
          <strong id='item1'>Talking Ben Clicker by Scott</strong>
          <div id='item2'>(version 1.1.0 please kill me)</div>
        </div>

        <div className='benWrapper'>
          <div className='skinContainer'>
            <div className='skinWrapper'>
              {screenWidth >= 1025 &&
                <>
                  <button id='skinSetting' onClick={handleSkinOptionClick} >Skins</button>
                  <button id='backgroundSetting' onClick={handleSkinOptionClick} >Hintergründe</button>

                  {!switchBackground ? (
                    <>
                      <h2>Ben Skins</h2>
                      <div> {ultraRebirths + 1} / {skins.length} freigeschaltet</div>
                      <Skinlocker skins={skins} rebirthLevel={ultraRebirths} onSkinSelect={handleSkinSelect} />
                    </>
                  ) : (
                    <>
                      <h2>Ben Hintergründe</h2>
                      <div> {unlockedBackgrounds + 1 } / {backGrounds.length} freigeschaltet</div>
                      <BackgroundLocker backgrounds={backGrounds} rebirthLevel={ultraRebirths} onBackgroundSelect={handleBackgroundSelect} />
                    </>
                  )}


                </>
              }
            </div>
          </div>

          <div className='gameContainerWrapper'>
            <div className='gameContainer'>
              <div className='currentSkin'>Aktueller Skin: <strong>{skins[selectedSkin]?.description || "Standard Ben"}</strong></div>
              <div className='background'>
                <img src={BackgroundPicker(selectedBackground)} alt='ben'></img>

                <div className='figure' style={screenWidth >= 1025 && benMoveTrue ? moveMent : staticMovement}>
                  {holdable ? (
                    <HoldButton
                      onHold={handleClick}
                      interval={50}
                      buttonClass={"holdButton"}
                      children={
                        <img className="benFigure" src={SkinPicker(selectedSkin)} alt='ben' draggable="false" />
                      }
                    />
                  ) : (
                    // <img className="benFigure" src={SkinPicker(ultraRebirths)} alt='ben'  draggable="false"></img>
                    <img className="benFigure" src={SkinPicker(selectedSkin)} alt='ben' onClick={handleClick} draggable="false" />
                  )}
                </div>
              </div>
            </div>

            {screenWidth < 1025 && (
              <div>
                <div>Bens: <strong>{formatNumber(count)}</strong></div>
                <div>Multiplier: <strong>{formatNumber(multiplier)}</strong></div>
                <div>Auto Clickers: <strong>{formatNumber(autoClickers)}</strong></div>
                <div>Ultra Rebirths: <strong>{formatNumber(ultraRebirths)} (x{ultraRebirths + 1})</strong></div>
                <div>Raum Multiplier: <strong>x{formatNumber(backGrounds[selectedBackground]?.multiplier)}</strong></div>
                <div>Bens per second: <strong>{formatNumber(autoClickers * multiplier * (ultraRebirths + 1) * backgroundMultiplier)}</strong></div>
                <div>Bens per click: <strong>{formatNumber(multiplier * (ultraRebirths + 1) * backgroundMultiplier)}</strong></div>
              </div>
            )}

            {screenWidth >= 1025 && (
              <div className='downSection'>
                <div className='phoneContainer'>
                  <button className='phoneButton' onClick={ultraRebirth}>
                    <img src={Phone} alt='phone' />
                    <div>Ultra Rebirth ({formatNumber(getUltraRebirthCost(ultraRebirths))} Bens)</div>
                  </button>
                </div>

                <div>
                  <h2>Ben Clicker Stats</h2>


                  <div>
                    <div>Bens: <strong>{formatNumber(count)}</strong></div>
                    <div>Multiplier: <strong>{formatNumber(multiplier)}</strong></div>
                    <div>Auto Clickers: <strong>{formatNumber(autoClickers)}</strong></div>
                    <div>Ultra Rebirths: <strong>{formatNumber(ultraRebirths)} (x{ultraRebirths + 1})</strong></div>
                    <div>Raum Multiplier: <strong>x{formatNumber(backGrounds[selectedBackground]?.multiplier)}</strong></div>
                    <div>Bens per second: <strong>{formatNumber(autoClickers * multiplier * (ultraRebirths + 1) * backgroundMultiplier)}</strong></div>
                    <div>Bens per click: <strong>{formatNumber(multiplier * (ultraRebirths + 1) * backgroundMultiplier)}</strong></div>
                  </div>
                </div>
              </div>

            )}
          </div>


          <div className='statsContainer'>
            <div className='statsWrapper'>
              <BenClickControls
                onBuyMultiplier={buyMultiplier}
                onBuyMultiplierX5={buyMultiplierX5}
                onBuyMultiplierX10={buyMultiplierX10}
                onBuyMultiplierX100={buyMultiplierX100}
                onBuyMultiplierX1000={buyMultiplierX1000}
                onBuyMultiplierX10000={buyMultiplierX10000}
                onBuyMultiplierX100000={buyMultiplierX100000}
                onBuyMultiplierX1000000={buyMultiplierX1000000}
                onBuyAutoClicker={buyAutoClicker}
                onBuyAutoClickerX5={buyAutoClickerX5}
                onBuyAutoClickerX10={buyAutoClickerX10}
                onBuyAutoClickerX100={buyAutoClickerX100}
                onBuyAutoClickerX1000={buyAutoClickerX1000}
                onBuyAutoClickerX10000={buyAutoClickerX10000}
                onBuyAutoClickerX100000={buyAutoClickerX100000}
                onBuyAutoClickerX1000000={buyAutoClickerX1000000}
                multiplierCost={formatNumber(multiplierCost())}
                autoClickerCost={formatNumber(autoClickerCost())}
                totalMultiplierCostX5={formatNumber(totalMultiplierCost(5))}
                totalMultiplierCostX10={formatNumber(totalMultiplierCost(10))}
                totalMultiplierCostX100={formatNumber(totalMultiplierCost(100))}
                totalMultiplierCostX1000={formatNumber(totalMultiplierCost(1000))}
                totalMultiplierCostX10000={formatNumber(totalMultiplierCost(10000))}
                totalMultiplierCostX100000={formatNumber(totalMultiplierCost(100000))}
                totalMultiplierCostX1000000={formatNumber(totalMultiplierCost(1000000))}
                totalAutoClickerCostX5={formatNumber(totalAutoClickerCost(5))}
                totalAutoClickerCostX10={formatNumber(totalAutoClickerCost(10))}
                totalAutoClickerCostX100={formatNumber(totalAutoClickerCost(100))}
                totalAutoClickerCostX1000={formatNumber(totalAutoClickerCost(1000))}
                totalAutoClickerCostX10000={formatNumber(totalAutoClickerCost(10000))}
                totalAutoClickerCostX100000={formatNumber(totalAutoClickerCost(100000))}
                totalAutoClickerCostX1000000={formatNumber(totalAutoClickerCost(1000000))}
                ultraRebirths={ultraRebirths}
              // rainbowText={rainbow}
              />

              {screenWidth >= 1025 && (
                <>
                  <h2>Einstellungen</h2>
                  <div>
                    <input
                      type="checkbox"
                      id="benToggle"
                      checked={!benMoveTrue}
                      onChange={benMoveToggle}
                    />
                    <label htmlFor="benToggle">Ben Bewegung deaktivieren</label>
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      id="soundToggle"
                      checked={!playSound}
                      onChange={benSoundToggle}
                    />
                    <label htmlFor="soundToggle">Ben Sound deaktivieren</label>
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      id="holdToggle"
                      checked={!holdable}
                      onChange={holdToggler}
                    />
                    <label htmlFor="holdToggle">Holdable Klick deaktivieren</label>
                  </div>
                  <p><button id="deleteButton" onClick={deleteSave}>Spielstand löschen</button></p>
                </>
              )}
            </div>
          </div>


          {screenWidth < 1025 &&
            <>
              <div className='phoneContainer'>
                <button className='phoneButton' onClick={ultraRebirth}>
                  <img src={Phone} alt='phone' />
                  <div>Ultra Rebirth ({formatNumber(getUltraRebirthCost(ultraRebirths))} Bens)</div>
                </button>
              </div>

              <div className='buttonsSectionMobile'>
                <button className='showSkinsButton' onClick={() => setShowSkins(!showSkins)}>{`Skins ${!showSkins ? "anzeigen" : "verbergen"}`}</button>
                <button className='showSettingsButton' onClick={() => setShowSettings(!showSettings)}>
                  {`Einstellungen ${!showSettings ? "anzeigen" : "verbergen"}`}
                </button>
                <button className='showBackgroundButtons' onClick={() => setShowBackGrounds(!showBackgrounds)}>
                  {`Hintergründe ${!showBackgrounds ? "anzeigen" : "verbergen"}`}
                </button>
              </div>

              {showSkins &&
                <div className='skinContainer'>
                  <div className='skinWrapper'>
                    <Skinlocker skins={skins} rebirthLevel={ultraRebirths} onSkinSelect={handleSkinSelect} />
                  </div>
                </div>
              }

              {showBackgrounds &&
                <div className='skinContainer'>
                  <div className='skinWrapper'>
                    <BackgroundLocker backgrounds={backGrounds} rebirthLevel={ultraRebirths} onBackgroundSelect={handleBackgroundSelect} />
                  </div>
                </div>
              }

              {showSettings &&
                <>
                  <h2>Einstellungen</h2>
                  <div>
                    <input
                      type="checkbox"
                      id="benToggle"
                      checked={!benMoveTrue}
                      onChange={benMoveToggle}
                    />
                    <label htmlFor="benToggle">Ben Bewegung deaktivieren</label>
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      id="soundToggle"
                      checked={!playSound}
                      onChange={benSoundToggle}
                    />
                    <label htmlFor="soundToggle">Ben Sound deaktivieren</label>
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      id="holdToggle"
                      checked={!holdable}
                      onChange={holdToggler}
                    />
                    <label htmlFor="holdToggle">Holdable Klick deaktivieren</label>
                  </div>
                </>
              }
            </>
          }
        </div>
      </div>
    </>

  );
}

export default App;
