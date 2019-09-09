export const afterCreate = (instance) => {
  delete instance.dataValues.deletedAt;
};

export default {};
