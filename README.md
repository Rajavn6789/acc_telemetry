## ACC Telemetry
### Introduction
ACC Telemetry helps to visualizes the realtime [Assetto Corsa Compitizione](https://www.assettocorsa.it/competizione/) HUD data via graphs. It includes all the items in the ACC HUD along with suspension travel, wheel speed, Damage indicator and Gforce indicator.

This tool doesn't persist data for offline analysis and all the data you see is realtime.

#### Graphs
- Force Feedback Graph -  to monitor and fix FFB clipping.
- Throttle-Brake Graph - to monitor throttle brake overlapping.
- ABS-TC Graph -  to understand when and how long ABS or TC is getting triggered.
- Speed Graph -  to monitor the speed.
- RPM Graph -  to monitor engine revs.
- Gear Graph -  to understand gear shift patterns.
- Suspension travel Graph - to monitor suspension travel.
- WheelSpeed Graph - to monitor rear wheel speeds and helps to adjust differential preloads
- Damage Indicator - to view damage on front, rear, left and right
- GForce meter - to view gforce transition during braking, acclerating and while turning left or right.

### Requirements
- Windows Machine to consume shared memory module.
- ACC game running.


### Architecture
![](https://github.com/Rajavn6789/acc_telemetry/blob/main/client/public/architecture.png)


### Components
- ACCTelemetry-server - CLI based application which reads the telemetry data from ACC shared memory.
- ACCTelemetry- UI - UI that receives the data from server and displays the data via charts, visualisations.

Visit [Racedepartment](https://www.racedepartment.com/downloads/acc-telemetry.48871) to download the server and ui exe or follow the below steps to start in local

### Start in local
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
- If Server is showing offline, reload the browser.
- If ACC Telemetry is showing offline, turn on the engine.

If something not working as expected or want to provide feedback feel free to use the issue section of the repo

### References 
- [acc-node-wrapper](https://github.com/FynniX/acc-node-wrapper)

### License
MIT
