const binutils = require("binutils");
const { ReadChar } = require("../functions");

const ReadPhysics = (m_physics) => {
  const m_physics_length = 712;
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
  for (let i = 0; i < 5; i++) result.carDamage.push(Math.round(reader.ReadFloat()));

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

module.exports = ReadPhysics;