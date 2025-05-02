$(document).ready(function () {
  console.log("Ready!");
});

// CLICK FUNCTION FOR SIDEBAR–––––––––––––––––––––––––––––––––––––––
document.addEventListener("DOMContentLoaded", function () {
  const thumbnails = document.querySelectorAll(".openSidebar");
  const sidebar = document.querySelector(".sidebar");

  if (thumbnails.length > 0 && sidebar) {
    thumbnails.forEach((thumb) => {
      thumb.addEventListener("click", function (event) {
        sidebar.classList.add("show");
        event.stopPropagation(); // Verhindert Schließen durch Außenklick
      });
    });

    // Sidebar schließen bei Klick außerhalb
    document.addEventListener("click", function (event) {
      if (
        sidebar.classList.contains("show") &&
        !sidebar.contains(event.target)
      ) {
        sidebar.classList.remove("show");
      }
    });

    // Klicks innerhalb der Sidebar nicht als Außenklick zählen
    sidebar.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  }
});




// // ARRAYS AND PROJECTS––––––––––––––––––––––––––––––––––––––––––––––
// // (RENAME the variables and classes accordingly)
// fetch('/api/projects')
//   .then(res => res.json())
//   .then(projects => {
//     const gallery = document.querySelector('.gallery');
//     const sidebar = document.querySelector('.sidebar');
//     const content = sidebar.querySelector('.content');

//     projects.forEach(project => {
//       const img = document.createElement('img');
//       img.src = project.thumbnail;
//       img.alt = project.title;
//       img.addEventListener('click', () => {
//         content.innerHTML = `
//           <h2>${project.title}</h2>
//           <p>${project.description}</p>
//           <video src="${project.video}" controls width="100%"></video>
//           <div class="images">
//             ${project.images.map(url => `<img src="${url}" style="width: 100%; margin-top: 0.5rem;">`).join('')}
//           </div>
//         `;
//         sidebar.classList.add('visible');
//       });
//       gallery.appendChild(img);
//     });

//     document.querySelector('.close').addEventListener('click', () => {
//       sidebar.classList.remove('visible');
//     });
//   });

// // RESIZING CURTIANS––––––––––––––––––––––––––––––––––––––––––––––––



// //LEADERLINE–––––––––––––––––––––––––––––––––––––––––––––––––––––––
// // create Lines (startpiont, Endpoint)
//   const myLine = new LeaderLine(, , { ...lineStyle, endSocket: 'top' });
//   isdragged = false


// // LeaderLine TARGET
// // CLASSES IN BRACKETS
//  const elElement = document.getElementById('');
 


//  const lineStyle = {
//    color: '#000000',
//    size: 1,
//    path: 'magnet',
//    endPlug: 'disc',
//    startPlug: 'disc',
//    dropShadow: false,
//    animation: false,
//  };


// // RANDOM PLACEMENT–––––––––––––––––––––––––––––––––––––––––––––––––––––––
document.addEventListener("DOMContentLoaded", function () {
  const thumbnails = document.querySelectorAll(".thumbnail");
  const minDistance = 120; // Mindestabstand in Pixeln

  let previousPosition = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };

  thumbnails.forEach((thumb, index) => {
    const thumbWidth = thumb.offsetWidth || 80;
    const thumbHeight = thumb.offsetHeight || 80;

    let validPosition = false;
    let attempts = 0;
    let position = null;

    while (!validPosition && attempts < 50) {
      position = getRandomPositionWithinBounds(previousPosition, thumbWidth, thumbHeight);
      validPosition = checkNoOverlap(position, thumbnails, minDistance, thumbWidth, thumbHeight);
      attempts++;
    }

    if (position) {
      setPosition(thumb, position);
      previousPosition = position;
    }
  });
});

function getRandomPositionWithinBounds(prev, width, height) {
  const spreadX = 0.4 * window.innerWidth;
  const spreadY = 0.4 * window.innerHeight;

  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const edgePadding = 20; // Mindestabstand zum Rand

  const minX = halfWidth + edgePadding;
  const maxX = window.innerWidth - halfWidth - edgePadding;
  const minY = halfHeight + edgePadding;
  const maxY = window.innerHeight - halfHeight - edgePadding;

  let newX = prev.x + getRandomValue(spreadX / 2);
  let newY = prev.y + getRandomValue(spreadY / 2);

  newX = Math.max(minX, Math.min(newX, maxX));
  newY = Math.max(minY, Math.min(newY, maxY));

  return { x: newX, y: newY };
}


function getRandomValue(range = 20) {
  return Math.random() * (range * 2) - range;
}

function getRandomPositionWithinBounds(prev, width, height) {
  const spreadX = 0.4 * window.innerWidth;
  const spreadY = 0.4 * window.innerHeight;

  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const edgePadding = 80; // <-- Diese Zeile ist entscheidend

  const minX = halfWidth + edgePadding;
  const maxX = window.innerWidth - halfWidth - edgePadding;
  const minY = halfHeight + edgePadding;
  const maxY = window.innerHeight - halfHeight - edgePadding;

  let newX = prev.x + getRandomValue(spreadX / 2);
  let newY = prev.y + getRandomValue(spreadY / 2);

  newX = Math.max(minX, Math.min(newX, maxX));
  newY = Math.max(minY, Math.min(newY, maxY));

  return { x: newX, y: newY };
}


function setPosition(element, position) {
  const width = element.offsetWidth;
  const height = element.offsetHeight;
  element.style.position = 'absolute';
  element.style.left = `${position.x - width / 2}px`;
  element.style.top = `${position.y - height / 2}px`;
}

function checkNoOverlap(pos, thumbnails, minDist, width, height) {
  const buffer = minDist / 2;

  for (let thumb of thumbnails) {
    if (!thumb.offsetParent) continue; // Noch nicht im DOM
    const rect = thumb.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = Math.abs(pos.x - centerX);
    const distY = Math.abs(pos.y - centerY);

    if (distX < rect.width / 2 + width / 2 + buffer && distY < rect.height / 2 + height / 2 + buffer) {
      return false;
    }
  }

  return true;
}





// // place elements and thumbnails
// setRandomPosition();
// setRandomPosition();
// setRandomPosition();
// setRandomPosition();
