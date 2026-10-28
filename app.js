/* Neto do Açaí — cardápio e pedidos via WhatsApp */
(() => {
  const WHATS = "5581998009853";
  const OPEN_HOUR = 14;
  const CLOSE_HOUR = 22;

  /* ---------- Opções ---------- */
  const ITENS = ["Amendoim inteiro", "Amendoim triturado", "Leite em pó", "Farinha láctea", "Granola", "Disquete", "Paçoca", "Ovomaltine"];
  const FRUTAS = ["Manga", "Abacaxi", "Uva", "Banana"];
  const CALDAS = ["Calda de açaí", "Chocolate", "Kiwi", "Leite condensado", "Mel", "Calda de morango", "Sem calda"];
  const AGUA = { id: "agua", title: "Quer uma água?", label: "Água", min: 0, max: 1, options: [{ name: "Água sem gás", price: 3 }, { name: "Água com gás", price: 4 }] };

  const tigela = (itens, frutas, caldas) => [
    { id: "itens", label: "Itens", title: `Escolha ${itens} itens`, min: 1, max: itens, options: ITENS.map(name => ({ name })) },
    { id: "frutas", label: "Frutas", title: frutas > 1 ? `Escolha ${frutas} frutas` : "Escolha 1 fruta", min: 1, max: frutas, options: FRUTAS.map(name => ({ name })) },
    { id: "caldas", label: "Calda", title: caldas > 1 ? `Até ${caldas} caldas` : "Escolha 1 calda", min: 1, max: caldas, options: CALDAS.map(name => ({ name })) },
    AGUA,
  ];

  /* ---------- Cardápio (fonte: cardápio oficial do Neto) ---------- */
  const MENU = [
    {
      id: "tigelas", name: "Tigelas", note: "itens, frutas e calda grátis",
      items: [
        { id: "t300", name: "Tigela 300ml", price: 12, img: "img/tigela300.webp", desc: "Açaí cremoso com 3 itens, 1 fruta e 1 calda à sua escolha.", groups: tigela(3, 1, 1) },
        { id: "t400", name: "Tigela 400ml", price: 14, img: "img/tigela400.webp", desc: "Açaí cremoso com 3 itens, 1 fruta e 1 calda à sua escolha.", groups: tigela(3, 1, 1) },
        { id: "t500", name: "Tigela 500ml", price: 16, img: "img/tigela500.webp", desc: "A favorita da casa: 4 itens, 2 frutas e calda à sua escolha.", badge: "Mais pedido", groups: tigela(4, 2, 1) },
      ],
    },
    {
      id: "trufados", name: "Trufados", note: "lançamento do Neto",
      items: [
        { id: "trf-avela", name: "Trufado de avelã", price: 22, img: "img/trufado-avela.webp", desc: "Copo trufado com creme de avelã, camadas de leite em pó, amendoim triturado, banana e leite condensado.", badge: "Recomendado", groups: [{ id: "seg", label: "Adicional", title: "Segundo trufado", min: 0, max: 1, options: [{ name: "Segundo trufado no precinho", price: 19.99 }] }, AGUA] },
        { id: "trf-doce", name: "Trufado de doce de leite", price: 22, img: "img/trufado-doce.webp", desc: "Copo trufado de doce de leite, camadas de leite em pó, amendoim triturado, banana e leite condensado.", badge: "Novidade", groups: [{ id: "seg", label: "Adicional", title: "Segundo trufado", min: 0, max: 1, options: [{ name: "Segundo trufado no precinho", price: 19.99 }] }, AGUA] },
        { id: "trf-ninho", name: "Trufado de Ninho", price: 22, img: "img/trufado-ninho.webp", desc: "Copo recheado de creme de Ninho, camadas de leite em pó, amendoim triturado, banana e leite condensado.", badge: "Recomendado", groups: [{ id: "seg", label: "Adicional", title: "Segundo trufado", min: 0, max: 1, options: [{ name: "Segundo trufado no precinho", price: 19.99 }] }, AGUA] },
      ],
    },
    {
      id: "garrafa", name: "Na garrafa", note: "geladinho e pronto pra levar",
      items: [
        { id: "g300", name: "Açaí na garrafa 300ml", price: 13, img: "img/garrafa.webp", desc: "Açaí cremoso batido com leite em pó e um toque de leite condensado.", groups: [AGUA] },
        { id: "g500", name: "Açaí na garrafa 500ml", price: 16, img: "img/garrafa.webp", desc: "Açaí cremoso batido com leite em pó e um toque de leite condensado.", badge: "Mais pedido", groups: [AGUA] },
        { id: "cupu300", name: "Cupuaçu na garrafa 300ml", price: 13, img: "img/cupuacu.webp", desc: "Depois do sucesso do açaí na garrafa: cupuaçu, único e irresistível. Exclusividade do Neto.", badge: "Novidade", groups: [AGUA] },
        { id: "quinta", name: "Quinta na garrafa (2 un.)", price: 18, was: 26, img: "img/garrafa.webp", desc: "Toda quinta, 2 garrafas por R$ 18. Paga menos e leva mais.", out: true, groups: [] },
      ],
    },
    {
      id: "potes", name: "Potes", note: "pra dividir com a galera",
      items: [
        { id: "pote1", name: "Pote delícia 1 litro", price: 32, img: "img/pote1l.webp", desc: "Camadas generosas de acompanhamentos, frutas fresquinhas e caldas. Rende muito!", groups: [
          { id: "itens", label: "Itens", title: "Escolha até 4 itens", min: 0, max: 4, options: ITENS.map(name => ({ name })) },
          { id: "frutas", label: "Frutas", title: "Escolha até 2 frutas", min: 0, max: 2, options: FRUTAS.map(name => ({ name })) },
          { id: "caldas", label: "Caldas", title: "Até 2 caldas", min: 0, max: 2, options: CALDAS.map(name => ({ name })) },
        ] },
        { id: "pote2", name: "Pote de açaí 2 litros", price: 48, img: "img/pote2l.webp", desc: "Super cremoso, pra dividir com a turma ou ir tomando um pouquinho todo dia.", groups: [] },
      ],
    },
    {
      id: "burgers", name: "Burgers", note: "pão brioche e blend artesanal 100g",
      items: [
        { id: "b-cheese", name: "Cheese burguer", price: 16.9, img: "img/burger-cheese.webp", desc: "Pão brioche selado na manteiga, blend 100g, mussarela, salada e molho especial.", groups: [] },
        { id: "b-cheddar", name: "Cheddar", price: 18.9, img: "img/burger-cheddar.webp", desc: "Blend 100g, cheddar cremoso, cebola caramelizada, salada e molho da casa.", groups: [] },
        { id: "b-egg", name: "Egg burguer", price: 18.9, img: "img/burger-egg.webp", desc: "Blend 100g, mussarela, ovo frito, salada e molho especial da casa.", groups: [] },
        { id: "b-bacon", name: "Cheese bacon", price: 19.9, img: "img/burger-cheese.webp", desc: "Blend 100g, mussarela, bacon, salada e molho especial da casa.", groups: [] },
        { id: "b-cbacon", name: "Cheddar bacon", price: 20.9, img: "img/burger-cheddar.webp", desc: "Blend 100g, cheddar cremoso, bacon, cebola caramelizada, salada e molho da casa.", groups: [] },
      ],
    },
    {
      id: "bebidas", name: "Bebidas", note: "",
      items: [
        { id: "agua", name: "Água sem gás 500ml", price: 3, img: "img/agua.webp", desc: "Santa Joana, garrafa 500ml.", groups: [] },
        { id: "agua-gas", name: "Água com gás 500ml", price: 4, img: "img/agua-gas.webp", desc: "Indaiá, garrafa 500ml.", groups: [] },
      ],
    },
  ];

  const REELS = [
    { id: "enjoar", caption: "E tem como enjoar?" },
    { id: "pote2l", caption: "Já conhece o pote de 2 litros?" },
    { id: "morango", caption: "Açaí com morango 🍓" },
    { id: "calorao", caption: "Mesmo no calorão" },
    { id: "calor35", caption: "35 graus? Açaí!" },
    { id: "banana", caption: "Banana fresquinha" },
  ];

  /* ---------- Helpers ---------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const brl = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const byId = Object.fromEntries(MENU.flatMap(c => c.items).map(i => [i.id, i]));
  // A loja quer o site sempre animado; só o parallax respeita "reduzir movimento" do sistema.
  const reduceMotion = false;
  const calmParallax = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const store = {
    get() { try { return JSON.parse(localStorage.getItem("neto-cart")) || []; } catch { return []; } },
    set(v) { try { localStorage.setItem("neto-cart", JSON.stringify(v)); } catch {} },
  };

  /* ---------- Stamp logo ---------- */
  const STAMP = `
  <svg viewBox="0 0 200 200" role="img" aria-label="Neto do Açaí">
    <defs><path id="ringPath" d="M100,100 m-68,0 a68,68 0 1,1 136,0 a68,68 0 1,1 -136,0"/></defs>
    <circle class="s-outer" cx="100" cy="100" r="100"/>
    <g class="stamp__ring">
      <text class="s-ring" font-size="29" font-weight="700"><textPath href="#ringPath" textLength="420" lengthAdjust="spacing">neto do açaí • neto do açaí •</textPath></text>
    </g>
    <circle class="s-inner" cx="100" cy="100" r="55"/>
    <text class="s-word" x="100" y="98" text-anchor="middle" font-size="36" font-weight="700" letter-spacing="-1">neto</text>
    <text class="s-word" x="100" y="128" text-anchor="middle" font-weight="700" letter-spacing="-0.5"><tspan font-size="15" font-weight="600">do </tspan><tspan font-size="30">açaí</tspan></text>
  </svg>`;
  $$("[data-stamp]").forEach((el, i) => {
    el.innerHTML = STAMP.replaceAll("ringPath", "ringPath" + i);
  });

  /* ---------- Título: letras entram uma a uma ---------- */
  let chIndex = 0;
  $$("[data-letters]").forEach(el => {
    el.innerHTML = [...el.textContent].map(c => `<span class="ch" style="--i:${chIndex++}">${c === " " ? " " : esc(c)}</span>`).join("");
  });

  /* ---------- Status aberto/fechado ---------- */
  function updateStatus() {
    const h = new Date().getHours();
    const open = h >= OPEN_HOUR && h < CLOSE_HOUR;
    const el = $("#status");
    el.classList.toggle("is-open", open);
    el.querySelector("span").textContent = open ? "Aberto agora" : `Abre às ${OPEN_HOUR}h`;
  }
  updateStatus();
  setInterval(updateStatus, 60_000);

  /* ---------- Topbar ---------- */
  const topbar = $("#topbar");
  addEventListener("scroll", () => topbar.classList.toggle("is-scrolled", scrollY > 8), { passive: true });

  /* ---------- Render menu ---------- */
  const tabs = $("#tabs");
  const list = $("#menuList");
  tabs.innerHTML = `<span class="tabs__pill" id="pill"></span>` + MENU.map((c, i) =>
    `<button class="tab${i === 0 ? " is-active" : ""}" role="tab" data-target="${c.id}">${c.name}</button>`).join("");

  list.innerHTML = MENU.map(c => `
    <div class="cat" id="cat-${c.id}">
      <div class="cat__head" data-reveal><h3>${c.name}</h3>${c.note ? `<span>${c.note}</span>` : ""}</div>
      <div class="grid">
        ${c.items.map(it => `
          <button class="card${it.out ? " is-out" : ""}" data-item="${it.id}" data-reveal ${it.out ? "disabled" : ""}>
            <div>
              ${it.out ? `<span class="badge badge--out">Esgotado</span>` : it.badge ? `<span class="badge${it.badge === "Novidade" ? " badge--new" : ""}">${it.badge}</span>` : ""}
              <div class="card__title">${it.name}</div>
              <p class="card__desc">${it.desc}</p>
              <div class="card__price">${it.was ? `<s>${brl(it.was)}</s>` : it.groups.some(g => g.options.some(o => o.price)) && !it.groups.every(g => g === AGUA) ? "<small>a partir de</small>" : ""}${brl(it.price)}</div>
            </div>
            <div class="card__img"><img src="${it.img}" alt="${it.name}" loading="lazy" width="112" height="112"></div>
          </button>`).join("")}
      </div>
    </div>`).join("");

  const ICON_MUTED = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="m16 9 5 6m0-6-5 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
  const ICON_SOUND = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
  $("#reels").innerHTML = REELS.map(r => `
    <figure class="reel" data-reveal>
      <video muted loop playsinline preload="none" poster="video/${r.id}.jpg"><source src="video/${r.id}.mp4" type="video/mp4"></video>
      <figcaption>${r.caption}</figcaption>
      <button class="reel__sound" type="button" aria-label="Ligar som">${ICON_MUTED}</button>
      <span class="reel__bar"><i></i></span>
    </figure>`).join("");

  /* tabs: sliding pill + scroll-spy */
  const pill = $("#pill");
  function movePill(tab) {
    pill.style.width = tab.offsetWidth + "px";
    pill.style.transform = `translateX(${tab.offsetLeft}px)`;
  }
  function setActive(id, scrollTab) {
    $$(".tab").forEach(t => {
      const on = t.dataset.target === id;
      t.classList.toggle("is-active", on);
      if (on) {
        movePill(t);
        if (scrollTab) tabs.scrollTo({ left: t.offsetLeft - 24, behavior: reduceMotion ? "auto" : "smooth" });
      }
    });
  }
  let lockSpy = false;
  let spyTimer;
  tabs.addEventListener("click", e => {
    const t = e.target.closest(".tab");
    if (!t) return;
    setActive(t.dataset.target, true);
    lockSpy = true;
    $("#cat-" + t.dataset.target).scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    clearTimeout(spyTimer);
    spyTimer = setTimeout(() => (lockSpy = false), 800);
  });
  const spy = new IntersectionObserver(entries => {
    if (lockSpy) return;
    entries.forEach(en => { if (en.isIntersecting) setActive(en.target.id.replace("cat-", ""), true); });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$(".cat").forEach(c => spy.observe(c));
  addEventListener("resize", () => movePill($(".tab.is-active")));
  document.fonts?.ready.then(() => movePill($(".tab.is-active")));
  movePill($(".tab.is-active"));

  /* split section headings into words for the mask reveal */
  $$("[data-reveal] h2").forEach(h => {
    const text = h.textContent.trim();
    h.setAttribute("aria-label", text);
    h.innerHTML = `<span aria-hidden="true">${text.split(/\s+/).map((w, i) =>
      `<span class="w"><span style="--i:${i}">${esc(w)}</span></span>`).join(" ")}</span>`;
  });

  /* reveal on scroll */
  const rev = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const siblings = [...el.parentElement.children].filter(s => s.hasAttribute("data-reveal"));
      el.style.transitionDelay = Math.min(siblings.indexOf(el), 6) * 50 + "ms";
      el.classList.add("is-in");
      rev.unobserve(el);
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  $$("[data-reveal]").forEach(el => rev.observe(el));

  requestAnimationFrame(() => document.body.classList.add("is-ready"));

  /* ---------- Vídeos: tocam sozinhos quando aparecem; toque liga o som ---------- */
  const reels = $$(".reel");
  function muteAll(except) {
    reels.forEach(fig => {
      if (fig === except) return;
      $("video", fig).muted = true;
      fig.classList.remove("has-sound");
      const b = $(".reel__sound", fig);
      b.innerHTML = ICON_MUTED;
      b.setAttribute("aria-label", "Ligar som");
    });
  }
  reels.forEach(fig => {
    const v = $("video", fig);
    const bar = $(".reel__bar i", fig);
    v.addEventListener("timeupdate", () => { if (v.duration) bar.style.transform = `scaleX(${v.currentTime / v.duration})`; });
    v.addEventListener("playing", () => fig.classList.add("is-playing"));
    fig.addEventListener("click", () => {
      const turnOn = v.muted;
      muteAll(fig);
      v.muted = !turnOn;
      fig.classList.toggle("has-sound", turnOn);
      const b = $(".reel__sound", fig);
      b.innerHTML = turnOn ? ICON_SOUND : ICON_MUTED;
      b.setAttribute("aria-label", turnOn ? "Desligar som" : "Ligar som");
      if (v.paused) v.play().catch(() => {});
    });
  });
  const autoVideos = $$(".reel video, .story__media video");
  const vio = new IntersectionObserver(entries => {
    entries.forEach(({ target: v, isIntersecting }) => {
      if (isIntersecting) { v.preload = "auto"; v.play().catch(() => {}); }
      else v.pause();
    });
  }, { threshold: 0.35 });
  autoVideos.forEach(el => vio.observe(el));

  /* follower counter */
  const counter = $("[data-count]");
  new IntersectionObserver(([en], obs) => {
    if (!en.isIntersecting) return;
    obs.disconnect();
    const end = +counter.dataset.count;
    if (reduceMotion) return;
    const t0 = performance.now(), dur = 1600;
    const tick = now => {
      const p = Math.min(1, (now - t0) / dur);
      counter.textContent = Math.round(end * (1 - Math.pow(1 - p, 4))).toLocaleString("pt-BR");
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, { threshold: 0.6 }).observe(counter);

  /* scroll progress + story parallax */
  const progress = $("#progress");
  const storyImgs = $$(".story__media video");
  let ticking = false;
  function onScroll() {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    if (calmParallax) return;
    storyImgs.forEach((img, i) => {
      const r = img.getBoundingClientRect();
      const center = r.top + r.height / 2 - innerHeight / 2;
      img.style.setProperty("--sy", (center * (i ? -0.08 : 0.06)).toFixed(1));
    });
  }
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* hero parallax following the pointer */
  const orbit = $(".orbit");
  if (!calmParallax && matchMedia("(pointer: fine)").matches) {
    $(".hero").addEventListener("pointermove", e => {
      orbit.style.setProperty("--px", (e.clientX / innerWidth - 0.5).toFixed(3));
      orbit.style.setProperty("--py", (e.clientY / innerHeight - 0.5).toFixed(3));
    });
    $(".hero").addEventListener("pointerleave", () => { orbit.style.setProperty("--px", 0); orbit.style.setProperty("--py", 0); });
  }

  /* spotlight on cards */
  list.addEventListener("pointermove", e => {
    const card = e.target.closest(".card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", e.clientX - r.left + "px");
    card.style.setProperty("--my", e.clientY - r.top + "px");
  });

  /* ---------- Overlay / modal management ---------- */
  const overlay = $("#overlay");
  const sheet = $("#sheet");
  const drawer = $("#drawer");
  let openEl = null;
  let lastFocus = null;

  function open(el) {
    if (openEl) close(true);
    lastFocus = document.activeElement;
    openEl = el;
    overlay.hidden = false;
    el.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => requestAnimationFrame(() => {
      overlay.classList.add("is-open");
      el.classList.add("is-open");
    }));
    setTimeout(() => el.querySelector("[data-close]")?.focus({ preventScroll: true }), 50);
  }
  function close(instant) {
    if (!openEl) return;
    const el = openEl;
    openEl = null;
    el.classList.remove("is-open");
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    const done = () => { if (!el.classList.contains("is-open")) el.hidden = true; if (!openEl) overlay.hidden = true; };
    instant ? done() : setTimeout(done, 420);
    lastFocus?.focus?.({ preventScroll: true });
  }
  overlay.addEventListener("click", () => close());
  $$("[data-close]").forEach(b => b.addEventListener("click", () => close()));
  addEventListener("keydown", e => { if (e.key === "Escape") close(); });

  /* swipe down to dismiss the bottom sheet (mobile) */
  (() => {
    let y0 = null, dy = 0, t0 = 0;
    const scroller = $(".sheet__scroll", sheet);
    sheet.addEventListener("pointerdown", e => {
      if (innerWidth > 640 || e.pointerType === "mouse") return;
      if (scroller.scrollTop > 0 && scroller.contains(e.target)) return;
      if (e.target.closest("button, input, textarea, label")) return;
      y0 = e.clientY; dy = 0; t0 = performance.now();
      sheet.style.transition = "none";
    });
    addEventListener("pointermove", e => {
      if (y0 === null) return;
      dy = Math.max(0, e.clientY - y0);
      sheet.style.transform = `translateY(${dy}px)`;
    }, { passive: true });
    addEventListener("pointerup", () => {
      if (y0 === null) return;
      const v = dy / (performance.now() - t0);
      sheet.style.transition = "";
      sheet.style.transform = "";
      if (dy > 120 || v > 0.11) close();
      y0 = null;
    });
  })();

  /* ---------- Product sheet ---------- */
  let current = null;
  let qty = 1;

  list.addEventListener("click", e => {
    const card = e.target.closest("[data-item]");
    if (card) openProduct(byId[card.dataset.item]);
  });

  function openProduct(item) {
    current = item;
    qty = 1;
    $("#sheetImg").src = item.img;
    $("#sheetImg").alt = item.name;
    $("#sheetTitle").textContent = item.name;
    $("#sheetDesc").textContent = item.desc;
    $("#sheetObs").value = "";
    $("#sheetGroups").innerHTML = item.groups.map(g => `
      <fieldset class="group" data-group="${g.id}" style="border:0;margin-inline:0;padding-inline:0">
        <div class="group__head">
          <div><legend class="group__title">${g.title}</legend>
          <span class="group__rule">${g.min ? "Obrigatório" : "Opcional"}${g.max > 1 ? ` · até ${g.max}` : ""}</span></div>
          <span class="group__count">0/${g.max}</span>
        </div>
        <div class="chips">
          ${g.options.map((o, i) => `
            <label class="chip"><input type="${g.max === 1 ? "radio" : "checkbox"}" name="${g.id}" value="${i}"><span>${o.name}${o.price ? ` <em>+${brl(o.price)}</em>` : ""}</span></label>`).join("")}
        </div>
      </fieldset>`).join("");
    $("#sheet .sheet__scroll").scrollTop = 0;
    syncSheet();
    open(sheet);
  }

  // radio inputs inside optional groups can be un-selected with a second tap
  $("#sheetGroups").addEventListener("pointerdown", e => {
    const input = e.target.closest(".chip")?.querySelector("input[type=radio]");
    if (input) input.dataset.was = input.checked ? "1" : "";
  });
  $("#sheetGroups").addEventListener("click", e => {
    const input = e.target.closest("input[type=radio]");
    if (input && input.dataset.was === "1") { input.checked = false; input.dataset.was = ""; syncSheet(); }
  });
  $("#sheetGroups").addEventListener("change", e => {
    e.target.closest(".group")?.classList.remove("is-error");
    syncSheet();
  });

  function selections() {
    return current.groups.map(g => {
      const picked = $$(`input[name="${g.id}"]:checked`, sheet).map(i => g.options[+i.value]);
      return { g, picked };
    });
  }
  function unitPrice() {
    return current.price + selections().reduce((s, { picked }) => s + picked.reduce((a, o) => a + (o.price || 0), 0), 0);
  }
  function syncSheet() {
    selections().forEach(({ g, picked }) => {
      const box = $(`[data-group="${g.id}"]`, sheet);
      const count = $(".group__count", box);
      count.textContent = `${picked.length}/${g.max}`;
      count.classList.toggle("is-done", picked.length >= Math.max(g.min, 1));
      if (g.max > 1) {
        const full = picked.length >= g.max;
        $$("input", box).forEach(i => (i.disabled = full && !i.checked));
      }
    });
    $("#qtyVal").textContent = qty;
    $("#sheetTotal").textContent = "· " + brl(unitPrice() * qty);
  }
  $("#qtyMinus").addEventListener("click", () => { qty = Math.max(1, qty - 1); syncSheet(); });
  $("#qtyPlus").addEventListener("click", () => { qty = Math.min(20, qty + 1); syncSheet(); });

  $("#sheetAdd").addEventListener("click", () => {
    const sel = selections();
    const missing = sel.filter(({ g, picked }) => picked.length < g.min);
    if (missing.length) {
      missing.forEach(({ g }) => {
        const box = $(`[data-group="${g.id}"]`, sheet);
        box.classList.remove("is-error");
        void box.offsetWidth;
        box.classList.add("is-error");
      });
      $(`[data-group="${missing[0].g.id}"]`, sheet).scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      return;
    }
    cart.push({
      key: Date.now() + Math.random(),
      id: current.id,
      qty,
      unit: unitPrice(),
      opts: sel.filter(s => s.picked.length).map(({ g, picked }) => ({ group: g.label || g.title, names: picked.map(p => p.name) })),
      obs: $("#sheetObs").value.trim(),
    });
    flyToCart($("#sheetImg"));
    store.set(cart);
    renderCart(false);
    setTimeout(() => renderCart(true), reduceMotion ? 0 : 700);
    close();
    toast(`${current.name} na sacola 💜`);
  });

  /* product image flies into the bag */
  function flyToCart(img) {
    if (reduceMotion) return;
    const from = img.getBoundingClientRect();
    const mobile = innerWidth <= 640;
    const target = mobile ? { left: 26, top: innerHeight - 64, width: 38, height: 38 } : $(".cart-btn").getBoundingClientRect();
    const size = Math.min(from.width, from.height);
    const clone = img.cloneNode();
    clone.className = "fly";
    Object.assign(clone.style, { left: from.left + (from.width - size) / 2 + "px", top: from.top + (from.height - size) / 2 + "px", width: size + "px", height: size + "px" });
    document.body.appendChild(clone);
    const dx = target.left + target.width / 2 - (from.left + from.width / 2);
    const dy = target.top + target.height / 2 - (from.top + from.height / 2);
    const s = 28 / size;
    clone.animate([
      { transform: "translate(0,0) scale(1)", opacity: 1 },
      { transform: `translate(${dx * 0.55}px, ${dy * 0.25 - 80}px) scale(${0.5 + s / 2})`, opacity: 1, offset: 0.5 },
      { transform: `translate(${dx}px, ${dy}px) scale(${s})`, opacity: 0.6 },
    ], { duration: 750, easing: "cubic-bezier(0.5, 0, 0.3, 1)" }).finished.then(() => clone.remove());
  }

  /* ---------- Cart ---------- */
  let cart = store.get().filter(l => byId[l.id]);

  function saveCart() { store.set(cart); renderCart(true); }

  function renderCart(bump) {
    const count = cart.reduce((s, l) => s + l.qty, 0);
    const total = cart.reduce((s, l) => s + l.unit * l.qty, 0);

    const c = $("#cartCount");
    c.textContent = count;
    c.classList.toggle("has-items", count > 0);
    $("#cartBarCount").textContent = count;
    $("#cartBarTotal").textContent = brl(total);
    $("#cartBar").classList.toggle("is-visible", count > 0);
    $("#cartTotal").textContent = brl(total);
    if (bump && count) {
      [$(".cart-btn"), $("#cartBarCount")].forEach(el => { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); });
    }

    $("#checkout").classList.toggle("is-hidden", !count);
    $("#sendOrder").disabled = !count;
    $("#feeNote").hidden = !count;

    $("#cartItems").innerHTML = count ? cart.map(l => {
      const it = byId[l.id];
      return `
      <div class="line" data-key="${l.key}" style="--i:${cart.indexOf(l)}">
        <img src="${it.img}" alt="">
        <div>
          <div class="line__title">${it.name}</div>
          <div class="line__opts">${l.opts.map(o => `${esc(o.group)}: ${esc(o.names.join(", "))}`).join("<br>")}${l.obs ? `<br>Obs.: ${esc(l.obs)}` : ""}</div>
        </div>
        <div class="line__right">
          <span class="line__price">${brl(l.unit * l.qty)}</span>
          <div class="qty"><button data-dec aria-label="Diminuir">−</button><span>${l.qty}</span><button data-inc aria-label="Aumentar">+</button></div>
        </div>
      </div>`;
    }).join("") : `
      <div class="empty">
        <span class="stamp" data-stamp>${STAMP.replaceAll("ringPath", "ringPathEmpty")}</span>
        <strong>Sua sacola tá vazia</strong>
        <p>Bora tomar açaí, meu povo?</p>
      </div>`;
  }

  $("#cartItems").addEventListener("click", e => {
    const row = e.target.closest(".line");
    if (!row) return;
    const line = cart.find(l => String(l.key) === row.dataset.key);
    if (e.target.closest("[data-inc]")) { line.qty = Math.min(20, line.qty + 1); saveCart(); }
    if (e.target.closest("[data-dec]")) {
      if (line.qty > 1) { line.qty--; saveCart(); return; }
      row.classList.add("is-leaving");
      setTimeout(() => { cart = cart.filter(l => l !== line); saveCart(); }, reduceMotion ? 0 : 200);
    }
  });

  const openCart = () => {
    renderCart(false);
    drawer.classList.add("is-entering");
    setTimeout(() => drawer.classList.remove("is-entering"), 1200);
    open(drawer);
  };
  $("#cartOpen").addEventListener("click", openCart);
  $("#cartBar").addEventListener("click", openCart);

  /* checkout form behaviour */
  const form = $("#checkout");
  form.addEventListener("change", () => {
    const delivery = form.tipo.value === "Entrega";
    $("#addr").classList.toggle("is-collapsed", !delivery);
    $("#feeNote").textContent = delivery ? "Taxa de entrega confirmada no WhatsApp." : "Retirada no balcão, no Cajá.";
    $("#trocoField").hidden = form.pag.value !== "Dinheiro";
  });
  form.addEventListener("input", e => e.target.closest(".field")?.classList.remove("is-error"));

  $("#sendOrder").addEventListener("click", () => {
    const delivery = form.tipo.value === "Entrega";
    const required = [form.nome, ...(delivery ? [form.rua, form.bairro] : [])];
    const bad = required.filter(i => !i.value.trim());
    bad.forEach(i => i.closest(".field").classList.add("is-error"));
    if (bad.length) { bad[0].focus(); toast("Preenche os campos destacados 😉"); return; }

    const total = cart.reduce((s, l) => s + l.unit * l.qty, 0);
    const lines = cart.map(l => {
      const it = byId[l.id];
      const extra = l.opts.map(o => `   • ${o.group}: ${o.names.join(", ")}`);
      if (l.obs) extra.push(`   • Obs.: ${l.obs}`);
      return [`*${l.qty}x ${it.name}* — ${brl(l.unit * l.qty)}`, ...extra].join("\n");
    });
    const msg = [
      "Olá, Neto! 💜 Quero fazer um pedido pelo site:",
      "",
      ...lines,
      "",
      `*Subtotal:* ${brl(total)}`,
      "",
      `*Nome:* ${form.nome.value.trim()}`,
      delivery
        ? `*Entrega:* ${form.rua.value.trim()}, ${form.bairro.value.trim()}${form.ref.value.trim() ? ` (ref.: ${form.ref.value.trim()})` : ""}`
        : "*Retirada na loja*",
      `*Pagamento:* ${form.pag.value}${form.pag.value === "Dinheiro" && form.troco.value.trim() ? ` (troco para R$ ${form.troco.value.trim()})` : ""}`,
    ].join("\n");

    window.open(`https://wa.me/${WHATS}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  });

  /* ---------- Toast ---------- */
  const toastEl = $("#toast");
  function toast(text) {
    toastEl.textContent = text;
    toastEl.classList.add("is-on");
    clearTimeout(toast.t);
    toast.t = setTimeout(() => toastEl.classList.remove("is-on"), 2200);
  }

  renderCart(false);
})();
