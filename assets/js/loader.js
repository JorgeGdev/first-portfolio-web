
//PRELOADER CONFIGURATION


document.addEventListener("DOMContentLoaded", function () {
    // Ocultar el contenido principal al cargar la página
    document.querySelector(".general__layout").style.display = "none";


    paceOptions = {
        ajax: true,   //checks ajax request
        document: true, //document is ready


    }

    Pace.on('done', () => {

        gsap.timeline()
            .add('p')
            .add('start')

            .to('.pace', {
                transform: 'scale(10, 1)',
                duration: 3
            }, "+=.2")

            .to('.pace', {

                duration: 2,
                height: "100%",
            }, "-=.2.5")

            .to('.loading__text', {

                delay: .2,
                duration: 5,
                opacity: 0,
                yPercent: -400,
                ease: "BezierEasing(0.19,1,0.22,1)"

            }, 'p')

            .to('.general__preloader', {
                // Animación para desvanecer el loader
                duration: 1,
                opacity: 0,
                onComplete: function () {
                    document.querySelector(".general__preloader").style.display = "none";
                    document.querySelector(".general__layout").style.display = "block";
                }
            })
            .from('.general__layout', {
                // Animación para mostrar el contenido principal
                duration: 1,
                opacity: 0
            });





    })

});



function startLoader() {
    let counterElement = document.querySelector(".counter");
    let currentValue = 0;

    function updateCounter() {
        // Incrementar currentValue de forma aleatoria
        currentValue += Math.floor(Math.random() * 10) + 1;
        if (currentValue > 100) {
            currentValue = 100;
        }

        // Actualizar el contenido del contador
        counterElement.textContent = currentValue + "%";

        // Si currentValue no es 100, volver a llamar a updateCounter
        if (currentValue < 100) {
            let delay = Math.floor(Math.random() * 200) + 50;
            setTimeout(updateCounter, delay);
        }
    }

    // Iniciar la primera llamada a updateCounter
    updateCounter();
}

startLoader();


document.addEventListener("DOMContentLoaded", function () {
    // Suponiendo que .general__preloader es el contenedor del preloader
    // y .general__layout es el contenedor del contenido principal

    // Ocultar el contenido principal al inicio
    document.querySelector(".general__layout").style.display = "none";

    setTimeout(function () {
        // Suponer que el preloader ha terminado después de un tiempo fijo
        document.querySelector(".general__preloader").style.display = "none";
        // Mostrar el contenido principal
        document.querySelector(".general__layout").style.display = "block";
    }, 5000); // Ajusta este tiempo según sea necesario
});

Pace.on('done', function () {
    // Ajustar el z-index del page loader a un valor menor que -3
    document.querySelector('.pace').style.zIndex = '-4';


});
