function locomotiveScrolltrigger(){

    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

};

locomotiveScrolltrigger();


function videoCursorFollow() {
    var homeVideo = document.getElementById(`home-video`);
    var homeVideoCursor = document.getElementById(`play`);

    homeVideo.addEventListener('mousemove', function (e){
    //    console.log(homeVideo.getBoundingClientRect());

        gsap.to(homeVideoCursor, {
            opacity: 1,
            scale: 1,
            // left: e.clientX - 70,
            left: e.offsetX - 50,
            
            // top: (e.clientY - 20)- homeVideo.getBoundingClientRect().top,
            top: e.offsetY - 20,
        });
    });

    homeVideo.addEventListener('mouseleave', function (){
        gsap.to(homeVideoCursor, {
            opacity: 0,
            scale: 0,
        });
    });
};


videoCursorFollow();


function loadingAnimation() {
    gsap.from(`#hero h1`, {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        delay: 0.3
    });
    gsap.from(`#hero #home-video`, {
        y: 100,
        opacity: 0,
        duration: 0.6,
        delay: .9
    });
};


loadingAnimation();



function productCursorAnimation() {
    var productCursor = document.getElementById(`cursor`);
    var main = document.getElementById(`main`);

    main.addEventListener('mousemove', function(e){
        gsap.to(productCursor ,  {
            top: e.y,
            left: e.x
        });
    });

    document.querySelectorAll(`#page4 .elem`).forEach(function (elements) {
        elements.addEventListener("mouseenter", function () {
            gsap.to(productCursor, {
                transform: `translate(-50%, -50%) scale(1)`
            });
        });
    });

    document.querySelectorAll(`#page4 .elem`).forEach(function (elements) {
        elements.addEventListener("mouseleave", function () {
            gsap.to(productCursor, {
                transform: `translate(-50%, -50%) scale(0)`
            });
        });
    });

};

productCursorAnimation();



function navbarAnimation() {
    gsap.to("nav #logo svg", {
        transform: "translateY(-100%)",
        marginBottom: `-15px`,
        scrollTrigger: {
          trigger: "#hero",
          scroller: "#main",
        //   markers: true,
          start: "top 0",
          end: "top -13%",
          scrub: true,
        },
    });
    gsap.to("#nav-right #links", {
        transform: "translateY(-100%)",
        opacity: 0,
        scrollTrigger: {
          trigger: "#hero",
          scroller: "#main",
        //   markers: true,
          start: "top 0",
          end: "top -13%",
          scrub: true,
        },
    });
};

navbarAnimation();
