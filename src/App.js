import './App.css';
import Background from "./assets/BenRoom.jpg"
import Ben from "./assets/BenFigure.png"
import useScreenSize from './functionality/ScreenSize';
import Phone from "./assets/phone.png"

import { useBenMovement } from './functionality/BenMovement';
// import { playRandomSound } from './functionality/RandomAudioPicker';
import { playPhoneRing } from './functionality/PhoneRing';
import { useEffect, useState } from 'react';
import BenClickControls from './functionality/BenClickControls';
import { formatNumber } from './functionality/NumberFormatter';

function App() {
  const moveMent = useBenMovement();
  const screenSize = useScreenSize();
  const screenWidth = screenSize["width"];
  const benSound = new Audio("assets/sounds/ben.mp3");
  const [benMoveTrue, setBenMoveTrue] = useState(true)

  const x = -50;
  const y = -65;
  const staticMovement = {
    transform: `translate(${x}%, ${y}%) `,
  }

  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);
  const [ultraRebirths, setUltraRebirths] = useState(0);

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
    benSound.play();
    const gain = multiplier * (ultraRebirths + 1);
    setCount(prev => {
      const updated = prev + gain;
      saveGame({ count: updated });
      return updated;
    });
  };

  const buyMultiplier = () => {
    const cost = Math.floor(50 * Math.pow(1.5, multiplier - 1));
    if (count >= cost) {
      const newCount = count - cost;
      const newMultiplier = multiplier + 1;
      setCount(newCount);
      setMultiplier(newMultiplier);
      saveGame({ count: newCount, multiplier: newMultiplier });
    }
  };

  const buyAutoClicker = () => {
    const cost = Math.floor(100 * Math.pow(1.3, autoClickers));
    if (count >= cost) {
      const newCount = count - cost;
      const newAutoClickers = autoClickers + 1;
      setCount(newCount);
      setAutoClickers(newAutoClickers);
      saveGame({ count: newCount, autoClickers: newAutoClickers });
    }
  };

  const ultraRebirth = () => {
    if (count >= 1000000) {
      alert("Hello world")
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
              <img className="benFigure" src={Ben} alt='ben' onClick={handleClick}></img>
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

            <BenClickControls
              onBuyMultiplier={buyMultiplier}
              onBuyAutoClicker={buyAutoClicker}
              multiplierCost={Math.floor(50 * Math.pow(1.5, multiplier - 1))}
              autoClickerCost={Math.floor(100 * Math.pow(1.3, autoClickers))}
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
                    onChange={() => setBenMoveTrue(prev => !prev)}
                  />
                  <label htmlFor="benToggle">Ben Bewegung deaktivieren</label>
                </div>
              </>
            )}
          </div>
        </div>

        <div className='phoneContainer'>
          <button className='phoneButton' onClick={ultraRebirth}>
            <img src={Phone} alt='phone' />
            <div>Ultra Rebirth (1.000.000 Bens)</div>
          </button>
        </div>
      </div>
    </>

  );
}

export default App;
