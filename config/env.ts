export const projectName = process.env.PROJECT_NAME ?? 'boilerplate';

export const isLocal = process.env.NODE_ENV === 'development';

export const projectTitle = `${projectName?.charAt(0).toUpperCase()}${projectName?.slice(1)}`;

export const projectDescription = process.env.PROJECT_DESCRIPTION ?? 'Next.js Boilerplate';
