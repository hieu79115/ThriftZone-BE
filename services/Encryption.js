import bcrypt from "bcryptjs";

async function passwordHash(password){
    return await bcrypt.hash(password, 10);
}
async function validatePassword(plain,hashed){
    return await bcrypt.compare(plain,hashed);
}
export {
    passwordHash,
    validatePassword,
}