import {StatusCodes} from 'http-status-codes';
import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';
import cloudinary from 'cloudinary';
import {promises as fs} from 'fs'; // file system module

export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({_id: req.user.userId});
    const userWithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json(userWithoutPassword);
}
export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();
    res.status(StatusCodes.OK).json({users, jobs});
}
export const updateUser = async (req, res) => {
    const newUser = {...req.body};
    delete newUser.password;

    if(req.file){
        const response = await cloudinary.v2.uploader.upload(req.file.path);
        await fs.unlink(req.file.path); // if image is uploaded to cloudinary then delete it from the local system
        newUser.avatar = response.secure_url;
        newUser.avatarPublicId = response.public_id;
    }
    //console.log('i reached  here')
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);
    if(req.file && updatedUser.avatarPublicId ){
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId); // delete old image from cloudinary if user updates image
    }
    res.status(StatusCodes.OK).json({msg: 'update user'});
}
