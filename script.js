const model = document.getElementById('pc-model');
const componentInfo = document.getElementById('component-info');
const currentComponentSpan = document.getElementById('current-component');
const totalComponentsSpan = document.getElementById('total-components');

// Define components with their camera positions and information
const components = [
    {
        name: "CPU",
        description: "Central Processing Unit – the brain of the computer that executes instructions and processes data for all operations.",
        cameraOrbit: "0deg 75deg 1.5m",
        cameraTarget: "0.23m 0.97m 0.10m"
    },
{
    name: "RAM",
    description: "Random Access Memory – temporary memory that stores data for quick access by the CPU while programs are running.",
    cameraOrbit: "-45deg 75deg 1.4m",
    cameraTarget: "-0.02m 0.90m 0.04m"
},
{
    name: "Fan",
    description: "Cooling fan – maintains optimal temperature by dissipating heat from critical components.",
    cameraOrbit: "45deg 75deg 1.3m",
    cameraTarget: "0.25m 0.89m -0.26m"
},
{
    name: "Storage",
    description: "Hard Drive or SSD – permanent storage for operating system, programs, and all your files and data.",
    cameraOrbit: "90deg 75deg 1.6m",
    cameraTarget: "-0.19m 1.04m 0.41m"
},
{
    name: "Power Supply",
    description: "PSU – converts AC power to DC and provides stable electricity to all computer components.",
    cameraOrbit: "-90deg 75deg 1.4m",
    cameraTarget: "0.13m 0.84m 0.45m"
},
{
    name: "Cooling System",
    description: "Heat sink – works with fans to dissipate heat and prevent overheating of critical components.",
    cameraOrbit: "180deg 75deg 1.4m",
    cameraTarget: "0.28m 0.90m -0.34m"
},
{
    name: "Hard Drive",
    description: "Secondary storage – additional permanent storage for files, documents, and backups.",
    cameraOrbit: "0deg 90deg 2m",
    cameraTarget: "-0.33m 0.66m 0.17m"
}
];

let currentComponentIndex = 0;
let isScrolling = false;

// Initialize
totalComponentsSpan.textContent = components.length;
updateComponentDisplay();

// Handle scroll events in the model container
const container = document.getElementById('container');

container.addEventListener('wheel', (e) => {
    if (isScrolling) return;

    e.preventDefault();

    // Only respond to vertical scroll
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        if (e.deltaY > 0) {
            // Scroll down - next component
            navigateToComponent(currentComponentIndex + 1);
        } else {
            // Scroll up - previous component
            navigateToComponent(currentComponentIndex - 1);
        }
    }
}, { passive: false });

// Navigation function
function navigateToComponent(index) {
    if (index < 0 || index >= components.length || isScrolling) return;

    isScrolling = true;
    currentComponentIndex = index;

    // Update camera position with smooth transition
    const component = components[currentComponentIndex];

    model.cameraOrbit = component.cameraOrbit;
    model.cameraTarget = component.cameraTarget;

    // Update info panel with fade effect
    componentInfo.style.opacity = '0';

    setTimeout(() => {
        componentInfo.innerHTML = `
        <h2>${component.name}</h2>
        <p>${component.description}</p>
        `;
        componentInfo.style.opacity = '1';

        // Update counter
        currentComponentSpan.textContent = currentComponentIndex + 1;

        isScrolling = false;
    }, 300);
}

// Update component display
function updateComponentDisplay() {
    const component = components[currentComponentIndex];
    componentInfo.innerHTML = `
    <h2>${component.name}</h2>
    <p>${component.description}</p>
    `;
    currentComponentSpan.textContent = currentComponentIndex + 1;
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        navigateToComponent(currentComponentIndex + 1);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        navigateToComponent(currentComponentIndex - 1);
    }
});

// Handle hotspot clicks
document.querySelectorAll('.hotspot').forEach(button => {
    button.addEventListener('click', (e) => {
        const compName = e.currentTarget.dataset.component;
        const index = components.findIndex(comp => comp.name === compName);

        if (index !== -1) {
            navigateToComponent(index);
        }
    });
});

// Add scroll hint
const scrollHint = document.createElement('div');
scrollHint.className = 'scroll-hint';
scrollHint.textContent = 'Scroll to navigate components';
document.getElementById('model-section').appendChild(scrollHint);

// Smooth scroll from landing section
document.addEventListener('wheel', (e) => {
    // If we're at the top of the page and user scrolls down
    if (window.scrollY === 0 && e.deltaY > 0) {
        e.preventDefault();
        document.getElementById('model-section').scrollIntoView({
            behavior: 'smooth'
        });
    }
});


// Wait for model to load and initialize hotspots
model.addEventListener('load', () => {
    console.log('Model loaded - hotspots should be attached to 3D components');

    // Ensure hotspots are visible and properly positioned
    setTimeout(() => {
        document.querySelectorAll('.hotspot').forEach(hotspot => {
            hotspot.style.display = 'block';
        });
    }, 1000);
});

// Enhanced hotspot click handler
document.querySelectorAll('.hotspot').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const compName = e.currentTarget.dataset.component;
        const index = components.findIndex(comp => comp.name === compName);

        if (index !== -1) {
            navigateToComponent(index);
        }
    });
});

// Prevent model-viewer from stealing hotspot clicks
model.addEventListener('click', (e) => {
    // If a hotspot was clicked, don't let model-viewer handle the click
    if (e.target.classList.contains('hotspot')) {
        e.stopPropagation();
    }
});
