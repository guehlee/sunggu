let leaderLines = [];

$(document).ready(function () {
  console.log("Ready!");

  // DRAG & CLICK LOGIK
  let isClicked = false;
  let isMoving = false;

  $('.thumbnail')
    .on('mousedown', function () {
      isClicked = true;
      console.log("clicking?:" + isClicked);
      return isClicked;
    })
    .on('mousemove', function () {
      if (isClicked) {
        isMoving = true;
      }
      console.log("moving?:" + isMoving);
      return isMoving;
    })
    .on('mouseup', function (event) {
      if (!isMoving) {
        document.querySelector(".sidebar").classList.add("show");
        event.stopPropagation();
      }
      isClicked = false;
      isMoving = false;
      console.log("mouseup - reset states");
    })
    .draggable({
      containment: 'body',
      distance: 5,

      start: function (event, ui) {
        if (!isMoving) {
          console.log('Not moving – drag prevented.');
          return false; // ❌ Drag wird NICHT gestartet
        }
      },

      drag: function () {
        console.log('Dragging...');
        leaderLines.forEach(line => line.position()); // 🔁 LeaderLines live aktualisieren
      },

      stop: function (event, ui) {
        console.log('Stopped at', ui.position);
        leaderLines.forEach(line => line.position()); // 🔁 LeaderLines erneut aktualisieren
      }
    });
});

document.addEventListener("DOMContentLoaded", function () {
  // VIDEO DETECTION
  const videoContainer = document.getElementById("videoContainer");
  if (videoContainer?.querySelector("iframe")) {
    videoContainer.classList.add("active");
  }

  // CREDIT TOGGLE
  const title = document.getElementById("toggleCredit");
  const creditBox = document.getElementById("creditBox");
  if (title && creditBox) {
    title.addEventListener("click", function () {
      const isVisible = creditBox.classList.toggle("visible");
      title.textContent = isVisible ? "Lizard Tale ▲" : "Lizard Tale ▼";
    });
  }

  // THUMBNAIL PLACEMENT + LEADERLINE
  const thumbnails = Array.from(document.querySelectorAll(".thumbnail"));
  const minDistance = 120;
  const placedPositions = [];
  const previousPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  thumbnails.forEach((thumb) => {
    const width = thumb.offsetWidth || 80;
    const height = thumb.offsetHeight || 80;
    let position = null;
    let attempts = 0;

    do {
      position = getRandomPositionWithinBounds(previousPosition, width, height);
      attempts++;
    } while (!checkNoOverlapWithPlaced(position, placedPositions, minDistance, width, height) && attempts < 100);

    if (position) {
      setPosition(thumb, position);
      placedPositions.push({ ...position, width, height });
    }
  });

  // LeaderLines erstellen
  setTimeout(() => {
    for (let i = 0; i < thumbnails.length - 1; i++) {
      const line = new LeaderLine(thumbnails[i], thumbnails[i + 1], {
        color: "#000",
        size: 4,
        // size: 2.5,
        path: "magnetic",
        endPlug: "arrow2",
        startPlug: "behind",
        dropShadow: false,
        animation: false,
        startSocket: "right",   // oder "bottom", "left", "right"
        endSocket: "top",

        
      });
      leaderLines.push(line);
    }
  }, 200);
});

// LeaderLines bei Fenstergröße neu berechnen
window.addEventListener('resize', () => {
  leaderLines.forEach(line => line.position());
});

// HILFSFUNKTIONEN ––––––––––––––––––––––––––––––––––––––––

function getRandomPositionWithinBounds(prev, width, height) {
  const spreadX = 0.4 * window.innerWidth;
  const spreadY = 0.4 * window.innerHeight;
  const edgePadding = 80;

  const halfWidth = width / 2;
  const halfHeight = height / 2;

  let newX = prev.x + getRandomValue(spreadX);
  let newY = prev.y + getRandomValue(spreadY);

  newX = Math.max(halfWidth + edgePadding, Math.min(newX, window.innerWidth - halfWidth - edgePadding));
  newY = Math.max(halfHeight + edgePadding, Math.min(newY, window.innerHeight - halfHeight - edgePadding));

  return { x: newX, y: newY };
}

function getRandomValue(range = 20) {
  return Math.random() * (range * 2) - range;
}

function checkNoOverlapWithPlaced(pos, placed, minDist, width, height) {
  const buffer = minDist / 2;
  return placed.every(p =>
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

// SIDEBAR SCHLIEßEN BEIM KLICK AUF BACKGROUND
const projectCanvas = document.querySelector(".back");
const sidebar = document.querySelector(".sidebar");

projectCanvas.addEventListener("click", function (event) {
  if (sidebar.classList.contains("show")) {
    sidebar.classList.remove("show");
    event.stopPropagation();
  }
});
