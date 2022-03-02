const round = (num) => {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
};

const carDetails = {
  amr_v8_vantage_gt3: {
    name: "Aston Martin V8 Vantage GT3 2019",
    maxSteering: 320,
  },
  audi_r8_lms_evo: {
    name: "Audi R8 LMS Evo 2019",
    maxSteering: 360,
  },
  honda_nsx_gt3_evo: {
    name: "Honda NSX GT3 Evo 2019",
    maxSteering: 310,
  },
  lamborghini_huracan_gt3_evo: {
    name: "Lamborghini Huracan GT3 EVO 2019",
    maxSteering: 310,
  },
  mclaren_720s_gt3: {
    name: "McLaren 720S GT3 2019",
    maxSteering: 240,
  },
  porsche_991ii_gt3_r: {
    name: "Porsche 911 II GT3 R 2019",
    maxSteering: 400,
  },
  ferrari_488_gt3_evo: {
    name: "Ferrari 488 GT3 Evo 2020",
    maxSteering: 240,
  },
  mercedes_amg_gt3_evo: {
    name: "Mercedes AMG GT3 Evo 2020",
    maxSteering: 320,
  },
  bmw_m4_gt3: {
    name: "BMW M4 vGT3 2021 ",
    maxSteering: 540,
  },
};

const gripStatus = {
  ACC_GREEN: "Green",
  ACC_FAST: "Fast",
  ACC_OPTIMUM: "Optimum",
  ACC_GREASY: "Greasy",
  ACC_DAMP: "Damp",
  ACC_WET: "Wet",
  ACC_FLOODED: "Flooded",
};

const getCarDetails = (key) => {
  let details;
  if (carDetails[key]) {
    details = carDetails[key];
  } else {
    details = {
      name: "na",
      maxSteering: 0,
    };
  }
  return details;
};

const getTrackGripStatus = (key) => {
  let status;
  if (gripStatus[key]) {
    status = gripStatus[key];
  } else {
    status = "na";
  }
  return status;
};


const getWheelAngularSpeedDiff = (wheelSpeed) => {
  return round( wheelSpeed[3] - wheelSpeed[2]);
};

module.exports = {
  round,
  getCarDetails,
  getTrackGripStatus,
  getWheelAngularSpeedDiff,
};
