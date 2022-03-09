## ACC Telemetry
### Introduction
ACC Telemetry helps to visualizes the realtime [Assetto Corsa Compitizione](https://www.assettocorsa.it/competizione/) HUD data via graphs. It includes all the items in the ACC HUD along with suspension travel, wheel speed, Damage indicator and Gforce indicator.

This is a realtime telemetry tool and doesn't persist data for post analysis.

#### Graphs
- Force Feedback Graph
- Throttle+Brake Graph
- ABS+TC Graph
- Speed Graph
- RPM Graph
- Gear Graph
- Suspension travel Graph
- WheelSpeed Graph
- WheelSpeedDiff Graph
- TurboBoost Graph
- Tyre Core Temp
- Body damage and suspension damage. 
- GForce meter

### UI Screens
#### Basic Graphs
![](/client/public/assets/basic.png)
#### Suspension Graph
![](/client/public/assets/suspension.png)
#### Wheel Graphs
![](/client/public/assets/wheel.png)
#### Turbo Graph
![](/client/public/assets/turbo.png)
#### Damage and Gforce Indicator 
![](/client/public/assets/damage_gforce_indicator.png)


### Architecture
![](/client/public/assets/architecture.png)


### Running the App
There are two options

#### a) Download and Run the exe
Download and extract the source code from the [latest release](https://github.com/Rajavn6789/acc_telemetry/releases) or from [Racedepartment](https://www.racedepartment.com/downloads/acc-telemetry.48871)

1. Run the ACCTelemetry-server-V2.0.0.exe
2. Install the ACCTelemetry-installer-V2.0.0.exe
3. Open ACC and start the engine.

> While installing choose run anyway option if app gets blocked by Microsoft Defender. For Defender to recognise the app properly would require buying signed certificates which is currently out of my budget. Incase of doubt entire app is open source feel free to the read or contribute to the source code.


#### b) Build and Run the source code
1. Clone the repo
```sh
git clone https://github.com/Rajavn6789/acc_telemetry.git
```

2. Install the dependencies and start telemetry server
```sh
cd server
npm install
npm start
```

3. Install the dependencies and start UI
```sh
cd client
npm install
npm start
```
Visit [http://localhost:3000](http://localhost:3000) to view the UI

### Troubleshooting
- Telemetry not showing up, make sure Server, Engine and Telemetry all the three are green.
- Server offline, make sure the ACCTelemetry-server is running and click the refresh button.
- Engine/Telemetry is showing offline, Turn on the car engine.

### Thanks to
- [acc-node-wrapper](https://github.com/FynniX/acc-node-wrapper) for the acc shared memory wrapper.
- [mahsoommoosa42](https://github.com/mahsoommoosa42) for the chart suggestions/ideas.

### License
[Apache-2.0 License](/LICENSE)
