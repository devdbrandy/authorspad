export const beforeBulkDestroy = (options) => {
  options.individualHooks = true;
};

export const afterDestroy = (user) => {
  user.setArticles([]);
};
