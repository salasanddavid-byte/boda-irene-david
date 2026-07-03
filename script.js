/* =========================================================
   IRENE & DAVID — script.js
   Menú móvil, scroll reveal, envío de RSVP, copiar IBAN/Bizum
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Menú móvil ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Cierra el menú al pulsar un enlace (útil en móvil)
    navLinks.querySelectorAll('a[data-nav]').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Revelado suave al hacer scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el, i) => {
      // Pequeño retraso escalonado dentro de cada sección para un efecto orquestado
      el.style.transitionDelay = `${(i % 6) * 60}ms`;
      observer.observe(el);
    });
  } else {
    // Fallback: si no hay soporte, mostrar todo directamente
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Formulario de confirmación de asistencia ---------- */
  const rsvpForm = document.getElementById('rsvpForm');
  const formStatus = document.getElementById('formStatus');

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (event) => {
      const actionUrl = rsvpForm.getAttribute('action') || '';

      // Si no se ha configurado un endpoint real todavía, evita el envío
      // y avisa amablemente en pantalla (evita un error confuso de red).
      if (!actionUrl || actionUrl.includes('TU_ID')) {
        event.preventDefault();
        formStatus.textContent = 'Este formulario aún no está conectado. Revisa el README para activarlo con Formspree, Netlify o Google Sheets.';
        formStatus.style.color = '#B8935A';
        return;
      }

      // Con Formspree: enviamos por fetch para poder mostrar un mensaje
      // de agradecimiento sin salir de la página.
      event.preventDefault();
      formStatus.textContent = 'Enviando...';
      formStatus.style.color = '#5B5847';

      try {
        const response = await fetch(actionUrl, {
          method: 'POST',
          body: new FormData(rsvpForm),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          formStatus.textContent = '¡Gracias! Hemos recibido tu confirmación.';
          formStatus.style.color = '#4A5738';
          rsvpForm.reset();
        } else {
          formStatus.textContent = 'No hemos podido enviarlo. Inténtalo de nuevo en unos minutos.';
          formStatus.style.color = '#B8935A';
        }
      } catch (err) {
        formStatus.textContent = 'No hemos podido enviarlo. Comprueba tu conexión e inténtalo de nuevo.';
        formStatus.style.color = '#B8935A';
      }
    });
  }

  /* ---------- Copiar IBAN / Bizum ---------- */
  const copyButtons = document.querySelectorAll('[data-copy-target]');
  const copyFeedback = document.getElementById('copyFeedback');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-copy-target');
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const text = targetEl.textContent.trim();

      try {
        await navigator.clipboard.writeText(text);
        showCopyFeedback(`Copiado: ${text}`);
      } catch (err) {
        // Fallback para navegadores sin permiso de portapapeles
        const tempInput = document.createElement('textarea');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showCopyFeedback(`Copiado: ${text}`);
      }
    });
  });

  function showCopyFeedback(message) {
    if (!copyFeedback) return;
    copyFeedback.textContent = message;
    clearTimeout(showCopyFeedback._t);
    showCopyFeedback._t = setTimeout(() => {
      copyFeedback.textContent = '';
    }, 3000);
  }

});
