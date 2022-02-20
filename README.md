## ACC Telemetry
### Introduction
A realtime telemetry app for [Assetto Corsa Compitizione](https://www.assettocorsa.it/competizione/).
With ***acc-telemetry*** you can visualise the realtime telemetry data from the Assetto Corsa Compitizione in the form of graphs. Below are the supported graphs as of v1.0

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

### Running in local
1. Clone the repo
```sh
git clone https://github.com/Rajavn6789/acc_telemetry.git
```
> Server would start at port 8080
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

### References 
- [acc-node-wrapper](https://github.com/FynniX/acc-node-wrapper)

### License
MIT