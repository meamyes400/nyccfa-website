/* =============================================
   NYCCFA Website - Main JavaScript
   ============================================= */

// --- Navbar scroll effect ---
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// --- Mobile navigation toggle ---
(function () {
  const toggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// --- Job board filtering ---
(function () {
  const filterBtns = document.querySelectorAll('.job-filters .filter-btn');
  const jobList = document.getElementById('jobList');
  if (!filterBtns.length || !jobList) return;

  // Also handle event filters
  const eventsList = document.getElementById('eventsList');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active state within the same filter group
      const parent = btn.parentElement;
      parent.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // Filter job cards
      if (jobList) {
        jobList.querySelectorAll('.job-card').forEach(function (card) {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      }

      // Filter event cards
      if (eventsList) {
        eventsList.querySelectorAll('.event-detail-card').forEach(function (card) {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      }
    });
  });
})();

// --- FAQ accordion ---
function toggleFaq(button) {
  const item = button.closest('.faq-item');
  if (!item) return;

  const isActive = item.classList.contains('active');

  // Close all FAQ items
  document.querySelectorAll('.faq-item').forEach(function (faq) {
    faq.classList.remove('active');
  });

  // Toggle clicked item
  if (!isActive) {
    item.classList.add('active');
  }
}

// --- Event registration modal ---
function openRegistration(eventName) {
  const modal = document.getElementById('registrationModal');
  const nameEl = document.getElementById('registrationEventName');
  const form = document.getElementById('registrationForm');
  const success = document.getElementById('registrationSuccess');

  if (!modal) return;

  nameEl.textContent = 'Registering for: ' + eventName;
  form.style.display = '';
  success.classList.remove('show');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeRegistration() {
  const modal = document.getElementById('registrationModal');
  if (!modal) return;

  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function submitRegistration(e) {
  e.preventDefault();
  const form = document.getElementById('registrationForm');
  const success = document.getElementById('registrationSuccess');

  form.style.display = 'none';
  success.classList.add('show');

  // Auto-close after 3 seconds
  setTimeout(function () {
    closeRegistration();
  }, 3000);
}

// Close modal on backdrop click
(function () {
  const modal = document.getElementById('registrationModal');
  if (!modal) return;

  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      closeRegistration();
    }
  });
})();

// --- Membership form submission ---
function submitMembership(e) {
  e.preventDefault();
  var form = document.getElementById('membershipForm');
  var success = document.getElementById('membershipSuccess');
  var inputs = form.querySelectorAll('input, select, textarea');
  var lines = [];

  inputs.forEach(function (input) {
    var label = input.closest('.form-group');
    var labelText = label ? label.querySelector('label') : null;
    var name = labelText ? labelText.textContent.replace(/\s*\*\s*$/, '').trim() : 'Field';
    var value = input.value.trim();
    if (value) lines.push(name + ': ' + value);
  });

  var subject = encodeURIComponent('NYCCFA Membership Application');
  var body = encodeURIComponent(lines.join('\n'));
  window.open('mailto:nyccfacommunications@gmail.com?subject=' + subject + '&body=' + body, '_self');

  form.style.display = 'none';
  success.classList.add('show');

  window.scrollTo({
    top: success.offsetTop - 120,
    behavior: 'smooth'
  });
}

// --- Contact form submission ---
function submitContact(e) {
  e.preventDefault();
  var form = document.getElementById('contactForm');
  var success = document.getElementById('contactSuccess');
  var inputs = form.querySelectorAll('input, select, textarea');
  var lines = [];

  inputs.forEach(function (input) {
    var label = input.closest('.form-group');
    var labelText = label ? label.querySelector('label') : null;
    var name = labelText ? labelText.textContent.replace(/\s*\*\s*$/, '').trim() : 'Field';
    var value = input.value.trim();
    if (value) lines.push(name + ': ' + value);
  });

  var subject = encodeURIComponent('NYCCFA Website Contact Form');
  var body = encodeURIComponent(lines.join('\n'));
  window.open('mailto:nyccfacommunications@gmail.com?subject=' + subject + '&body=' + body, '_self');

  form.style.display = 'none';
  success.classList.add('show');

  window.scrollTo({
    top: success.offsetTop - 120,
    behavior: 'smooth'
  });
}

// --- Calendar widget ---
(function () {
  const calendarGrid = document.getElementById('calendarGrid');
  const calendarMonth = document.getElementById('calendarMonth');
  const prevBtn = document.getElementById('prevMonth');
  const nextBtn = document.getElementById('nextMonth');

  if (!calendarGrid || !calendarMonth) return;

  // Events data (month is 0-indexed)
  const events = [
    { year: 2026, month: 1, day: 20 }, // Feb 20
    { year: 2026, month: 2, day: 5 },  // Mar 5
    { year: 2026, month: 2, day: 18 }, // Mar 18
    { year: 2026, month: 3, day: 2 },  // Apr 2
    { year: 2026, month: 3, day: 16 }, // Apr 16
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  let currentDate = new Date(2026, 1, 1); // Feb 2026
  const today = new Date();

  function hasEvent(year, month, day) {
    return events.some(function (e) {
      return e.year === year && e.month === month && e.day === day;
    });
  }

  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    calendarMonth.textContent = monthNames[month] + ' ' + year;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    let html = '';

    // Day headers
    dayNames.forEach(function (d) {
      html += '<div class="calendar-day-header">' + d + '</div>';
    });

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      html += '<div class="calendar-day">' + (daysInPrevMonth - i) + '</div>';
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      let classes = 'calendar-day current-month';
      if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        classes += ' today';
      }
      if (hasEvent(year, month, d)) {
        classes += ' has-event';
      }
      html += '<div class="' + classes + '">' + d + '</div>';
    }

    // Next month days to fill grid
    const totalCells = firstDay + daysInMonth;
    const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 1; i <= remaining; i++) {
      html += '<div class="calendar-day">' + i + '</div>';
    }

    calendarGrid.innerHTML = html;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });
  }

  renderCalendar();
})();

// --- Animate stats on scroll ---
(function () {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let animated = false;

  function animateNumber(el) {
    const text = el.textContent.trim();
    const match = text.match(/^(\d+)/);
    if (!match) return;

    const target = parseInt(match[1], 10);
    const suffix = text.replace(/^\d+/, '');
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  function checkStats() {
    if (animated) return;

    const first = statNumbers[0];
    const rect = first.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      animated = true;
      statNumbers.forEach(animateNumber);
      window.removeEventListener('scroll', checkStats);
    }
  }

  window.addEventListener('scroll', checkStats, { passive: true });
  checkStats();
})();

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
