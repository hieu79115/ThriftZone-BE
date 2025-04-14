import { connectDB } from "../config/mongoose.js"
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Administrator from "../models/Administrator.js";
import Category from "../models/Category.js";
import Item from "../models/Item.js";
import Address from "../models/Address.js";
import Review from "../models/Review.js";
import Order from "../models/Order.js";
import Privilege from "../models/Privilege.js";
let db;
connectDB();
const clearDB = async () => {
    await User.deleteMany({});
    await Administrator.deleteMany({});
    await Category.deleteMany({});
    await Item.deleteMany({});
    await Address.deleteMany({});
    await Review.deleteMany({});
    await Order.deleteMany({});
    await Privilege.deleteMany({});
    console.log('Database cleared');
};
const seedUsers = async () => {
  const users = await User.create([
    {
      email: 'admin@thriftzone.com',
      passwordHash: await bcrypt.hash('admin123', 10), // Changed from password to passwordHash
      username: 'admin123', // Lengthened to meet 6 character minimum
      firstName: 'Admin',
      lastName: 'User',
      isVerified: true,
      isVerifiedSeller: true // Added required field
    },
    {
      email: 'john@example.com',
      passwordHash: await bcrypt.hash('password123', 10), // Changed from password to passwordHash
      username: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      isVerified: true,
      isVerifiedSeller: false // Added required field
    },
    {
      email: 'jane@example.com',
      passwordHash: await bcrypt.hash('password123', 10), // Changed from password to passwordHash
      username: 'janedoe',
      firstName: 'Jane',
      lastName: 'Doe',
      isVerified: true,
      isVerifiedSeller: true // Added required field
    }
  ]);
  
  console.log(`${users.length} users created`);
  return users;
};

const seedAdministrators = async (users) => {
  // Find admin user
  const adminUser = users.find(user => user.email === 'admin@thriftzone.com');
  
  // Check the valid enum values for object in your Privilege schema
  // This should be adjusted based on your actual schema
  const privileges = await Privilege.create([
    { 
      name: "Item Management", // Add required name field
      object: 'ITEM', // Use lowercase or whatever is in your enum
      allowRead: true, 
      allowWrite: true 
    },
    { 
      name: "Order Management",
      object: 'ORDER', // Use proper enum values
      allowRead: true, 
      allowWrite: true 
    },
    { 
      name: "User Management",
      object: 'USER', // Use proper enum values
      allowRead: true, 
      allowWrite: true 
    },
    { 
      name: "Category Management",
      object: 'CATEGORY', // Use proper enum values
      allowRead: true, 
      allowWrite: true 
    }
  ]);

  const admin = await Administrator.create({
    userId: adminUser._id,
    privileges: privileges.map(p => p._id)
  });
  console.log('Administrator created');
  return admin;
};

const seedCategories = async () => {
  const categories = await Category.create([
    {
      name: 'Electronics',
      description: 'Electronic devices and gadgets',
      icon: 'laptop'
    },
    {
      name: 'Clothing',
      description: 'All types of apparel and fashion',
      icon: 'tshirt'
    },
    {
      name: 'Books',
      description: 'Books, magazines, and publications',
      icon: 'book'
    },
    {
      name: 'Home & Garden',
      description: 'Items for home and outdoor spaces',
      icon: 'home'
    },
    {
      name: 'Sports',
      description: 'Sporting equipment and gear',
      icon: 'basketball-ball'
    }
  ]);
  
  console.log(`${categories.length} categories created`);
  return categories;
};

const seedItems = async (users, categories) => {
  // Get two regular users
  const sellers = users.filter(user => user.email !== 'admin@thriftzone.com');
  
  const items = await Item.create([
    {
      title: 'iPhone 13', // Changed from 'name' to 'title'
      description: 'Excellent condition iPhone 13, 128GB storage',
      price: 699.99,
      sellerId: sellers[0]._id,
      condition: 'USED',
      categoryId: categories.find(c => c.name === 'Electronics')._id,
      images: ['iphone13_1.jpg', 'iphone13_2.jpg'],
      isAvailable: true,
      locationCity: 'San Francisco', // Added required field
      locationCountry: 'USA' // Added required field
    },
    {
      title: 'Vintage Leather Jacket', // Changed from 'name' to 'title'
      description: 'Genuine leather jacket from the 90s',
      price: 120.00,
      sellerId: sellers[1]._id,
      condition: 'USED',
      categoryId: categories.find(c => c.name === 'Clothing')._id,
      images: ['jacket_1.jpg', 'jacket_2.jpg'],
      isAvailable: true,
      locationCity: 'New York', // Added required field
      locationCountry: 'USA' // Added required field
    },
    {
      title: 'Harry Potter Complete Collection', // Changed from 'name' to 'title'
      description: 'All 7 books in excellent condition',
      price: 65.50,
      sellerId: sellers[0]._id,
      condition: 'USED',
      categoryId: categories.find(c => c.name === 'Books')._id,
      images: ['hp_books.jpg'],
      isAvailable: true,
      locationCity: 'Chicago', // Added required field
      locationCountry: 'USA' // Added required field
    },
    {
      title: 'Garden Tool Set', // Changed from 'name' to 'title'
      description: 'Brand new 10-piece garden tool set',
      price: 45.99,
      sellerId: sellers[1]._id,
      condition: 'MINT',
      categoryId: categories.find(c => c.name === 'Home & Garden')._id,
      images: ['garden_tools.jpg'],
      isAvailable: true,
      locationCity: 'Seattle', // Added required field
      locationCountry: 'USA' // Added required field
    },
    {
      title: 'Yoga Mat', // Changed from 'name' to 'title'
      description: 'Premium yoga mat, barely used',
      price: 25.00,
      sellerId: sellers[0]._id,
      condition: 'USED',
      categoryId: categories.find(c => c.name === 'Sports')._id,
      images: ['yoga_mat.jpg'],
      isAvailable: true,
      locationCity: 'Los Angeles', // Added required field
      locationCountry: 'USA' // Added required field
    }
  ]);
  
  console.log(`${items.length} items created`);
  return items;
};

const seedAddresses = async (users) => {
  const addresses = [];
  
  for (const user of users) {
    addresses.push(
      await Address.create({
        userId: user._id,
        streetAddress: `${Math.floor(1000 + Math.random() * 9000)} Main St`,
        city: 'Anytown',
        stateProvince: 'CA', // Changed from 'state' to 'stateProvince'
        postalCode: `9${Math.floor(1000 + Math.random() * 9000)}`, // Changed from 'zipCode' to 'postalCode'
        country: 'USA',
        addressType: 'Shipping',
        isDefault: true
      }),
      await Address.create({
        userId: user._id,
        streetAddress: `${Math.floor(1000 + Math.random() * 9000)} Market St`,
        city: 'Anytown',
        stateProvince: 'CA', // Changed from 'state' to 'stateProvince'
        postalCode: `9${Math.floor(1000 + Math.random() * 9000)}`, // Changed from 'zipCode' to 'postalCode'
        country: 'USA',
        addressType: 'Billing',
        isDefault: true
      })
    );
  }
  
  console.log(`${addresses.length} addresses created`);
  return addresses;
};
 const seedOrders = async (users, items, addresses) => {
  const buyers = users.filter(user => user.email !== 'admin@thriftzone.com');
  
  const orders = [];
  
  for (let i = 0; i < 2; i++) {
    const buyer = buyers[i];
    const item = items[i];
    
    const shippingAddress = addresses.find(addr => 
      addr.userId.toString() === buyer._id.toString() && 
      addr.addressType === 'Shipping'
    );
    
    const billingAddress = addresses.find(addr => 
      addr.userId.toString() === buyer._id.toString() && 
      addr.addressType === 'Billing'
    );
    
    orders.push(
      await Order.create({
        item: item._id,                 
        buyerId: buyer._id,
        shippingAddress: shippingAddress._id, 
        billingAddress: billingAddress._id,   
        totalAmount: item.price,
        status: 'DELIVERED',
        paymentId: `pmt_${Math.random().toString(36).substring(2, 15)}`,
        trackingNumber: `TRK${Math.floor(100000 + Math.random() * 900000)}`,
        orderDate: new Date(),
        shippingStatus: 'DELIVERED',
      })
    );
  }
  
  console.log(`${orders.length} orders created`);
  return orders;
};
const seedReviews = async (users, items, orders) => {
  const reviews = [];
  
  // Create reviews for completed orders
  for (const order of orders) {
    const item = items.find(item => item._id.toString() === order.item.toString());
    const buyer = users.find(user => user._id.toString() === order.buyerId.toString());
    
    reviews.push(
      await Review.create({
        reviewerId: buyer._id,
        rating: Math.floor(3 + Math.random() * 3), // Rating between 3-5
        comment: `Great item and fast shipping! Very satisfied with my purchase.`,
        orderId: order._id // Add if required
      })
    );
  }
  
  console.log(`${reviews.length} reviews created`);
  return reviews;
};

const seedDatabase = async () => {
  try {
    await clearDB();
    const users = await seedUsers();
    await seedAdministrators(users);
    const categories = await seedCategories();
    const items = await seedItems(users, categories);
    const addresses = await seedAddresses(users);
    const orders = await seedOrders(users, items, addresses);
    await seedReviews(users, items, orders);
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};
seedDatabase();