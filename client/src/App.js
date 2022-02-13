import React, { useState, useEffect, useRef } from "react";
import { Layout, Menu, Button, Divider } from "antd";
import CarChasis from "./components/CarChasis";
import GasBrakeChart from "./components/GasBrakeChart";
import SpeedChart from "./components/SpeedChart";
import ABSTCChart from "./components/ABSTCChart";
import RPMChart from "./components/RPMChart";
import GEARChart from "./components/GEARChart";
import FFBChart from "./components/FFBChart";
import SteerAngleChart from "./components/SteerAngleChart";
import SuspensionTravelChart from "./components/SuspensionTravelChart";
import WheelSpeedChart from "./components/WheelSpeedChart";
import { getRandomValue, getRandomTwoValues } from "./utils/functions";
import Suzuka from "./components/tracks/Suzuka";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./App.css";

import {
  DesktopOutlined,
  PieChartOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const maxItems = 300;

const loadDefaultValues = () => {
  const defaultArray = [...new Array(maxItems)].map((element, index) => {
    return {
      gas: 0,
      brake: 0,
      speed: 0,
      time: index,
      tc: 0,
      abs: 0,
      gear: 0,
      rpm: 0,
      steerAngle: 0,
      ffb: 0,
      airTemp: 0,
      roadTemp: 0,
      carDamage: [0, 0, 0, 0],
      suspensionTravel: [0, 0, 0, 0],
      wheelAngularSpeed: [0, 0],
      trackGripStatus: "na",
      rainIntensity: "na",
      rainIntensityIn10min: "na",
      rainIntensityIn30min: "na",
      normalizedCarPosition: 0,
      playerNick: "n/a",
      track: "-",
      carModel: "n/a",
      smVersion: "-",
      acVersion: "-",
    };
  });
  return defaultArray;
};

function App() {
  const [data, setData] = useState(false);
  const [connStatus, setConnStatus] = useState("offline");
  const [accStatus, setAccStatus] = useState("offline");

  const webSocket = useRef(null);

  useEffect(() => {
    setData(loadDefaultValues());

    webSocket.current = new WebSocket("ws://127.0.0.1:8081");

    webSocket.current.onopen = () => {
      setConnStatus("online");
    };

    webSocket.current.onclose = () => {
      setData(loadDefaultValues());
      setConnStatus("offline");
    };

    webSocket.current.onmessage = (message) => {
      const telemetryData = JSON.parse(message.data);
      // TODO: Update static values once session is on, even without telemetry
      if (telemetryData.gear >= 0) {
        setAccStatus("online");
        setData((oldArray) => {
          let clonedArr = [...oldArray];
          if (clonedArr.length > maxItems) {
            clonedArr.shift();
          }
          return [...clonedArr, telemetryData];
        });
      } else {
        setAccStatus("offline");
        setData(loadDefaultValues());
      }
    };

    return () => webSocket.current.close();
  }, []);

  // Car Damage
  let carDamage;
  if (data && data.length > 1) {
    carDamage = data[data.length - 1].carDamage;
  } else {
    carDamage = [0, 0, 0, 0, 0];
  }

  const getRecentData = (data, key, defaultVal = 0) => {
    let output;
    if (data && data.length > 0) {
      output = data[data.length - 1][key];
    } else {
      output = defaultVal;
    }
    return output;
  };

  return (
    <>
      <Layout hasSider>
        <Sider
          width="299"
          theme="light"
          style={{
            overflow: "auto",
            marginRight: "1px solid white",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="logo-container">
            <span className="logo">ACCRAT</span>
            <span className="sub">Realtime Analytics Tool v1.0</span>
          </div>
          <Divider>Connection</Divider>
          <div className="connection-info">
            <div>
              <span style={{marginRight: 4}}>Server Status:</span>
              {connStatus === "online" ? (
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              ) : (
                <CloseCircleTwoTone twoToneColor="red" />
              )}
            </div>
            <div>
              <span style={{marginRight: 4}}>ACC Status:</span>
              {accStatus === "online" ? (
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              ) : (
                <CloseCircleTwoTone twoToneColor="red" />
              )}
            </div>
          </div>
          <Divider>User Info</Divider>
          <div className="user-info">
            <div>Name: {getRecentData(data, "playerNick")}</div>
            <div>Online: Yes</div>
          </div>
          {/* <Divider>ACC Info</Divider>
          <div className="user-info">
            <div>ACC Status: Replay</div>
            <div>Session Type: Race</div>
            <div>Clock: 12:00</div>
          </div>
          <Divider>Weather Info</Divider>
          <div className="user-info">
          <div>Air Temp: {getRecentData(data, 'airTemp')}&deg;C</div>
          <div>Road Temp: {getRecentData(data, 'roadTemp')}&deg;C</div>
            <div>trackGripStatus: {getRecentData(data, 'trackGripStatus', 'na')}</div>
            <div>rain: {getRecentData(data, 'rainIntensity','na')}</div>
            <div>rainIn10min: {getRecentData(data, 'rainIntensityIn10min','na')}</div>
            <div>rainIn30min: {getRecentData(data, 'rainIntensityIn30min','na')}</div>
          </div>
          <Divider>Lap Info</Divider>
          <div className="user-info">
            <div>Position: 1</div>
            <div>currentSectorIndex: 1</div>
            <div>lastSectorTime: 1</div>
          </div> */}
          <Divider>Damage Details</Divider>
          <div className="damage-indicator">
            <div>Car: {getRecentData(data, "carModel")}</div>
            <CarChasis carDamage={carDamage} />
            <div>Total damage: {carDamage[4]}</div>
          </div>
          <Divider>Track</Divider>
          <Suzuka
            normalizedCarPosition={getRecentData(data, "normalizedCarPosition")}
          />
        </Sider>
        <Layout style={{ marginLeft: 300 }}>
          {/* <Header
            style={{ position: "fixed", zIndex: 1, width: "100%", padding: 0 }}
          >
            <Menu
              theme="dark"
              style={{ background: "#292c30" }}
              mode="horizontal"
              defaultSelectedKeys={["basic"]}
            >
              <Menu.Item key="basic" icon={<PieChartOutlined />}>
                Standard
              </Menu.Item>
              <Menu.Item key="wheel" icon={<DesktopOutlined />}>
                Wheel
              </Menu.Item>
              <Menu.Item key="suspension" icon={<DesktopOutlined />}>
                Suspension
              </Menu.Item>
              <Menu.Item key="brakes" icon={<DesktopOutlined />}>
                Brakes
              </Menu.Item>
            </Menu>
          </Header> */}
          <Content style={{ /* marginTop: 50 */ }}>
            <div>
              <FFBChart data={data} />
              <GasBrakeChart data={data} />
              <ABSTCChart data={data} />
              <SuspensionTravelChart data={data} />
              <WheelSpeedChart data={data} />
              <SteerAngleChart data={data} />
              <SpeedChart data={data} />
              <RPMChart data={data} />
              <GEARChart data={data} />
            </div>
          </Content>
          <Footer style={{ textAlign: "center", padding: "12px 25px" }}>
            <div>
              ©2022 Designed and Developed by Raja (Data you see is realtime, no
              data is saved for post analysis)
            </div>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
