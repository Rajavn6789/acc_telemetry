const binutils = require("binutils");
const { ReadChar } = require("../functions");

const {
    ACC_STATUS,
    ACC_SESSION_TYPE,
    ACC_FLAG_TYPE,
    ACC_PENALTY_TYPE,
    ACC_TRACK_GRIP_STATUS,
    ACC_RAIN_INTENSITY,
  } = require("../enums");


const ReadGraphics = (m_graphics) => {
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

  module.exports = ReadGraphics;