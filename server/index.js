const WebSocket = require("ws");
const NodeIPC = require("@fynnix/node-easy-ipc");
const ReadStatic = require("./utils/sharedmem/static")
const ReadPhysics = require("./utils/sharedmem/physics")
const ReadGraphics = require("./utils/sharedmem/graphics")


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');


let m_graphics = new NodeIPC.FileMapping();
let m_physics = new NodeIPC.FileMapping();
let m_static =  new NodeIPC.FileMapping();

/* Web Server - for static data */

const app = express();

const ads = [
  {title: 'Hello, world (again)!'}
];

app.use(helmet());

app.use(bodyParser.json());

app.use(cors());

app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/static', (req, res) => {
  const staticResult = ReadStatic(m_static);
  const result = {
    smVersion: staticResult.smVersion.join(""),
    acVersion: staticResult.acVersion.join(""),
    numberOfSessions: staticResult.numberOfSessions,
    numCars: staticResult.numCars,
    carModel: staticResult.carModel.join(""),
    track: staticResult.track.join(""),
    playerName: staticResult.playerName.join(""),
    playerSurname: staticResult.playerSurname.join(""),
    playerNick: staticResult.playerNick.join(""),
  }
  
  res.send(result);
});

// starting the web server
app.listen(8080, () => {
  console.log('Webserver started at port 8080');
});


/* Web Sockets - for frequently changing data */
const startWSSServer = () => {
  
  const wss = new WebSocket.Server({ port: 8081 }, () =>
    console.log("Socker started at port: 8081")
  );

  wss.on("connection", function connection(ws, request, client) {

    ws.on("open", function open() {
      console.log("connected");
    });

    ws.on("close", function close() {
      console.log("disconnected");
      m_physics.closeMapping();
      m_graphics.closeMapping();
      m_static.closeMapping();
      ws.close();
    });

    ws.on("message", function message(data) {
      console.log(`Received message ${data} from user ${client}`);
    });

    setInterval(() => {
      const physicsResult = ReadPhysics(m_physics);
      const graphicsResult = ReadGraphics(m_graphics);
      const static = ReadStatic(m_static);


      const staticResult = {
        smVersion: static.smVersion.join(""),
        acVersion: static.acVersion.join(""),
        carModel: static.carModel.join(""),
        track: static.track.join(""),
        playerName: static.playerName.join(""),
        playerSurname: static.playerSurname.join(""),
        playerNick: static.playerNick.join(""),
      };

      const result = {
        gas: physicsResult.gas,
        brake: physicsResult.brake,
        speed: Math.round(physicsResult.speedKmh),
        tc: physicsResult.tc,
        abs: physicsResult.abs,
        gear: physicsResult.gear,
        rpm: physicsResult.rpm,
        isEngineRunning: physicsResult.rpm > 1000,
        steerAngle: Math.round(400 * physicsResult.steerAngle), //Make it dynamic for all cars
        ffb: Math.round(Math.abs(physicsResult.finalFF * 100)),
        carDamage: physicsResult.carDamage,
        suspensionTravel: physicsResult.suspensionTravel.map(item => item * 1000),
        wheelAngularSpeed: physicsResult.wheelAngularSpeed.map(item => Math.abs(Math.round(item))).slice(2, 4),
        accG:  physicsResult.accG.map(val => Math.floor((val + Number.EPSILON) * 100) / 100 ),
        time: graphicsResult.iCurrentTime/ 100,
        normalizedCarPosition: graphicsResult.normalizedCarPosition,
        ...staticResult
      };

      const resultString = JSON.stringify(result);
      ws.send(resultString);
    }, 1000 / 20);

    ws.on("error", function message(data) {
      console.error('Socket encountered error');
      ws.close();
    });
  });
};

connectDebug = () => {
  setInterval(() => {
    const physicsResult = ReadPhysics(m_physics);
    const graphicsResult = ReadGraphics(m_graphics);
    const staticResult = ReadStatic(m_static);
    console.log("graphicsResult.Clock", physicsResult.rpm)
  }, 1000);
};
const debug = false;
if(debug){
  connectDebug();
} else {
  startWSSServer();
}


