const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export const pagePathname = () => {
  const pathname = window.location.pathname;
  const normalize = (path: string) => {
    if (path.length > 1 && path.endsWith('/')) {
      return path.slice(0, -1);
    }

    return path;
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

export const publicAsset = (path: string) => {
  const normalized = path.replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${normalized}`;
};

export const navigateTo = (path: string) => {
  window.location.href = withBasePath(path);
};

export const navigateToHash = (id: string) => {
  window.location.href = `${withBasePath('/')}#${id}`;
};
