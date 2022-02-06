import React, {useState, useEffect} from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import GasBrakeChart from "./components/GasBrakeChart"
import SpeedChart from './components/SpeedChart';
import { useInterval } from "./utils/hooks"
import './App.css';


const client = new W3CWebSocket('ws://127.0.0.1:8081');

const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    const filledArray = [...new Array(100)].map(() => {
      return {
        gas:0,
        brake:0,
        speed: 0,
        time: randomDate(new Date(2012, 0, 1), new Date())
      };
    });
    setData(filledArray)
  }, []);


  useInterval(() => {
    if(data){
    client.onopen = () => {
      console.log('Server Connected');
    };

    client.onclose = () => {
      console.log('Server Disconnected');
    };

    client.onmessage = (message) => {
      const telemetryData = JSON.parse(message.data);
      setData((oldArray ) => {
        let clonedArr = [...oldArray];
        if (clonedArr.length > 200) {
          clonedArr.shift();
        } 
        return [...clonedArr, telemetryData]
      });
    };

      // setData([
      //   ...data,
      //   { gas: Math.random(), brake: Math.random(), speed: Math.random() * 100, time: Date.now() },
      // ]);
   
    } else {
      console.log('data is not available')
    }
  }, 1000/30);

  return (
    <div className="App">
      <GasBrakeChart data={data}/>
      <SpeedChart data={data}/>
    </div>
  );
}

export default App;
