const ipc = require("node-ipc").default;
const binutils = require("binutils");
const NodeIPC = require("@fynnix/node-easy-ipc");
const WebSocket = require("ws");
const { ReadChar } = require("./utils/functions");
const {
  // DriverCategory,
  // CupCategory,
  // CarLocationEnum,
  // SessionPhase,
  // RaceSessionType,
  // BroadcastingCarEventType,
  // NationalityEnum,
  ACC_STATUS,
  ACC_SESSION_TYPE,
  ACC_FLAG_TYPE,
  ACC_PENALTY_TYPE,
  ACC_TRACK_GRIP_STATUS,
  ACC_RAIN_INTENSITY,
} = require("./utils/enums");

let m_graphics = new NodeIPC.FileMapping();
let m_physics = new NodeIPC.FileMapping();

const ReadPhysics = () => {
  const m_physics_length = 1580;
  const FilePhysics_Path = "Local\\acpmf_physics";
  const m_physics_buffer = Buffer.alloc(m_physics_length);

  m_physics.createMapping(null, FilePhysics_Path, m_physics_length);

  m_physics.readInto(0, m_physics_length, m_physics_buffer);

  let result = {};
  const reader = new binutils.BinaryReader(m_physics_buffer, "little");

  result.packetId = reader.ReadUInt32();
  result.gas = reader.ReadFloat();
  result.brake = reader.ReadFloat();
  result.fuel = reader.ReadFloat();
  result.gear = reader.ReadUInt32() - 1;
  result.rpm = reader.ReadUInt32();
  result.steerAngle = reader.ReadFloat();
  result.speedKmh = reader.ReadFloat();
  result.velocity = [];
  for (let i = 0; i < 3; i++) result.velocity.push(reader.ReadFloat());

  result.accG = [];
  for (let i = 0; i < 3; i++) result.accG.push(reader.ReadFloat());

  result.wheelSlip = [];
  for (let i = 0; i < 4; i++) result.wheelSlip.push(reader.ReadFloat());

  /* Field is not used by ACC */
  const wheelLoad = [];
  for (let i = 0; i < 4; i++) wheelLoad.push(reader.ReadFloat());

  result.wheelPressure = [];
  for (let i = 0; i < 4; i++) result.wheelPressure.push(reader.ReadFloat());

  result.wheelAngularSpeed = [];
  for (let i = 0; i < 4; i++) result.wheelAngularSpeed.push(reader.ReadFloat());

  const tyreWear = [];
  for (let i = 0; i < 4; i++) tyreWear.push(reader.ReadFloat());

  const tyreDirtyLevel = [];
  for (let i = 0; i < 4; i++) tyreDirtyLevel.push(reader.ReadFloat());

  result.TyreCoreTemp = [];
  for (let i = 0; i < 4; i++) result.TyreCoreTemp.push(reader.ReadFloat());

  const camberRAD = [];
  for (let i = 0; i < 4; i++) camberRAD.push(reader.ReadFloat());

  result.suspensionTravel = [];
  for (let i = 0; i < 4; i++) result.suspensionTravel.push(reader.ReadFloat());

  const drs = reader.ReadFloat();
  result.tc = reader.ReadFloat();
  result.heading = reader.ReadFloat();
  result.pitch = reader.ReadFloat();
  result.roll = reader.ReadFloat();
  const cgHeight = reader.ReadFloat();

  result.carDamage = [];
  for (let i = 0; i < 5; i++) result.carDamage.push(reader.ReadFloat());

  const numberOfTyresOut = reader.ReadUInt32();
  result.pitLimiterOn = reader.ReadUInt32() > 0;
  result.abs = reader.ReadFloat();
  const kersChange = reader.ReadFloat();
  const kersInput = reader.ReadFloat();
  result.autoshifterOn = reader.ReadUInt32() > 0;

  const rideHeight = [];
  for (let i = 0; i < 2; i++) rideHeight.push(reader.ReadFloat());

  result.turboBoost = reader.ReadFloat();
  const ballast = reader.ReadFloat();
  const airDensity = reader.ReadFloat();
  result.airTemp = reader.ReadFloat();
  result.roadTemp = reader.ReadFloat();

  result.localAngularVel = [];
  for (let i = 0; i < 3; i++) result.localAngularVel.push(reader.ReadFloat());

  result.finalFF = reader.ReadFloat();
  const performanceMeter = reader.ReadFloat();
  const engineBrake = reader.ReadUInt32();
  const ersRecoveryLevel = reader.ReadUInt32();
  const ersPowerLevel = reader.ReadUInt32();
  const ersHeatCharging = reader.ReadUInt32();
  const ersIsCharging = reader.ReadUInt32() > 0;
  result.kersCurrentKJ = reader.ReadFloat();
  const drsAvailable = reader.ReadUInt32() > 0;
  const drsEnabled = reader.ReadUInt32() > 0;

  result.brakeTemp = [];
  for (let i = 0; i < 4; i++) result.brakeTemp.push(reader.ReadFloat());

  result.clutch = reader.ReadFloat();

  const tyreTempI = [];
  for (let i = 0; i < 4; i++) tyreTempI.push(reader.ReadFloat());

  const tyreTempM = [];
  for (let i = 0; i < 4; i++) tyreTempM.push(reader.ReadFloat());

  const tyreTempO = [];
  for (let i = 0; i < 4; i++) tyreTempO.push(reader.ReadFloat());

  result.isAIControlled = reader.ReadUInt32() > 0;

  result.tyreContactPoint = [];
  for (let i = 0; i < 4; i++) {
    const arr = [];
    for (let j = 0; j < 3; j++) arr.push(reader.ReadFloat());

    result.tyreContactPoint.push(arr);
  }

  result.tyreContactNormal = [];
  for (let i = 0; i < 4; i++) {
    const arr = [];
    for (let j = 0; j < 3; j++) arr.push(reader.ReadFloat());

    result.tyreContactNormal.push(arr);
  }

  result.tyreContactHeading = [];
  for (let i = 0; i < 4; i++) {
    const arr = [];
    for (let j = 0; j < 3; j++) arr.push(reader.ReadFloat());

    result.tyreContactHeading.push(arr);
  }

  result.brakeBias = reader.ReadFloat();

  result.localVelocity = [];
  for (let i = 0; i < 3; i++) result.localVelocity.push(reader.ReadFloat());

  const P2PActivation = reader.ReadUInt32();
  const P2PStatus = reader.ReadUInt32();
  const currentMaxRpm = reader.ReadFloat();

  const mz = [];
  for (let i = 0; i < 4; i++) mz.push(reader.ReadFloat());

  const fx = [];
  for (let i = 0; i < 4; i++) fx.push(reader.ReadFloat());

  const fy = [];
  for (let i = 0; i < 4; i++) fy.push(reader.ReadFloat());

  result.slipRatio = [];
  for (let i = 0; i < 4; i++) result.slipRatio.push(reader.ReadFloat());

  result.slipAngle = [];
  for (let i = 0; i < 4; i++) result.slipAngle.push(reader.ReadFloat());

  const tcinAction = reader.ReadUInt32();
  const absInAction = reader.ReadUInt32();

  const suspensionDamage = [];
  for (let i = 0; i < 4; i++) suspensionDamage.push(reader.ReadFloat());

  const tyreTemp = [];
  for (let i = 0; i < 4; i++) tyreTemp.push(reader.ReadFloat());

  result.waterTemp = reader.ReadFloat();

  result.brakePressure = [];
  for (let i = 0; i < 4; i++) result.brakePressure.push(reader.ReadFloat());

  result.frontBrakeCompound = reader.ReadUInt32();
  result.rearBrakeCompound = reader.ReadUInt32();

  result.padLife = [];
  for (let i = 0; i < 4; i++) result.padLife.push(reader.ReadFloat());

  result.discLife = [];
  for (let i = 0; i < 4; i++) result.discLife.push(reader.ReadFloat());

  result.ignitionOn = reader.ReadUInt32() > 0;
  result.starterEngineOn = reader.ReadUInt32() > 0;
  result.isEngineRunning = reader.ReadUInt32() > 0;

  result.kerbVibration = reader.ReadFloat();
  result.slipVibrations = reader.ReadFloat();
  result.gVibrations = reader.ReadFloat();
  result.absVibrations = reader.ReadFloat();

  return result;
};

const ReadGraphics = () => {
  const m_graphics_length = 1580;
  const FileGraphicss_Path = "Local\\acpmf_graphics";
  const m_graphics_buffer = Buffer.alloc(m_graphics_length);

  // Store data to buffer
  m_graphics.createMapping(null, FileGraphicss_Path, m_graphics_length);
  m_graphics.readInto(0, m_graphics_length, m_graphics_buffer);

  let result = {};
  const reader = new binutils.BinaryReader(m_graphics_buffer, "little");

  result.packetId = reader.ReadUInt32();
  result.status = ACC_STATUS[reader.ReadUInt32().toString()];
  result.session = ACC_SESSION_TYPE[reader.ReadInt32().toString()];

  result.currentTime = [];
  for (let i = 0; i < 15; i++) result.currentTime.push(ReadChar(reader));

  result.lastTime = [];
  for (let i = 0; i < 15; i++) result.lastTime.push(ReadChar(reader));

  result.bestTime = [];
  for (let i = 0; i < 15; i++) result.bestTime.push(ReadChar(reader));

  result.split = [];
  for (let i = 0; i < 15; i++) result.split.push(ReadChar(reader));

  result.completedLaps = reader.ReadUInt32();
  result.position = reader.ReadUInt32();
  result.iCurrentTime = reader.ReadUInt32();
  result.iLastTime = reader.ReadUInt32();
  result.iBestTime = reader.ReadUInt32();
  result.sessionTimeLeft = reader.ReadFloat();
  result.distanceTraveled = reader.ReadFloat();
  result.isInPit = reader.ReadUInt32() > 0;
  result.currentSectorIndex = reader.ReadUInt32();
  result.lastSectorTime = reader.ReadUInt32();
  result.numberOfLaps = reader.ReadUInt32();

  result.tyreCompound = [];
  for (let i = 0; i < 34; i++) result.tyreCompound.push(ReadChar(reader));

  const replayTimeMultiplier = reader.ReadFloat();
  result.normalizedCarPosition = reader.ReadFloat();
  result.activeCars = reader.ReadUInt32();

  result.carCoordinates = [];
  for (let i = 0; i < 60; i++) {
    const arr = [];
    for (let j = 0; j < 3; j++) arr.push(reader.ReadFloat());

    result.carCoordinates.push(arr);
  }

  result.carID = [];
  for (let j = 0; j < 60; j++) result.carID.push(reader.ReadUInt32());

  result.playerCarID = reader.ReadUInt32();
  result.penaltyTime = reader.ReadFloat();
  result.flag = new ACC_FLAG_TYPE()[reader.ReadUInt32().toString()];
  result.penalty = new ACC_PENALTY_TYPE()[reader.ReadUInt32().toString()];
  result.idealLineOn = reader.ReadUInt32() > 0;
  result.isInPitLane = reader.ReadUInt32() > 0;
  result.surfaceGrip = reader.ReadFloat();
  result.mandatoryPitDone = reader.ReadUInt32() > 0;
  result.windSpeed = reader.ReadFloat();
  result.windDirection = reader.ReadFloat();
  result.isSetupMenuVisible = reader.ReadUInt32() > 0;
  result.mainDisplayIndex = reader.ReadUInt32();
  result.secondaryDisplyIndex = reader.ReadUInt32();
  result.TC = reader.ReadUInt32();
  result.TCCUT = reader.ReadUInt32();
  result.EngineMap = reader.ReadUInt32();
  result.ABS = reader.ReadUInt32();
  result.fuelXLap = reader.ReadFloat();
  result.rainLights = reader.ReadUInt32() > 0;
  result.flashingLights = reader.ReadUInt32() > 0;
  result.lightsStage = reader.ReadUInt32();
  result.exhaustTemperature = reader.ReadFloat();
  result.wiperLV = reader.ReadUInt32();
  result.driverStintTotalTimeLeft = reader.ReadInt32();
  result.driverStintTimeLeft = reader.ReadInt32();
  result.rainTyres = reader.ReadUInt32() > 0;
  result.sessionIndex = reader.ReadUInt32();
  result.usedFuel = reader.ReadFloat();

  result.deltaLapTime = [];
  for (let i = 0; i < 16; i++) result.deltaLapTime.push(ReadChar(reader));

  result.iDeltaLapTime = reader.ReadUInt32();

  result.estimatedLapTime = [];
  for (let i = 0; i < 16; i++) result.estimatedLapTime.push(ReadChar(reader));

  result.iEstimatedLapTime = reader.ReadUInt32();

  result.isDeltaPositive = reader.ReadUInt32() > 0;
  result.iSplit = reader.ReadUInt32();
  result.isValidLap = reader.ReadUInt32() > 0;

  result.fuelEstimatedLaps = reader.ReadFloat();

  result.trackStatus = [];
  for (let i = 0; i < 34; i++) result.trackStatus.push(ReadChar(reader));

  result.missingMandatoryPits = reader.ReadUInt32();
  result.Clock = reader.ReadFloat();
  result.directionLightsLeft = reader.ReadUInt32() > 0;
  result.directionLightsRight = reader.ReadUInt32() > 0;
  result.GlobalYellow = reader.ReadUInt32() > 0;
  result.GlobalYellow1 = reader.ReadUInt32() > 0;
  result.GlobalYellow2 = reader.ReadUInt32() > 0;
  result.GlobalYellow3 = reader.ReadUInt32() > 0;
  result.GlobalWhite = reader.ReadUInt32() > 0;
  result.GlobalGreen = reader.ReadUInt32() > 0;
  result.GlobalChequered = reader.ReadUInt32() > 0;
  result.GlobalRed = reader.ReadUInt32() > 0;
  result.mfdTyreSet = reader.ReadUInt32();
  result.mfdFuelToAdd = reader.ReadFloat();
  result.mfdTyrePressureLF = reader.ReadFloat();
  result.mfdTyrePressureRF = reader.ReadFloat();
  result.mfdTyrePressureLR = reader.ReadFloat();
  result.mfdTyrePressureRR = reader.ReadFloat();
  result.trackGripStatus = new ACC_TRACK_GRIP_STATUS()[
    reader.ReadUInt32().toString()
  ];
  result.rainIntensity = new ACC_RAIN_INTENSITY()[
    reader.ReadUInt32().toString()
  ];
  result.rainIntensityIn10min = new ACC_RAIN_INTENSITY()[
    reader.ReadUInt32().toString()
  ];
  result.rainIntensityIn30min = new ACC_RAIN_INTENSITY()[
    reader.ReadUInt32().toString()
  ];
  result.currentTyreSet = reader.ReadUInt32();
  result.strategyTyreSet = reader.ReadUInt32();

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
      // TODO: Program a reconnect if server is out
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
        speed: Math.round(physicsResult.speedKmh),
        time: graphicsResult.iCurrentTime * 1000,
        tc: physicsResult.tc,
        abs: physicsResult.abs,
        gear: physicsResult.gear,
        rpm: physicsResult.rpm,
        steerAngle: Math.round(400 * physicsResult.steerAngle),  // Convert range to dynamic
        ffb: Math.round(Math.abs(physicsResult.finalFF * 100)),
      };
      const resultString = JSON.stringify(result);
      ws.send(resultString);
    }, 1000 / 30);

    // ws.on("error", function message(data) {
    //   console.error('Socket encountered error: ', err.message, 'Closing socket');
    //   ws.close();
    // });
  });
};

connectDebug = () => {
  setInterval(() => {
    const physicsResult = ReadPhysics();
    const graphicsResult = ReadGraphics();
  }, 100);
};

connect();
