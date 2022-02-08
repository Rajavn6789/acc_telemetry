import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Divider } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import CarChasis from "./components/CarChasis";
import GasBrakeChart from "./components/GasBrakeChart";
import SpeedChart from "./components/SpeedChart";
import ABSTCChart from "./components/ABSTCChart";
import RPMChart from "./components/RPMChart";
import GEARChart from "./components/GEARChart";
import FFBChart from "./components/FFBChart";
import SteerAngleChart from "./components/SteerAngleChart";
import { useInterval } from "./utils/hooks";
import { getRandomValue, getRandomTwoValues } from "./utils/functions";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./App.css";

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const maxItems = 200;

const loadDefaultValues = () => {
  const defaultArray = [...new Array(maxItems)].map((element, index) => {
    return {
      gas: 0,
      brake: 0,
      speed: 0,
      distance: index,
      tc: 0,
      abs: 0,
      gear: 0,
      rpm: 0,
      steerAngle: 0,
      ffb: 0,
      carDamage: [
        0, // front
        0, //rear
        0, //left
        0, // right
        0, // center
      ],
    };
  });
  return defaultArray;
};

function App() {
  const [data, setData] = useState(false);
  const [connStatus, setConnStatus] = useState("offline");

  const client = new W3CWebSocket("ws://127.0.0.1:8081");

  useEffect(() => {
    const defaultArray = loadDefaultValues();
    setData(defaultArray);
  }, []);

  const websocketConnection = () => {
    client.onopen = () => {
      console.log("Server Connected");
      setConnStatus("online");
    };

    client.onclose = () => {
      console.log("Server Disconnected");
      const defaultArray = loadDefaultValues();
      setData(defaultArray);
      setConnStatus("offline");
    };

    client.onmessage = (message) => {
      const telemetryData = JSON.parse(message.data);
      if (telemetryData.gear >= 0) {
        setData((oldArray) => {
          let clonedArr = [...oldArray];
          if (clonedArr.length > maxItems) {
            clonedArr.shift();
          }
          return [...clonedArr, telemetryData];
        });
      } else {
      }
    };
  };

  useEffect(() => {
    websocketConnection();
    return () => {
      client.close()
    }
  }, []);

  const handleConnect = () => {
    // if (connStatus === "offline") {
    //   setConnStatus("online");
    //   websocketConnection();
    // } else {
    //   setConnStatus("offline");
    //   client.close();
    // }
  };

  const getRecentData = (data, key) => {
    let finalData;
    if (data && data.length > 1) {
      finalData = data[data.length - 1][key];
    } else {
      finalData = false;
    }
    return finalData;
  };

  // Car Damage
  let carDamage;
  if (data && data.length > 1) {
    carDamage = data[data.length - 1].carDamage;
  } else {
    carDamage = [0, 0, 0, 0, 0];
  }

  
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
          <div className="user-info">
            <Button
              danger={connStatus === "offline"}
              icon={<PoweroffOutlined />}
              onClick={handleConnect}
            >
              {connStatus === "offline" ? "Connect" : "Disconnect"}
            </Button>
          </div>
          <Divider>User Info</Divider>
          <div className="user-info">
            <div>Name: Raja</div>
            <div>Online: Yes</div>
          </div>
          <Divider>ACC Info</Divider>
          <div className="user-info">
            <div>ACC Status: Replay</div>
            <div>Session Type: Race</div>
            <div>Clock: 12:00</div>
          </div>
          <Divider>Weather Info</Divider>
          <div className="user-info">
            <div>trackGripStatus: WET</div>
            <div>rainNow: ACC_DRIZZLE</div>
            <div>rainIn10min: ACC_LIGHT_RAIN</div>
            <div>rainIn30min: ACC_MEDIUM_RAIN</div>
          </div>
          <Divider>Damage Details</Divider>
          <div className="damage-indicator">
            <div>Car: Porsche 911</div>
            <CarChasis carDamage={carDamage} />
            <div>Total damage: {carDamage[4]}</div>
          </div>
          <Divider>Lap Info</Divider>
          <div className="user-info">
            <div>Position: 1</div>
            <div>currentSectorIndex: 1</div>
            <div>lastSectorTime: 1</div>
          </div>
          <Divider>Version</Divider>
          <div className="user-info">
            <div>Acc: 1.8.11</div>
            <div>Sharedmem: 1.8</div>
          </div>
        </Sider>
        <Layout style={{ marginLeft: 300 }}>
          <Header
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
          </Header>
          <Content style={{ marginTop: 50 }}>
            <div>
              <FFBChart data={data} />
              <SteerAngleChart data={data} />
              <GasBrakeChart data={data} />
              <SpeedChart data={data} />
              <RPMChart data={data} />
              <ABSTCChart data={data} />
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
