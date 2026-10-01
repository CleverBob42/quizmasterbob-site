import { writeFileSync } from 'node:fs';

const SUPPORT_ENDPOINT = 'https://www.izeus.org/_functions/support';
const ORIGIN = 'https://quizmasterbob.izeus.org';
const V = Date.now().toString(36);

const APP_STORE = 'https://apps.apple.com/au/app/quizmaster-bob/id6778641163';
const HOST_SITE = 'https://bobquiz-272a7.web.app/login';
const appleLogo = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.1-1.2 2.9-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.4-.9-2.4-3.9zM14 5.5c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.6 2.8-1.4z"/></svg>';
const storeBadge = `<a class="store" href="${APP_STORE}">${appleLogo}<span><small>Download on the</small><b>App Store</b></span></a>`;
const hostLink = `<a class="btn btn-ghost" href="${HOST_SITE}">Host a quiz</a>`;

const icon = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
const icons = {
  keypad: icon('<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01M9 17h6"/>'),
  list: icon('<path d="M8 6h12M8 12h12M8 18h12"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>'),
  image: icon('<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.5"/><path d="M21 16l-5-5-9 9"/>'),
  timer: icon('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 3h6"/>'),
  mic: icon('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4"/>'),
  screen: icon('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>'),
};

const frame = (name, alt, lazy = true) =>
  `<div class="frame"><img src="assets/shots/${name}.webp" alt="${alt}" width="600" height="1298"${lazy ? ' loading="lazy"' : ''}></div>`;
const shot = (name, alt, title, sub) =>
  `<figure class="shot">${frame(name, alt)}<figcaption>${title}<span>${sub}</span></figcaption></figure>`;

const background = `<div class="bg" aria-hidden="true">
  <div class="bg-art"></div>
  <img class="bg-mark" src="assets/logo-full.png" alt="">
  <div class="orb o1"></div><div class="orb o2"></div><div class="orb o3"></div><div class="orb o4"></div>
  <div class="grid"></div>
  <div class="mist"></div>
</div>`;

const NAV = [
  ['index.html', 'Home'],
  ['support.html', 'Support'],
  ['privacy.html', 'Privacy'],
  ['terms.html', 'Terms'],
];

function layout({ file, title, description, body, script = false }) {
  const links = NAV.map(([href, label]) =>
    `<a href="${href}"${href === file ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="theme-color" content="#1a2438">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${ORIGIN}/assets/icon-512.png">
<link rel="icon" type="image/png" sizes="32x32" href="assets/icon-32.png">
<link rel="icon" type="image/png" sizes="512x512" href="assets/icon-512.png">
<link rel="apple-touch-icon" href="assets/icon-180.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/style.css?v=${V}">
</head>
<body>
${background}
<header class="nav">
  <a class="brand" href="index.html"><img src="assets/logo-full.png" alt="" width="40" height="40"><span>Quizmaster Bob</span></a>
  <nav class="nav-links">${links}</nav>
</header>
${body}
<footer class="foot">&copy; ${new Date().getFullYear()} iZeus Pty Ltd &middot; <a href="privacy.html">Privacy</a> &middot; <a href="terms.html">Terms</a> &middot; <a href="support.html">Support</a></footer>
${script ? `<script src="assets/site.js?v=${V}"></script>\n` : ''}</body>
</html>
`;
}

const pages = {
  'index.html': {
    title: 'Quizmaster Bob – Live pub trivia on your phone',
    description: 'Join a live Quizmaster Bob quiz with the code on the venue screen. Answer on your phone while the host runs the night.',
    script: true,
    body: `<main class="wrap wide">
<section class="pitch">
  <div>
    <span class="eyebrow">Live trivia &middot; Venue screen &middot; Player app</span>
    <h1>Play along with <span class="grad">Quizmaster Bob</span></h1>
    <p class="lead">Live trivia for the room. The host runs the night on the big screen, and every team answers on their own phone.</p>
    <div class="cta-row">
      ${storeBadge}
      ${hostLink}
    </div>
    <p class="meta">Free for players on the App Store &middot; Hosts sign in on the website to run the quiz and subscribe</p>
  </div>
  <div class="pitch-art">
    ${frame('scores', 'A live question with the points and how to answer', false)}
    <img class="pitch-logo" src="assets/icon-512.png" alt="Quizmaster Bob app icon" width="112" height="112">
  </div>
</section>

<section id="features">
  <h2 class="section-title">Built for a noisy pub night</h2>
  <p class="section-sub">The same colours, questions and timer your team sees in the player app.</p>
  <div class="features">
    <div class="feature glass"><div class="icon">${icons.keypad}</div><h3>Join with a code</h3><p>Type the 4-digit code from the host screen. No player account, and no host login on your phone.</p></div>
    <div class="feature glass"><div class="icon">${icons.list}</div><h3>Multiple choice</h3><p>Big coloured answer buttons, the same green, gold, red, purple, blue and grey as the quiz screen.</p></div>
    <div class="feature glass"><div class="icon">${icons.image}</div><h3>Picture rounds</h3><p>Album covers, photos and reveal questions show on your phone while the host controls the room.</p></div>
    <div class="feature glass"><div class="icon">${icons.mic}</div><h3>Type the answer</h3><p>Some questions want a typed answer. Submit before the timer runs out.</p></div>
    <div class="feature glass"><div class="icon">${icons.timer}</div><h3>Live timer</h3><p>The countdown bar matches the host clock, so the whole room is on the same question.</p></div>
    <div class="feature glass"><div class="icon">${icons.screen}</div><h3>Scores on the big screen</h3><p>Answers and leaderboards stay with the host. Teams play; the venue screen tells the story.</p></div>
  </div>
</section>

<section id="screens">
  <h2 class="section-title">See it in action</h2>
  <p class="section-sub">Real screens from the Quizmaster Bob player app.</p>
  <div class="shots">
    ${shot('join', 'Join screen with a four-digit code', 'Join the quiz', 'The code on the host screen')}
    ${shot('choice', 'Multiple choice music question with coloured answers', 'Multiple choice', 'Tap your team’s answer')}
    ${shot('picture', 'Picture question about an album cover', 'Picture questions', 'Covers and photos in the round')}
    ${shot('type', 'Type-the-answer question with a submit button', 'Type the answer', 'When the question is open')}
    ${shot('order', 'Put one-hit wonders in release order', 'Put them in order', 'Line the answers up by year')}
    ${shot('scores', 'Question details card over the answers', 'Question card', 'Points and how to answer')}
  </div>
</section>

<section id="how">
  <h2 class="section-title">How a night works</h2>
  <p class="section-sub">Players only need the app and the code. Hosts use the Quizmaster Bob website.</p>
  <ol class="steps">
    <li class="glass"><h3>Host starts the quiz</h3><p>The venue screen shows a 4-digit join code when the quiz is open.</p></li>
    <li class="glass"><h3>Teams join</h3><p>Open the player app, enter the code, and register a team name. A selfie is optional.</p></li>
    <li class="glass"><h3>Answer on your phone</h3><p>Questions, choices and the timer stay in sync with the host.</p></li>
    <li class="glass"><h3>Scores hit the room</h3><p>The host reveals answers and standings on the big screen.</p></li>
  </ol>
</section>

<section id="pricing">
  <h2 class="section-title">Players play free</h2>
  <p class="section-sub">Joining a quiz does not need a subscription. Hosts run paid tools on the website.</p>
  <div class="plans">
    <div class="plan glass"><h3>Player app</h3><ul><li>Free to download</li><li>Join with the venue code</li><li>No account and no payment in the app</li></ul></div>
    <div class="plan glass"><h3>Quiz hosts</h3><ul><li>Run the night from the Quizmaster Bob website</li><li>Question library, rounds and the venue screen</li><li>Host plans are billed on the website, not in the player app</li></ul><p><a href="${HOST_SITE}">Sign in to host</a></p></div>
  </div>
</section>

<section id="get">
  <div class="band glass">
    <img src="assets/logo-full.png" alt="" width="88" height="88">
    <h2>Ready for the next round?</h2>
    <p>Quizmaster Bob for players is on the App Store. Hosts run the night, and manage their plan, on the website.</p>
    <div class="cta-row" style="justify-content:center">
      ${storeBadge}
      ${hostLink}
    </div>
    <p class="fine">Ask the venue host for the join code. The player app is for live quizzes, not a standalone trivia game.</p>
  </div>
</section>
</main>`,
  },

  'support.html': {
    title: 'Quizmaster Bob Support',
    description: 'Help joining a live Quizmaster Bob quiz, and a contact form for the player app.',
    script: true,
    body: `<main class="wrap"><article class="doc glass">
<h1>Support</h1>
<p class="muted">Quizmaster Bob player app</p>
<p>Need help joining a live quiz or using the player app?</p>

<h2 id="contact">Contact us</h2>
<p>Send a message and we will reply by email. Please include the venue and the join code if a quiz would not start.</p>
<p class="notice ok" id="sent" role="status" hidden>Thanks. Your message has been sent. We will reply by email.</p>
<p class="notice err" id="error" role="alert" hidden></p>
<form class="contact" method="post" action="${SUPPORT_ENDPOINT}">
  <input type="hidden" name="app" value="QuizmasterBob">
  <input type="hidden" name="return" value="${ORIGIN}/support.html">
  <label>Your name<input name="name" required maxlength="80" autocomplete="name"></label>
  <label>Your email<input name="email" type="email" required maxlength="120" autocomplete="email"></label>
  <label>Message<textarea name="message" required minlength="5" maxlength="4000" placeholder="Tell us the venue, the join code, and what you saw on screen."></textarea></label>
  <div class="hp" aria-hidden="true"><label>Leave this empty<input name="website" tabindex="-1" autocomplete="off"></label></div>
  <button class="btn" type="submit">Send message</button>
</form>

<h2>Joining a quiz</h2>
<ol>
  <li>Ask the venue host for the 4-digit code on their screen.</li>
  <li>Open the player app and enter the code.</li>
  <li>Register your team name and an optional selfie, then play along.</li>
</ol>
<p>The host runs the quiz from the Quizmaster Bob website. Players do not need a host account.</p>

<h2>Frequently asked questions</h2>
<p class="faq-q">The code is rejected</p>
<p class="faq-a">The quiz may not have started, or it may already have ended. Check the code with the host.</p>
<p class="faq-q">The app will not connect</p>
<p class="faq-a">Check Wi-Fi or mobile data. Some venue networks block new devices. Try cellular data if you can.</p>
<p class="faq-q">Camera or photos</p>
<p class="faq-a">Team selfies need camera or photo access. On iPhone, open Settings and allow access for Quizmaster Bob.</p>
<p class="faq-q">Host billing</p>
<p class="faq-a">Hosts manage quizzes and billing on the Quizmaster Bob website after they sign in. The player app does not take payment.</p>

<h2>Privacy</h2>
<p>How game data is handled is in the <a href="privacy.html">privacy policy</a>.</p>
</article></main>`,
  },

  'privacy.html': {
    title: 'Quizmaster Bob Privacy Policy',
    description: 'How the Quizmaster Bob player app handles team names, answers, photos and support messages.',
    body: `<main class="wrap"><article class="doc glass">
<h1>Privacy Policy</h1>
<p class="muted">Last updated: 30 September 2026</p>
<p>Quizmaster Bob Player (the mobile app) and the Quizmaster Bob host website work together for live trivia. This policy describes data handled when you use the player app or join a game as a player in the browser.</p>

<h2>What we collect</h2>
<ul>
  <li><strong>Game participation:</strong> team name, answers, scores and progress stored in our cloud database (Google Firebase) for the quiz you joined.</li>
  <li><strong>Team selfie (optional):</strong> if you take or choose a photo, it is uploaded to secure cloud storage and may be shown on the host’s venue screen.</li>
  <li><strong>Device storage:</strong> the app may save your team name and game code on the device so you can reconnect to the same quiz.</li>
</ul>

<h2>What the player app does not collect</h2>
<p>The player app does not require an account, email or payment. Hosts who run quizzes use a separate login on the website. That flow is covered by the host account, not this page.</p>

<h2>Why we use data</h2>
<p>Data is used to run the quiz you joined: validating join codes, recording answers, showing leaderboards, and letting your team reconnect if the app closes.</p>

<h2>Sharing</h2>
<p>Quiz data is visible to the quiz host and to other teams only as part of normal gameplay, for example scores on the venue screen. We do not sell personal information. Infrastructure is provided by Google Firebase under their terms.</p>

<h2>Retention</h2>
<p>Game and team data remain while the host’s quiz session is active and as needed for host operations. You can clear local reconnect data by starting a new game in the app.</p>

<h2>Support messages</h2>
<p>If you contact us through the <a href="support.html#contact">support form</a>, we receive the name, email address and message you enter. We use them only to reply to you. They are stored by our website provider, Wix.</p>

<h2>Children</h2>
<p>The app is intended for venue trivia with host supervision. Hosts are responsible for appropriate use at their event.</p>

<h2>Contact</h2>
<p>Questions about privacy? Send a message through the <a href="support.html#contact">support form</a>.</p>
</article></main>`,
  },

  'terms.html': {
    title: 'Quizmaster Bob Terms of Use',
    description: 'Terms of use for the Quizmaster Bob player app.',
    body: `<main class="wrap"><article class="doc glass">
<h1>Terms of Use</h1>
<p class="muted">Last updated: 30 September 2026</p>
<p>Quizmaster Bob is a live trivia player app from iZeus Pty Ltd. By downloading or using the app you agree to these terms and to Apple’s standard Licensed Application End User License Agreement where you install it from the App Store.</p>
<p>Apple’s standard EULA: <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">apple.com/legal/internet-services/itunes/dev/stdeula</a></p>

<h2>What the app is for</h2>
<p>The player app lets a team join a quiz that a host is running. It is not a standalone trivia game. You need a join code from the venue.</p>

<h2>Players and hosts</h2>
<p>The player app is free to download and does not sell subscriptions inside the app. Hosts run quizzes, libraries and billing on the Quizmaster Bob website under their own account.</p>

<h2>Acceptable use</h2>
<p>Team names and optional photos may appear on the venue screen. Do not submit anything unlawful, abusive, or that you do not have the right to share.</p>

<h2>Privacy</h2>
<p>How information is handled is described in the <a href="privacy.html">Privacy Policy</a>.</p>

<h2>Contact</h2>
<p>Questions? Send a message through the <a href="support.html#contact">support form</a>.</p>
</article></main>`,
  },
};

for (const [file, page] of Object.entries(pages)) {
  writeFileSync(new URL(file, import.meta.url), layout({ file, ...page }));
}
console.log('built', Object.keys(pages).length, 'pages', V);
