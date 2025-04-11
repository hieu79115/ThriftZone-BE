import User from "../models/User.js";
import Item from "../models/Item.js";
import Order from "../models/Order.js";
import Address from "../models/Address.js";
import Payment from "../models/Payment.js";
import isAuthorized from "./AuthorizationService.js";
class ItemService {
    async createItem(sellerId,itemData){
        const seller= await User.findById(sellerId);
        if(!seller){
            throw new Error("No seller found with this id");
        }
        if(seller.isVerifiedSeller ===false)
        {e
            throw new Error("unauthorized as seller");
        }
        const item= new Item({
            sellerId:sellerId,
            categoryId: itemData.categoryId,
            title: itemData.title,
            description: itemData.description,
            price: itemData.price,
            condition: itemData.condition,
            status: "UNAVAILABLE",
            locationCity: itemData.locationCity,
            locationCountry: itemData.locationCountry,
        });
        await item.save();
        return item;
    }
    async updateItem(sellerId,itemId,itemData) {
        const item = await Item.findById(itemId);
        if (!item) {
            throw new Error("No item found with this id");
        }
        if (item.sellerId !== sellerId && !(await isAuthorized(sellerId, true, true, 'ITEM' === true))) {
            throw new Error("unauthorized as seller");
        }
        if (itemData.status && !this.isValidItemStatusTransition(item.status, itemData.status)) {
            throw new Error('Invalid status transition');
        }
        Object.assign(item, itemData);
        await item.save();
        return item;
    }
    async deleteItem(sellerId,itemId) {
        const item = await Item.findById(itemId);
        if(!item) {
            throw new Error("No item found with this id");
        }
        if(item.sellerId!==sellerId &&!(await isAuthorized(sellerId, true, true, 'ITEM' === true))) {
            throw new Error("unauthorized as seller");
        }
        await item.remove();
        return {message: 'Item deleted'};
    }
    async searchItem(criteria)
    {
        const query= {};
        if(criteria.categoryId) query.categoryId = criteria.categoryId;
        if(criteria.condition) query.condition = criteria.condition;
        if(criteria.status) query.status = criteria.status;
        if(criteria.locationCity) query.locationCity = criteria.locationCity;
        return await Item.find(query).populate("sellerId categoryId");
    }

    async getItemDetail(itemId)
    {
        const item= await Item.findById(itemId);
        if(!item){
            throw new Error("No item found with this id");
        }
        return item;
    }

    isValidItemStatusTransition(oldStatus, newStatus){
        const validTransition={
            ['UNAVAILABLE']:['UNAVAILABLE', 'READY','UNAVAILABLE'],
            ['READY']:['UNAVAILABLE','READY','SOLD'],
            ['SOLD']:['UNAVAILABLE','SOLD'],
        }
        return validTransition[oldStatus].includes(newStatus)|| false;
    }
}