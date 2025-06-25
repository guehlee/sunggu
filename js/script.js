let leaderLines = [];

// layout elements
const sidebar = document.querySelector(".sidebar");
const aboutDetail = document.querySelector(".about-detail");

let oldWidth = window.innerWidth;
let oldHeight = window.innerHeight;

let layoutState = "landing";

// DRAG & CLICK LOGIK
let isClicked = false;
let isMoving = false;

$(document).ready(function () {
  console.log("Ready!");

  //Hover Effekte
   $(".english").hover(function() {
    $(".language-resizer").css("box-shadow", "-5px 0 10px rgba(0, 0, 0, 0.50)");
  }, function() {
    $(".language-resizer").css("box-shadow", "none");
  });
  $(".language-resizer").hover(function() {
    $(".language-resizer").css("box-shadow", "-5px 0 10px rgba(0, 0, 0, 0.50)");
  }, function() {
    $(".language-resizer").css("box-shadow", "none");
  });

  $(".korean").hover(function() {
    $(".sidebar-resizer").css("box-shadow", "-5px 0 10px rgba(0, 0, 0, 0.50)");
  }, function() {
    $(".sidebar-resizer").css("box-shadow", "none");
  });
$(".sidebar-resizer").hover(function() {
    $(".sidebar-resizer").css("box-shadow", "-5px 0 10px rgba(0, 0, 0, 0.50)");
  }, function() {
    $(".sidebar-resizer").css("box-shadow", "none");
  });

  $(".about-english").hover(function() {
    $(".about-resizer").css("box-shadow", "-5px 0 10px rgba(0, 0, 0, 0.50)");
  }, function() {
    $(".about-resizer").css("box-shadow", "none");
  });
$(".about-resizer").hover(function() {
    $(".about-resizer").css("box-shadow", "-5px 0 10px rgba(0, 0, 0, 0.50)");
  }, function() {
    $(".about-resizer").css("box-shadow", "none");
  });

 $(".about-korean").hover(function() {
    $(".about-detail-resizer").css("box-shadow", "-5px 0 10px rgba(0, 0, 0, 0.50)");
  }, function() {
    $(".about-detail-resizer").css("box-shadow", "none");
  });
$(".about-detail-resizer").hover(function() {
    $(".about-detail-resizer").css("box-shadow", "-5px 0 10px rgba(0, 0, 0, 0.50)");
  }, function() {
    $(".about-detail-resizer").css("box-shadow", "none");
  });


 $(".about-cv").hover(function() {
    $(".about-work-resizer").css("box-shadow", "-5px 0 10px rgba(0, 0, 0, 0.50)");
  }, function() {
    $(".about-work-resizer").css("box-shadow", "none");
  });
$(".about-work-resizer").hover(function() {
    $(".about-work-resizer").css("box-shadow", "-5px 0 10px rgba(0, 0, 0, 0.50)");
  }, function() {
    $(".about-work-resizer").css("box-shadow", "none");
  });


  $(".thumbnail")
    .on("mousedown", function () {
      isClicked = true;
      console.log("clicking?:" + isClicked);
      return isClicked;
    })
    .on("mousemove", function (event) {
      if (isClicked) {
        isMoving = true;
        event.target.dataset.dragged = true;
      }
      console.log("moving?:" + isMoving);
      return isMoving;
    })
    .on("mouseup", function (event) {
      if (!isMoving) {
        document.querySelector(".sidebar").classList.add("show");
        // if sidebar opens
        const newWidth =
          window.innerWidth - sidebar.getBoundingClientRect().width;
        // 120 because else the images might overflow on the edges of the container
        moveThumbnails(newWidth, oldHeight);
        // event.stopPropagation();
      } else {
        event.target.dataset.dragged = false;
      }
      console.log("mouseup - reset states");
    })
    .draggable({
      containment: [0, 0, oldWidth - 0.08 * window.innerWidth, oldHeight - 120],
      distance: 5,

      start: function (event, ui) {
        if (!isMoving) {
          console.log("Not moving – drag prevented.");
          return false; // ❌ Drag wird NICHT gestartet
        }
      },

      drag: function () {
        console.log("Dragging...", oldWidth, oldHeight);
        leaderLines.forEach((line) => line.position()); // 🔁 LeaderLines live aktualisieren
      },

      stop: function (event, ui) {
        console.log("Stopped at", ui.position);
        leaderLines.forEach((line) => line.position()); // 🔁 LeaderLines erneut aktualisieren
      },
    });

  if (window.innerWidth <= 650) {
    // When a thumbnail is clicked
    $(".thumbnail .openSidebar").on("click", function () {
      $(".project").hide(); // Hide thumbnails
      $(".mobile-project-view").show(); // Show project details

      // Optional: Load or inject content here
      $(".video-container").html($("#videoContainer").clone());
      $(".english-text").html($(".english").html());
      $(".korean-text").html($(".korean").html());
      $(".images-container").html($(".image").html());
    });
  }
});
//ProjectCanvas

// VIDEO DETECTION
document.addEventListener("DOMContentLoaded", function () {
  const videoContainer = document.getElementById("videoContainer");
  if (videoContainer?.querySelector("iframe")) {
    videoContainer.classList.add("active");
  }



//   // THUMBNAIL PLACEMENT + LEADERLINE
//   const thumbnails = Array.from(document.querySelectorAll(".thumbnail"));
//   const minDistance = 120;
//   const placedPositions = [];
//   const previousPosition = {
//     x: window.innerWidth / 2,
//     y: window.innerHeight / 2,
//   };

//   thumbnails.forEach((thumb) => {
//     const width = thumb.offsetWidth || 80;
//     const height = thumb.offsetHeight || 80;
//     let position = null;
//     let attempts = 0;

//     do {
//       position = getRandomPositionWithinBounds(previousPosition, width, height);
//       attempts++;
//     } while (
//       !checkNoOverlapWithPlaced(
//         position,
//         placedPositions,
//         minDistance,
//         width,
//         height
//       ) &&
//       attempts < 100
//     );

//     if (position) {
//       setPosition(thumb, position);
//       placedPositions.push({ ...position, width, height });
//     }
//   });

  
//   // LeaderLines erstellen
//   setTimeout(() => {
//     for (let i = 0; i < thumbnails.length - 1; i++) {
//       const line = new LeaderLine(thumbnails[i], thumbnails[i + 1], {
//         color: "#000",
//         size: 1.2,
//         // size: 2.5,
//         path: "magnetic",
//         endPlug: "arrow2",
//         startPlug: "behind",
//         dropShadow: false,
//         animation: false,
//         startSocket: "right", // oder "bottom", "left", "right"
//         endSocket: "top",
//       });
//       leaderLines.push(line);
//     }
//   }, 200);
// });



// // LeaderLines bei Fenstergröße neu berechnen
// window.addEventListener("resize", () => {
//   leaderLines.forEach((line) => line.position());
});


//PushThumbnails
function moveThumbnails(newWidth, newHeight) {
  const thumbnails = Array.from(document.querySelectorAll(".thumbnail"));
  const widthRatio = newWidth / oldWidth;
  const heightRatio = newHeight / oldHeight;
  thumbnails.forEach((thumbnail) => {
    const oldLeft = parseFloat(thumbnail.style.left);
    const oldTop = parseFloat(thumbnail.style.top);
    const elWidth = thumbnail.getBoundingClientRect().width;
    const elHeight = thumbnail.getBoundingClientRect().height;
    thumbnail.style.left =
      Math.min(oldLeft * widthRatio, newWidth - elWidth) + "px";
    thumbnail.style.top =
      Math.min(oldTop * heightRatio, newHeight - elHeight) + "px";
    $(thumbnail).draggable("option", "containment", [
      0,
      0,
      newWidth - elWidth,
      newHeight - elHeight,
    ]);
  });
  oldHeight = newHeight;
  oldWidth = newWidth;

  let startTime = Date.now();
  const update = () => {
    if (Date.now() - startTime > 300) return;
    leaderLines.forEach((line) => line.position()); // 🔁 LeaderLines live aktualisieren
    requestAnimationFrame(update);
  };
  update();
}

// window.addEventListener("resize", (event) => {
//   moveThumbnails(window.innerWidth, window.innerHeight);
// });



// HILFSFUNKTIONEN ––––––––––––––––––––––––––––––––––––––––

function getRandomPositionWithinBounds(prev, width, height) {
  const spreadX = 0.4 * window.innerWidth;
  const spreadY = 0.4 * window.innerHeight;
  const edgePadding = 80;

  const halfWidth = width / 2;
  const halfHeight = height / 2;

  let newX = prev.x + getRandomValue(spreadX);
  let newY = prev.y + getRandomValue(spreadY);

  newX = Math.max(
    halfWidth + edgePadding,
    Math.min(newX, window.innerWidth - halfWidth - edgePadding)
  );
  newY = Math.max(
    halfHeight + edgePadding,
    Math.min(newY, window.innerHeight - halfHeight - edgePadding)
  );

  return { x: newX, y: newY };
}

function getRandomValue(range = 20) {
  return Math.random() * (range * 2) - range;
}

function checkNoOverlapWithPlaced(pos, placed, minDist, width, height) {
  const buffer = minDist / 2;
  return placed.every(
    (p) =>
      Math.abs(pos.x - p.x) >= (p.width + width) / 2 + buffer ||
      Math.abs(pos.y - p.y) >= (p.height + height) / 2 + buffer
  );
}

function setPosition(element, position) {
  const width = element.offsetWidth;
  const height = element.offsetHeight;
  element.style.position = "absolute";
  element.style.left = `${position.x - width / 2}px`;
  element.style.top = `${position.y - height / 2}px`;
}

function getRandomRotation() {
  return Math.random() * 30 - 15;
}

//Mobile und desktop rerender:
const BREAKPOINT = 650;           // px
let isMobile = window.innerWidth <= BREAKPOINT;

/* Alle LeaderLines löschen */
function clearLines() {
  leaderLines.forEach(l => l.remove());
  leaderLines = [];
}

/* Thumbnails zufällig platzieren → nutzt DEINE vorhandene Random-Funktionen */
function randomizeThumbnails() {
  const thumbs  = Array.from(document.querySelectorAll('.thumbnail'));
  const placed  = [];
  thumbs.forEach(t => {
    const w = t.offsetWidth  || 80;
    const h = t.offsetHeight || 80;
    let pos, tries = 0;
    do { pos = getRandomPositionWithinBounds({x:innerWidth/2,y:innerHeight/2}, w, h); }
    while (!checkNoOverlapWithPlaced(pos, placed, 120, w, h) && ++tries < 100);
    if (pos) { setPosition(t, pos); placed.push({ ...pos, width:w, height:h }); }
  });

  /* Drag-Containment neu setzen */
  thumbs.forEach(t => {
    const w = t.getBoundingClientRect().width,
          h = t.getBoundingClientRect().height;
    $(t).draggable('option','containment',[0,0,innerWidth-w,innerHeight-h]);
  });

  oldWidth  = innerWidth;
  oldHeight = innerHeight;
}

/* Neue LeaderLines je nach Viewport-Typ */
function buildLines() {
  clearLines();
  const thumbs = document.querySelectorAll('.thumbnail');

  if (isMobile) {
    for (let i = 0; i < thumbs.length - 1; i++) {
      leaderLines.push(
        new LeaderLine(
          LeaderLine.pointAnchor(thumbs[i],   {x:'50%',y:'100%'}),
          LeaderLine.pointAnchor(thumbs[i+1], {x:'50%',y:'0%'}),
          { path:'straight', color:'#000', size:2 }
        )
      );
    }
  } else {
    for (let i = 0; i < thumbs.length - 1; i++) {
      leaderLines.push(
        new LeaderLine(thumbs[i], thumbs[i+1], {
          color:'#000', size:1.2, path:'magnetic',
          endPlug:'arrow2', startPlug:'behind'
        })
      );
    }
  }
}

/* Komplettes Neuaufbauen */
function resetLayout() {
  randomizeThumbnails();
  buildLines();
}

/* Debounce-Helfer */
const debounce = (fn, d = 120) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), d); }; };

/* ––––– Resize-Handler ––––– */
window.addEventListener('resize', debounce(() => {
  const nowMobile = innerWidth <= BREAKPOINT;

  /* 1) Thumbnails proportional schieben, solange Desktop bleibt */
  if (!nowMobile) {                                //  NEW
    moveThumbnails(innerWidth, innerHeight);       //  NEW
  }                                                //  NEW

  /* 2) Linien in jedem Fall neu positionieren */
  leaderLines.forEach(l => l.position());

  /* 3) Wechsel Mobile ⇔ Desktop? → komplettes Reset */
  if (nowMobile !== isMobile) {
    isMobile = nowMobile;
    resetLayout();                                 // hier wird randomisiert + Lines neu
  }
}));

/* ––––– Initialisierung ––––– */
window.addEventListener('load', () => {
  resetLayout();     
  document.body.classList.add('thumbs-ready');                          
});




// SIDEBAR SCHLIEßEN BEIM KLICK AUF BACKGROUND
const projectCanvas = document.querySelector(".back");

projectCanvas.addEventListener("click", function (event) {
  if (sidebar.classList.contains("show")) {
    // if sidebar gets closed
    moveThumbnails(window.innerWidth, oldHeight);
    sidebar.classList.remove("show");
    event.stopPropagation();
  }
});

//ABOUT PAGE OPEN –––––––––––––––––––––––––––––––––––––––
document.addEventListener("DOMContentLoaded", function () {
  const about = document.querySelector(".about");
  const aboutDetail = document.getElementById("aboutDetail");

  if (about && aboutDetail) {
    about.addEventListener("click", function () {
      if (aboutDetail.classList.contains("show")) {
        // if about Detail closes
        moveThumbnails(oldWidth, window.innerHeight);
      } else {
        // about Detail opens
        const newHeight =
          window.innerHeight - aboutDetail.getBoundingClientRect().height;
        moveThumbnails(oldWidth, newHeight);
      }
      aboutDetail.classList.toggle("show");
    });

    // Optional: close when clicking outside
    document.addEventListener("mouseup", function (e) {
      if (
        aboutDetail.classList.contains("show") &&
        !aboutDetail.contains(e.target) &&
        !about.contains(e.target) &&
        !isMoving
      ) {
        aboutDetail.classList.remove("show");
        // if about Detail closes
        moveThumbnails(oldWidth, window.innerHeight);
      }
      isClicked = false;
      isMoving = false;
      const draggedElement = document.querySelector("[data-dragged=true]");
      if (draggedElement) draggedElement.dataset.dragged = false;
    });
  }
});

// RESIZE –––––––––––––––––––––––––––––––––––––––

$(".sidebar-resizer").on("mousedown", function (e) {
  console.log(e);

  e.preventDefault();
  const sidebarLeft = $(".sidebar-left");
  const sidebarRight = $(".sidebar-right");
  const sidebarStartX = e.pageX;
  const sidebarStartWidth = sidebarLeft.width();

  $(document).on("mousemove", function (e) {
    const newWidth = sidebarStartWidth + (e.pageX - sidebarStartX);
    sidebarLeft.width(newWidth);
    sidebarRight.css("width", `calc(100% - ${newWidth}px)`);
  });

  $(document).on("mouseup", function () {
    $(document).off("mousemove mouseup");
  });
});
$(".language-resizer").on("mousedown", function (e) {
  e.preventDefault();

  const english = $(".english");
  const korean = $(".korean");
  const languageStartX = e.pageX;

  const languageStartWidthEnglish = english.width();
  const languageStartWidthKorean = korean.width();

  // Die Berechnung für beide Seiten (Englisch und Koreanisch) anpassen
  $(document).on("mousemove", function (e) {
    // Berechne die neue Breite für Englisch
    const newWidthEnglish = languageStartWidthEnglish + (e.pageX - languageStartX);
    
    // Aktualisiere die Breite des englischen Containers
    english.css("width", `${newWidthEnglish}px`);
    
    // Berechne und aktualisiere die Breite des koreanischen Containers
    const newWidthKorean = languageStartWidthKorean - (e.pageX - languageStartX);
    korean.css("width", `${newWidthKorean}px`);
  });

  $(document).on("mouseup", function () {
    $(document).off("mousemove mouseup");
  });
});

$(".about-work-resizer").on("mousedown", function (e) {
  console.log(e);

  e.preventDefault();
  const aboutCv = $(".about-cv");
  const aboutExhibition = $(".about-exhibition");
  const aboutStartX = e.pageX;
  const aboutStartWidth = aboutCv.width();

  $(document).on("mousemove", function (e) {
    const newWidth = aboutStartWidth + (e.pageX - aboutStartX);
    aboutCv.width(newWidth);
    aboutExhibition.css("width", `calc(100% - ${newWidth}px)`);
  });

  $(document).on("mouseup", function () {
    $(document).off("mousemove mouseup");
  });
});

$(".about-detail-resizer").on("mousedown", function (e) {
  console.log(e);

  e.preventDefault();
  const aboutText = $(".about-text");
  const aboutWork = $(".about-work");
  const aboutStartX = e.pageX;
  const aboutStartWidth = aboutText.width();

  $(document).on("mousemove", function (e) {
    const newWidth = aboutStartWidth + (e.pageX - aboutStartX);
    aboutText.width(newWidth);
    aboutWork.css("width", `calc(100% - ${newWidth}px)`);
  });

  $(document).on("mouseup", function () {
    $(document).off("mousemove mouseup");
  });
});

$(".about-resizer").on("mousedown", function (e) {
  console.log(e);

  e.preventDefault();
  const aboutEnglish = $(".about-english");
  const aboutKorean = $(".about-korean");
  const aboutStartX = e.pageX;
  const aboutStartWidth = aboutEnglish.width();

  $(document).on("mousemove", function (e) {
    const newWidth = aboutStartWidth + (e.pageX - aboutStartX);
    aboutEnglish.width(newWidth);
    aboutKorean.css("width", `calc(100% - ${newWidth}px)`);
  });

  $(document).on("mouseup", function () {
    $(document).off("mousemove mouseup");
  });
});

//SCROLLBAR
document.addEventListener("DOMContentLoaded", function () {
  const scrollables = document.querySelectorAll(".scroll-content");

  scrollables.forEach((container) => {
    const scrollbar = container.querySelector(".scrollbar");
    const track = container.querySelector(".scrolltrack");

    if (!scrollbar || !track) return;

    container.addEventListener("scroll", function () {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      if (scrollHeight <= clientHeight) {
        track.style.display = "none";
        return;
      } else {
        track.style.display = "block";
      }

      const scrollbarHeight = scrollbar.offsetHeight;

      const trackHeight = Math.max(
        (clientHeight / scrollHeight) * scrollbarHeight,
        30
      );
      const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
      const trackTop = scrollPercentage * (scrollbarHeight - trackHeight);

      track.style.height = `${trackHeight}px`;
      track.style.top = `${trackTop}px`;

      console.log({
        element: container.className,
        scrollTop,
        scrollHeight,
        clientHeight,
        scrollbarHeight,
        trackHeight,
        scrollPercentage,
        trackTop,
      });
    });

    container.dispatchEvent(new Event("scroll"));
  });
});

// IMPRINT––––––––––––––––––––––––––––––––
document.addEventListener("DOMContentLoaded", function () {
  const imprintBtn = document.querySelector(".imprint-btn");
  const aboutImprint = document.querySelector(".about-imprint");
  const imprintClose = document.querySelector(".imprint-close");

  if (imprintBtn && aboutImprint) {
    imprintBtn.addEventListener("click", function (e) {
      console.log("Imprint button clicked ✅"); // 🔍 Test log
      e.stopPropagation();
      aboutImprint.classList.toggle("show");
    });

    document.addEventListener("click", function (e) {
      if (
        aboutImprint.classList.contains("show") &&
        !aboutImprint.contains(e.target) &&
        !imprintBtn.contains(e.target)
      ) {
        aboutImprint.classList.remove("show");
      }
    });
  }

  if (imprintClose && aboutImprint) {
    imprintClose.addEventListener("click", function (e) {
      e.stopPropagation();
      aboutImprint.classList.remove("show");
    });
  }
});

// –––––––––––––––––––––––––––––––––––––––
// –––––––––––––––– MOBILE –––––––––––––––
// –––––––––––––––––––––––––––––––––––––––

// MOBILE:: LANDING PAGE / LEADERLINE ARRANGEMENT

function initLeaderLinesMobile() {
  // Only run on mobile
  if (window.innerWidth <= 650) {
    // Remove old lines
    leaderLines.forEach((line) => line.remove());
    leaderLines = [];

    const thumbs = document.querySelectorAll(".thumbnail");

    for (let i = 0; i < thumbs.length - 1; i++) {
      const line = new LeaderLine(
        LeaderLine.pointAnchor(thumbs[i], { x: "50%", y: "100%" }),
        LeaderLine.pointAnchor(thumbs[i + 1], { x: "50%", y: "0%" }),
        {
          path: "straight",
          startSocket: "bottom",
          endSocket: "top",
          color: "#000",
          size: 2,
        }
      );
      leaderLines.push(line);
    }

    // Update on scroll
    // const scrollContainer = document.querySelector(".project");
    // if (scrollContainer) {
    //   scrollContainer.addEventListener("scroll", () => {
    //     leaderLines.forEach((line) => line.position());
    //   });
    // }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(initLeaderLinesMobile, 200); // Let layout settle first
});

// window.addEventListener("resize", () => {
//   initLeaderLinesMobile(); // Re-initialize when screen resizes (like rotating phone)
// });

// –––––––––––––––––––––––––––––––––––––––
// –––––––––––––––– MOBILE –––––––––––––––
// –––––––––––––––––––––––––––––––––––––––

// MOBILE:: LANDING PAGE / LEADERLINE ARRANGEMENT

// function initLeaderLinesMobile() {
//   // Only run on mobile
//   if (window.innerWidth <= 650) {
//     // Remove old lines
//     leaderLines.forEach((line) => line.remove());
//     leaderLines = [];

//     const thumbs = document.querySelectorAll(".thumbnail");

//     for (let i = 0; i < thumbs.length - 1; i++) {
//       const line = new LeaderLine(
//         LeaderLine.pointAnchor(thumbs[i], { x: "50%", y: "100%" }),
//         LeaderLine.pointAnchor(thumbs[i + 1], { x: "50%", y: "0%" }),
//         {
//           path: "straight",
//           startSocket: "bottom",
//           endSocket: "top",
//           color: "#000",
//           size: 2,
//         }
//       );
//       leaderLines.push(line);
//     }
//   }
// }

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(initLeaderLinesMobile, 200); // Let layout settle first
});

// window.addEventListener("resize", () => {
//   initLeaderLinesMobile(); // Re-initialize when screen resizes (like rotating phone)
// });

// MOBILE:: SINGLE PAGE VIEW

document.addEventListener("click", function (e) {
  const thumb = e.target.closest(".thumbnail");

  if (thumb && window.innerWidth <= 650) {
    console.log("✅ Thumbnail clicked on mobile");

    // Switch views
    document.querySelector(".project")?.style.setProperty("display", "none");
    document
      .querySelector(".mobile-about-view")
      ?.style.setProperty("display", "none");
    document
      .querySelector(".mobile-project-view")
      ?.style.setProperty("display", "flex");

    // Update header
    const creditTitle = document.querySelector("#toggleCredit");
    const mobileTitle = document.querySelector(".mobile-title");
    const aboutToggle = document.querySelector(".mobile-about-toggle");

    if (creditTitle && mobileTitle) {
      mobileTitle.textContent = creditTitle.textContent.replace("▼", "").trim();
    }

    if (aboutToggle) {
      aboutToggle.textContent = "×";
    }

    // Prevent background scroll
    document.body.classList.add("no-scroll");

    // Clone content
    document
      .querySelector(".video-container")
      ?.replaceChildren(
        document.querySelector("#videoContainer")?.cloneNode(true),
        ...document.querySelector(".description-credit")?.cloneNode(true)
          .childNodes
      );
    document
      .querySelector(".english-text-container")
      ?.replaceChildren(
        ...document.querySelector(".english")?.cloneNode(true).childNodes
      );
    document
      .querySelector(".korean-text-container")
      ?.replaceChildren(
        ...document.querySelector(".korean")?.cloneNode(true).childNodes
      );
    document
      .querySelector(".images-container")
      ?.replaceChildren(
        ...document.querySelector(".image")?.cloneNode(true).childNodes
      );
  }
});

// MOBILE:: ABOUT PAGE VIEW

document.addEventListener("click", function (e) {
  const aboutToggle = e.target.closest(".mobile-about-toggle");

  if (!aboutToggle || window.innerWidth > 650) return;

  const aboutView = document.querySelector(".mobile-about-view");
  const projectView = document.querySelector(".mobile-project-view");
  const landingView = document.querySelector(".project");
  const mobileTitle = document.querySelector(".mobile-title");

  const isAboutOpen = aboutView && aboutView.style.display === "flex";
  const isProjectOpen = projectView && projectView.style.display === "flex";

  if (isProjectOpen) {
    projectView.style.display = "none";
    landingView.style.display = "block";
    aboutToggle.textContent = "+";
    if (mobileTitle) mobileTitle.textContent = "Sunggu Hong";
    document.body.classList.remove("no-scroll");
    console.log("⬅️ Closed mobile project view");
  } else if (!isAboutOpen) {
    landingView.style.display = "none";
    projectView.style.display = "none";
    aboutView.style.display = "flex";
    aboutToggle.textContent = "×";
    document.body.classList.add("no-scroll");

    document
      .querySelector(".about-container")
      ?.replaceChildren(
        ...document.querySelector(".about-english")?.cloneNode(true).childNodes
      );
    document
      .querySelector(".cv-container")
      ?.replaceChildren(
        ...document.querySelector(".cv-text")?.cloneNode(true).childNodes
      );
    document
      .querySelector(".exhibition-container")
      ?.replaceChildren(
        ...document.querySelector(".exhibit-text")?.cloneNode(true).childNodes
      );
    document
      .querySelector(".imprint-container")
      ?.replaceChildren(
        ...document.querySelector(".image")?.cloneNode(true).childNodes
      );
  } else {
    aboutView.style.display = "none";
    landingView.style.display = "block";
    aboutToggle.textContent = "+";
    if (mobileTitle) mobileTitle.textContent = "Sunggu Hong";
    document.body.classList.remove("no-scroll");
    console.log("⬅️ Closed mobile about view");
  }
});

document.querySelectorAll(".thumbnail").forEach((thumbnail) => {
  thumbnail.addEventListener("mouseover", () => {
    document.querySelector(".sidebar").classList.add("prev");
  });
  thumbnail.addEventListener("mouseleave", () => {
    document.querySelector(".sidebar").classList.remove("prev");
  });
});
