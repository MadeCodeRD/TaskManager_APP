const asyncWrapper = (taskControllerFuction) => {
  return async (req, res, next) => {
    try {
      await taskControllerFuction(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default asyncWrapper;
