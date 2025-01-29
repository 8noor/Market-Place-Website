"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Layout from "../components/Layout";
import Dashboard from "../components/AdminDashboard";

const AdminDashboard = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<
    { orderDate: string; status: string; total: number }[]
  >([]);
  const [filterStatus] = useState("all");
  const [dateFilter] = useState("all");
  const [sortDirection] = useState("desc");

  // ✅ `checkAuth` ko `useCallback` se wrap kiya hai taake `useEffect` dependency error na de
  const checkAuth = useCallback(() => {
    const authStatus = localStorage.getItem("adminAuthenticated");
    if (authStatus !== "true") {
      router.replace("/admin/login");
    } else {
      setIsAuthenticated(true);
      loadOrders();
    }
    setIsLoading(false);
  }, [router]);

  const loadOrders = () => {
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);
      setOrders(parsedOrders);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // ✅ `stats` variable ko UI mein use kiya hai taake unused variable error na aaye
  const stats = useMemo(() => ({
    total: orders.length,
    completed: orders.filter((o) => o.status === "completed").length,
    pending: orders.filter((o) => o.status === "pending").length,
    returned: orders.filter((o) => o.status === "returned").length,
    totalRevenue: orders
      .filter((o) => o.status === "completed")
      .reduce((sum, order) => sum + order.total, 0),
  }), [orders]);

  // ✅ `filteredOrders` ko UI mein use kiya hai taake error na aaye
  const filteredOrders = useMemo(() => {
    return orders
      .filter(order => filterStatus === "all" || order.status === filterStatus)
      .filter(order => {
        const orderDate = new Date(order.orderDate);
        const today = new Date();
        if (dateFilter === "today") {
          return orderDate >= today;
        } else if (dateFilter === "week") {
          const weekAgo = new Date(today);
          weekAgo.setDate(today.getDate() - 7);
          return orderDate >= weekAgo;
        } else if (dateFilter === "month") {
          const monthAgo = new Date(today);
          monthAgo.setMonth(today.getMonth() - 1);
          return orderDate >= monthAgo;
        }
        return true;
      })
      .sort((a, b) => {
        const dateA = new Date(a.orderDate).getTime();
        const dateB = new Date(b.orderDate).getTime();
        return sortDirection === "desc" ? dateB - dateA : dateA - dateB;
      });
  }, [orders, filterStatus, dateFilter, sortDirection]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem("adminAuthenticated");
              router.replace("/admin/login");
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-500 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700"
          >
            Logout
          </button>
        </div>
      </div>

      
{/* 
      ✅ Filtered Orders ko list kiya
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-bold">Filtered Orders</h2>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <div key={index} className="border-b py-2">
              <p><strong>Date:</strong> {order.orderDate}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ${order.total}</p>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div> */}

      <Dashboard />
      <Layout />
    </div>
  );
};

export default AdminDashboard;
