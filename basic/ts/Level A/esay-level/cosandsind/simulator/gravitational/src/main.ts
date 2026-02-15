const canvas: any = document.getElementById("c");
const ctx = canvas.getContext("2d");

let cx = () => canvas.width / 2;
let cy = () => canvas.height / 2;
function drawSpaceTimeGrid() {
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;
  const spaceing = 40;

  for (let row = 0; row < canvas.width; row += spaceing) {
    ctx.beginPath();
    for (let col = 0; col < canvas.height; col += 10) {
      const dx = row - cx();
      const dy = col - cy();
      const dist = Math.sqrt(dx * dy + dy * dy);
      const warp = 15000 / (dist * dist + 2000);

      ctx.lineTo(row + dx * warp * 0.001, col + dy * warp * 0.001);
    }
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += spaceing) {
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x += 10) {
      const dx = x - cx();
      const dy = y - cy();
      const dist = Math.sqrt(dx * dx + dy * dy);
      const warp = 15000 / (dist * dist + 2000);

      ctx.lineTo(x + dx * warp * 0.001, y + dy * warp * 0.001);
    }
    ctx.stroke();
  }
}
