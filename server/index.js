const WebSocket = require("ws");
const ACCNodeWrapper = require("acc-node-wrapper");
const wrapper = new ACCNodeWrapper();

/* Web Sockets - for frequently changing data */
const startWSSServer = () => {
  const wss = new WebSocket.Server({ port: 8081 }, () =>
    console.log("Socker started at port: 8081")
  );

  wss.on("connection", (ws) => {
    ws.on("open", () => {
      console.log("websocket open");
    });

    ws.on("message", (data) => {
      console.log("message from client");
      if (JSON.parse(data).msg === "ready_to_receive") {
        // send data to websocket
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
            carDamage: m_physics_result.carDamage.map(
              (val) => Math.round(val)
            ),
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
            exhaustTemperature: Math.round(
              m_graphics_result.exhaustTemperature
            ),
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
