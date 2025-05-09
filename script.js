function launchFireworks() {
  const canvas = document.getElementById('fireworksCanvas');
  const altar = document.getElementById('altar');
  const characters = document.getElementById('characters');
  const question = document.getElementById('question');
  const buttons = document.getElementById('buttons');
  const audio = document.getElementById('audio');
  audio.controls = false
  audio.play()

  buttons.style.opacity = "0";
  buttons.style.pointerEvents = "none";
  question.style.opacity = "0";

  canvas.style.display = 'block';
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const fireworks = [];

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createFirework() {
    const x = random(100, canvas.width - 100);
    const y = random(100, canvas.height / 2);
    const count = 100;
    const particles = [];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = random(2, 5);
      particles.push({
        x,
        y,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        alpha: 1,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`
      });
    }

    fireworks.push(particles);
  }

  function animate() {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((particles, index) => {
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= 0.01;
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
      if (particles[0].alpha <= 0) fireworks.splice(index, 1);
    });

    if (fireworks.length < 5) createFirework();
    requestAnimationFrame(animate);
  }

  animate();



  // Fade in altar after a short delay
  setTimeout(() => {
    altar.style.display = "grid";
  characters.style.display = "grid";;
  }, 1000);
  setTimeout(() => {
    altar.style.opacity = "1";
  }, 2000);
  setTimeout(() => {
    characters.style.opacity = "1";
  }, 3000);
}