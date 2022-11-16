module.exports = (req, res, next) => {
  const sales = req.body;
  const errorRequired = sales.filter((sale) => !sale.quantity && sale.quantity !== 0);
  const errorNumber = sales.filter((sale) => sale.quantity <= 0);
  if (errorRequired.length) {
    return res.status(400).json(
      { message: '"quantity" is required' },
    );
  } 
  if (errorNumber.length) {
    return res.status(422).json(
      { message: '"quantity" must be greater than or equal to 1' },
    );
  }

  next();
};
