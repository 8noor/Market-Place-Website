"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Layout from "../components/Layout";
import Dashboard from "../components/AdminDashboard";

const AdminDashboard = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [] = useState<{ orderDate: string; status: string; total: number }[]>(
    []
  );
  const [] = useState("all");
  const [] = useState("all");
  const [] = useState("desc");

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
      // const parsedOrders = JSON.parse(savedOrders);
      // setOrders(parsedOrders);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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
      <Dashboard />
      <Layout />
    </div>
  );
};

export default AdminDashboard;
