$(document).ready(function(){
  console.log('Ready!');
});


// CLICK FUNCTION FOR SIDEBAR–––––––––––––––––––––––––––––––––––––––


// ARRAYS AND PROJECTS––––––––––––––––––––––––––––––––––––––––––––––
// (RENAME the variables and classes accordingly)
fetch('/api/projects')
  .then(res => res.json())
  .then(projects => {
    const gallery = document.querySelector('.gallery');
    const sidebar = document.querySelector('.sidebar');
    const content = sidebar.querySelector('.content');

    projects.forEach(project => {
      const img = document.createElement('img');
      img.src = project.thumbnail;
      img.alt = project.title;
      img.addEventListener('click', () => {
        content.innerHTML = `
          <h2>${project.title}</h2>
          <p>${project.description}</p>
          <video src="${project.video}" controls width="100%"></video>
          <div class="images">
            ${project.images.map(url => `<img src="${url}" style="width: 100%; margin-top: 0.5rem;">`).join('')}
          </div>
        `;
        sidebar.classList.add('visible');
      });
      gallery.appendChild(img);
    });

    document.querySelector('.close').addEventListener('click', () => {
      sidebar.classList.remove('visible');
    });
  });

// RESIZING CURTIANS––––––––––––––––––––––––––––––––––––––––––––––––



//LEADERLINE–––––––––––––––––––––––––––––––––––––––––––––––––––––––
// create Lines (startpiont, Endpoint)
  const myLine = new LeaderLine(, , { ...lineStyle, endSocket: 'top' });
  isdragged = false


// LeaderLine TARGET
// CLASSES IN BRACKETS
 const elElement = document.getElementById('');
 


 const lineStyle = {
   color: '#000000',
   size: 1,
   path: 'magnet',
   endPlug: 'disc',
   startPlug: 'disc',
   dropShadow: false,
   animation: false,
 };


// RANDOM PLACEMENT–––––––––––––––––––––––––––––––––––––––––––––––––––––––
function getRandomValue(range = 20) {
  return Math.random() * (range * 2 + 1) - range;
}
function setRandomPosition(element) {
  const windowWidth = window.innerWidth;
  const randomX = getRandomValue(0.4 * windowWidth/2);
  const randomY = getRandomValue(0.4 * windowWidth/2);
  // console.log(element.style.top), parseFloat(element.style.top);
  const oldTop = parseFloat(element.style.top);
  const oldLeft = parseFloat(element.style.left);
  element.style.top = `${oldTop + randomY}px`;
  element.style.left = `${oldLeft + randomX}px`;
}

// place elements and thumbnails
setRandomPosition();
setRandomPosition();
setRandomPosition();
setRandomPosition();
