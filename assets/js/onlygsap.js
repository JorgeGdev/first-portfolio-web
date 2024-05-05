
paceOptions = {
    ajax: true,   //checks ajax request
    document: true, //document is ready


}

window.onload = function () {
    const preloader = document.querySelector('.general__preloader');
    const mainContent = document.querySelector('.general__layout');

    // Inicialización
    preloader.style.display = 'block';
    preloader.style.zIndex = '200';
    mainContent.style.display = 'none'; // Asegúrate de que esto esté en tu CSS inicialmente
    mainContent.style.opacity = 0; // Asegúrate de que esto esté en tu CSS inicialmente
    mainContent.style.visibility = 'hidden'; // Asegúrate de que esto esté en tu CSS inicialmente




    Pace.on('done', () => {
        // Animaciones del preloader
        gsap.timeline()
            .add('p')

            /*.to('.pace', {
    
                duration: 1,
                height: '100%'
    
            }, "-=.2.5")*/


            .to('.pace', {
                transform: 'scale(10, 1)',
                duration: 4
            }, "+=.2")

            .to('.pace', {

                duration: 1,
                height: "100%",
            }, "-=.2.5")

            .to('.loading__text', {

                delay: .2,
                duration: 3,
                opacity: 0,
                yPercent: -400,
                ease: "BezierEasing(0.19,1,0.22,1)"

            }, 'p')
            .to('.general__preloader', {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    preloader.style.display = 'none';
                    preloader.style.zIndex = '-5';

                    // Usar setTimeout para cambiar los estilos del contenido principal
                    setTimeout(() => {
                        mainContent.style.display = 'block';
                        mainContent.style.opacity = 1;
                        mainContent.style.visibility = 'visible';
                        mainContent.style.zIndex = '100';

                        // Llamar a iniciarAnimacionesGSAP después de cambiar los estilos
                        iniciarAnimacionesGSAP();
                    }, 100);
                }
            });
    });
};


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

    document.querySelector(".general__layout").style.display = "none";

    setTimeout(function () {

        document.querySelector(".general__preloader").style.display = "none";

        document.querySelector(".general__layout").style.display = "block";
    }, 5000);
});

Pace.on('done', function () {


    setTimeout(function () {

        document.querySelector('.pace').style.zIndex = '-4';

    }, 3000);

});



// SCROLL TRIGGER GSAP
//GENERAL ANIMATION



function iniciarAnimacionesGSAP() {

    gsap.registerPlugin(ScrollTrigger);
    const textElements = gsap.utils.toArray('.animation__text');
    textElements.forEach(text => {
        gsap.to(text, {
            backgroundSize: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: text,
                start: 'top 80%',
                end: 'center 40%',
                scrub: true,

            },


        });

    });

    //GSAP ANIMATIONS

    gsap.from('.title__text', {

        duration: 2,
        x: 20,
        y: -1000,
        delay: 1,
        borderRadius: '50%',
        ease: 'bounce.out'


    })

    gsap.from('.title__content span', {
        duration: 0.5,
        opacity: 0,
        y: -1000,
        stagger: 0.2,
        ease: 'bounce.out'
    });



    // SCROLL TRIGGER GSAP
    //GENERAL ANIMATION

    gsap.registerPlugin(ScrollTrigger);
    const reveal0 = gsap.utils.toArray('.general__subtitle0');
    reveal0.forEach((text, i) => {
        ScrollTrigger.create({
            trigger: text,
            toggleClass: 'active',
            start: "top 100%",
            end: "top 20%",
            //markers: true
        })

    });

    gsap.registerPlugin(ScrollTrigger);
    const images = gsap.utils.toArray('.photo__demo');
    images.forEach((img, i) => {
        ScrollTrigger.create({
            trigger: img,
            toggleClass: 'active',
            start: "top 90%",
            end: "top 20%",
            //markers: true
        })

    });

    gsap.registerPlugin(ScrollTrigger);
    const reveal1 = gsap.utils.toArray('.general__subtitle1');
    reveal1.forEach((text, i) => {
        ScrollTrigger.create({
            trigger: text,
            toggleClass: 'active',
            start: "top 100%",
            end: "top 20%",
            //markers: true
        })

    });

    gsap.registerPlugin(ScrollTrigger);
    const reveal2 = gsap.utils.toArray('.general__subtitle2');
    reveal2.forEach((text, i) => {
        ScrollTrigger.create({
            trigger: text,
            toggleClass: 'active',
            start: "top 100%",
            end: "top 20%",
            //markers: true
        })

    });

    gsap.registerPlugin(ScrollTrigger);
    const reveal3 = gsap.utils.toArray('.general__subtitle3');
    reveal3.forEach((text, i) => {
        ScrollTrigger.create({
            trigger: text,
            toggleClass: 'active',
            start: "top 100%",
            end: "top 20%",
            //markers: true
        })

    });

}
