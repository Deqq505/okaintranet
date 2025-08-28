// Fix: The triple-slash directive for Vite client types was removed to resolve a "Cannot find type definition" error.
// This is safe because the application now uses `process.env.API_KEY` instead of `import.meta.env`,
// which was the only feature requiring these types.
