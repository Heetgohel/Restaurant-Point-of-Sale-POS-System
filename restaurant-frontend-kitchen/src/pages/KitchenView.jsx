import React, { useEffect, useState } from "react";
import API from "../api";
import "../styles/kitchen.css";

function Kitchen() {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([{ _id: "all", name: "All" }]);
    const [loading, setLoading] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [categoryMap, setCategoryMap] = useState({});

    const fetchCategories = async () => {
        try {
            const response = await API.get("/categories");
            setCategories([{ _id: "all", name: "All" }, ...response.data]);
            const map = {};
            response.data.forEach((cat) => {
                map[cat._id] = cat.name;
            });
            setCategoryMap(map);
            console.log(map);
        } catch (err) {
            console.error("Failed to fetch categories", err);
        }
    };

    const fetchItems = async (categoryId = "all") => {
        if (initialLoad) setLoading(true);
        setError(null);
        try {
            const params = categoryId === "all" ? {} : { category: categoryId };
            const response = await API.get("/orders/pending-preparing-items", { params });
            setItems(response.data);
        } catch (err) {
            console.error("Failed to fetch items", err);
            setError("Failed to load items");
        } finally {
            if (initialLoad) {
                setLoading(false);
                setInitialLoad(false);
            }
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchItems(selectedCategory);
    }, []);

    useEffect(() => {
        if (!initialLoad) {
            fetchItems(selectedCategory);
            const interval = setInterval(() => {
                fetchItems(selectedCategory);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [selectedCategory, initialLoad]);

    const handleStatusChange = async (itemId, newStatus) => {
        try {
            await API.patch("/orders/update-status", { itemId, newStatus });
            setItems((prevItems) =>
                prevItems.map((item) =>
                    item._id === itemId ? { ...item, status: newStatus } : item
                )
            );
        } catch (err) {
            console.error("Failed to update status", err);
            alert("Failed to update item status");
        }
    };

    const filteredItems = items.filter(
        (item) => item.status !== "served" && item.status !== "cancelled"
    );

    useEffect(() => {
        if (selectedCategory !== "all" && filteredItems.length === 0) {
            setSelectedCategory("all");
        }
    }, [filteredItems, selectedCategory]);

    // Refresh page handler
    const handleRefreshClick = () => {
        window.location.reload();
    };

    return (
        <div className="kitchen-container">
            <h2 className="kitchen-title">Kitchen Items (Pending & Preparing)</h2>

            <div className="category-filter">
                <label htmlFor="category">Filter by category: </label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="kitchen-grid-wrapper">
                {loading ? (
                    <div className="loading">Loading items...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : filteredItems.length === 0 ? (
                    <div className="no-items">No items to display.</div>
                ) : (
                    <div className="kitchen-grid">
                        {filteredItems.map((item) => (
                            <div key={item._id} className="kitchen-card">
                                <h3 className="item-name">{item.name}</h3>
                                <p className="item-table">Table: {item.tableNumber}</p>
                                <p className="item-category">Category: {categoryMap[item.category]}</p>
                                <p className={`item-status status-${item.status}`}>
                                    Status: {item.status}
                                </p>

                                <div className="buttons">
                                    {item.status !== "preparing" && (
                                        <button
                                            className="btn preparing"
                                            onClick={() => handleStatusChange(item._id, "preparing")}
                                        >
                                            Mark Preparing
                                        </button>
                                    )}
                                    {item.status !== "served" && (
                                        <button
                                            className="btn served"
                                            onClick={() => handleStatusChange(item._id, "served")}
                                        >
                                            Mark Served
                                        </button>
                                    )}
                                    {item.status !== "cancelled" && (
                                        <button
                                            className="btn cancelled"
                                            onClick={() => handleStatusChange(item._id, "cancelled")}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Floating Refresh Button */}
            <button
                onClick={handleRefreshClick}
                className="refresh-button"
                aria-label="Refresh page"
                title="Refresh page"
            >
                &#x21bb;
            </button>
        </div>
    );
}

export default Kitchen;
