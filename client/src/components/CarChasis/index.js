import React, { memo } from "react";

const CarChasis = ({ carDamage, suspensionDamage, tyreCoreTemp }) => {
  const [front, rear, left, right] = carDamage;
  const [sFL, sFR, sRL, sRR] = suspensionDamage;
  const [tTFL, tTFR, tTRL, tTRR] = tyreCoreTemp;

  const low = 1;
  const medium = 20;
  const hard = 75;

  const dynamicColor = (damage) => {
    let color;
    if (damage >= hard) {
      color = "#9f0000";
    } else if (damage > medium && damage < hard) {
      color = "orange";
    } else if (damage >= low && damage <= medium) {
      color = "#8ddb00";
    } else {
      color = "black";
    }
    return color;
  };

  const tyreColor = "#131313";
  const tyreTreadColor = "#303030";

  return (
    <svg version="1.1" viewBox="0 0 250 250">
      <g>
        <g>
          <path
            id="body__front"
            d="m178.46 36.91h-98.11s-3.59-9.89 0-14.08 95.54-3.85 98.11 0c1.71 2.94 0 14.08 0 14.08z"
            fill={dynamicColor(front)}
          ></path>
          <text x="50%" y="33" fill="white" font-size="8">
            {front}
          </text>
        </g>
        <g>
          <path
            id="body__rear"
            d="m79.52 207.29h98.11s3.59 9.89 0 14.08-95.54 3.85-98.11 0c-1.71-2.94 0-14.08 0-14.08z"
            fill={dynamicColor(rear)}
          />
          <text x="50%" y="220" fill="white" font-size="8">
            {rear}
          </text>
        </g>
        <rect
          transform="matrix(1.0368 0 0 -.90142 -1182.1 8244.7)"
          x="1245.8"
          y="8979.5"
          width="38.7"
          height="68.7"
          fill="#010101"
        />
        <rect
          transform="matrix(1.0305 0 0 -1.074 -1175.5 10375)"
          x="1247.1"
          y="9577.3"
          width="38.7"
          height="49"
          fill="#010101"
        />
        <g>
          <rect
            id="body__left"
            transform="matrix(1.0193 0 0 -.90915 -1450.8 8283.8)"
            x="1504"
            y="8944.5"
            width="27"
            height="68.7"
            fill={dynamicColor(left)}
          />
          <text x="95" y="50%" fill="white" font-size="8">
            {left}
          </text>
        </g>
        <rect
          transform="matrix(1.0305 0 0 -1.1345 -1175.5 10952)"
          x="1247.4"
          y="9470.5"
          width="38.7"
          height="51"
          fill="#010101"
        />
        <g>
          <rect
            id="body__right"
            transform="matrix(1.0193 0 0 -.90915 -1450.8 8283.8)"
            x="1570"
            y="8944.6"
            width="27"
            height="68.7"
            fill={dynamicColor(right)}
          />
          <text x="158" y="50%" fill="white" font-size="8">
            {right}
          </text>
        </g>
        <g transform="matrix(.88451 0 0 1 11.905 -.71592)">
          <g transform="translate(125 -17.844)">
            <g transform="translate(0 -.78504)">
              <g transform="translate(34.798 -.91122)">
                <rect
                  id="suspension__FL"
                  transform="scale(1,-1)"
                  x="-56.482"
                  y="-89.097"
                  width="7.6852"
                  height="10.94"
                  fill={sFL ? "#9f0000" : "#010101"}
                  stroke-width=".2129"
                />
                <g transform="translate(-1.6852 .57274)">
                  <path
                    d="m-79.405 98.351c0.45211 2.4675 1.3365 4.3307 3.33 5.89 1.41 0.92 1.31 0.9 9.37 0.86 7.11-0.04 7.6861-0.54114 8.3261-0.81114 1.55-0.67 3.2775-3.6644 3.6901-5.9388 0.05723-1.6788 0.05462-28.534 0.08651-29.588-0.04979-2.7913-2.5266-5.385-4.9027-6.6725-0.53842-0.27811-1.77-0.17-7.84-0.14-7.06 0.04-7.13 0.04-7.76 0.31-2.36 1.02-4 3.54-4.31 6.61-0.13 1.27-0.11 28.26 0.01 29.48z"
                    fill={tyreColor}
                  />
                  <g
                    transform="translate(-65.074 .35436)"
                    fill="none"
                    stroke={tyreTreadColor}
                  >
                    <path
                      d="m-14.029 71.594 3.4013-1.8645 3.8759 1.7211 3.7177-1.7211 3.8759 1.7928 3.6386-1.7928 2.9267 1.6494 2.7685-1.7928"
                      stroke-width="1.052px"
                    />
                    <path
                      d="m-13.139 66.616 2.7296-1.9396 3.5018 1.7436 3.3589-1.7436 3.5018 1.8163 3.2874-1.8163 2.6442 1.671 2.5013-1.8163"
                      stroke-width="1.0065px"
                    />
                    <path
                      d="m-14.124 76.289 3.4351-1.8645 3.9144 1.7211 3.7547-1.7211 3.9144 1.7928 3.6748-1.7928 2.9558 1.6494 2.5385-1.6916"
                      stroke-width="1.0572px"
                    />
                    <path
                      d="m-14.205 81.228 3.4578-1.863 3.9402 1.7197 3.7794-1.7197 3.9402 1.7913 3.699-1.7913 2.9753 1.648 2.4997-1.6901"
                      stroke-width="1.0603px"
                    />
                    <path
                      d="m-14.114 86.097 3.2577-1.8649 3.908 1.7215 3.7485-1.7215 3.908 1.7932 3.6687-1.7932 2.9509 1.6497 2.7914-1.7932"
                      stroke-width="1.0565px"
                    />
                    <path
                      d="m-14.15 90.584 3.3843-1.8657 3.8566 1.7222 3.6992-1.7222 3.8566 1.794 3.6205-1.794 2.9121 1.6504 2.7547-1.794"
                      stroke-width="1.0497px"
                    />
                    <path
                      d="m-14.018 95.211 3.2271-1.8155 3.8731 1.7226 3.715-1.7226 3.8731 1.7943 3.6359-1.7943 2.9246 1.6508 2.7665-1.7943"
                      stroke-width="1.0521px"
                    />
                    <path
                      d="m-13.564 99.911 3.0587-1.9167 3.8116 1.7226 3.6561-1.7226 3.8116 1.7943 3.5783-1.7943 2.8782 1.6508 2.7226-1.7943"
                      stroke-width="1.0437px"
                    />
                    <path
                      d="m-10.879 103.58 2.5622-1.863 2.9197 1.7196 2.8005-1.7196 2.9197 1.7913 2.7409-1.7913 2.2046 1.648 2.4092-1.7913"
                      stroke-width=".91268px"
                    />
                  </g>
                </g>
                <text
                  x="-75"
                  y="86.838823"
                  fill="#ffffff"
                  fontSize="9"
                  letterSpacing={0.5}
                  fontFamily="calibri"
                >
                  <tspan x="-75" y="86.838823" fontSize="9">
                    {tTFL}°
                  </tspan>
                </text>
              </g>
              <g transform="rotate(180 -9.1541 83.319)">
                <rect
                  id="suspension__FR"
                  transform="scale(1,-1)"
                  x="-56.482"
                  y="-89.097"
                  width="7.6852"
                  height="10.94"
                  fill={sFR ? "#9f0000" : "#010101"}
                  stroke-width=".2129"
                />
                <g transform="translate(-1.6852 .57274)">
                  <path
                    d="m-79.405 98.351c0.45211 2.4675 1.3365 4.3307 3.33 5.89 1.41 0.92 1.31 0.9 9.37 0.86 7.11-0.04 7.6861-0.54114 8.3261-0.81114 1.55-0.67 3.2775-3.6644 3.6901-5.9388 0.05723-1.6788 0.05462-28.534 0.08651-29.588-0.04979-2.7913-2.5266-5.385-4.9027-6.6725-0.53842-0.27811-1.77-0.17-7.84-0.14-7.06 0.04-7.13 0.04-7.76 0.31-2.36 1.02-4 3.54-4.31 6.61-0.13 1.27-0.11 28.26 0.01 29.48z"
                    fill={tyreColor}
                  />
                  <g
                    transform="translate(-65.074 .35436)"
                    fill="none"
                    stroke={tyreTreadColor}
                  >
                    <path
                      d="m-14.029 71.594 3.4013-1.8645 3.8759 1.7211 3.7177-1.7211 3.8759 1.7928 3.6386-1.7928 2.9267 1.6494 2.7685-1.7928"
                      stroke-width="1.052px"
                    />
                    <path
                      d="m-13.139 66.616 2.7296-1.9396 3.5018 1.7436 3.3589-1.7436 3.5018 1.8163 3.2874-1.8163 2.6442 1.671 2.5013-1.8163"
                      stroke-width="1.0065px"
                    />
                    <path
                      d="m-14.124 76.289 3.4351-1.8645 3.9144 1.7211 3.7547-1.7211 3.9144 1.7928 3.6748-1.7928 2.9558 1.6494 2.5385-1.6916"
                      stroke-width="1.0572px"
                    />
                    <path
                      d="m-14.205 81.228 3.4578-1.863 3.9402 1.7197 3.7794-1.7197 3.9402 1.7913 3.699-1.7913 2.9753 1.648 2.4997-1.6901"
                      stroke-width="1.0603px"
                    />
                    <path
                      d="m-14.114 86.097 3.2577-1.8649 3.908 1.7215 3.7485-1.7215 3.908 1.7932 3.6687-1.7932 2.9509 1.6497 2.7914-1.7932"
                      stroke-width="1.0565px"
                    />
                    <path
                      d="m-14.15 90.584 3.3843-1.8657 3.8566 1.7222 3.6992-1.7222 3.8566 1.794 3.6205-1.794 2.9121 1.6504 2.7547-1.794"
                      stroke-width="1.0497px"
                    />
                    <path
                      d="m-14.018 95.211 3.2271-1.8155 3.8731 1.7226 3.715-1.7226 3.8731 1.7943 3.6359-1.7943 2.9246 1.6508 2.7665-1.7943"
                      stroke-width="1.0521px"
                    />
                    <path
                      d="m-13.564 99.911 3.0587-1.9167 3.8116 1.7226 3.6561-1.7226 3.8116 1.7943 3.5783-1.7943 2.8782 1.6508 2.7226-1.7943"
                      stroke-width="1.0437px"
                    />
                    <path
                      d="m-10.879 103.58 2.5622-1.863 2.9197 1.7196 2.8005-1.7196 2.9197 1.7913 2.7409-1.7913 2.2046 1.648 2.4092-1.7913"
                      stroke-width=".91268px"
                    />
                  </g>
                </g>
                <text
                  x="62"
                  y="-83"
                  fill="#ffffff"
                  fontSize="9"
                  letterSpacing={0.5}
                  fontFamily="calibri"
                  transform="scale(-1.0196642,-0.98071502)"
                >
                  <tspan x="62" y="-83" fontSize="9">
                    {tTFR}°
                  </tspan>
                </text>
              </g>
              <g transform="rotate(180 -9.1416 141.27)">
                <rect
                  id="suspension__RR"
                  transform="scale(1,-1)"
                  x="-56.482"
                  y="-89.097"
                  width="7.6852"
                  height="10.94"
                  fill={sRR ? "#9f0000" : "#010101"}
                  stroke-width=".2129"
                />
                <g transform="translate(-1.6852 .57274)">
                  <path
                    d="m-79.405 98.351c0.45211 2.4675 1.3365 4.3307 3.33 5.89 1.41 0.92 1.31 0.9 9.37 0.86 7.11-0.04 7.6861-0.54114 8.3261-0.81114 1.55-0.67 3.2775-3.6644 3.6901-5.9388 0.05723-1.6788 0.05462-28.534 0.08651-29.588-0.04979-2.7913-2.5266-5.385-4.9027-6.6725-0.53842-0.27811-1.77-0.17-7.84-0.14-7.06 0.04-7.13 0.04-7.76 0.31-2.36 1.02-4 3.54-4.31 6.61-0.13 1.27-0.11 28.26 0.01 29.48z"
                    fill={tyreColor}
                  />
                  <g
                    transform="translate(-65.074 .35436)"
                    fill="none"
                    stroke={tyreTreadColor}
                  >
                    <path
                      d="m-14.029 71.594 3.4013-1.8645 3.8759 1.7211 3.7177-1.7211 3.8759 1.7928 3.6386-1.7928 2.9267 1.6494 2.7685-1.7928"
                      stroke-width="1.052px"
                    />
                    <path
                      d="m-13.139 66.616 2.7296-1.9396 3.5018 1.7436 3.3589-1.7436 3.5018 1.8163 3.2874-1.8163 2.6442 1.671 2.5013-1.8163"
                      stroke-width="1.0065px"
                    />
                    <path
                      d="m-14.124 76.289 3.4351-1.8645 3.9144 1.7211 3.7547-1.7211 3.9144 1.7928 3.6748-1.7928 2.9558 1.6494 2.5385-1.6916"
                      stroke-width="1.0572px"
                    />
                    <path
                      d="m-14.205 81.228 3.4578-1.863 3.9402 1.7197 3.7794-1.7197 3.9402 1.7913 3.699-1.7913 2.9753 1.648 2.4997-1.6901"
                      stroke-width="1.0603px"
                    />
                    <path
                      d="m-14.114 86.097 3.2577-1.8649 3.908 1.7215 3.7485-1.7215 3.908 1.7932 3.6687-1.7932 2.9509 1.6497 2.7914-1.7932"
                      stroke-width="1.0565px"
                    />
                    <path
                      d="m-14.15 90.584 3.3843-1.8657 3.8566 1.7222 3.6992-1.7222 3.8566 1.794 3.6205-1.794 2.9121 1.6504 2.7547-1.794"
                      stroke-width="1.0497px"
                    />
                    <path
                      d="m-14.018 95.211 3.2271-1.8155 3.8731 1.7226 3.715-1.7226 3.8731 1.7943 3.6359-1.7943 2.9246 1.6508 2.7665-1.7943"
                      stroke-width="1.0521px"
                    />
                    <path
                      d="m-13.564 99.911 3.0587-1.9167 3.8116 1.7226 3.6561-1.7226 3.8116 1.7943 3.5783-1.7943 2.8782 1.6508 2.7226-1.7943"
                      stroke-width="1.0437px"
                    />
                    <path
                      d="m-10.879 103.58 2.5622-1.863 2.9197 1.7196 2.8005-1.7196 2.9197 1.7913 2.7409-1.7913 2.2046 1.648 2.4092-1.7913"
                      stroke-width=".91268px"
                    />
                  </g>
                </g>
                <text
                  x="62"
                  y="-83"
                  fill="#ffffff"
                  fontSize="9"
                  letterSpacing={0.5}
                  fontFamily="calibri"
                  transform="scale(-1.0196642,-0.98071502)"
                >
                  <tspan x="62" y="-83" fontSize="9">
                    {tTRR}°
                  </tspan>
                </text>
              </g>
              <g transform="translate(35.292 115.48)">
                <rect
                  id="suspension__RL"
                  transform="scale(1,-1)"
                  x="-56.482"
                  y="-89.097"
                  width="7.6852"
                  height="10.94"
                  fill={sRL ? "#9f0000" : "#010101"}
                  stroke-width=".2129"
                />
                <g transform="translate(-1.6852 .57274)">
                  <path
                    d="m-79.405 98.351c0.45211 2.4675 1.3365 4.3307 3.33 5.89 1.41 0.92 1.31 0.9 9.37 0.86 7.11-0.04 7.6861-0.54114 8.3261-0.81114 1.55-0.67 3.2775-3.6644 3.6901-5.9388 0.05723-1.6788 0.05462-28.534 0.08651-29.588-0.04979-2.7913-2.5266-5.385-4.9027-6.6725-0.53842-0.27811-1.77-0.17-7.84-0.14-7.06 0.04-7.13 0.04-7.76 0.31-2.36 1.02-4 3.54-4.31 6.61-0.13 1.27-0.11 28.26 0.01 29.48z"
                    fill={tyreColor}
                  />
                  <g
                    transform="translate(-65.074 .35436)"
                    fill="none"
                    stroke={tyreTreadColor}
                  >
                    <path
                      d="m-14.029 71.594 3.4013-1.8645 3.8759 1.7211 3.7177-1.7211 3.8759 1.7928 3.6386-1.7928 2.9267 1.6494 2.7685-1.7928"
                      stroke-width="1.052px"
                    />
                    <path
                      d="m-13.139 66.616 2.7296-1.9396 3.5018 1.7436 3.3589-1.7436 3.5018 1.8163 3.2874-1.8163 2.6442 1.671 2.5013-1.8163"
                      stroke-width="1.0065px"
                    />
                    <path
                      d="m-14.124 76.289 3.4351-1.8645 3.9144 1.7211 3.7547-1.7211 3.9144 1.7928 3.6748-1.7928 2.9558 1.6494 2.5385-1.6916"
                      stroke-width="1.0572px"
                    />
                    <path
                      d="m-14.205 81.228 3.4578-1.863 3.9402 1.7197 3.7794-1.7197 3.9402 1.7913 3.699-1.7913 2.9753 1.648 2.4997-1.6901"
                      stroke-width="1.0603px"
                    />
                    <path
                      d="m-14.114 86.097 3.2577-1.8649 3.908 1.7215 3.7485-1.7215 3.908 1.7932 3.6687-1.7932 2.9509 1.6497 2.7914-1.7932"
                      stroke-width="1.0565px"
                    />
                    <path
                      d="m-14.15 90.584 3.3843-1.8657 3.8566 1.7222 3.6992-1.7222 3.8566 1.794 3.6205-1.794 2.9121 1.6504 2.7547-1.794"
                      stroke-width="1.0497px"
                    />
                    <path
                      d="m-14.018 95.211 3.2271-1.8155 3.8731 1.7226 3.715-1.7226 3.8731 1.7943 3.6359-1.7943 2.9246 1.6508 2.7665-1.7943"
                      stroke-width="1.0521px"
                    />
                    <path
                      d="m-13.564 99.911 3.0587-1.9167 3.8116 1.7226 3.6561-1.7226 3.8116 1.7943 3.5783-1.7943 2.8782 1.6508 2.7226-1.7943"
                      stroke-width="1.0437px"
                    />
                    <path
                      d="m-10.879 103.58 2.5622-1.863 2.9197 1.7196 2.8005-1.7196 2.9197 1.7913 2.7409-1.7913 2.2046 1.648 2.4092-1.7913"
                      stroke-width=".91268px"
                    />
                  </g>
                </g>
                <text
                  x="-75"
                  y="86.838823"
                  fill="#ffffff"
                  fontSize="9"
                  letterSpacing={0.5}
                  fontFamily="calibri"
                >
                  <tspan x="-75" y="86.838823" fontSize="9">
                    {tTRL}°
                  </tspan>
                </text>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default memo(CarChasis);
