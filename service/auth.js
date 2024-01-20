// const sessionIdToUserMap = new Map();
import jwt from "jsonwebtoken";
const security = "sourabh@1234";

export const setUser = function (user) {
  return jwt.sign({ _id: user._id, email: user.email }, security);
}

export const getUser = function (token) {
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, security);
  } catch (error) {
    return null;
  }
}


