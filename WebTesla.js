    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        changeSlide();
    }

    function prevSlide() {
        currentSlide =
            (currentSlide - 1 + slides.length) % slides.length;

        changeSlide();
    }

    // ==============================
    // MILES DRIVEN COUNTER
    // ==============================

    let miles = 14498866742;

    function updateMiles() {
        miles += 1;

        document.getElementById("milesDriven").textContent =
            miles.toLocaleString("en-US");
    }

    setInterval(updateMiles, 1);

    // =========================================
    // TESLA VIDEO CONTROLS
    // =========================================

    const video = document.getElementById("fsdVideo");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const muteBtn = document.getElementById("muteBtn");
    const videoProgress = document.getElementById("videoProgress");
    const videoTime = document.getElementById("videoTime");


    // =========================================
    // PLAY / PAUSE
    // =========================================

    function toggleVideo() {

        if (video.paused) {

            video.play();

            playPauseBtn.textContent = "❚❚";

        } else {

            video.pause();

            playPauseBtn.textContent = "▶";
        }
    }


    // =========================================
    // MUTE / UNMUTE
    // =========================================

    function toggleMute() {

        video.muted = !video.muted;

        if (video.muted) {

            muteBtn.textContent = "🔇";

        } else {

            muteBtn.textContent = "🔊";
        }
    }


    // =========================================
    // UPDATE PROGRESS
    // =========================================

    video.addEventListener("timeupdate", function () {

        if (!video.duration) return;

        const progress =
            (video.currentTime / video.duration) * 100;

        videoProgress.value = progress;

        videoTime.textContent =
            formatTime(video.currentTime) +
            " / " +
            formatTime(video.duration);
    });


    // =========================================
    // CLICK PROGRESS BAR
    // =========================================

    videoProgress.addEventListener("input", function () {

        if (!video.duration) return;

        video.currentTime =
            (videoProgress.value / 100) *
            video.duration;
    });


    // =========================================
    // FORMAT TIME
    // =========================================

    function formatTime(seconds) {

        const minutes = Math.floor(seconds / 60);

        const secs =
            Math.floor(seconds % 60)
            .toString()
            .padStart(2, "0");

        return `${minutes}:${secs}`;
    }


    // =========================================
    // FULLSCREEN
    // =========================================

    function fullscreenVideo() {

        const container =
            document.querySelector(".tesla-video");

        if (!document.fullscreenElement) {

            container.requestFullscreen();

        } else {

            document.exitFullscreen();
        }
    }


    // =========================================
    // UPDATE BUTTON SAAT VIDEO BERUBAH
    // =========================================

    video.addEventListener("play", function () {

        playPauseBtn.textContent = "❚❚";

    });

    video.addEventListener("pause", function () {

        playPauseBtn.textContent = "▶";

    });

    /* =====================================
    VEHICLE CAROUSEL
    ===================================== */

    const vehicleTrack =
        document.querySelector(".vehicle-track");

    const vehicleCards =
        document.querySelectorAll(".vehicle-card");

    const vehicleDots =
        document.querySelectorAll(".vehicle-dot");

    let vehicleIndex = 0;


    /* =====================================
    UPDATE CAROUSEL
    ===================================== */

    function updateVehicleCarousel() {

        if (!vehicleTrack || !vehicleCards.length) {
            return;
        }

        const cardWidth =
            vehicleCards[0].getBoundingClientRect().width;

        const gap = 24;

        const move =
            vehicleIndex * (cardWidth + gap);

        vehicleTrack.style.transform =
            `translate3d(-${move}px, 0, 0)`;


        vehicleDots.forEach((dot) => {
            dot.classList.remove("active");
        });

        if (vehicleDots[vehicleIndex]) {
            vehicleDots[vehicleIndex].classList.add("active");
        }
    }


    /* =====================================
    NEXT
    ===================================== */

    function vehicleNext() {

        vehicleIndex++;

        if (vehicleIndex >= vehicleCards.length) {

            vehicleIndex = 0;

        }

        updateVehicleCarousel();
    }


    /* =====================================
    PREVIOUS
    ===================================== */

    function vehiclePrev() {

        vehicleIndex--;

        if (vehicleIndex < 0) {

            vehicleIndex =
                vehicleCards.length - 1;

        }

        updateVehicleCarousel();
    }


    /* =====================================
    GO TO SLIDE
    ===================================== */

    function vehicleGoTo(index) {

        if (
            index < 0 ||
            index >= vehicleCards.length
        ) {
            return;
        }


        vehicleIndex = index;

        updateVehicleCarousel();
    }


    /* =====================================
    RESPONSIVE
    ===================================== */

    window.addEventListener(
        "resize",
        updateVehicleCarousel
    );


    /* INITIAL */

    window.addEventListener(
        "load",
        updateVehicleCarousel
    );