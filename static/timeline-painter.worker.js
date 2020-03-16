const settings = {
  bg_color: '#ffffff',
};

self.onmessage = ({ data: { canvas } }) => {
  const { width, height } = canvas;

  console.debug('TimelinePainter.onmessage', canvas);

  const ctx = canvas.getContext('2d', {
    alpha: false,
    desynchronized: true,
    preserveDrawingBuffer: true,
  });

  ctx.fillStyle = settings.bg_color;
  ctx.fillRect(0, 0, width, height);
  
  ctx.lineWidth = 1;
  ctx.lineCap = 'round';

  // ctx.fillStyle = 'red';
  // ctx.fillRect(10, 10, 10, 10);

  

  ctx.beginPath();
  ctx.strokeStyle = 'black';

  self.requestAnimationFrame(() => {
    ctx.save();
    for (let x = 0; x < width; x += 10) {
      ctx.moveTo(x, height);
      ctx.lineTo(x, height - 10);
      ctx.stroke();
    }
    ctx.restore();
  });
}
