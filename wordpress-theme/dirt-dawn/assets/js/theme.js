/**
 * Dirt & Dawn — header menus, mobile drawer, newsletter mailto.
 * Plain DOM, no dependencies.
 */
(function () {
  'use strict';

  var header = document.getElementById('dnd-header');
  var burger = document.getElementById('dnd-burger');
  var drawer = document.getElementById('dnd-drawer');
  var menus = [].slice.call(document.querySelectorAll('.dnd-nav__item'));

  function closeMenus(except) {
    menus.forEach(function (item) {
      if (item === except) return;
      item.classList.remove('is-open');
      var toggle = item.querySelector('.dnd-nav__toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  }

  var hoverCapable = window.matchMedia && window.matchMedia('(hover: hover)').matches;

  menus.forEach(function (item) {
    var toggle = item.querySelector('.dnd-nav__toggle');
    if (!toggle) return;

    function open() {
      closeMenus(item);
      item.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    }
    function close() {
      item.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function (event) {
      event.preventDefault();
      if (hoverCapable) {
        // Pointer devices open on hover; a click must not immediately close it.
        open();
      } else if (item.classList.contains('is-open')) {
        close();
      } else {
        open();
      }
    });

    if (hoverCapable) {
      item.addEventListener('mouseenter', open);
      item.addEventListener('mouseleave', close);
    }
    item.addEventListener('focusout', function (event) {
      if (!item.contains(event.relatedTarget)) close();
    });
  });

  if (burger && drawer) {
    burger.addEventListener('click', function () {
      var isOpen = drawer.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      var label = (window.dirtDawn && dirtDawn.i18n) || {};
      burger.setAttribute('aria-label', isOpen ? (label.closeMenu || 'Close menu') : (label.openMenu || 'Open menu'));
      if (isOpen) closeMenus();
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeMenus();
      if (drawer && drawer.classList.contains('is-open') && burger) {
        drawer.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    }
  });

  document.addEventListener('click', function (event) {
    var target = event.target;
    if (target.closest && (target.closest('.dnd-nav__item') || target.closest('#dnd-burger') || target.closest('#dnd-drawer'))) {
      return;
    }
    closeMenus();
  });

  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var form = document.getElementById('dnd-newsletter');
  if (form) {
    var input = form.querySelector('input[type="email"]');
    var error = document.getElementById('dnd-newsletter-error');
    var email = form.getAttribute('data-email') || '';
    var strings = (window.dirtDawn && dirtDawn.i18n) || {};

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var value = input ? input.value.trim() : '';
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

      if (!valid) {
        if (error) {
          error.textContent = strings.invalidEmail || 'Please enter a valid email address.';
          error.hidden = false;
        }
        if (input) {
          input.setAttribute('aria-invalid', 'true');
          input.focus();
        }
        return;
      }

      if (error) {
        error.hidden = true;
        error.textContent = '';
      }
      if (input) input.removeAttribute('aria-invalid');

      var subject = 'Newsletter signup — The Dawn Dispatch';
      var body = 'Please add ' + value + ' to the Dawn Dispatch list.';
      window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
})();
