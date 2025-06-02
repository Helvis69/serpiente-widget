(function(global) {
  function SnakeWidget() {
    let canvas, ctx;
    const segmentCount = 30;
    const segmentLength = 15;
    const snakeColor = '#2ecc71';
    const headColor = '#27ae60';
    const eyeColor = '#ffffff';
    const pupilColor = '#000000';

    let segments = [];
    let waveOffset = 0;

    this.createCanvas = function(height = 150) {
      canvas = document.createElement('canvas');
      canvas.id = 'snakeCanvas';
      canvas.style.position = 'fixed';
      canvas.style.left = '0';
      canvas.style.bottom = '0';
      canvas.style.width = '100%';
      canvas.style.height = height + 'px';
      canvas.style.zIndex = '9999';
      canvas.style.pointerEvents = 'none';
      document.body.appendChild(canvas);

      canvas.width = window.innerWidth;
      canvas.height = height;
      ctx = canvas.getContext('2d');

      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = height;
      });
    };

    this.initSegments = function(height) {
      segments = [];
      const y = height - 40;
      for (let i = 0; i < segmentCount; i++) {
        segments.push({ x: i * segmentLength, y: y });
      }
    };

    this.update = function() {
      waveOffset += 0.1;
      for (let i = 0; i < segmentCount; i++) {
        const wave = Math.sin(i * 0.4 + waveOffset) * 10;
        segments[i].y = canvas.height - 40 + wave;

        // Para que los segmentos estén alineados horizontalmente
        if (i > 0) {
          segments[i].x = segments[i - 1].x + segmentLength;
        }
      }
    };

    this.draw = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dibujar cuerpo
      for (let i = 0; i < segmentCount - 1; i++) {
        ctx.beginPath();
        ctx.fillStyle = snakeColor;
        ctx.arc(segments[i].x, segments[i].y, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Dibujar cabeza
      const head = segments[segmentCount - 1];
      ctx.beginPath();
      ctx.fillStyle = headColor;
      ctx.arc(head.x, head.y - 10, 10, 0, Math.PI * 2);
      ctx.fill();

      // Ojos
      ctx.fillStyle = eyeColor;
      ctx.beginPath();
      ctx.arc(head.x - 4, head.y - 13, 3, 0, Math.PI * 2);
      ctx.arc(head.x + 4, head.y - 13, 3, 0, Math.PI * 2);
      ctx.fill();

      // Pupilas
      ctx.fillStyle = pupilColor;
      ctx.beginPath();
      ctx.arc(head.x - 4, head.y - 13, 1.5, 0, Math.PI * 2);
      ctx.arc(head.x + 4, head.y - 13, 1.5, 0, Math.PI * 2);
      ctx.fill();
    };

    this.animate = function() {
      this.update();
      this.draw();
      requestAnimationFrame(this.animate.bind(this));
    };

    this.init = function(options = {}) {
      const height = options.height || 150;
      this.createCanvas(height);
      this.initSegments(height);
      this.animate();
    };
  }

  global.SnakeWidget = new SnakeWidget();
})(window);
