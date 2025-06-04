import './App.css';
import Background from "./assets/BenRoom.jpg"
import Ben from "./assets/BenFigure.png"
import { useBenMovement } from './functionality/BenMovement';
import { playRandomSound } from './functionality/RandomAudioPicker';

function App() {
  const moveMent = useBenMovement();

  return (
    <>
      <div className='maincontent'>
        <h2>Talking Ben by Scott</h2>

        <div className='gameContainer'>
          <div className='background'>
            <img src={Background} alt='ben'></img>
          </div>

          <div className='figure' style={moveMent}>
            <img src={Ben} alt='ben' onClick={playRandomSound}></img>
          </div>
        </div>
      </div>
    </>

  );
}

export default App;
