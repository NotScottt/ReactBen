import './App.css';
import Background from "./assets/BenRoom.jpg"
import useScreenSize from './functionality/ScreenSize';
import Phone from "./assets/phone.png"

import { useBenMovement } from './functionality/BenMovement';
// import { playRandomSound } from './functionality/RandomAudioPicker';
import { playPhoneRing } from './functionality/PhoneRing';
import { useEffect, useState } from 'react';
import BenClickControls from './functionality/BenClickControls';
import { formatNumber } from './functionality/NumberFormatter';
import { SkinPicker } from './functionality/SkinPicker';

function App() {
  const moveMent = useBenMovement();
  const screenSize = useScreenSize();
  const screenWidth = screenSize["width"];
  const benSound = new Audio("assets/sounds/ben.mp3");
  const [benMoveTrue, setBenMoveTrue] = useState(
    JSON.parse(localStorage.getItem('benMoveTrue')) ?? true
  );

  const [playSound, setPlaySound] = useState(
    JSON.parse(localStorage.getItem('benSound')) ?? true
  );

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
    setBenMoveTrue(true);
    alert("Dein Spielstand wurde gelöscht!");
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoClickers > 0) {
        const gained = autoClickers * multiplier * (ultraRebirths + 1);
        setCount(prev => {
          const updated = prev + gained;
          saveGame({ count: updated });
          return updated;
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [autoClickers, multiplier, ultraRebirths]);

  const handleClick = () => {
    console.log(SkinPicker(ultraRebirths))
    if (playSound) { benSound.play(); }
    const gain = multiplier * (ultraRebirths + 1);
    setCount(prev => {
      const updated = prev + gain;
      saveGame({ count: updated });
      return updated;
    });
  };

  const buyMultiplier = () => {
    const cost = Math.floor(40 + Math.pow(multiplier, 1.5) * 10);
    if (count >= cost) {
      const newCount = count - cost;
      const newMultiplier = multiplier + 1;
      setCount(newCount);
      setMultiplier(newMultiplier);
      saveGame({ count: newCount, multiplier: newMultiplier });
    }
  };

  const buyAutoClicker = () => {
    const cost = Math.floor(80 + Math.pow(autoClickers, 1.4) * 20);
    if (count >= cost) {
      const newCount = count - cost;
      const newAutoClickers = autoClickers + 1;
      setCount(newCount);
      setAutoClickers(newAutoClickers);
      saveGame({ count: newCount, autoClickers: newAutoClickers });
    }
  };

  const ultraRebirth = () => {
    const required = (ultraRebirths + 1) * 250000;
    if (count >= required) {
      playPhoneRing();
      setCount(0);
      setMultiplier(1);
      setAutoClickers(0);
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


  return (
    <>
      <div className='maincontent'>
        <div className='headerContainer'>
          <strong id='item1'>Talking Ben by Scott</strong>
          <div id='item2'>(Please kill me)</div>
        </div>


        <div className='benWrapper'>
          <div className='gameContainer'>
            <div className='background'>
              <img src={Background} alt='ben'></img>
            </div>

            {/* <div className='figure' style={screenWidth >= 1025 ? staticMovement : staticMovement}> */}
            <div className='figure' style={screenWidth >= 1025 && benMoveTrue ? moveMent : staticMovement}>
              <img className="benFigure" src={SkinPicker(ultraRebirths)} alt='ben' onClick={handleClick}></img>
            </div>
          </div>

          <div className='statsContainer'>
            {screenWidth >= 1025 ? (
              <h1>Ben Clicker Stats</h1>
            ) : (
              <h3>Ben Clicker Stats</h3>
            )}
            <div>Bens: <strong>{formatNumber(count)}</strong></div>
            <div>Multiplier: <strong>{formatNumber(multiplier)}</strong></div>
            <div>Auto Clickers: <strong>{formatNumber(autoClickers)}</strong></div>
            <div>Ultra Rebirths: <strong>{formatNumber(ultraRebirths)}</strong></div>
            <div>Bens per second: <strong>{formatNumber(autoClickers * multiplier * (ultraRebirths + 1))}</strong></div>
            <div>Bens per click: <strong>{formatNumber(multiplier * (ultraRebirths + 1))}</strong></div>
            <br />
            <BenClickControls
              onBuyMultiplier={buyMultiplier}
              onBuyAutoClicker={buyAutoClicker}
              multiplierCost={formatNumber(Math.floor(40 + Math.pow(multiplier, 1.5) * 10))}
              autoClickerCost={formatNumber(Math.floor(80 + Math.pow(autoClickers, 1.4) * 20))}
            />

            {screenWidth >= 1025 && (
              <>
                <br /><br /><br /><br />

                <h1>Einstellungen</h1>
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
                <p><button id="deleteButton" onClick={deleteSave}>Spielstand löschen</button></p>
              </>
            )}
          </div>
        </div>

        <div className='phoneContainer'>
          <button className='phoneButton' onClick={ultraRebirth}>
            <img src={Phone} alt='phone' />
            <div>Ultra Rebirth ({formatNumber((ultraRebirths + 1) * 250000)})</div>
          </button>
        </div>
      </div>
    </>

  );
}

export default App;
