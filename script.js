/*--------------------
Vars
--------------------*/
let progress = 1
let startX = 0
let active = 0
let isDown = false
let isLocked = true;

/*--------------------
Contants
--------------------*/
const speedWheel = 0.0005
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index-active)/$items.length)
}

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100))
  active = Math.floor(progress/100*($items.length-1))
  
  $items.forEach((item, index) => displayItems(item, index, active))
}
// animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i/$items.length) * 100 + 10
    if (isLocked === false) {
      animate()
    }
  })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel
  progress = progress + wheelProgress
  if (isLocked === false) {
      animate()
    }
}

const handleMouseMove = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })
  }
  if (!isDown) return
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
  if (isLocked === false) {
    animate()
  }
}

const handleMouseDown = e => {
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
  isDown = false
}



/*--------------------
Listeners
--------------------*/
document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)

// form
document.getElementById("messageForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  
  const res = await fetch(form.action, {
    method: form.method,
    body: data,
    headers: { 'Accept': 'application/json' }
  });

  if (res.ok) {
    alert("Anjay maaciwh, well received! 😎");
    form.reset();
  } else {
    alert("Oops! There was a problem.");
  }
});

// Evidence Modal Logic
const evidenceModal = document.getElementById("evidenceModal");
const openEvidenceBtn = document.getElementById("openEvidence");
const closeEvidenceBtn = document.querySelector(".close-evidence");

if (openEvidenceBtn) {
  openEvidenceBtn.onclick = function(e) {
    e.stopPropagation(); // prevent carousel from moving
    evidenceModal.style.display = "flex";
  }
}

if (closeEvidenceBtn) {
  closeEvidenceBtn.onclick = function() {
    evidenceModal.style.display = "none";
  }
}

window.onclick = function(event) {
  if (event.target == evidenceModal) {
    evidenceModal.style.display = "none";
  }
}