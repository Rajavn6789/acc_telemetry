const ipc = require("node-ipc").default;
const binutils = require("binutils");
const NodeIPC = require("@fynnix/node-easy-ipc");
const WebSocket = require("ws");

const ACC_STATUS = {
  0: "AC_OFF",
  1: "AC_REPLAY",
  2: "AC_LIVE",
  3: "AC_PAUSE",
};

const ACC_SESSION_TYPE = {
  0: "AC_PRACTICE",
  1: "AC_QUALIFY",
  2: "AC_RACE",
  3: "AC_HOTLAP",
  4: "AC_TIME_ATTACK",
  5: "AC_DRIFT",
  6: "AC_DRAG",
  7: "AC_HOTSTINT",
  8: "AC_HOTLAPSUPERPOLE",
};

const ReadPhysics = () => {
  const m_physics_length = 1580;
  const FilePhysics_Path = "Local\\acpmf_physics";
  const m_physics_buffer = Buffer.alloc(m_physics_length);

  let m_physics = new NodeIPC.FileMapping();
  m_physics.createMapping(null, FilePhysics_Path, m_physics_length);

  m_physics.readInto(0, m_physics_length, m_physics_buffer);

  let result = {};
  const reader = new binutils.BinaryReader(m_physics_buffer, "little");

  result.packetId = reader.ReadUInt32();
  result.gas = reader.ReadFloat();
  result.brake = reader.ReadFloat();

  return result;
};

const ReadGraphics = () => {
  const m_graphics_length = 1580;
  const FileGraphicss_Path = "Local\\acpmf_graphics";
  const m_graphics_buffer = Buffer.alloc(m_graphics_length);

  // Store data to buffer
  let m_graphics = new NodeIPC.FileMapping();
  m_graphics.createMapping(null, FileGraphicss_Path, m_graphics_length);
  m_graphics.readInto(0, m_graphics_length, m_graphics_buffer);

  let result = {};
  const reader = new binutils.BinaryReader(m_graphics_buffer, "little");

  result.packetId = reader.ReadUInt32();
  result.status = ACC_STATUS[reader.ReadUInt32()];
  result.session = ACC_SESSION_TYPE[reader.ReadInt32()];

  return result;
};

const connect = () => {
const wss = new WebSocket.Server({ port: 8081 }, () =>
  console.log("Server started at port 8081!")
);

wss.on("connection", function connection(ws, request, client) {
  ws.on("open", function open() {
    console.log("connected");
  });

  ws.on("close", function close() {
    console.log("disconnected");
    // setTimeout(function() {
    //   connect();
    // }, 3000);
  });

  ws.on("message", function message(data) {
    console.log(`Received message ${data} from user ${client}`);
  });

  setInterval(() => {
    const physicsResult = ReadPhysics();
    const graphicsResult = ReadGraphics();
    const result = {
      gas: physicsResult.gas,
      brake: physicsResult.brake,
      session: graphicsResult.session,
      status: graphicsResult.status,
    };
    const resultString = JSON.stringify(result);
    ws.send(resultString);
  }, 10);


  // ws.on("error", function message(data) {
  //   console.error('Socket encountered error: ', err.message, 'Closing socket');
  //   ws.close();
  // });

});
}

connect();
