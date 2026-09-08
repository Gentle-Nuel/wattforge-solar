(function () {
  'use strict';

  /* ===== Nav toggle (hamburger / off-canvas) ===== */
  var navToggle = document.getElementById('nav-toggle');
  var navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ===== Breaker-panel accordion ===== */
  document.querySelectorAll('.breaker-row').forEach(function (row) {
    var head = row.querySelector('.breaker-row-head');
    if (!head) return;
    head.addEventListener('click', function () {
      var isOpen = row.getAttribute('data-open') === 'true';
      row.setAttribute('data-open', isOpen ? 'false' : 'true');
      head.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });
  });

  /* ===== Load calculator (§7) ===== */
  var calculator = document.getElementById('calculator');
  if (calculator) {
    var PHONE = calculator.getAttribute('data-phone') || '2348051355133';

    var LABELS = {
      fridge: 'Fridge',
      ac: 'AC (1HP)',
      tv: 'TV',
      light: 'Lights',
      pump: 'Water pump',
      misc: 'Misc/sockets'
    };

    var PRICING_NOTE = 'Pricing depends on site and components. Message us for an exact quote.';

    function getTier(totalKw) {
      if (totalKw <= 2) {
        return { name: '3.5kVA Off-grid System', note: PRICING_NOTE };
      }
      if (totalKw <= 4) {
        return { name: '6kVA Hybrid System', note: PRICING_NOTE };
      }
      if (totalKw <= 7) {
        return { name: '10kVA Hybrid System', note: PRICING_NOTE };
      }
      return { name: '15–30kVA Commercial System', note: PRICING_NOTE };
    }

    var rows = Array.prototype.slice.call(calculator.querySelectorAll('.calc-row[data-key]'));
    var totalKwEl = calculator.querySelector('[data-total-kw]');
    var tierNameEl = calculator.querySelector('[data-tier-name]');
    var tierNoteEl = calculator.querySelector('[data-tier-note]');
    var waLink = calculator.querySelector('[data-wa-link]');

    function readCounts() {
      var counts = {};
      rows.forEach(function (row) {
        var key = row.getAttribute('data-key');
        var countEl = row.querySelector('[data-count]');
        counts[key] = parseInt(countEl.textContent, 10) || 0;
      });
      return counts;
    }

    function recalc() {
      var counts = readCounts();
      var totalW = 0;

      rows.forEach(function (row) {
        var key = row.getAttribute('data-key');
        var watt = parseInt(row.getAttribute('data-watt'), 10) || 0;
        totalW += watt * counts[key];
      });

      var totalKw = Math.round((totalW / 1000) * 100) / 100;
      var tier = getTier(totalKw);

      if (totalKwEl) totalKwEl.textContent = totalKw.toFixed(2);
      if (tierNameEl) tierNameEl.textContent = tier.name;
      if (tierNoteEl) tierNoteEl.textContent = tier.note;

      if (waLink) {
        var summary = Object.keys(LABELS)
          .map(function (key) { return LABELS[key] + ' x' + counts[key]; })
          .join(', ');
        var message = 'Hi Twinstech, I used your load calculator on the website.\n' +
          'My appliances: ' + summary + '.\n' +
          'Estimated load: ' + totalKw.toFixed(2) + 'kW.\n' +
          'Recommended system: ' + tier.name + '.\n' +
          'Please advise on next steps.';
        waLink.setAttribute('href', 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(message));
      }
    }

    rows.forEach(function (row) {
      var countEl = row.querySelector('[data-count]');
      var min = parseInt(row.getAttribute('data-min'), 10) || 0;
      var max = parseInt(row.getAttribute('data-max'), 10) || 20;

      row.querySelectorAll('.stepper-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var current = parseInt(countEl.textContent, 10) || 0;
          var action = btn.getAttribute('data-action');
          var next = action === 'inc' ? current + 1 : current - 1;
          next = Math.max(min, Math.min(max, next));
          countEl.textContent = String(next);
          recalc();
        });
      });
    });

    recalc();
  }
})();
