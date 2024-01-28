import { getUser } from "../service/auth";

export const checkAuth = async function (req, res, next) {
  const userUid = req.cookies?.uid;
  if (userUid) {
    const user = getUser(userUid);

    req.user = user;
    req.token = userUid;
    next();
  } else {
    return res.redirect("login");
  }
};
