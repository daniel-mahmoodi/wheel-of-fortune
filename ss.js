const sectors = [
     { color: "#f82", label: "Stack" },
     { color: "#0bf", label: "10" },
     { color: "#fb0", label: "200" },
     { color: "#0fb", label: "50" },
     { color: "#b0f", label: "100" },
     { color: "#f0b", label: "5" },
     { color: "#bf0", label: "500" },
   ];
   
   const rand = (m) => 1 + m;
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
  
   function drawSector(sector, i) {
     const ang = arc * i;
     ctx.save();
     // COLOR
     ctx.beginPath();
     ctx.fillStyle = sector.color;
     ctx.moveTo(rad, rad);
     ctx.arc(rad, rad, rad, ang, ang + arc);
     ctx.lineTo(rad, rad);
     ctx.fill();
     // TEXT
     ctx.translate(rad, rad);
     ctx.rotate(ang + arc / 2);
     ctx.textAlign = "right";
     ctx.fillStyle = "#fff";
     ctx.font = "bold 30px sans-serif";
     ctx.fillText(sector.label, rad - 10, 10);
     //
     ctx.restore();
   }
   
   function rotate() {
     const sector = sectors[getIndex()];
     ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
     spinEl.style.background = sector.color;
   
     if (spinEl.textContent !== sector.label) {
       console.log(`Label changed from '${sector.label}' '`);
       spinEl.style.transform = "rotate(-20deg)"; // Rotate by 45 degrees (adjust the value as needed)
   
       setTimeout(() => {
         console.log('timeOut');
         spinEl.style.transform = "rotate(0deg)"; // Rotate by 45 degrees (adjust the value as needed)
   
       }, 100); // 1000 milliseconds (1 second)
     }
     spinEl.textContent = sector.label;
   }
   
   function frame() {
     if (!angVel) return;
     angVel *= friction; // Decrement velocity by friction
     if (angVel < 0.002) angVel = 0; // Bring to stop
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
     spinEl.addEventListener("click", () => {
       if (!angVel) angVel = rand(0.25, 0.45);
     });
   }
   
   init();
   