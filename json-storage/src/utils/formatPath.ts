export const formatPath = (path: string) => {
    if (path === '/') return path;

    const trimLastSlash = path[path.length - 1] === '/' ? path.slice(0, -1) : path;

    return trimLastSlash;
}