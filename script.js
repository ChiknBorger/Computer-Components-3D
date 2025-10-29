const infoPanel = document.getElementById('info-panel');
const model = document.getElementById('pc-model');

const components = {
  "CPU": "Central Processing Unit - the brain of the computer",
  "GPU": "Graphics Processing Unit - handles visuals",
  "Fan": "Fan - keeps the computer and motherboard cool",
  "Motherboard": "Motherboard - connects all components",
  "Hard Drive": "Hard Drive - stores all your data",
  "RAM": "Random Access Memory - short-term memory",
  "Screen": "Screen - displays visuals",
  "Battery": "Battery - powers the device"
};

// Hotspot click handling
model.querySelectorAll('.hotspot').forEach(button => {
  button.addEventListener('click', (e) => {
    const comp = e.currentTarget.dataset.component;

    // Show info panel
    infoPanel.innerHTML = `<h2>${comp}</h2><p>${components[comp]}</p>`;
    infoPanel.style.display = 'block';

    // Animate model moving aside
    model.style.transform = 'translateX(50vw) scale(0.5)';
  });
});

// Optional: reset model if info panel clicked
infoPanel.addEventListener('click', () => {
  model.style.transform = 'translateX(0) scale(1)';
  infoPanel.style.display = 'none';
});
