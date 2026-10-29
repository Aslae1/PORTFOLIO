const REPO = "https://github.com/Aslae1/Vibe-Projects-";

const CONFIG = {
  email: "aslae0011@gmail.com",
  phone: "+977 9744735601",
  location: "Kathmandu, Nepal",
  github: "https://github.com/Aslae1",
  linkedin: "https://www.linkedin.com/in/asmita-lamichhane-359a5533b",
  resume: "Asmita-Lamichhane-CV.pdf",
  openTo: "Open to junior UI/UX and web developer internships",

  featured: [
    {
      title: "Canvaru",
      type: "Academic Project · Machine Learning",
      role: "CNN model development and evaluation",
      problem: "A drawing-recognition model that classifies 28×28 grayscale doodles into six categories: apple, cat, flower, house, star and tree.",
      highlights: ["94.48% test accuracy on 3,150 examples", "Weighted F1 score of 0.9449", "Strongest class: house. Hardest class: cat"],
      tags: ["Python", "TensorFlow", "CNN", "Quick, Draw!"],
      image: "images/projects/canvaru.svg",
      code: "https://github.com/Aslae1",
      caseStudy: "case-study-canvaru.html"
    },
    {
      title: "CityMoto",
      type: "Client Project · Vehicle Rental Platform",
      role: "Requirements, interface, development and deployment",
      problem: "A web-based vehicle rental platform that lets people browse vehicles, check availability and book rentals through one clear workflow.",
      highlights: ["My first client project, taken from brief to deployment", "Clear page hierarchy and consistent actions", "Responsive layout for phone and desktop"],
      tags: ["HTML", "CSS", "JavaScript", "Client Work"],
      image: "images/projects/citymoto.svg",
      code: "https://github.com/Aslae1",
      caseStudy: "case-study-citymoto.html"
    },
    {
      title: "NJFON",
      type: "Client Project · Community Website",
      role: "Website design and front-end development",
      problem: "A responsive community website for Neymar Jr Fans of Nepal that brings fan content, news, events and gallery into one organized place.",
      highlights: ["My second client project", "Sections for news, events, committee and gallery", "Energetic fan identity with easy-to-find information"],
      tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      image: "images/projects/njfon.svg",
      code: "https://github.com/Aslae1",
      caseStudy: "case-study-njfon.html"
    },
    {
      title: "The Last Glitch",
      type: "Global Hackathon · Interactive Story",
      role: "Team member in my first global hackathon",
      problem: "An interactive cyberpunk story about a future where digital immortality puts emotion, memory, identity and humanity at risk.",
      highlights: ["Built for an international Solana hackathon", "Story-led interface with glitch-style visuals", "Themes: identity, memory and emotion"],
      tags: ["HTML", "CSS", "JavaScript", "Hackathon"],
      image: "images/projects/last-glitch.svg",
      live: "https://github.com/Aslae1/The-Last-Glitch",
      code: "https://github.com/Aslae1/The-Last-Glitch",
      caseStudy: "case-study-last-glitch.html"
    },
    {
      title: "AIRWAY",
      type: "Computer Vision · Prototype",
      role: "Hand-tracking and recognition prototype",
      problem: "An air-writing system that tracks your hand through a camera, recognizes characters written in the air and turns them into digital text.",
      highlights: ["Gesture input with no keyboard or pen", "Hand tracking with computer vision", "Recognized characters converted to text"],
      tags: ["OpenCV", "MediaPipe", "Hand Tracking", "Computer Vision"],
      image: "images/projects/airway.svg",
      code: "https://github.com/Aslae1",
      caseStudy: "case-study-airway.html"
    }
  ],

  fun: [
    { title: "Flower Project", note: "A blooming flower illustration from my flower and heart experiments.", image: "images/fun/flower.svg", link: REPO, linkLabel: "View on GitHub" },
    { title: "Heart Project", note: "A glossy heart with tiny floating hearts, from the same creative experiments.", image: "images/fun/heart.svg", link: REPO, linkLabel: "View on GitHub" },
    { title: "Mika & Ren, baby edition", note: "Chibi manga duo. Their eyes follow your cursor.", image: "images/manga/mika-ren-baby.jpg", link: "fun/mika-ren-baby.html" },
    { title: "Mika blows a kiss", note: "Click anywhere: the kiss flies there and bursts into glitter.", image: "images/manga/mika-kiss.jpg", link: "fun/mika-kiss.html" },
    { title: "Mika & Ren", note: "Chibi character interaction experiment.", image: "images/manga/mika-ren-baby.jpg", link: "fun/mika-ren.html" }
  ]
};

const FRAME_COUNT = 49;
const frameSrc = i => `frames/f${String(i + 1).padStart(3, "0")}.jpg`;
const frames = new Array(FRAME_COUNT);
let loaded = 0;

const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
let dpr = 1, vw = 0, vh = 0;
let current = 0, target = 0, lastDrawn = -1;

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  vw = innerWidth; vh = innerHeight;
  canvas.width = vw * dpr; canvas.height = vh * dpr;
  lastDrawn = -1;
  draw(Math.round(current));
}

function draw(i) {
  const img = frames[i] || frames.find(Boolean);
  if (!img || !img.complete) return;
  const cw = canvas.width, ch = canvas.height;
  const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
  const w = img.naturalWidth * scale, h = img.naturalHeight * scale;
  const focal = cw / ch < 1 ? 0.55 : 0.5;
  const x = (cw - w) * focal, y = (ch - h) / 2;
  ctx.drawImage(img, x, y, w, h);
  lastDrawn = i;
}

function loadFrames() {
  const bar = document.getElementById("loaderBar");
  const loader = document.getElementById("loader");
  const finish = () => {
    loader.classList.add("done");
    document.querySelectorAll(".reveal").forEach(observe);
    document.querySelector(".hero-card").classList.add("in");
  };
  let finished = false;
  const maybeFinish = () => { if (!finished) { finished = true; finish(); } };
  setTimeout(maybeFinish, 7000);

  for (let i = 0; i < FRAME_COUNT; i++) {
    const img = new Image();
    img.decoding = "async";
    img.onload = img.onerror = () => {
      loaded++;
      bar.style.width = (loaded / FRAME_COUNT * 100) + "%";
      if (i === 0) draw(0);
      if (loaded === FRAME_COUNT) maybeFinish();
    };
    img.src = frameSrc(i);
    frames[i] = img;
  }
}

function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  target = max > 0 ? Math.min(Math.max(scrollY / max, 0), 1) : 0;
  document.getElementById("progressBar").style.width = (target * 100) + "%";
}

function tick() {
  current += (target - current) * (reduceMotion ? 1 : 0.12);
  if (Math.abs(target - current) < 0.0004) current = target;
  const i = Math.round(current * (FRAME_COUNT - 1));
  if (i !== lastDrawn) draw(i);
  requestAnimationFrame(tick);
}

let io;
function observe(el) {
  if (!io) {
    io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
  }
  io.observe(el);
}

function setupNav() {
  const links = [...document.querySelectorAll(".nav li a")];
  const map = new Map(links.map(a => [a.getAttribute("href").slice(1), a]));
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove("active"));
        const a = map.get(e.target.id);
        if (a && !a.classList.contains("nav-cta")) a.classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -45% 0px" });
  document.querySelectorAll("main section[id]").forEach(s => spy.observe(s));
}

function setupButterfly() {
  if (reduceMotion || matchMedia("(hover: none)").matches) return;
  const b = document.getElementById("flutter");
  let tx = innerWidth / 2, ty = innerHeight / 2, x = tx, y = ty, angle = 0, t = 0;
  addEventListener("mousemove", e => { tx = e.clientX + 18; ty = e.clientY + 18; b.classList.add("on"); }, { passive: true });
  document.addEventListener("mouseleave", () => b.classList.remove("on"));
  (function loop() {
    t += 0.05;
    const dx = tx - x, dy = ty - y;
    x += dx * 0.07; y += dy * 0.07;
    const speed = Math.hypot(dx, dy);
    if (speed > 8) angle += (Math.atan2(dy, dx) * 180 / Math.PI + 90 - angle) * 0.08;
    else angle += (0 - angle) * 0.05;
    b.style.transform = `translate(${x - 19}px, ${y - 19 + Math.sin(t) * 3}px) rotate(${Math.max(-25, Math.min(25, angle))}deg)`;
    requestAnimationFrame(loop);
  })();
}

const GRADIENTS = [
  ["#8fd3ff", "#7aa8ff"], ["#9fe6c8", "#5fb8f5"], ["#ffc9b5", "#ff9aa5"],
  ["#c8b6ff", "#8fb4ff"], ["#ffe29a", "#ffb57a"], ["#a8e6f0", "#7fd1a6"]
];

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}
function link(text, href, cls) {
  const a = el("a", cls || "", text);
  a.href = href;
  if (/^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener"; }
  return a;
}
function thumbFor(p, i, label) {
  const thumb = el("div", "thumb");
  const [c1, c2] = GRADIENTS[i % GRADIENTS.length];
  thumb.style.setProperty("--c1", c1); thumb.style.setProperty("--c2", c2);
  if (p.image) {
    const img = el("img"); img.src = p.image; img.alt = label || `Screenshot of ${p.title}`; img.loading = "lazy";
    thumb.appendChild(img);
  } else {
    thumb.appendChild(el("span", "mono", p.title.trim().charAt(0).toUpperCase()));
  }
  return thumb;
}

function projectCard(p, i, featured) {
  const card = el("article", "glass project" + (featured ? " is-featured" : ""));
  const body = el("div", "pbody");
  if (p.type) body.appendChild(el("p", "ptype", p.type));
  body.appendChild(el("h3", "", p.title));
  if (p.role) { const r = el("p", "prole"); r.append(el("strong", "", "My role: "), p.role); body.appendChild(r); }
  const prob = featured && p.problem ? p.problem : p.description;
  body.appendChild(el("p", "pdesc", prob));
  if (p.highlights && p.highlights.length) {
    const hl = el("ul", "phighlights");
    p.highlights.forEach(h => hl.appendChild(el("li", "", h)));
    body.appendChild(hl);
  }
  if (p.tags && p.tags.length) {
    const ul = el("ul", "ptags");
    p.tags.forEach(t => ul.appendChild(el("li", "", t)));
    body.appendChild(ul);
  }
  const links = el("div", "plinks");
  if (p.caseStudy) links.appendChild(link("View case study", p.caseStudy, "live"));
  if (p.live) links.appendChild(link("Live demo", p.live, p.caseStudy ? "" : "live"));
  if (p.code) links.appendChild(link("View code", p.code));
  if (links.children.length) body.appendChild(links);
  card.append(thumbFor(p, i), body);
  return card;
}

function setupProjects() {
  const featuredGrid = document.getElementById("featuredGrid");
  CONFIG.featured.forEach((project, index) => {
    featuredGrid.appendChild(projectCard(project, index, true));
  });
}

function setupFun() {
  const grid = document.getElementById("funGrid");
  const items = CONFIG.fun;
  items.forEach((p, i) => {
    const fig = el("figure", "glass art");
    const t = thumbFor(p, i + 3, p.title);
    t.classList.add("art-thumb");
    if (p.image) {
      const btn = el("button", "art-open"); btn.type = "button";
      btn.setAttribute("aria-label", `Open ${p.title} larger`);
      btn.addEventListener("click", () => openLightbox(p));
      t.appendChild(btn);
    }
    const cap = el("figcaption");
    cap.append(el("strong", "", p.title), el("span", "", p.note || ""));
    if (p.link) cap.appendChild(link(p.linkLabel || "Play it", p.link, "play"));
    fig.append(t, cap);
    grid.appendChild(fig);
  });
}

function openLightbox(p) {
  const dlg = document.getElementById("lightbox");
  document.getElementById("lbImg").src = p.image;
  document.getElementById("lbImg").alt = p.title;
  document.getElementById("lbCap").textContent = p.title + (p.note ? ", " + p.note : "");
  dlg.showModal();
}
function setupLightbox() {
  const dlg = document.getElementById("lightbox");
  document.getElementById("lbClose").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
}

function setupMenu() {
  const btn = document.getElementById("menuBtn"), list = document.getElementById("navList");
  const close = () => { list.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); };
  btn.addEventListener("click", () => {
    const open = list.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });
  list.addEventListener("click", e => { if (e.target.closest("a")) close(); });
  addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}

function setupContact() {
  const mail = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Hello Asmita")}`;
  document.getElementById("mailBtn").href = mail;
  document.getElementById("mailText").textContent = CONFIG.email;
  document.getElementById("openTo").textContent = CONFIG.openTo;
  document.getElementById("phoneText").textContent = CONFIG.phone;
  document.getElementById("phoneLink").href = "tel:" + CONFIG.phone.replace(/\s/g, "");
  document.getElementById("placeText").textContent = CONFIG.location;
  const copyBtn = document.getElementById("copyBtn");
  copyBtn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(CONFIG.email); copyBtn.textContent = "Copied"; }
    catch (e) { copyBtn.textContent = "Copy failed, select the address"; }
    setTimeout(() => (copyBtn.textContent = "Copy email address"), 2000);
  });
  document.querySelectorAll("[data-resume-view]").forEach(a => {
    a.href = "resume.html";
    a.hidden = false;
  });
  document.querySelectorAll("[data-resume-download]").forEach(a => {
    if (CONFIG.resume) {
      a.href = CONFIG.resume;
      a.setAttribute("download", "Asmita-Lamichhane-CV.pdf");
      a.hidden = false;
    }
  });
  document.querySelectorAll("[data-link]").forEach(a => {
    a.href = CONFIG[a.dataset.link];
  });
  document.getElementById("year").textContent = new Date().getFullYear();
}

function setupTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const choices = document.querySelectorAll("[data-theme-choice]");
  const applyTheme = theme => {
    root.dataset.theme = theme;
    const dark = theme === "dark";
    toggle.setAttribute("aria-pressed", String(dark));
    toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    toggle.querySelector(".theme-icon").textContent = dark ? "☀" : "☾";
    toggle.querySelector(".theme-label").textContent = dark ? "Light mode" : "Dark mode";
    choices.forEach(button => {
      const selected = button.dataset.themeChoice === theme;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    try { localStorage.setItem("asmita-theme", theme); } catch (error) {}
  };
  let saved = "light";
  try { saved = localStorage.getItem("asmita-theme") || "light"; } catch (error) {}
  applyTheme(saved === "dark" ? "dark" : "light");
  toggle.addEventListener("click", () => applyTheme(root.dataset.theme === "dark" ? "light" : "dark"));
  choices.forEach(button => button.addEventListener("click", () => applyTheme(button.dataset.themeChoice)));
}

resize();
addEventListener("resize", resize);
addEventListener("scroll", onScroll, { passive: true });
onScroll();
loadFrames();
setupNav();
setupButterfly();
setupProjects();
setupFun();
setupLightbox();
setupMenu();
setupContact();
setupTheme();
requestAnimationFrame(tick);
