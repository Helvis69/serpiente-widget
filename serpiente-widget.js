class Serpiente {
    constructor(ctx, ancho, alto) {
        this.ctx = ctx;
        this.ancho = ancho;
        this.alto = alto;
        this.segmentos = [];
        this.direccion = { x: 1, y: 0 };
        this.longitud = 5;
        this.velocidad = 100;
        this.colorCuerpo = '#228B22';
        this.colorCabeza = '#006400';
        this.colorOjos = '#FFFFFF';
        this.colorPupilas = '#000000';
        this.iniciar();
    }

    iniciar() {
        this.canvas = document.getElementById('serpienteCanvas');
        this.canvas.width = this.ancho;
        this.canvas.height = this.alto;
        this.ctx = this.canvas.getContext('2d');
        this.segmentos = [];
        for (let i = this.longitud - 1; i >= 0; i--) {
            this.segmentos.push({ x: i, y: 0 });
        }
        this.dibujar();
        setInterval(() => this.mover(), this.velocidad);
    }

    mover() {
        const cabeza = { x: this.segmentos[0].x + this.direccion.x, y: this.segmentos[0].y + this.direccion.y };
        this.segmentos.unshift(cabeza);
        this.segmentos.pop();
        this.dibujar();
    }

    dibujar() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.segmentos.length; i++) {
            const segmento = this.segmentos[i];
            if (i === 0) {
                this.ctx.fillStyle = this.colorCabeza;
                this.ctx.beginPath();
                this.ctx.arc(segmento.x * 10, segmento.y * 10, 10, 0, Math.PI * 2);
                this.ctx.fill();
                this.dibujarOjos(segmento.x * 10, segmento.y * 10);
            } else {
                this.ctx.fillStyle = this.colorCuerpo;
                this.ctx.fillRect(segmento.x * 10, segmento.y * 10, 10, 10);
            }
        }
    }

    dibujarOjos(x, y) {
        this.ctx.fillStyle = this.colorOjos;
        this.ctx.beginPath();
        this.ctx.arc(x - 4, y - 4, 2, 0, Math.PI * 2);
        this.ctx.arc(x + 4, y - 4, 2, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.fillStyle = this.colorPupilas;
        this.ctx.beginPath();
        this.ctx.arc(x - 4, y - 4, 1, 0, Math.PI * 2);
        this.ctx.arc(x + 4, y - 4, 1, 0, Math.PI * 2);
        this.ctx.fill();
    }

    cambiarDireccion(nuevaDireccion) {
        if (nuevaDireccion.x !== -this.direccion.x && nuevaDireccion.y !== -this.direccion.y) {
            this.direccion = nuevaDireccion;
        }
    }
}
