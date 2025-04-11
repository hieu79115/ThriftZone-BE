import Address from "../models/Address.js";

class AddressService {
    async addAddress(userId, addressData)
    {
        const user= await User.findById(userId);
        if(!user) throw new Error("User does not exist");
        const newAddress = new Address({userId,...addressData});
        await newAddress.save();
        return newAddress;
    }
    async updateAddress(userId,addressId, addressData){
        const user= await User.findById(userId);
        if(!user) throw new Error("User does not exist");
        const address= await Address.findById(addressId);
        if(!address) throw new Error("Address does not exist");
        Object.assign(address,addressData);
        await address.save();
        return address;
    }
    async deleteAddress(userId, addressId){
        const address= await Address.findById(addressId);
        if(!address) throw new Error("Address does not exist");
        if(address.userId!==userId) throw new Error("Unauthorized");
     await address.remove();
        return {message:"Address deleted"};
    }
    async setDefaultAddress(addressId,userId,addressType){
        const address= Address.findById(addressId);
        if(!address) throw new Error("Address does not exist");
        await Address.updateMany({userId: userId,addressType: addressType}, { $set: { isDefault: false }});
        address.isDefault = true;
        await address.save();
        return address;
    }
}