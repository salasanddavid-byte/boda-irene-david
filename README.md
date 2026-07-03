# Irene & David — web de boda y bautizo

Web estática (HTML + CSS + JS puro, sin frameworks ni npm) para la boda de Irene y David
y el bautizo de su hija Sofía, el 26 de septiembre de 2026 en Melilla.

## Cómo verla en tu ordenador

No necesitas instalar nada. Simplemente haz doble clic en `index.html` y se abrirá
en tu navegador. También puedes arrastrar el archivo a una ventana de Chrome/Safari/Firefox.

```
boda-irene-david/
├── index.html      ← estructura y contenido de todas las secciones
├── styles.css        ← colores, tipografías y diseño
├── script.js          ← menú, animaciones, formulario, copiar IBAN/Bizum
├── README.md          ← este archivo
└── assets/            ← pon aquí vuestras fotos si queréis añadirlas
```

---

## 1. Cómo editar el contenido

Todo el texto está en `index.html`. Ábrelo con cualquier editor de texto (Bloc de notas,
TextEdit, o mejor aún, [Visual Studio Code](https://code.visualstudio.com/), gratis).

### Nombres y fecha
Busca (`Ctrl+F` / `Cmd+F`) estos textos y sustitúyelos:
- `Irene` / `David` / `Sofía` — nombres de los novios y la hija
- `26 de septiembre de 2026` — fecha de la boda
- `Melilla` — ciudad

### Horarios y lugares
En la sección `<section id="boda">` y `<section id="programa">` encontrarás las horas
(`12:30 h`, `14:00 h`) y los lugares (`Parroquia Castrense`, `La Roca`). Cámbialos
directamente en el texto.

### Enlaces de Google Maps
Busca `href="https://www.google.com/maps/search/?api=1&query=..."`. Sustituye el texto
después de `query=` por la dirección exacta de tu lugar. Ejemplo:

```html
href="https://www.google.com/maps/search/?api=1&query=Parroquia+Castrense+Melilla"
```

Cambia `Parroquia+Castrense+Melilla` por la dirección que quieras (usa `+` en vez de espacios).
También puedes coger el enlace "Compartir" directamente desde la app de Google Maps.

### Guía de viaje (bonos turísticos)
Todo está en `<section id="viaje">`. Los enlaces editables tienen el atributo
`data-editable` para que sea fácil encontrarlos con el buscador:
- `data-editable="bonos-link"` y `bonos-link-2` → enlace a bonosmelilla.es
- `data-editable="turismo-link"` → enlace a Turismo de Melilla
- `data-editable="agencia-link"` / `agencia-email` → contacto de la agencia
- `data-editable="hotel-link"` → teléfono/enlace del hotel

Cambia el `href="..."` de cada uno y el texto visible si lo necesitas.

### IBAN y Bizum
En `<section id="regalo">` busca:

```html
<span class="gift-value" id="ibanValue" data-editable="iban">ES00 0000 0000 0000 0000 0000</span>
...
<span class="gift-value" id="bizumValue" data-editable="bizum">600 000 000</span>
```

Sustituye los números por vuestro IBAN y número de Bizum reales. Los botones de
"Copiar" funcionan automáticamente, no hay que tocar nada más.

### Preguntas frecuentes
Cada pregunta es un bloque `<details class="faq-item">...</details>` dentro de
`<section id="faq">`. Puedes añadir una nueva copiando un bloque entero y cambiando
el `<summary>` (pregunta) y el `<p>` (respuesta).

---

## 2. Cómo cambiar colores e imágenes

### Colores
Abre `styles.css` y edita las primeras líneas (dentro de `:root { ... }`):

```css
--ivory:      #FAF7EF;   /* fondo principal */
--olive:      #4A5738;   /* verde oliva */
--sage:       #8A9678;   /* verde salvia */
--gold:       #B8935A;   /* dorado */
--ink:        #2E2B23;   /* color del texto */
```

Cambiando estos seis valores, cambia el color de toda la web automáticamente.

### Añadir vuestras fotos
1. Copia tus fotos dentro de la carpeta `assets/`.
2. En `index.html`, donde quieras insertar una foto, añade por ejemplo:
   ```html
   <img src="./assets/nuestra-foto.jpg" alt="Irene y David">
   ```
3. Un buen sitio para añadir una foto de pareja es justo antes de `<div class="hero-content">`
   dentro de la sección `hero`, o al principio de la sección `<section id="boda">`.

---

## 3. Cómo activar el formulario de confirmación de asistencia (RSVP)

El formulario ya está montado, solo falta conectarlo a un servicio que reciba los datos.
Elige **una** de estas tres opciones:

### Opción A — Formspree (la más sencilla)
1. Crea una cuenta gratis en [formspree.io](https://formspree.io/).
2. Crea un nuevo formulario y copia el ID que te da (algo como `xzbqwxyz`).
3. En `index.html`, busca:
   ```html
   <form id="rsvpForm" class="rsvp-form reveal" action="https://formspree.io/f/TU_ID" method="POST" ...>
   ```
   y sustituye `TU_ID` por tu ID real.
4. Listo. Las respuestas llegarán a tu correo y al panel de Formspree.

### Opción B — Netlify Forms (si publicas la web en Netlify)
1. En `index.html`, en la etiqueta `<form>`, cambia `data-netlify="false"` por
   `data-netlify="true"` y añade dentro del formulario:
   ```html
   <input type="hidden" name="form-name" value="rsvp">
   ```
2. Publica la web en Netlify (ver sección 4). Netlify detecta el formulario
   automáticamente y las respuestas aparecerán en el panel "Forms" de tu proyecto.

### Opción C — Google Sheets
1. Crea una hoja de Google Sheets nueva.
2. Ve a `Extensiones → Apps Script`, borra el contenido y pega un script que reciba
   `doPost(e)` y guarde `e.parameter` como una fila nueva (hay plantillas gratuitas
   buscando "Google Apps Script formulario a Google Sheets").
3. Publica el script como aplicación web (acceso: "Cualquier usuario") y copia la URL
   que te da.
4. Pega esa URL en el `action="..."` del formulario en `index.html`.

Si no conectas ninguna opción, el formulario mostrará un aviso amable en pantalla
en vez de dar un error, así que la web funciona igualmente mientras lo configuras.

---

## 4. Cómo publicarla en internet (paso a paso)

La forma más rápida y gratuita es **Netlify**, arrastrando la carpeta directamente.

### Opción recomendada: Netlify Drop (sin cuenta técnica, 2 minutos)
1. Entra en [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastra la carpeta completa `boda-irene-david` a la zona indicada.
3. En unos segundos Netlify te da una URL pública (algo como
   `https://nombre-aleatorio.netlify.app`).
4. Opcional: crea una cuenta gratuita en Netlify para poder editar el sitio más tarde
   y ponerle un nombre personalizado, por ejemplo `irene-y-david.netlify.app`
   (Site settings → Change site name).
5. Opcional: si tenéis un dominio propio (ej. `irenevydavid.com`), en
   Site settings → Domain management podéis añadirlo siguiendo las instrucciones
   de Netlify.

### Alternativa: GitHub Pages
1. Crea una cuenta gratuita en [github.com](https://github.com) si no tienes.
2. Crea un repositorio nuevo (por ejemplo `boda-irene-david`).
3. Sube los archivos `index.html`, `styles.css`, `script.js`, la carpeta `assets/`
   (arrastrándolos en la web de GitHub, botón "Add file → Upload files").
4. Ve a `Settings → Pages`, en "Branch" elige `main` y guarda.
5. En un par de minutos tu web estará disponible en
   `https://tu-usuario.github.io/boda-irene-david/`.

### Alternativa: Vercel
1. Crea una cuenta gratuita en [vercel.com](https://vercel.com).
2. Arrastra la carpeta del proyecto en el panel de "Add New Project → Deploy" o
   conéctalo a un repositorio de GitHub.
3. Vercel detecta que es un sitio estático y lo publica automáticamente.

---

## 5. Notas técnicas

- No hay dependencias externas salvo las tipografías de Google Fonts, que se cargan
  desde `index.html` mediante `<link>`. Si preferís no depender de Google, podéis
  descargar las fuentes (`Cormorant Garamond`, `Parisienne`, `Jost`) y servirlas
  localmente desde `assets/fonts/`.
- La web respeta `prefers-reduced-motion`, así que las animaciones se desactivan
  automáticamente para quien lo tenga configurado en su sistema.
- Todo el código usa rutas relativas (`./styles.css`, `./script.js`), así que puedes
  mover la carpeta a cualquier sitio o subirla a cualquier hosting sin romper nada.

¡Enhorabuena de nuevo, Irene y David! 🫒🤍
