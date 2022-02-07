import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import GasBrakeChart from './components/GasBrakeChart';
import SpeedChart from './components/SpeedChart';
import ABSTCChart from './components/ABSTCChart';
import RPMChart from './components/RPMChart';
import GEARChart from './components/GEARChart';
import { useInterval } from './utils/hooks';
import { getRandomValue, getRandomTwoValues } from './utils/functions';
import './App.css';

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const client = new W3CWebSocket('ws://127.0.0.1:8081');

const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const maxItems = 250;

function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    const filledArray = [...new Array(maxItems)].map(() => {
      return {
        gas: 0,
        brake: 0,
        speed: 0,
        time: randomDate(new Date(2012, 0, 1), new Date()),
        tc: 0,
        abs: 0,
        gear: 0,
        rpm: 0,
      };
    });
    setData(filledArray);
  }, []);

  useInterval(() => {
    if (data) {
      client.onopen = () => {
        console.log('Server Connected');
      };

      client.onclose = () => {
        console.log('Server Disconnected');
      };

      client.onmessage = (message) => {
        const telemetryData = JSON.parse(message.data);
        setData((oldArray) => {
          let clonedArr = [...oldArray];
          if (clonedArr.length > maxItems) {
            clonedArr.shift();
          }
          return [...clonedArr, telemetryData];
        });
      };

      setData((oldArray) => {
        const telemetryData = {
          gas: getRandomValue(0, 1),
          brake: getRandomValue(0, 1),
          speed: getRandomValue(0, 250),
          time: Date.now(),
          tc: getRandomTwoValues(0,1),
          abs: getRandomTwoValues(0, 1),
          gear: getRandomTwoValues(0, 6),
          rpm: getRandomTwoValues(0, 9250)
        };
        let clonedArr = [...oldArray];
        if (clonedArr.length > maxItems) {
          clonedArr.shift();
        }
        return [...clonedArr, telemetryData];
      });
    } else {
      console.log('data is not available');
    }
  }, 1000 / 30);

  return (
    <>
      <Layout hasSider>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "#d9d9d9"
          }}
        >
           <div className="logo" >ACCRAT</div>
          <Menu theme="dark" defaultSelectedKeys={['basic']} mode="inline">
          <Menu.Item key="overview" icon={<PieChartOutlined />}>
              Overview
            </Menu.Item>
            <Menu.Item key="basic" icon={<PieChartOutlined />}>
              Basic
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
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Content>
            <div>
              <GasBrakeChart data={data} />
              <SpeedChart data={data} />
              <RPMChart data={data} />
              <ABSTCChart data={data} />
              <GEARChart data={data} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', padding: '12px 25px' }}>
            ©2022 Designed and Developed by Raja (This is only for realtime purposes, no data is saved for post analysis)
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
