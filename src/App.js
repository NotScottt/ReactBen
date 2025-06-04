import './App.css';
import Background from "./assets/BenRoom.jpg"
import Ben from "./assets/BenFigure.png"
import useScreenSize from './functionality/ScreenSize';
import Phone from "./assets/phone.png"

import { useBenMovement } from './functionality/BenMovement';
import { playRandomSound } from './functionality/RandomAudioPicker';
import { playPhoneRing } from './functionality/PhoneRing';

function App() {
  const moveMent = useBenMovement();
  const screenSize = useScreenSize();
  const screenWidth = screenSize["width"];

  const x = -50;
  const y = -65;
  const staticMovement = {
    transform: `translate(${x}%, ${y}%)`,
  }

  return (
    <>
      <div className='maincontent'>
        <div className='headerContainer'>
          <strong id='item1'>Talking Ben by Scott</strong>
          <div id='item2'>(Please kill me)</div>
        </div>


        <div className='gameContainer'>
          <div className='background'>
            <img src={Background} alt='ben'></img>
          </div>

          <div className='figure' style={screenWidth >= 1025 ? moveMent : staticMovement}>
            <img className="benFigure" src={Ben} alt='ben' onClick={playRandomSound}></img>
          </div>
        </div>

        {/* {screenWidth <= 1025 && ( */}
          <button className='phoneButton' onClick={playPhoneRing}>
            <img src={Phone} alt='phone'/>
          </button>
        {/* )} */}
      </div>
    </>

  );
}

export default App;
