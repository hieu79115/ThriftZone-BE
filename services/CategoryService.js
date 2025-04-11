import Category from "../models/Category.js";
import Item from "../models/Item.js";
class CategoryService {
    async createCategory(name, description, parentCategory) {
        if(parentCategory && !(await Category.findById(parentCategory))) {
            throw new Error("Parent category not found");
        }
        const category = new Category({name, description, parentCategory});
        await category.save();
        return category;
    }
    async updateCategory(categoryId,categoryData)
    {
        const category = await Category.findById(categoryId);
        if(!category) throw new Error("Category not found");
        Object.assign(category, categoryData);
        await category.save();
        return category;
    }
    async getSubCategory(categoryId)
    {
        return await Category.find({parentCategoryId:categoryId});
    }
    async getItems(categoryId){
        return await Item.find({categoryId: categoryId}).populate('sellterId');
    }
}
export default CategoryService;