import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { Product, Order, User, DashboardStats } from "./src/types";

// Path to our file-based database
const DB_FILE = path.join(process.cwd(), "data.json");

// Initial high-quality seeded products
const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "AeroBuds Pro ANC Earbuds",
    description: "Premium wireless earbuds with Active Noise Cancelling, ultra-clear microphones, smart touch controls, and up to 40 hours of playtime with the sleek wireless charging case.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80",
    category: "Electronics",
    rating: 4.8,
    reviewsCount: 128,
    stock: 45,
    featured: true
  },
  {
    id: "prod-2",
    name: "VividSync 27\" 4K Professional Monitor",
    description: "Stunning 4K Ultra HD IPS display color-calibrated for professionals. Features ultra-thin bezels, USB-C power delivery, and eye-care low blue light technology.",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80",
    category: "Electronics",
    rating: 4.6,
    reviewsCount: 92,
    stock: 15,
    featured: true
  },
  {
    id: "prod-3",
    name: "ApexGlow RGB Mechanical Keyboard",
    description: "Tactile and responsive brown mechanical switches with gorgeous per-key RGB backlighting. Crafted with an aircraft-grade aluminum frame and includes a detachable magnetic wrist rest.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33faf9c1?w=600&auto=format&fit=crop&q=80",
    category: "Electronics",
    rating: 4.7,
    reviewsCount: 214,
    stock: 30
  },
  {
    id: "prod-4",
    name: "Nomad Canvas Adventure Backpack",
    description: "Rugged, weather-resistant canvas backpack designed for daily commutes and weekend escapes. Features a padded 15.6\" laptop compartment, leather accents, and heavy-duty brass hardware.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    category: "Fashion",
    rating: 4.9,
    reviewsCount: 185,
    stock: 60,
    featured: true
  },
  {
    id: "prod-5",
    name: "UrbanGlide Minimalist Leather Sneakers",
    description: "Handcrafted full-grain leather sneakers with a cushioned memory foam footbed and durable rubber cupsole. Perfect blend of athletic comfort and upscale smart-casual style.",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80",
    category: "Fashion",
    rating: 4.5,
    reviewsCount: 74,
    stock: 25
  },
  {
    id: "prod-6",
    name: "Solstice Polarized Classic Sunglasses",
    description: "Timeless frame design made with premium lightweight acetate. Polarized lenses offer 100% UV400 protection and ultimate glare reduction for pristine outdoor clarity.",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80",
    category: "Fashion",
    rating: 4.4,
    reviewsCount: 43,
    stock: 50
  },
  {
    id: "prod-7",
    name: "AuraGlow Smart Ambient Lamp",
    description: "Wi-Fi enabled table lamp capable of producing millions of colors and warm-to-cool whites. Syncs with music, schedule automations, and integrates with voice assistants.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80",
    category: "Home & Living",
    rating: 4.7,
    reviewsCount: 112,
    stock: 40,
    featured: true
  },
  {
    id: "prod-8",
    name: "TerraCotta Matte Dinnerware Set",
    description: "A gorgeous 16-piece ceramic dinnerware set featuring organic rims and a sophisticated matte terracotta finish. Includes dinner plates, salad plates, bowls, and mugs.",
    price: 85.00,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&auto=format&fit=crop&q=80",
    category: "Home & Living",
    rating: 4.8,
    reviewsCount: 67,
    stock: 20
  },
  {
    id: "prod-9",
    name: "BreezeWave Ultrasonic Oil Diffuser",
    description: "Elegant ceramic ultrasonic humidifier and aroma diffuser. Features quiet operation, a warm-white LED ambient glow, and auto-shutoff functionality. Perfect for home relaxation.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop&q=80",
    category: "Home & Living",
    rating: 4.5,
    reviewsCount: 148,
    stock: 85
  },
  {
    id: "prod-10",
    name: "IronFlex Adjustable Dumbbells Pair",
    description: "Heavy-duty adjustable dumbbells replacing 15 pairs of traditional weights. Rotate the selector dial to adjust your weight from 5 lbs up to 52.5 lbs in small increments.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=600&auto=format&fit=crop&q=80",
    category: "Fitness",
    rating: 4.8,
    reviewsCount: 89,
    stock: 12,
    featured: true
  },
  {
    id: "prod-11",
    name: "FlexiCore Non-Slip Eco Yoga Mat",
    description: "Eco-friendly, bio-degradable TPE yoga mat with alignment lines. Dual-sided non-slip texture provides optimal grip, stability, and excellent joint cushioning during intense workouts.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&auto=format&fit=crop&q=80",
    category: "Fitness",
    rating: 4.6,
    reviewsCount: 121,
    stock: 55
  }
];

// Seed initial orders to make the admin panel interesting immediately
const DEFAULT_ORDERS: Order[] = [
  {
    id: "order-101",
    userId: "demo-1",
    userEmail: "demo@shopease.com",
    items: [
      { id: "prod-1", name: "AeroBuds Pro ANC Earbuds", price: 149.99, quantity: 1, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80" },
      { id: "prod-6", name: "Solstice Polarized Classic Sunglasses", price: 45.00, quantity: 2, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80" }
    ],
    shippingAddress: {
      name: "Demo Customer",
      street: "123 Commerce Way",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      country: "USA"
    },
    total: 239.99,
    status: "Delivered",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days ago
  },
  {
    id: "order-102",
    userId: "demo-1",
    userEmail: "demo@shopease.com",
    items: [
      { id: "prod-4", name: "Nomad Canvas Adventure Backpack", price: 79.99, quantity: 1, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80" }
    ],
    shippingAddress: {
      name: "Demo Customer",
      street: "123 Commerce Way",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      country: "USA"
    },
    total: 79.99,
    status: "Shipped",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  },
  {
    id: "order-103",
    userId: "demo-1",
    userEmail: "demo@shopease.com",
    items: [
      { id: "prod-8", name: "TerraCotta Matte Dinnerware Set", price: 85.00, quantity: 1, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&auto=format&fit=crop&q=80" },
      { id: "prod-9", name: "BreezeWave Ultrasonic Oil Diffuser", price: 29.99, quantity: 1, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop&q=80" }
    ],
    shippingAddress: {
      name: "Demo Customer",
      street: "123 Commerce Way",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      country: "USA"
    },
    total: 114.99,
    status: "Processing",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  }
];

// Seed users
const DEFAULT_USERS = [
  { id: "admin-1", name: "Admin Manager", email: "admin@shopease.com", password: "adminpassword", isAdmin: true },
  { id: "demo-1", name: "Demo Customer", email: "demo@shopease.com", password: "demopassword", isAdmin: false }
];

// Initialize database file
function initDB() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      users: DEFAULT_USERS,
      products: DEFAULT_PRODUCTS,
      orders: DEFAULT_ORDERS,
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
    console.log("Database initialized and seeded.");
  }
}

// Load data helper
function readDB() {
  initDB();
  try {
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading database:", error);
    return { users: DEFAULT_USERS, products: DEFAULT_PRODUCTS, orders: DEFAULT_ORDERS };
  }
}

// Save data helper
function writeDB(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing database:", error);
  }
}

async function startServer() {
  initDB();
  const app = express();
  const PORT = 3000;

  // Global middleware
  app.use(express.json());

  // Authenticate user middleware based on x-user-id header
  const getAuthUser = (req: express.Request): User | null => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) return null;
    const db = readDB();
    const user = db.users.find((u: any) => u.id === userId);
    if (!user) return null;
    return { id: user.id, email: user.email, name: user.name, isAdmin: !!user.isAdmin };
  };

  // API - Auth - Register
  app.post("/api/auth/register", (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required" });
    }

    const db = readDB();
    const existingUser = db.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const newUser = {
      id: "user-" + Math.random().toString(36).substr(2, 9),
      name,
      email: email.toLowerCase(),
      password,
      isAdmin: false
    };

    db.users.push(newUser);
    writeDB(db);

    const userResponse: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin
    };

    res.status(201).json(userResponse);
  });

  // API - Auth - Login
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const db = readDB();
    const user = db.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const userResponse: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: !!user.isAdmin
    };

    res.json(userResponse);
  });

  // API - Get Products
  app.get("/api/products", (req, res) => {
    const db = readDB();
    res.json(db.products);
  });

  // API - Add Product (Admin Only)
  app.post("/api/products", (req, res) => {
    const user = getAuthUser(req);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: "Unauthorized. Admin privileges required." });
    }

    const { name, description, price, image, category, stock } = req.body;
    if (!name || !description || price === undefined || !image || !category || stock === undefined) {
      return res.status(400).json({ error: "All product fields are required." });
    }

    const db = readDB();
    const newProduct: Product = {
      id: "prod-" + Math.random().toString(36).substr(2, 9),
      name,
      description,
      price: Number(price),
      image,
      category,
      rating: 5.0, // New products get standard start rating
      reviewsCount: 0,
      stock: Number(stock)
    };

    db.products.unshift(newProduct); // Add to beginning of catalog
    writeDB(db);

    res.status(201).json(newProduct);
  });

  // API - Edit Product (Admin Only)
  app.put("/api/products/:id", (req, res) => {
    const user = getAuthUser(req);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: "Unauthorized. Admin privileges required." });
    }

    const { id } = req.params;
    const { name, description, price, image, category, stock } = req.body;

    const db = readDB();
    const prodIndex = db.products.findIndex((p: Product) => p.id === id);
    if (prodIndex === -1) {
      return res.status(404).json({ error: "Product not found." });
    }

    const updatedProduct = {
      ...db.products[prodIndex],
      name: name ?? db.products[prodIndex].name,
      description: description ?? db.products[prodIndex].description,
      price: price !== undefined ? Number(price) : db.products[prodIndex].price,
      image: image ?? db.products[prodIndex].image,
      category: category ?? db.products[prodIndex].category,
      stock: stock !== undefined ? Number(stock) : db.products[prodIndex].stock,
    };

    db.products[prodIndex] = updatedProduct;
    writeDB(db);

    res.json(updatedProduct);
  });

  // API - Delete Product (Admin Only)
  app.delete("/api/products/:id", (req, res) => {
    const user = getAuthUser(req);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: "Unauthorized. Admin privileges required." });
    }

    const { id } = req.params;
    const db = readDB();
    const initialLength = db.products.length;
    db.products = db.products.filter((p: Product) => p.id !== id);

    if (db.products.length === initialLength) {
      return res.status(404).json({ error: "Product not found." });
    }

    writeDB(db);
    res.json({ message: "Product deleted successfully." });
  });

  // API - Get Orders
  app.get("/api/orders", (req, res) => {
    const user = getAuthUser(req);
    if (!user) {
      return res.status(401).json({ error: "Authentication required." });
    }

    const db = readDB();
    if (user.isAdmin) {
      // Admins get to see all orders
      res.json(db.orders);
    } else {
      // Standard customers only see their own orders
      const userOrders = db.orders.filter((o: Order) => o.userId === user.id);
      res.json(userOrders);
    }
  });

  // API - Place Order
  app.post("/api/orders", (req, res) => {
    const user = getAuthUser(req);
    if (!user) {
      return res.status(401).json({ error: "Authentication required." });
    }

    const { items, shippingAddress, total } = req.body;
    if (!items || !items.length || !shippingAddress || !total) {
      return res.status(400).json({ error: "Invalid order payload." });
    }

    const db = readDB();

    // Check stock first and decrement stock
    for (const item of items) {
      const prod = db.products.find((p: Product) => p.id === item.id);
      if (!prod) {
        return res.status(400).json({ error: `Product ${item.name} not found in catalog.` });
      }
      if (prod.stock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for product ${item.name}. Available: ${prod.stock}` });
      }
    }

    // Deduct stock
    for (const item of items) {
      const prod = db.products.find((p: Product) => p.id === item.id);
      if (prod) {
        prod.stock -= item.quantity;
      }
    }

    const newOrder: Order = {
      id: "order-" + Math.floor(100000 + Math.random() * 900000), // Nice 6 digit order number
      userId: user.id,
      userEmail: user.email,
      items,
      shippingAddress,
      total: Number(total),
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    db.orders.unshift(newOrder); // Newest orders first
    writeDB(db);

    res.status(201).json(newOrder);
  });

  // API - Update Order Status (Admin Only)
  app.put("/api/orders/:id/status", (req, res) => {
    const user = getAuthUser(req);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: "Unauthorized. Admin privileges required." });
    }

    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${allowedStatuses.join(", ")}` });
    }

    const db = readDB();
    const orderIndex = db.orders.findIndex((o: Order) => o.id === id);
    if (orderIndex === -1) {
      return res.status(404).json({ error: "Order not found." });
    }

    db.orders[orderIndex].status = status;
    writeDB(db);

    res.json(db.orders[orderIndex]);
  });

  // API - Get Dashboard Stats (Admin Only)
  app.get("/api/dashboard/stats", (req, res) => {
    const user = getAuthUser(req);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: "Unauthorized. Admin privileges required." });
    }

    const db = readDB();
    const orders: Order[] = db.orders;
    const products: Product[] = db.products;
    const usersList: any[] = db.users;

    // Filter out cancelled orders for sales calculation
    const activeOrders = orders.filter(o => o.status !== "Cancelled");
    const totalSales = activeOrders.reduce((sum, o) => sum + o.total, 0);

    // Calculate sales by category
    const salesByCategoryMap = new Map<string, number>();
    for (const order of activeOrders) {
      for (const item of order.items) {
        // Find product to get its category
        const prod = products.find(p => p.id === item.id);
        const category = prod ? prod.category : "Uncategorized";
        const revenue = item.price * item.quantity;
        salesByCategoryMap.set(category, (salesByCategoryMap.get(category) || 0) + revenue);
      }
    }

    const salesByCategory = Array.from(salesByCategoryMap.entries()).map(([category, value]) => ({
      category,
      value: Math.round(value * 100) / 100
    }));

    // Calculate revenue by date (last 7 days)
    const revenueByDateMap = new Map<string, number>();
    // Pre-populate last 7 days with 0s
    for (let i = 6; i >= 0; i--) {
      const dateStr = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, { month: "short", day: "numeric" });
      revenueByDateMap.set(dateStr, 0);
    }

    for (const order of activeOrders) {
      const dateStr = new Date(order.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" });
      if (revenueByDateMap.has(dateStr)) {
        revenueByDateMap.set(dateStr, (revenueByDateMap.get(dateStr) || 0) + order.total);
      }
    }

    const revenueByDate = Array.from(revenueByDateMap.entries()).map(([date, amount]) => ({
      date,
      amount: Math.round(amount * 100) / 100
    }));

    const stats: DashboardStats = {
      totalSales: Math.round(totalSales * 100) / 100,
      totalOrders: orders.length,
      totalProducts: products.length,
      totalUsers: usersList.filter(u => !u.isAdmin).length,
      revenueByDate,
      salesByCategory,
      recentOrders: orders.slice(0, 5) // Last 5 orders
    };

    res.json(stats);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
