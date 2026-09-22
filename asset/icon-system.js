(() => {
  const materialToSolar = Object.freeze({
    add_circle: 'add-circle',
    'add-circle': 'add-circle',
    'arrow-left': 'arrow-left',
    air: 'wind',
    'book-bookmark': 'book-bookmark',
    auto_awesome: 'magic-wand',
    block: 'forbidden-circle',
    calculate: 'calculator',
    call: 'phone',
    cancel: 'close-circle',
    check: 'check-circle',
    check_circle: 'check-circle',
    clean_hands: 'hand-stars',
    close: 'close',
    'clipboard-check': 'clipboard-check',
    cloud_off: 'cloud-cross',
    component_exchange: 'round-transfer-horizontal',
    construction: 'settings',
    content_copy: 'copy',
    dark_mode: 'moon',
    delete: 'trash-bin-trash',
    delete_forever: 'trash-bin-trash',
    delete_sweep: 'trash-bin-minimalistic',
    eco: 'leaf',
    emoji_objects: 'lightbulb',
    emergency: 'danger-circle',
    explosion: 'danger-triangle',
    exposure: 'eye',
    flame: 'flame',
    gallery: 'gallery',
    gpp_maybe: 'shield-warning',
    health_and_safety: 'shield-check',
    info: 'info-circle',
    light_mode: 'sun',
    local_fire_department: 'flame',
    local_hospital: 'hospital',
    medical_services: 'medical-kit',
    mic: 'microphone',
    mop: 'broom',
    personal_injury: 'shield-warning',
    play_circle: 'play-circle',
    print: 'printer',
    propane_tank: 'test-tube',
    priority_high: 'danger-triangle',
    radio_button_unchecked: 'record-circle',
    'round-transfer-horizontal': 'round-transfer-horizontal',
    restart_alt: 'restart',
    refresh: 'refresh',
    schedule: 'clock-circle',
    science: 'atom',
    search: 'magnifier',
    search_off: 'magnifier-bug',
    send: 'send-square',
    skull: 'danger-circle',
    smart_toy: 'bot',
    swap_horizontal_circle: 'round-transfer-horizontal',
    scale: 'scale',
    settings: 'settings',
    troubleshoot: 'magnifier-bug',
    'test-tube': 'test-tube',
    verified_user: 'verified-check',
    warning: 'danger-triangle',
    waterdrop: 'waterdrop',
    wind: 'wind'
  });

  const svgNamespace = 'http://www.w3.org/2000/svg';
  const xlinkNamespace = 'http://www.w3.org/1999/xlink';
  const scriptSource = document.currentScript?.src;
  const spriteUrl = scriptSource
    ? new URL('./icons.svg', scriptSource).href
    : new URL('./asset/icons.svg', document.baseURI).href;

  function createIcon(symbolId) {
    const icon = document.createElementNS(svgNamespace, 'svg');
    icon.classList.add('icon');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('aria-hidden', 'true');
    icon.setAttribute('focusable', 'false');

    const use = document.createElementNS(svgNamespace, 'use');
    const href = `${spriteUrl}#${symbolId}`;
    use.setAttribute('href', href);
    use.setAttributeNS(xlinkNamespace, 'xlink:href', href);
    icon.appendChild(use);
    return icon;
  }

  function hydrateIcon(element) {
    if (!element || !element.classList?.contains('material-symbols-outlined')) return;

    const explicitName = element.dataset.iconName || '';
    const textName = element.textContent.trim();
    const iconName = textName || explicitName;
    if (!iconName) return;

    if (element.dataset.iconResolved === iconName && element.firstElementChild?.classList.contains('icon')) return;

    const symbolId = materialToSolar[iconName] || 'info-circle';
    element.dataset.iconName = iconName;
    element.dataset.iconResolved = iconName;
    element.replaceChildren(createIcon(symbolId));
  }

  function scanIcons(root) {
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return;
    if (root.classList.contains('material-symbols-outlined')) hydrateIcon(root);
    root.querySelectorAll('.material-symbols-outlined').forEach(hydrateIcon);
  }

  function start() {
    scanIcons(document.documentElement);

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'characterData') {
          hydrateIcon(mutation.target.parentElement);
          return;
        }

        scanIcons(mutation.target);
        mutation.addedNodes.forEach(scanIcons);
      });
    });

    observer.observe(document.documentElement, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
