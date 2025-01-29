"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import OrderTable from "./Order";

export default function AdminDashboard() {
  const router = useRouter();

  // Product State
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", price: 100, stock: 50, category: "Category 1" },
    { id: 2, name: "Product 2", price: 200, stock: 30, category: "Category 2" },
  ]);

  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "", category: "" });

  // Input Handler
  // interface Product {
  //   id: number;
  //   name: string;
  //   price: number;
  //   stock: number;
  //   category: string;
  // }

  // interface NewProduct {
  //   name: string;
  //   price: string;
  //   stock: string;
  //   category: string;
  // }

  interface InputChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Add Product
  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.stock && newProduct.category) {
      setProducts([
        ...products,
        { id: products.length + 1, ...newProduct, price: Number(newProduct.price), stock: Number(newProduct.stock) },
      ]);
      setNewProduct({ name: "", price: "", stock: "", category: "" });
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Delete Product
  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    router.replace("/admin");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b-2 border-purple-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-yellow-600">Admin Panel</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Welcome, Admin</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-purple-500 rounded-md hover:bg-purple-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-10">
        <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h2>

        {/* Add New Product */}
        <Card className="mb-6 shadow-md rounded-lg">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input name="name" placeholder="Product Name" value={newProduct.name} onChange={handleInputChange} />
              <Input name="price" type="number" placeholder="Price" value={newProduct.price} onChange={handleInputChange} />
              <Input name="stock" type="number" placeholder="Stock" value={newProduct.stock} onChange={handleInputChange} />
              <Input name="category" placeholder="Category" value={newProduct.category} onChange={handleInputChange} />
            </div>
            <Button onClick={handleAddProduct} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Add Product
            </Button>
          </CardContent>
        </Card>

        {/* Product List */}
        <Card className="shadow-md rounded-lg">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Product List</h2>
            <Table className="w-full border">
              <TableHeader>
                <TableRow className="bg-gray-200">
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} className="hover:bg-gray-100">
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <OrderTable/>






        
      </main>
    </div>
  );
}
