module.exports = (req, res, next) => {
  const sales = req.body;
  const error = sales.filter((sale) => !sale.productId);
  if (error.length) {
      return res.status(400).json(
        { message: '"productId" is required' },
      );
    }
  next();
};
