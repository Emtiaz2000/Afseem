import jwt from "jsonwebtoken";

export const attachUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.locals.user = null; // make it available to all EJS templates
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = decoded; // { id, email, role }
    next();
  } catch (err) {
    res.locals.user = null;
    next();
  }
};
