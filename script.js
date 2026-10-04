/* ==================================================
   TASMIA BIRTHDAY WEBSITE
   MAIN JAVASCRIPT
================================================== */


/* ==================================================
   PAGE LOADER
================================================== */

function hideLoader() {

    const loader = document.getElementById("loader");

    if (loader) {
        loader.classList.add("hide");
    }

}


/*
   Hide loader when the HTML is ready.
*/

document.addEventListener("DOMContentLoaded", function () {

    setTimeout(hideLoader, 700);

});


/*
   Emergency fallback.
   The loader will never stay forever.
*/

setTimeout(hideLoader, 5000);



  /* ==================================================
   MUSIC + TAP TO ENTER
================================================== */

const music = document.getElementById("birthdayMusic");
const musicStartScreen = document.getElementById("musicStartScreen");
const startMusicButton = document.getElementById("startMusicButton");
const musicButton = document.getElementById("musicButton");


function enterWebsite() {

    /* Try to start the music */

    if (music) {

        music.volume = 0.5;

        music.play()
            .then(function () {

                console.log("Music started successfully.");

            })
            .catch(function (error) {

                console.log(
                    "Music could not autoplay:",
                    error
                );

            });

    }


    /* IMPORTANT:
       Hide the Enter screen regardless
       of whether music works or not.
    */

    if (musicStartScreen) {

        musicStartScreen.classList.add("hidden");

    }


    /* Change music button */

    if (musicButton && music) {

        if (!music.paused) {

            musicButton.textContent = "♫ Playing";

        } else {

            musicButton.textContent = "♫ Music";

        }

    }

}


/* Connect the button */

if (startMusicButton) {

    startMusicButton.addEventListener(
        "click",
        enterWebsite
    );

}


/* ==================================================
   MUSIC BUTTON
================================================== */

function toggleMusic() {

    if (!music) {
        return;
    }


    if (music.paused) {

        music.volume = 0.5;

        music.play()
            .then(function () {

                if (musicButton) {
                    musicButton.textContent = "♫ Playing";
                }

            })
            .catch(function (error) {

                console.log(
                    "Music could not start:",
                    error
                );

            });

    } else {

        music.pause();

        if (musicButton) {
            musicButton.textContent = "♫ Music";
        }

    }

}


/* ==================================================
   TYPING EFFECT
================================================== */

const typingElement =
    document.querySelector(".typing");


if (typingElement) {

    const messages = [

        "A special day for a special person ✨",

        "Today is all about you 💙",

        "May your day be filled with happiness",

        "Happy Birthday, Tasmia! 🎂"

    ];


    let messageIndex = 0;

    let characterIndex = 0;

    let deleting = false;


    function typeText() {

        const currentMessage =
            messages[messageIndex];


        /* Typing */

        if (!deleting) {

            typingElement.textContent =
                currentMessage.substring(
                    0,
                    characterIndex + 1
                );

            characterIndex++;


            /*
               Finished typing.
               Wait before deleting.
            */

            if (
                characterIndex >=
                currentMessage.length
            ) {

                deleting = true;

                setTimeout(
                    typeText,
                    1800
                );

                return;

            }

        }


        /* Deleting */

        else {

            typingElement.textContent =
                currentMessage.substring(
                    0,
                    characterIndex - 1
                );

            characterIndex--;


            /*
               Finished deleting.
               Move to next message.
            */

            if (characterIndex <= 0) {

                characterIndex = 0;

                deleting = false;

                messageIndex =
                    (messageIndex + 1) %
                    messages.length;

            }

        }


        setTimeout(
            typeText,
            deleting ? 45 : 75
        );

    }


    typeText();

}


/* ==================================================
   PHOTO LIGHTBOX
================================================== */

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.querySelector("#lightbox img");


document
    .querySelectorAll(".memory-card img")
    .forEach(function (image) {

        image.addEventListener(
            "click",
            function () {

                if (
                    !lightbox ||
                    !lightboxImage
                ) {
                    return;
                }


                lightboxImage.src =
                    image.src;


                lightbox.style.display =
                    "flex";

            }
        );

    });


/*
   Close lightbox when clicked.
*/

if (lightbox) {

    lightbox.addEventListener(
        "click",
        function () {

            lightbox.style.display =
                "none";

        }
    );

}


/* ==================================================
   SURPRISE MESSAGE
================================================== */

const surpriseButton =
    document.getElementById(
        "surpriseButton"
    );

const secretMessage =
    document.getElementById(
        "secretMessage"
    );


if (
    surpriseButton &&
    secretMessage
) {

    surpriseButton.addEventListener(
        "click",
        function () {

            secretMessage.style.display =
                "block";


            surpriseButton.style.display =
                "none";


            createConfetti();

        }
    );

}


/* ==================================================
   CONFETTI
================================================== */

function createConfetti() {

    const symbols = [
        "✦",
        "✧",
        "•",
        "✦",
        "✧"
    ];


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const particle =
            document.createElement("div");


        particle.className =
            "particle";


        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        particle.style.left =
            Math.random() * 100 + "vw";


        particle.style.bottom =
            "-20px";


        particle.style.fontSize =
            (
                Math.random() * 15 +
                10
            ) + "px";


        particle.style.animationDuration =
            (
                Math.random() * 3 +
                4
            ) + "s";


        document.body.appendChild(
            particle
        );


        setTimeout(
            function () {

                particle.remove();

            },
            7000
        );

    }

}


/* ==================================================
   COUNTDOWN
================================================== */

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");


if (
    daysElement &&
    hoursElement &&
    minutesElement &&
    secondsElement
) {


    /*
       Tasmia's birthday:

       2 November

       JavaScript months start at 0,
       so November = 10.
    */

    function getNextBirthday() {

        const now = new Date();

        let year =
            now.getFullYear();


        let birthday =
            new Date(
                year,
                10,
                2,
                0,
                0,
                0
            );


        /*
           If this year's birthday
           has already passed,
           use next year.
        */

        if (birthday <= now) {

            birthday =
                new Date(
                    year + 1,
                    10,
                    2,
                    0,
                    0,
                    0
                );

        }


        return birthday;

    }


    function updateCountdown() {

        const now =
            new Date();


        const birthday =
            getNextBirthday();


        const difference =
            birthday - now;


        if (difference <= 0) {

            daysElement.textContent =
                "00";

            hoursElement.textContent =
                "00";

            minutesElement.textContent =
                "00";

            secondsElement.textContent =
                "00";

            return;

        }


        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (
                    difference /
                    (1000 * 60 * 60)
                ) % 24
            );


        const minutes =
            Math.floor(
                (
                    difference /
                    (1000 * 60)
                ) % 60
            );


        const seconds =
            Math.floor(
                (
                    difference /
                    1000
                ) % 60
            );


        daysElement.textContent =
            String(days).padStart(
                2,
                "0"
            );


        hoursElement.textContent =
            String(hours).padStart(
                2,
                "0"
            );


        minutesElement.textContent =
            String(minutes).padStart(
                2,
                "0"
            );


        secondsElement.textContent =
            String(seconds).padStart(
                2,
                "0"
            );

    }


    updateCountdown();


    setInterval(
        updateCountdown,
        1000
    );

}


/* ==================================================
   ACTIVE NAVIGATION
================================================== */

const currentPage =
    window.location.pathname
        .split("/")
        .pop();


document
    .querySelectorAll("nav a")
    .forEach(function (link) {

        const linkPage =
            link.getAttribute("href");


        if (
            linkPage === currentPage ||
            (
                currentPage === "" &&
                linkPage === "index.html"
            )
        ) {

            link.classList.add(
                "active"
            );

        }

    });


/* ==================================================
   PAGE READY
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        document.body.classList.add(
            "page-loaded"
        );

    }
);