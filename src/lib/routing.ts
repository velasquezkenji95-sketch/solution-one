const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export const pagePathname = () => {
  const pathname = window.location.pathname;
  const normalize = (path: string) => {
    let normalized = path;

    if (normalized.endsWith('/index.html')) {
      normalized = normalized.slice(0, -'/index.html'.length) || '/';
    }

    if (normalized.length > 1 && normalized.endsWith('/')) {
      normalized = normalized.slice(0, -1);
    }

    return normalized.toLowerCase();
  };

  if (basePath && basePath !== '/' && pathname.toLowerCase().startsWith(basePath.toLowerCase())) {
    const stripped = pathname.slice(basePath.length) || '/';
    const normalized = stripped.startsWith('/') ? stripped : `/${stripped}`;
    return normalize(normalized);
  }

  return normalize(pathname);
};

export const withBasePath = (path: string) => {
  const normalized = path.startsWith('/') ? path : `/${path}`;

  if (!basePath || basePath === '/') {
    return normalized;
  }

  return normalized === '/' ? `${basePath}/` : `${basePath}${normalized}`;
};

export const withBasePagePath = (path: string) => {
  const href = withBasePath(path);

  if (href.endsWith('/')) {
    return href;
  }

  return `${href}/`;
};

export const publicAsset = (path: string) => {
  const normalized = path.replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${normalized}`;
};

export const navigateTo = (path: string) => {
  window.location.href = path === '/' ? withBasePath('/') : withBasePagePath(path);
};

export const navigateToHash = (id: string) => {
  window.location.href = `${withBasePath('/')}#${id}`;
};
