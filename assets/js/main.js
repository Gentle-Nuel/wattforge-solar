(function () {
  'use strict';

  /* ===== Theme toggle =====
     data-theme is already set on <html> by theme-init.js (blocking,
     runs before paint). This just wires up the switch and persists
     future choices. */
  var themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    var logos = document.querySelectorAll('[data-logo]');

    function reflect(theme) {
      themeToggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
      logos.forEach(function (img) {
        img.src = theme === 'light' ? 'assets/images/logo-mark-light.svg' : 'assets/images/logo-mark.svg';
      });
    }

    reflect(document.documentElement.getAttribute('data-theme') || 'dark');

    themeToggle.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('wattforge-theme', next); } catch (e) {}
      reflect(next);
    });
  }

  /* ===== Nav toggle ===== */
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

  /* ===== Switchboard: all services are always "on" — tapping a
     switch selects which one's description shows in the shared
     readout, it does not imply the others are off. ===== */
  var switchGrid = document.getElementById('switch-grid');
  if (switchGrid) {
    var buttons = Array.prototype.slice.call(switchGrid.querySelectorAll('.switch-btn'));
    var readoutLabel = document.getElementById('readout-label');
    var readoutText = document.getElementById('readout-text');

    function select(btn) {
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      btn.setAttribute('aria-pressed', 'true');
      if (readoutLabel) readoutLabel.textContent = btn.getAttribute('data-label');
      if (readoutText) readoutText.textContent = btn.getAttribute('data-desc');
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () { select(btn); });
    });

    if (buttons[0]) select(buttons[0]);
  }

  /* ===== Load calculator (contact.html) =====
     Same tier logic as the brief: appliance steppers -> total kW ->
     recommended system tier -> prefilled WhatsApp message. All four
     tiers show indicative pricing here (guardrail on 3.5kVA/10kVA
     pricing lifted for this build; see index.html pricing-note). */
  var calculator = document.getElementById('calculator');
  if (calculator) {
    var PHONE = calculator.getAttribute('data-phone') || '2349061418974';

    var LABELS = {
      fridge: 'Fridge',
      ac: 'AC (1HP)',
      tv: 'TV',
      light: 'Lights',
      pump: 'Water pump',
      misc: 'Misc/sockets'
    };

    function getTier(totalKw) {
      if (totalKw <= 2) {
        return { name: '3.5kVA Off-grid System', note: 'Typical 3.5kVA setups run from ~₦4.2M installed. Final pricing depends on site and components.' };
      }
      if (totalKw <= 4) {
        return { name: '6kVA Hybrid System', note: 'Typical 6kVA setups run from ~₦6.35M installed. Final pricing depends on site and components.' };
      }
      if (totalKw <= 7) {
        return { name: '10kVA Hybrid System', note: 'Typical 10kVA setups run from ~₦10.8M installed. Final pricing depends on site and components.' };
      }
      return { name: '15–30kVA Commercial System', note: 'Larger/commercial systems typically run from ₦17M–21M+ including logistics. Final pricing depends on site and components.' };
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
        var message = 'Hi Wattforge, I used your load calculator on the website.\n' +
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
