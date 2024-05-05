


//ANIMACION DEL BOTON DE LA MUSICA


const music = new Audio('assets/img/music.mp3');
music.volume = 0.1; // Inicia con un volumen bajo
music.loop = true; // Habilita el modo bucle









const waveButton = document.getElementById('waveButton');
const waveCanvas = document.getElementById('waveCanvas');
waveCanvas.width = 50;
waveCanvas.height = 25;
const waveCtx = waveCanvas.getContext('2d');

waveCanvas.width = waveButton.offsetWidth; // el canvas tenga el tamaño del botón
waveCanvas.height = waveButton.offsetHeight;

let isAnimating = false;
let requestId; // Para controlar la animación

// Función para dibujar la onda
function drawWave(amplitude, frequency, time) {
    waveCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height); // Limpia el canvas
    waveCtx.beginPath();
    waveCtx.lineWidth = 4;


    for (let x = 0; x < waveCanvas.width; x++) {
        const y = 10 * Math.sin(x * 0.15 + time) + waveCanvas.height / 2;
        waveCtx.lineTo(x, y);
    }
    waveCtx.strokeStyle = 'white';
    waveCtx.stroke();
    console.log("Dibujando onda");

}


// Función para aumentar gradualmente el volumen
function increaseVolume() {
    let currentVolume = music.volume;
    const maxVolume = 1.0;
    const step = 0.1;

    const interval = setInterval(() => {
        if (currentVolume < maxVolume) {
            currentVolume += step;
            if (currentVolume > maxVolume) {
                currentVolume = maxVolume;
            }
            music.volume = currentVolume;
        } else {
            clearInterval(interval);
        }
    }, 100); // Ajusta cada 100 milisegundos
}



// Función para iniciar/detener la animación y la música
function toggleAnimation() {
    if (isAnimating) {
        cancelAnimationFrame(requestId);
        waveButton.classList.remove('active');
        waveCanvas.style.display = 'none';
        music.pause();
    } else {
        let startTime;
        const animate = (time) => {
            if (!startTime) startTime = time;
            const elapsedTime = time - startTime;

            drawWave(20, 0.05, elapsedTime * 0.005);
            requestId = requestAnimationFrame(animate);
        };

        requestId = requestAnimationFrame(animate);
        waveButton.classList.add('active');
        waveCanvas.style.display = 'block';
        music.play();
        increaseVolume();
    }

    isAnimating = !isAnimating;
}

// Evento del botón
waveButton.addEventListener('click', toggleAnimation);






//detector de CANVAS

// Detectar cuando el usuario hace scroll
window.addEventListener('scroll', function () {
    // Obtener la posición actual del scroll
    var scrollPosition = window.scrollY;

    // Obtener el elemento .presentation__canvas
    var canvas = document.querySelector('.presentation__canvas');

    // Cambiar el z-index según la posición del scroll
    if (scrollPosition >= 151 && scrollPosition <= 1800) {
        canvas.style.zIndex = "0";
    } else {
        canvas.style.zIndex = "-1";
    }
});


//CARDS CONTACT

const cards = Array.from(document.querySelectorAll(".card__container"));
const cardsContainer = document.querySelector("#cards");

cardsContainer.addEventListener("mousemove", (e) => {
    for (const card of cards) {
        const rect = card.getBoundingClientRect();
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    }
});


//MAP CONTACT

// function initMap() {
//     var location = { lat: -37.68693, lng: 176.16447 }; // Coordenadas de Tauranga
//     var map = new google.maps.Map(document.getElementById('load-iframe-map'), {
//         zoom: 15,
//         center: location
//     });
//     var marker = new google.maps.Marker({
//         position: location,
//         map: map
//     });
// }

// document.addEventListener("DOMContentLoaded", (event) => {
//     // No es necesario establecer un timeout aquí ya que initMap se llama a través del callback
// });


//MENU BUTTON


document.addEventListener('DOMContentLoaded', function () {
    var menuToggle = document.getElementById('menu-toggle');
    var menuItems = document.querySelector('.menu__items');

    menuToggle.addEventListener('click', function (event) {
        menuItems.classList.toggle('active');
        event.stopPropagation(); // Detiene la propagación para que no se active el evento del documento
    });


    document.addEventListener('click', function (event) {
        if (!menuItems.contains(event.target) && !menuToggle.contains(event.target)) {
            menuItems.classList.remove('active');
        }
    });
});


//TRANSPARENCIA DINAMICA

window.onscroll = function () {
    var navbar = document.querySelector('.header__navbar');
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollPosition <= 650) {
        // Navbar visible entre el pixel 0 y 150 del tope de la página
        navbar.style.backgroundColor = "rgba(22, 22, 22, 0.9)"; // O el color que prefieras
    } else {
        // Navbar completamente transparente más allá del pixel 150
        navbar.style.backgroundColor = "rgba(22, 22, 22, 0)"; // Fondo completamente transparente
    }
};




//CANVAS LOT OF BUBBLES

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let w, h, balls = [];
let mouse = {
    x: undefined,
    y: undefined
}
let rgb = [
    "#143074",
    "#113c97",
    "#0d42c0",
    "#0751ee",
    "#0d69ff",
    "#258bff",
    "#4eaeff",
    "#86ccff"
]

function init() {
    resizeReset();
    animationLoop();
}

function resizeReset() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

function mousemove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    for (let i = 0; i < 2; i++) {
        balls.push(new Ball());
    }
}

function mouseout() {
    mouse.x = undefined;
    mouse.y = undefined;
}


function resizeReset() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

function animationLoop() {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    drawBalls();

    let temp = [];
    for (let i = 0; i < balls.length; i++) {
        if (balls[i].time <= balls[i].ttl) {
            temp.push(balls[i]);
        }
    }
    balls = temp;

    requestAnimationFrame(animationLoop);
}

function drawBalls() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].draw();
    }
}

function mousemove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    for (let i = 0; i < 2; i++) {
        balls.push(new Ball());
    }
}

function mouseout() {
    mouse.x = undefined;
    mouse.y = undefined;
}

function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
}

class Ball {
    constructor() {
        this.start = {
            x: mouse.x + getRandomInt(-20, 20),
            y: mouse.y + getRandomInt(-20, 20),
            size: getRandomInt(5, 15)
        }
        this.end = {
            x: this.start.x + getRandomInt(-300, 300),
            y: this.start.y + getRandomInt(-300, 300)
        }

        this.x = this.start.x;
        this.y = this.start.y;
        this.size = this.start.size;

        this.style = rgb[getRandomInt(0, rgb.length - 1)];

        this.time = 0;
        this.ttl = 120;
    }
    draw() {
        ctx.fillStyle = this.style;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        if (this.time <= this.ttl) {
            let progress = 1 - (this.ttl - this.time) / this.ttl;

            this.size = this.start.size * (1 - easeOutQuart(progress));
            this.x = this.x + (this.end.x - this.x) * 0.01;
            this.y = this.y + (this.end.y - this.y) * 0.01;
        }
        this.time++;
    }
}

const headerForm = document.querySelector('.title__form');
const generalPresentation = document.querySelector('.general__presentation');

if (headerForm) {
    headerForm.addEventListener("mousemove", mousemove);
    headerForm.addEventListener("mouseout", mouseout);
}

if (generalPresentation) {
    generalPresentation.addEventListener("mousemove", mousemove);
    generalPresentation.addEventListener("mouseout", mouseout);
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);


//laboratory cards

document.querySelectorAll('.lab__container').forEach((item, index) => {
    item.addEventListener('mouseover', () => {
        const degrees = 45 * index; // Ajusta según la posición inicial y el ángulo de cada imagen
        document.querySelector('.lab__box').style.transform = `rotateY(-${degrees}deg)`;
    });
});


document.querySelectorAll('.lab__container').forEach(container => {
    container.addEventListener('click', () => {
        // Agrega la clase para iniciar la animación
        container.classList.add('rotating');

        // Opcional: remover la clase después de que la animación se complete
        container.addEventListener('animationend', () => {
            container.classList.remove('rotating');
        }, { once: true });
    });
});
