import { UnauthenticatedError, UnauthorizedError, BadRequestError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
    
    const {token} = req.cookies;
    
    if(!token) throw new UnauthenticatedError('authentication invalid');
    
    try {
        const {userId, userRole} = verifyJWT(token);
        const testUser = userId === '652934d02cc680e01f20000e';
        
        req.user = {userId, userRole, testUser};
        
        next();
    } catch(error){
        throw new UnauthenticatedError('authentication invalid');
    }
    
}
export const authorizedPermissions = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.userRole)){
            throw new UnauthorizedError('Unauthorized to access this route')
        }
        next();
    }
}

export const checkForTestUser = (req, res, next) => {
    
    if(req.user.testUser) throw  new BadRequestError('Test user has only read access');

    next();
}