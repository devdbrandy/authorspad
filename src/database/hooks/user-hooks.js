const UserHooks = {
  beforeBulkDestroy: (options) => {
    options.individualHooks = true;
  },
  afterDestroy: (user) => {
    user.setArticles([]);
  },
};

export default UserHooks;
