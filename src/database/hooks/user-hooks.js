const UserHooks = {
  beforeBulkDestroy: (options) => {
    options.individualHooks = true;
  },
  afterDestroy: (user) => {
    user.setBooks([]);
  },
};

export default UserHooks;
