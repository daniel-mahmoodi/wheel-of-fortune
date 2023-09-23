const ColorTypes = [
  "rgb(29, 85, 109)",
  " rgb(47, 139, 179)",
  "rgb(234, 244, 248)",
  " rgb(37, 110, 142)",
];
const sectors = [
  { id: 1, color: ColorTypes[2], label: "1 درصد " },
  { id: 2, color: ColorTypes[1], label: "2 درصد " },
  { id: 3, color: ColorTypes[2], label: "3 درصد " },
  { id: 4, color: ColorTypes[1], label: "4 درصد" },
  { id: 5, color: ColorTypes[2], label: "5 درصد " },
  { id: 6, color: ColorTypes[1], label: "6 درصد " },
  { id: 7, color: ColorTypes[0], label: "" },
  { id: 8, color: ColorTypes[1], label: "8 درصد " },
  { id: 9, color: ColorTypes[2], label: "9 درصد " },
  { id: 10, color: ColorTypes[1], label: "10 درصد " },
  { id: 11, color: ColorTypes[2], label: "11 درصد " },
  { id: 12, color: ColorTypes[1], label: "12 درصد " },
  { id: 13, color: ColorTypes[2], label: "13 درصد " },
  { id: 14, color: ColorTypes[0], label: "" },
  { id: 15, color: ColorTypes[2], label: "15 درصد " },
  { id: 16, color: ColorTypes[1], label: "16 درصد " },
  { id: 17, color: ColorTypes[2], label: "17 درصد " },
  { id: 18, color: ColorTypes[1], label: "18 درصد" },
  { id: 19, color: ColorTypes[2], label: "19 درصد " },
  { id: 20, color: ColorTypes[0], label: "" },
];
const Win = true; //received from API
const APINum = 3; //choose number between 1:20
const NoPrize = "ایشالله";
const NumForReachAPISector = [
  14, 12, 11, 9, 8, 7, 5, 4, 2, 1, 28, 27, 25, 24, 22, 21, 20, 18, 17, 15,
];
// const rand = (m, M) => Math.random() * (M - m) + m;
const rand = () => 1 + NumForReachAPISector[APINum - 1] * 0.002;
const tot = sectors.length;
const spinEl = document.querySelector("#spin");
const ctx = document.querySelector("#wheel").getContext("2d");
const dia = ctx.canvas.width;
const rad = dia / 2;
const PI = Math.PI;
const TAU = 2 * PI;
const arc = TAU / sectors.length;

const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
let angVel = 0; // Angular velocity
let ang = 0; // Angle in radians

const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;

// confetti:
const startButton = document.getElementById("start-button");
const confettiContainer = document.getElementById("confetti-container");
// .

function drawSector(sector, i) {
  const ang = arc * i;
  ctx.save();

  // for (let j = i; j < 6; j++) {
  //   ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);
  // }

  // ctx.translate(rad, rad);
  // ctx.moveTo(rad, rad);
  // ctx.arc(rad, arc+17, 10,  0, 2 * Math.PI);

  // ctx.arc(rad + ang-4, arc+17, 10, 0, ang + arc);
  // ctx.rotate(ang + arc / 2);
  // ctx.restore();
  // ctx.strokeRect(10, 10, 100, 100);
  // ctx.lineTo(rad, rad);

  // ctx.beginPath();
  // ctx.arc(10, 75, 10, 0, 2 * Math.PI);
  // ctx.stroke();
  // wheel border
  // ctx.beginPath();
  // ctx.arc(rad, rad, rad, 0, 2 * Math.PI);
  // ctx.stroke();
  // .
  // COLOR
  ctx.beginPath();
  ctx.fillStyle = sector.color;
  // ctx.moveTo(rad, rad);
  ctx.arc(rad, rad, rad - 15, ang, ang + arc);
  ctx.lineWidth = 15;
  ctx.strokeStyle = ColorTypes[3];
  ctx.stroke();
  ctx.lineTo(rad, rad);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = sector.color;
  // ctx.moveTo(rad, rad);
  ctx.arc(rad, rad, rad - 40, ang, ang + arc);
  ctx.lineWidth = 50;
  ctx.strokeStyle = ColorTypes[0];
  ctx.stroke();
  ctx.lineTo(rad, rad);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = sector.color;
  // ctx.moveTo(rad, rad);
  ctx.arc(rad, rad, rad - 40, ang, ang + arc);
  ctx.lineWidth = 15;
  ctx.strokeStyle = ColorTypes[3];
  ctx.stroke();
  ctx.lineTo(rad, rad);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = sector.color;
  // ctx.moveTo(rad, rad);
  ctx.arc(rad, rad, rad - 50, ang, ang + arc);
  ctx.lineWidth = 10;
  ctx.strokeStyle = ColorTypes[3];
  ctx.stroke();
  ctx.lineTo(rad, rad);

  ctx.fill();

  // TEXT
  ctx.translate(rad, rad);
  ctx.rotate(ang + arc / 2);
  ctx.textAlign = "right";
  ctx.direction = "rtl";
  ctx.fillStyle =
    sector.color === ColorTypes[0]
      ? ColorTypes[2]
      : sector.color === ColorTypes[1]
      ? ColorTypes[2]
      : "rgb(56, 56, 56)";
  ctx.font = "bold 22px sans-serif";
  ctx.fillText(sector.label || NoPrize, rad - 60, 10);
  ctx.restore();
  //

  // ctx.beginPath();
  // ctx.arc(rad, 17, 10, 0, ang + arc);
  // console.log("rad, ang, arc :", "rad:", rad, ang, arc, rad * arc);
  // // ctx.arc(rad * ang, rad * arc, 10, 0, 2 * Math.PI);
  // ctx.strokeStyle = "blue";
  // ctx.fillStyle = "blue";
  // ctx.fill();
  // ctx.stroke();
  // ctx.beginPath();
  // ctx.arc(rad + rad * arc - 9, 30, 10, 0, ang + arc);
  // // ctx.strokeStyle = "blue";
  // ctx.strokeStyle = "yellow";
  // ctx.fillStyle = "yellow";
  // ctx.fill();
  // ctx.stroke();
  // ctx.beginPath();
  // ctx.arc(rad + rad * arc * 2 - 24, 70, 10, 0, ang + arc);
  // // ctx.strokeStyle = "blue";
  // ctx.fill();
  // ctx.stroke();
  // ctx.strokeStyle = "red";
  // ctx.fillStyle = "red";
  // ctx.beginPath();
  // ctx.arc(3 * rad * arc * 2 - 36, 133, 10, 0, ang + arc);
  // // ctx.strokeStyle = "blue";
  // ctx.fill();
  // ctx.stroke();
  // ctx.beginPath();
  // ctx.arc(198, 35, 10, 0, ang + arc);
  // // ctx.strokeStyle = "blue";
  // ctx.fill();
  // // ctx.fillStyle = "blue";
  // ctx.stroke();
  // ctx.beginPath();
  // // ctx.arc(300*2, -3.2*2, 10, 0, ang + arc);
  // // ctx.strokeStyle = "blue";
  // ctx.fill();
  // // ctx.fillStyle = "blue";
  // ctx.stroke();
}

// Get the audio element by its ID
// const audioPlayer = document.getElementById("audio-player");
// .
// Array to store multiple audio elements
// const audioElements = [];
// function playSound() {
//   const audio = new Audio("Click.mp3");
//   // audio.play();
//   // audio.pause();
//   // audio.currentTime = 0;

//   // Play the sound.
//   audio.play();
//   // Remove the audio element when playback finishes
//   // audio.addEventListener("ended", () => {
//   //   const index = audioElements.indexOf(audio);
//   //   if (index !== 1) {
//   //     audioElements.splice(index, 1);
//   //   }
//   // });

//   // audioElements.push(audio);
// }

function rotate() {
  const sector = sectors[getIndex()];
  ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
  spinEl.textContent = sector.label || NoPrize;
  spinEl.style.background = sector.color;
  spinEl.style.color =
    spinEl.style.background === ColorTypes[2] ? ColorTypes[0] : "#fff";
}
const end = Date.now() + 15 * 1000;
const colors = ["#bb0000", "#ffffff"];
function frame() {
  // console.log('frame');
  if (!angVel) return;
  angVel *= friction; // Decrement velocity by friction
  if (angVel < 0.002) {
    angVel = 0;
    if (Win) {
      //conffette
      // confetti({
      //   particleCount: 100,
      //   spread: 70,
      //   origin: { y: 0.6 },
      // });
      // audioPlayer.play();
      // go Buckeyes!

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });

        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }
  ang += angVel; // Update angle
  ang %= TAU; // Normalize angle
  rotate();
}

function engine() {
  frame();

  requestAnimationFrame(engine);
}

function init() {
  sectors.forEach(drawSector);
  rotate(); // Initial rotation
  engine(); // Start engine
  spinEl.textContent = "شروع";
  spinEl.style.background = ColorTypes[0];
  spinEl.style.color = ColorTypes[2];
  spinEl.addEventListener("click", () => {
    if (!angVel) {
      angVel = rand();
      // audioPlayer.play();
    }
  });
}
// startButton.addEventListener("click", () => {
//   confetti({
//     particleCount: 100,
//     spread: 70,
//     origin: { y: 0.6 },
//   });
//   // Configuration for the confetti effect
//   // const config = {
//   //     angle: 90,
//   //     spread: 360,
//   //     startVelocity: 45,
//   //     elementCount: 50,
//   //     decay: 0.9,
//   //     colors: ["#ff0000", "#00ff00", "#0000ff"],
//   // };

//   // // Generate confetti using the library (canvas-confetti in this example)
//   // confetti.create(confettiContainer, config);
// });
init();
