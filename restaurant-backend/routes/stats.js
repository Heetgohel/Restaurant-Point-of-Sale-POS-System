const express = require("express");
const router = express.Router();
const Order = require("../models/Order");


router.get("/dashboard", async (req, res) => {
  try {
    const allOrders = await Order.find();
    
    let totalRevenue = 0;
    const itemStats = {}; // { itemName: { count: x, revenue: y } }

    allOrders.forEach(order => {
      order.orders.forEach(entry => {
        totalRevenue += entry.price;

        entry.items.forEach(item => {
          if (!itemStats[item.name]) {
            itemStats[item.name] = { count: 0, revenue: 0 };
          }

          itemStats[item.name].count += 1;
          itemStats[item.name].revenue += item.itemPrice;
        });
      });
    });

    // Convert stats to sorted list
    const mostSoldItems = Object.entries(itemStats)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.count - a.count);

    res.json({
      totalRevenue,
      totalOrders: allOrders.length,
      mostSoldItems
    });

  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ message: "Error generating dashboard stats" });
  }
});


module.exports = router;
