/* ==========================================================
   Kafé · Landing page
   1. Apresentação animada (cenas estilo stories)
   2. Carrossel de projetos
   3. Links do WhatsApp com mensagem pronta
   4. Calculadora de comissão
   5. Botão fixo do WhatsApp
   Sem dependências. Os tempos vêm das variáveis --scene-ms e --slide-ms do CSS.
   ========================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function cssMs(name, fallback) {
    var v = parseInt(getComputedStyle(document.documentElement).getPropertyValue(name), 10);
    return isNaN(v) ? fallback : v;
  }

  /* ---------- 1. Apresentação animada ---------- */
  function initStory(root) {
    var scenes = Array.prototype.slice.call(root.querySelectorAll('[data-scene]'));
    var barsBox = root.querySelector('[data-story-bars]');
    var toggle = root.querySelector('[data-story-toggle]');
    if (!scenes.length || !barsBox) return;

    var DURATION = cssMs('--scene-ms', 5000);
    var current = 0;
    var elapsed = 0;
    var playing = !reduceMotion; // quem pediu menos movimento começa pausado
    var last = null;
    var fills = [];

    scenes.forEach(function (scene, i) {
      var title = scene.querySelector('.eyebrow');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'story__bar';
      btn.setAttribute('aria-label', 'Ir para a cena ' + (i + 1) + (title ? ': ' + title.textContent : ''));
      btn.innerHTML = '<span class="story__track"><span class="story__fill"></span></span>';
      btn.addEventListener('click', function () { go(i); });
      barsBox.appendChild(btn);
      fills.push(btn.querySelector('.story__fill'));
    });

    function render() {
      fills.forEach(function (fill, i) {
        var pct = i < current ? 100 : i === current ? Math.min(100, (elapsed / DURATION) * 100) : 0;
        fill.style.width = pct + '%';
      });
    }

    function go(i) {
      scenes[current].classList.remove('is-active');
      current = (i + scenes.length) % scenes.length;
      // força o navegador a reiniciar as animações de entrada
      void scenes[current].offsetWidth;
      scenes[current].classList.add('is-active');
      elapsed = 0;
      render();
    }

    function setPlaying(value) {
      playing = value;
      root.classList.toggle('is-paused', !playing);
      toggle.setAttribute('aria-label', playing ? 'Pausar apresentação' : 'Continuar apresentação');
    }

    function frame(now) {
      if (last === null) last = now;
      var dt = now - last;
      last = now;
      if (playing && !document.hidden) {
        elapsed += dt;
        if (elapsed >= DURATION) go(current + 1);
        else render();
      }
      requestAnimationFrame(frame);
    }

    toggle.addEventListener('click', function () { setPlaying(!playing); });
    setPlaying(playing);
    render();
    requestAnimationFrame(frame);
  }

  /* ---------- 2. Carrossel de projetos ---------- */
  function initCarousel(root) {
    var slides = Array.prototype.slice.call(root.querySelectorAll('[data-slide]'));
    var dotsBox = document.querySelector('[data-carousel-dots]');
    var prev = document.querySelector('[data-carousel-prev]');
    var next = document.querySelector('[data-carousel-next]');
    if (!slides.length) return;

    var DURATION = cssMs('--slide-ms', 6000);
    var current = 0;
    var timer = null;
    var hovering = false;
    var dots = [];

    slides.forEach(function (slide, i) {
      var name = slide.querySelector('.slide__name');
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot';
      dot.setAttribute('aria-label', 'Ver projeto ' + (i + 1) + (name ? ': ' + name.textContent : ''));
      dot.innerHTML = '<span></span>';
      dot.addEventListener('click', function () { go(i); restart(); });
      dotsBox.appendChild(dot);
      dots.push(dot);
    });

    function go(i) {
      slides[current].classList.remove('is-active');
      current = (i + slides.length) % slides.length;
      void slides[current].offsetWidth;
      slides[current].classList.add('is-active');
      dots.forEach(function (d, j) { d.setAttribute('aria-current', j === current ? 'true' : 'false'); });
    }

    function restart() {
      clearInterval(timer);
      if (reduceMotion) return;
      timer = setInterval(function () {
        if (!hovering && !document.hidden) go(current + 1);
      }, DURATION);
    }

    prev.addEventListener('click', function () { go(current - 1); restart(); });
    next.addEventListener('click', function () { go(current + 1); restart(); });
    root.addEventListener('mouseenter', function () { hovering = true; });
    root.addEventListener('mouseleave', function () { hovering = false; });
    root.addEventListener('focusin', function () { hovering = true; });
    root.addEventListener('focusout', function () { hovering = false; });

    // links da faixa "Quem já trabalha com a Kafé" abrem o slide do cliente
    document.querySelectorAll('[data-slide-link]').forEach(function (a) {
      a.addEventListener('click', function () { go(parseInt(a.getAttribute('data-slide-link'), 10)); restart(); });
    });

    // arrastar com o dedo no celular
    var startX = null;
    root.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    root.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { go(current + (dx < 0 ? 1 : -1)); restart(); }
      startX = null;
    });

    go(0);
    restart();
  }

  /* ---------- 3. Links do WhatsApp ---------- */
  var WA_NUMBER = '5514981861140';

  function waLink(msg) {
    return 'https://wa.me/' + WA_NUMBER + (msg ? '?text=' + encodeURIComponent(msg) : '');
  }

  function initWhatsApp() {
    document.querySelectorAll('[data-wa]').forEach(function (a) {
      a.href = waLink(a.getAttribute('data-wa'));
    });
  }

  /* ---------- 4. Calculadora de comissão ---------- */
  function initCalc(root) {
    var sales = root.querySelector('[data-calc-sales]');
    var rate = root.querySelector('[data-calc-rate]');
    var month = root.querySelector('[data-calc-month]');
    var year = root.querySelector('[data-calc-year]');
    var cta = root.querySelector('[data-calc-cta]');
    var brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

    // aceita "20.000", "20000" e "20000,50" no valor; "12,5" e "12.5" na comissão
    function parse(input, isMoney) {
      var raw = input.value.trim();
      if (isMoney) raw = raw.replace(/\./g, '');
      var v = parseFloat(raw.replace(',', '.'));
      return isNaN(v) || v < 0 ? 0 : v;
    }

    function update() {
      var s = parse(sales, true);
      var r = Math.min(parse(rate, false), 100);
      if (!s || !r) {
        month.textContent = 'R$ —';
        year.textContent = 'R$ —';
        cta.href = waLink(cta.getAttribute('data-wa'));
        return;
      }
      var m = s * r / 100;
      month.textContent = brl.format(m);
      year.textContent = brl.format(m * 12);
      cta.href = waLink('Oi Kaique, fiz a conta no site da Kafé: vendo ' + brl.format(s) +
        ' por mês no aplicativo e pago ' + r.toLocaleString('pt-BR') + '% de comissão, cerca de ' +
        brl.format(m * 12) + ' por ano. Quero saber como vender direto.');
    }

    sales.addEventListener('input', update);
    rate.addEventListener('input', update);
    update();
  }

  /* ---------- 5. Botão fixo do WhatsApp ---------- */
  // some enquanto o topo ou o contato estão na tela, que já têm o próprio botão
  function initFloat(btn) {
    var watched = Array.prototype.slice.call(document.querySelectorAll('[data-wa-hide]'));
    if (!watched.length || !('IntersectionObserver' in window)) return;
    var onScreen = watched.map(function () { return false; });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { onScreen[watched.indexOf(e.target)] = e.isIntersecting; });
      btn.classList.toggle('is-hidden', onScreen.indexOf(true) !== -1);
    });
    watched.forEach(function (el) { io.observe(el); });
  }

  document.querySelectorAll('[data-story]').forEach(initStory);
  document.querySelectorAll('[data-carousel]').forEach(initCarousel);
  initWhatsApp();
  document.querySelectorAll('[data-calc]').forEach(initCalc);
  document.querySelectorAll('[data-wa-float]').forEach(initFloat);

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
