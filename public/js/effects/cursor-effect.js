import * as THREE from 'three';

class SmokeParticle {
    constructor(position) {
        this.position = position.clone();
        this.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.02,
            Math.random() * 0.02,
            (Math.random() - 0.5) * 0.02
        );
        this.size = Math.random() * 25 + 15;
        this.life = 1.0;
        this.fadeSpeed = 0.01 + Math.random() * 0.008;
    }

    update() {
        this.position.add(this.velocity);
        this.life -= this.fadeSpeed;
        this.size += 0.5;
        return this.life > 0;
    }
}

class CursorEffect {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector('#cursor-effect'),
            alpha: true
        });

        this.isEnabled = true;
        this.setupToggleButton();

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.position.z = 100;

        // Create particle material
        this.particleMaterial = new THREE.ShaderMaterial({
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            uniforms: {
                time: { value: 0 }
            },
            vertexShader: `
                attribute float size;
                attribute float opacity;
                varying float vOpacity;
                
                void main() {
                    vOpacity = opacity;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_Position = projectionMatrix * mvPosition;
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                }
            `,
            fragmentShader: `
                varying float vOpacity;
                
                void main() {
                    vec2 center = vec2(0.5, 0.5);
                    float dist = length(gl_PointCoord - center);
                    
                    // Softer radial gradient
                    float alpha = pow(1.0 - dist * 2.0, 2.0);
                    
                    // Add subtle noise
                    vec2 uv = gl_PointCoord * 2.0 - 1.0;
                    float noise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
                    alpha *= 0.95 + noise * 0.05;
                    
                    // Brighter color with less transparency
                    vec3 color = vec3(1.0, 1.0, 1.0);
                    alpha *= vOpacity * 0.3;
                    
                    if (dist > 0.5) {
                        discard;
                    }
                    
                    gl_FragColor = vec4(color, alpha);
                }
            `
        });

        this.particles = [];
        this.geometry = new THREE.BufferGeometry();
        this.positions = new Float32Array(1000 * 3);
        this.sizes = new Float32Array(1000);
        this.opacities = new Float32Array(1000);
        
        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
        this.geometry.setAttribute('size', new THREE.BufferAttribute(this.sizes, 1));
        this.geometry.setAttribute('opacity', new THREE.BufferAttribute(this.opacities, 1));
        
        this.points = new THREE.Points(this.geometry, this.particleMaterial);
        this.scene.add(this.points);

        // Mouse position
        this.mouse = new THREE.Vector3();
        this.prevMouse = new THREE.Vector3();
        this.mouseVelocity = new THREE.Vector3();

        // Event listeners
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('resize', this.onWindowResize.bind(this));

        // Start animation
        this.animate();
    }

    setupToggleButton() {
        const toggleButton = document.getElementById('toggleCursor');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                this.isEnabled = !this.isEnabled;
                toggleButton.textContent = `Cursor Effect: ${this.isEnabled ? 'ON' : 'OFF'}`;
                const canvas = document.querySelector('#cursor-effect');
                canvas.style.opacity = this.isEnabled ? '1' : '0';
            });
        }
    }

    onMouseMove(event) {
        // Convert mouse position to 3D space
        this.prevMouse.copy(this.mouse);
        
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.mouse.z = 0;

        this.mouse.unproject(this.camera);
        this.mouse.sub(this.camera.position).normalize();
        let distance = -this.camera.position.z / this.mouse.z;
        this.mouse.multiplyScalar(distance).add(this.camera.position);

        // Calculate mouse velocity
        this.mouseVelocity.subVectors(this.mouse, this.prevMouse);

        // Add new particles based on mouse movement
        if (this.mouseVelocity.length() > 0.0001) {
            for (let i = 0; i < 3; i++) {
                this.particles.push(new SmokeParticle(this.mouse));
            }
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    updateParticles() {
        // Update existing particles
        this.particles = this.particles.filter(particle => particle.update());

        // Update geometry attributes
        for (let i = 0; i < 1000; i++) {
            if (i < this.particles.length) {
                const particle = this.particles[i];
                this.positions[i * 3] = particle.position.x;
                this.positions[i * 3 + 1] = particle.position.y;
                this.positions[i * 3 + 2] = particle.position.z;
                this.sizes[i] = particle.size;
                this.opacities[i] = particle.life;
            } else {
                this.positions[i * 3] = 0;
                this.positions[i * 3 + 1] = 0;
                this.positions[i * 3 + 2] = 0;
                this.sizes[i] = 0;
                this.opacities[i] = 0;
            }
        }

        this.geometry.attributes.position.needsUpdate = true;
        this.geometry.attributes.size.needsUpdate = true;
        this.geometry.attributes.opacity.needsUpdate = true;
    }

    animate() {
        if (!this.isEnabled) {
            requestAnimationFrame(() => this.animate());
            return;
        }
        requestAnimationFrame(this.animate.bind(this));
        this.updateParticles();
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the effect
new CursorEffect();
