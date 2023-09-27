import { verifyJWT } from '../utils/tokenUtils.js';
import { UnauthenticatedError } from '../errors/custom-errors.js';
  
  export const authenticateUser = (req, res, next) => {
    
    
    const { token } = req.cookies;
    if (!token) throw new UnauthenticatedError('authentication invalid');
  
    try {
      const { userId } = verifyJWT(token);
      console.log(userId);
      req.user = { userId };
      console.log(req.user);
      next();
    } catch (error) {
      throw new UnauthenticatedError('authentication invalid');
    }
  };