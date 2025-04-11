import Privilege from "../models/Privilege";
import Administrator from "../models/Administrator";
async function isAuthorized(userId,toRead,toWrite,object)
{
    const role = await Administrator.findOne({userId: userId});
    if(!role)
    {
        throw new Error(`role not found`);
    }
    const privilege= await Privilege.findOne({object: object,allowRead: toRead,allowWrite: toWrite});
    if(!privilege)
    {
        throw new Error(`privilege not found`);
    }
    return role.privileges?.some(privilegeId=>privilegeId.equals(privilege._id))||false;//I hope it should pass the id
}
export default {
    isAuthorized,
}
