(() => {
  const canonicalBase = 'https://soheil-aghayani.github.io/Solid-Waste-Laboratory/';
  const alternateHosts = new Set(['agseyil.ir', 'www.agseyil.ir']);

  const rewritePortalLinks = () => {
    if (!alternateHosts.has(window.location.hostname.toLowerCase())) return;

    const pathname = window.location.pathname.replace(/^\/+/, '');
    const projectName = 'Solid-Waste-Laboratory';
    const projectIndex = pathname.toLowerCase().indexOf(projectName.toLowerCase());
    const route = projectIndex >= 0
      ? pathname.slice(projectIndex + projectName.length).replace(/^\/+/, '') || 'index.html'
      : 'index.html';
    const canonicalPage = new URL(route, canonicalBase);

    document.querySelectorAll('a[href]').forEach(anchor => {
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) return;
      anchor.href = new URL(href, canonicalPage).href;
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rewritePortalLinks, { once: true });
  } else {
    rewritePortalLinks();
  }
})();
