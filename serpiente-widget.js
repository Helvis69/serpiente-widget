(function(global) {
  function SnakeWidget() {
    let canvas, ctx;
    let segmentCount = 20;
    let segmentLength = 20;
    let segments = [];
    let headLift = 0;
    let lifting = false;
    let offsetX = 0;
    let speed = 2;
    let animationId;

    // Crear canvas y añadir al body
    this.createCanvas = function(width, height, position = 'bottom') {
      canvas = document.createElement('canvas');
      canvas.style.position = 'fixed';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = height + 'px';
      canvas.style.zIndex = '9999';
      canvas.style.background = 'transparent';
      canvas.style.pointerEvents = 'none'; // para que no interfiera clicks

      if(position === 'bottom') {
        canvas.style.bottom = '0';
      } else if(position === 'top') {
        canvas.style.top = '0';
      }
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
      for(let i = 0; i < segmentCount; i++) {
        segments.push({x: i * segmentLength, y: height - 30});
      }
    };

    this.draw = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      offsetX += speed;
      if (offsetX > segmentLength) {
        offsetX = 0;
        for (let i = 0; i < segmentCount - 1; i++) {
          segments[i].x = segments[i + 1].x;
        }
        segments[segmentCount - 1].x = segments[segmentCount - 2].x - segmentLength;
      }

      ctx.fillStyle = 'green';
      for (let i = 0; i < segmentCount - 1; i++) {
        ctx.beginPath();
        ctx.arc(segments[i].x + offsetX, segments[i].y, 10, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.beginPath();
      ctx.fillStyle = 'darkgreen';
      ctx.arc(segments[segmentCount - 1].x + offsetX, segments[segmentCount - 1].y - headLift, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(segments[segmentCount - 1].x + offsetX - 5, segments[segmentCount - 1].y - headLift - 3, 3, 0, Math.PI * 2);
      ctx.arc(segments[segmentCount - 1].x + offsetX + 5, segments[segmentCount - 1].y - headLift - 3, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(segments[segmentCount - 1].x + offsetX - 5, segments[segmentCount - 1].y - headLift - 3, 1.5, 0, Math.PI * 2);
      ctx.arc(segments[segmentCount - 1].x + offsetX + 5, segments[segmentCount - 1].y - headLift - 3, 1.5, 0, Math.PI * 2);
      ctx.fill();

      if (lifting) {
        headLift += 1;
        if (headLift > 30) lifting = false;
      } else {
        headLift -= 1;
        if (headLift < 0) lifting = true;
      }
    };

    this.animate = () => {
      this.draw();
      animationId = requestAnimationFrame(this.animate);
    };

    this.init = function(options = {}) {
      let width = options.width || window.innerWidth;
      let height = options.height || 150;
      let position = options.position || 'bottom';

      this.createCanvas(width, height, position);
      this.initSegments(height);
      this.animate();
    };
  }

  global.SnakeWidget = new SnakeWidget();

})(window);
