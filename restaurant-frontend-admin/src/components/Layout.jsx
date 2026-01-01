import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Layout.css';

function Layout({ children }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const drawerRef = useRef(null);

    // Close drawer if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                setDrawerOpen(false);
            }
        };

        if (drawerOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [drawerOpen]);

    return (
        <div className="layout-wrapper">
            {/* Drawer Toggle Button */}
            <button className="drawer-toggle" onClick={() => setDrawerOpen(!drawerOpen)}>
                {drawerOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* App Drawer */}
            <aside
                ref={drawerRef}
                className={`app-drawer ${drawerOpen ? 'open' : ''}`}
            >
                <nav className="drawer-nav">
                    {/* <NavLink
                        to="/dashboard"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Dashboard
                    </NavLink> */}
                    <NavLink
                        to="/menu"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Menu
                    </NavLink>
                    <NavLink
                        to="/orders"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Orders
                    </NavLink>
                    <NavLink
                        to="/tablesList"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Bill
                    </NavLink>

                    <NavLink
                        to="/tables"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Tables
                    </NavLink>
                </nav>
            </aside>

            {/* Main Content */}
            <main className={`layout-content ${drawerOpen ? 'drawer-open' : ''}`}>
                {children}
            </main>
        </div>
    );
}

export default Layout;
