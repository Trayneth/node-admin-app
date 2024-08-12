export default (context) => {
  return {
    '/api': { target: context.API_SECRET },
    '/uploads/images': { target: context.API_SECRET },
    '/uploads/document-file': { target: context.API_SECRET },
  };
};
