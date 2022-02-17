const WebSocket = require("ws");
const ACCNodeWrapper = require("acc-node-wrapper");
const wrapper = new ACCNodeWrapper();

/* Web Sockets */
const startWSSServer = () => {
  const wss = new WebSocket.Server({ port: 8080 }, () =>
    console.log("Telemetry server started at port: 8080")
  );

  wss.on("connection", (ws) => {
    ws.on("open", () => {
      console.log("websocket open");
    });

    ws.on("message", (data) => {
      if (JSON.parse(data).msg === "ready_to_receive") {
        console.log("UI connected and ready to receive");
        setInterval(() => {
          const { m_physics_result, m_graphics_result, m_static_result } =
            wrapper.getAllSharedMemory();
          const result = {
            gas: m_physics_result.gas,
            brake: m_physics_result.brake,
            speed: Math.round(m_physics_result.speedKmh),
            tc: m_physics_result.tc,
            abs: m_physics_result.abs,
            gear: m_physics_result.gear,
            rpm: m_physics_result.rpms,
            isEngineRunning: m_physics_result.rpms > 1000,
            steerAngle: Math.round(400 * m_physics_result.steerAngle), //Make it dynamic for all cars
            ffb: Math.round(Math.abs(m_physics_result.finalFF * 100)),
            carDamage: m_physics_result.carDamage.map((val) => Math.round(val)),
            suspensionTravel: m_physics_result.suspensionTravel.map(
              (item) => item * 1000
            ),
            wheelAngularSpeed: m_physics_result.wheelAngularSpeed
              .map((item) => Math.abs(Math.round(item)))
              .slice(2, 4),
            accG: m_physics_result.accG.map(
              (val) => Math.floor((val + Number.EPSILON) * 100) / 100
            ),
            time: m_graphics_result.iCurrentTime / 100,
            normalizedCarPosition: m_graphics_result.normalizedCarPosition,
            trackGripStatus: m_graphics_result.trackGripStatus,
            smVersion: m_static_result.smVersion.join(""),
            acVersion: m_static_result.acVersion.join(""),
            carModel: m_static_result.carModel.join(""),
            track: m_static_result.track.join(""),
            playerName: m_static_result.playerName.join(""),
            playerSurname: m_static_result.playerSurname.join(""),
            playerNick: m_static_result.playerNick.join(""),
            track: m_static_result.track,
            isMultiplayer: m_static_result.isOnline,
          };
          ws.send(JSON.stringify(result));
        }, 1000 / 10);
      } else {
        console.log("invalid message skip sending data");
      }
    });

    ws.on("close", () => {
      console.log("websocket disconnected");
      ws.close();
      wrapper.clearAllSharedMemory();
    });

    ws.on("error", () => {
      console.error("websocket error");
      ws.close();
      wrapper.clearAllSharedMemory();
    });
  });
};

startWSSServer();

process.stdin.resume(); //so the program will not close instantly

function exitHandler(options, exitCode) {
  if (options.cleanup) console.log("clean");
  if (exitCode || exitCode === 0) {
    wrapper.clearAllSharedMemory();
    console.log("Telemetry server stopped");
  };
  if (options.exit) process.exit();
}

//do something when app is closing
process.on("exit", exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on("SIGINT", exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on("uncaughtException", exitHandler.bind(null, { exit: true }));
