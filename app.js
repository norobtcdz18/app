const htmlInput = document.getElementById('htmlInput');
const viewBtn = document.getElementById('viewBtn');
const clearBtn = document.getElementById('clearBtn');
const preview = document.getElementById('preview');
const fullscreenBtn = document.getElementById('fullscreenBtn');

const defaultCode = `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: system-ui, sans-serif;
      padding: 20px;
      background: #f0f9ff;
      color: #0f172a;
    }
    h1 { color: #2563eb; }
  </style>
</head>
<body>
  <h1>مرحباً!</h1>
  <p>هذا معاينة لكود HTML.</p>
</body>
</html>`;

htmlInput.value = defaultCode;

function renderHTML() {
  const code = htmlInput.value;
  const blob = new Blob([code], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  preview.src = url;
}

viewBtn.addEventListener('click', () => {
  renderHTML();
  preview.scrollIntoView({ behavior: 'smooth' });
});

clearBtn.addEventListener('click', () => {
  if (confirm('هل تريد مسح الكود؟')) {
    htmlInput.value = '';
    preview.src = 'about:blank';
    htmlInput.focus();
  }
});

fullscreenBtn.addEventListener('click', () => {
  preview.classList.toggle('fullscreen');
  if (preview.classList.contains('fullscreen')) {
    fullscreenBtn.textContent = '✕';
  } else {
    fullscreenBtn.textContent = '⛶';
  }
});

preview.addEventListener('load', () => {
  if (preview.contentWindow && preview.contentWindow.document) {
    preview.style.height = preview.contentWindow.document.body.scrollHeight + 40 + 'px';
  }
});

renderHTML();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
