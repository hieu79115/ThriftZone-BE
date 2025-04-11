import bcrypt from "bcryptjs";

async function passwordHash(password){
    return await bcrypt.hash(password, 10);
}
async function validatePassword(plain,hashed){
    return await bcrypt.hash(plain, 10)===hashed||false;
}
export {
    passwordHash,
    validatePassword,
}