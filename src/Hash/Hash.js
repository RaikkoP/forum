const bcrypt = require('bcryptjs');

export const hashPassword = async(password) => await bcrypt.hash(password, bcrypt.genSaltSync(13));