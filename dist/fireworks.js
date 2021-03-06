var Fireworks;
(function (Fireworks) {
    Fireworks.TAU = Math.PI * 2;
    function random(min, max) {
        return Math.random() * (max - min) + min;
    }
    Fireworks.random = random;
    function start(container, options) {
        if (!options) {
            options = {};
        }
        Fireworks.rocketSpawnInterval = options.rocketSpawnInterval || 150;
        Fireworks.maxRockets = options.maxRockets || 3;
        Fireworks.numParticles = options.numParticles || 100;
        Fireworks.explosionHeight = options.explosionHeight || 0.2;
        Fireworks.explosionChance = options.explosionChance || 0.08;
        Fireworks.rockets = [];
        Fireworks.particles = [];
        Fireworks.cw = container.clientWidth;
        Fireworks.ch = container.clientHeight;
        Fireworks.canvas = document.createElement('canvas');
        Fireworks.ctx = Fireworks.canvas.getContext('2d');
        Fireworks.canvas.width = Fireworks.cw;
        Fireworks.canvas.height = Fireworks.ch;
        container.appendChild(Fireworks.canvas);
        window.requestAnimationFrame(update);
        setInterval(() => {
            if (Fireworks.rockets.length < Fireworks.maxRockets) {
                Fireworks.rockets.push(new Fireworks.Rocket());
            }
        }, Fireworks.rocketSpawnInterval);
    }
    Fireworks.start = start;
    function update() {
        Fireworks.ctx.globalCompositeOperation = 'destination-out';
        Fireworks.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        Fireworks.ctx.fillRect(0, 0, Fireworks.cw, Fireworks.ch);
        Fireworks.ctx.globalCompositeOperation = 'lighter';
        let x = null;
        x = Fireworks.rockets.length;
        while (x--) {
            Fireworks.rockets[x].render();
            Fireworks.rockets[x].update(x);
        }
        x = Fireworks.particles.length;
        while (x--) {
            Fireworks.particles[x].render();
            Fireworks.particles[x].update(x);
        }
        window.requestAnimationFrame(update);
    }
})(Fireworks || (Fireworks = {}));
var Fireworks;
(function (Fireworks) {
    class Particle {
        constructor(position) {
            this.position = {
                x: position ? position.x : 0,
                y: position ? position.y : 0
            };
            this.velocity = {
                x: 0,
                y: 0
            };
            this.shrink = 0.75;
            this.size = 2;
            this.resistance = 1;
            this.gravity = 0;
            this.alpha = 1;
            this.fade = 0;
            this.hue = Fireworks.random(0, 360);
            this.brightness = Fireworks.random(50, 60);
            this.positions = [];
            let positionCount = 3;
            while (positionCount--) {
                this.positions.push(position);
            }
        }
        update(index) {
            this.positions.pop();
            this.positions.unshift({ x: this.position.x, y: this.position.y });
            this.velocity.x *= this.resistance;
            this.velocity.y *= this.resistance;
            this.velocity.y += this.gravity;
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.size *= this.shrink;
            this.alpha -= this.fade;
            if (!this.exists()) {
                Fireworks.particles.splice(index, 1);
            }
        }
        render() {
            const lastPosition = this.positions[this.positions.length - 1];
            Fireworks.ctx.beginPath();
            Fireworks.ctx.moveTo(lastPosition.x, lastPosition.y);
            Fireworks.ctx.lineTo(this.position.x, this.position.y);
            Fireworks.ctx.lineWidth = this.size;
            Fireworks.ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
            Fireworks.ctx.stroke();
        }
        exists() {
            if (this.alpha <= 0.1 || this.size <= 1) {
                return false;
            }
            if (this.position.x > Fireworks.cw || this.position.x < 0) {
                return false;
            }
            if (this.position.y > Fireworks.ch || this.position.y < 0) {
                return false;
            }
            return true;
        }
    }
    Fireworks.Particle = Particle;
})(Fireworks || (Fireworks = {}));
var Fireworks;
(function (Fireworks) {
    class Rocket extends Fireworks.Particle {
        constructor() {
            super({ x: Fireworks.random(0, Fireworks.cw), y: Fireworks.ch });
            this.velocity.y = Fireworks.random(-3, 0) - 4;
            this.velocity.x = Fireworks.random(0, 6) - 3;
            this.size = 3;
            this.shrink = 0.999;
            this.gravity = 0.01;
            this.fade = 0;
        }
        update(index) {
            super.update(index);
            if (this.position.y <= Fireworks.ch * (1 - Fireworks.explosionHeight) && Fireworks.random(0, 1) <= Fireworks.explosionChance) {
                this.explode();
                Fireworks.rockets.splice(index, 1);
            }
        }
        explode() {
            const count = Fireworks.random(0, 10) + Fireworks.numParticles;
            for (let i = 0; i < count; i += 1) {
                const particle = new Fireworks.Particle(this.position);
                const angle = Fireworks.random(0, Fireworks.TAU);
                const speed = Math.cos(Fireworks.random(0, Fireworks.TAU)) * 15;
                particle.velocity.x = Math.cos(angle) * speed;
                particle.velocity.y = Math.sin(angle) * speed;
                particle.size = 3;
                particle.gravity = 0.2;
                particle.resistance = 0.92;
                particle.shrink = Fireworks.random(0, 0.05) + 0.93;
                particle.hue = this.hue;
                particle.brightness = this.brightness;
                Fireworks.particles.push(particle);
            }
        }
    }
    Fireworks.Rocket = Rocket;
})(Fireworks || (Fireworks = {}));
