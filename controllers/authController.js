import 'express-async-errors';
import User from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';
import { ROLE_TYPE } from '../utils/constants.js';
import bcrypt from 'bcryptjs';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { createJWT } from '../utils/tokenUtils.js';

export const register = async (req, res) => {
    //make the first user as admin
    const countUsers = await User.countDocuments();
    req.body.role = countUsers === 0 ? ROLE_TYPE.ADMIN: ROLE_TYPE.USER;

    // hash password
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    const newUser = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({msg: 'user created'});
   
};

export const login = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(!user) throw new UnauthenticatedError('invalid credentials');

    const isCorrect = await comparePassword(req.body.password, user.password);

    if(!isCorrect) throw new UnauthenticatedError('invalid credentials');

    const token = createJWT({
        userId: user._id,
        userRole: user.role
    }); 
    const oneDay = 1000*60*60*24;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now()+oneDay),
        secure: process.env.NODE_ENV === 'production'
    });
    res.status(StatusCodes.OK).json({msg: 'user logged in'});
};

export const logout = (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.status(StatusCodes.OK).json({msg: 'user logged out!'});
}
