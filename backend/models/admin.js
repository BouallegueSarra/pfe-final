const mongoose = require('mongoose'); 
const {User}= require('./user');


const Admin= User.discriminator('Admin', {}); 



module.exports={Admin}; 