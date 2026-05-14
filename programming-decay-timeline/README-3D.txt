PROGRAMMING DECAY — Plate 02.5 — Barking Reach Timeline 3D
===========================================================

Open:
  Barking Reach Timeline 3D.html

For the image timeline, double-clicking the HTML file is usually fine.

For the NOW 3D model layer, open the folder through a local server so the
149 MB GLB can be fetched reliably by Three.js:

  python -m http.server 8765 --bind 127.0.0.1

Then open:

  http://127.0.0.1:8765/Barking%20Reach%20Timeline%203D.html

Interaction:
  - Drag the timeline to NOW.
  - Click 3D MODEL.
  - Drag inside the plate to orbit.
  - Scroll to zoom.

Files added:
  assets/barking_reach_now.glb
  assets/vendor/three.min.js
  assets/vendor/GLTFLoader.js
  assets/vendor/OrbitControls.js

The PNG NOW frames remain as fallback if the model is slow to load.
