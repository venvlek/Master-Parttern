import img1 from '../../assets/one.jpeg';
import vid1 from '../../assets/two.mp4';
import vid2 from '../../assets/three.mp4';
import img2 from '../../assets/four.jpeg';
import img3 from '../../assets/five.png';

// ── Add slides in the order you want them to appear ────────────
export const SLIDES = [
  { type: 'image', src: img1,  duration: 8000 },
  { type: 'video', src: vid1  },
  { type: 'video', src: vid2  },
  { type: 'image', src: img2,  duration: 8000 },
  { type: 'image', src: img3,  duration: 8000 },
];

// ── Total duration note ────────────────────────────────────────
// With 3 images × 8s + 2 videos (assume ~15s each) = 54s ≈ 1 minute
// Adjust 'duration' values or add more slides to hit your target.
