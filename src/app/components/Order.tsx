import { useState, useEffect } from "react";

interface Order {
  id: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    notes?: string;
  };
  orderDate: string;
  total: number;
  status: string;
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }[];
}

const AdminPanel = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [customName, setCustomName] = useState("");
  const [customId, setCustomId] = useState<number | "">("");
  const [orderDate, setOrderDate] = useState("");
  const [totalAmount, setTotalAmount] = useState<number | "">("");
  const [items, setItems] = useState<{ id: number; name: string; quantity: number; price: number }[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const mockOrders = [
        {
          id: 1,
          customer: {
            name: "Ali Khan",
            email: "ali@example.com",
            phone: "1234567890",
            address: "123 Street, Karachi",
            city: "Karachi",
          },
          orderDate: "2025-01-28",
          total: 1500.5,
          status: "Pending",
          items: [
            { id: 101, name: "Product A", quantity: 2, price: 500 },
            { id: 102, name: "Product B", quantity: 1, price: 500.5 },
          ],
        },
        {
          id: 2,
          customer: {
            name: "Sara Ali",
            email: "sara@example.com",
            phone: "0987654321",
            address: "456 Avenue, Lahore",
            city: "Lahore",
          },
          orderDate: "2024-12-15",
          total: 1200,
          status: "Completed",
          items: [
            { id: 103, name: "Product C", quantity: 1, price: 1200 },
          ],
        },
      ];
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
    };
    fetchOrders();
  }, []);

  const updateOrderStatus = (orderId: number, status: string) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status } : order
    );
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
  };

  const deleteOrder = (orderId: number) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
  };

  const formatDate = (dateString: string | number | Date) => {
    const options = { year: "numeric" as const, month: "long" as const, day: "numeric" as const };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleCustomNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomName(event.target.value);
  };

  const handleCustomIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCustomId(value === "" ? "" : Number(value));
  };

  const handleOrderDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderDate(event.target.value);
  };

  const handleTotalAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTotalAmount(value === "" ? "" : Number(value));
  };

  const handleItemsChange = <K extends keyof Order['items'][0]>(index: number, field: K, value: Order['items'][0][K]) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addNewOrder = () => {
    const newOrder: Order = {
      id: orders.length + 1,
      customer: { name: customName, email: "", phone: "", address: "", city: "" },
      orderDate: orderDate || "",
      total: totalAmount || 0,
      status: "Pending",
      items,
    };
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
    setCustomName("");
    setCustomId("");
    setOrderDate("");
    setTotalAmount("");
    setItems([]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <div className="mb-4">
        <input
          type="text"
          value={customName}
          onChange={handleCustomNameChange}
          placeholder="Enter customer name"
          className="p-2 border rounded"
        />
        <input
          type="number"
          value={customId}
          onChange={handleCustomIdChange}
          placeholder="Enter order ID"
          className="ml-4 p-2 border rounded"
        />
        <input
          type="date"
          value={orderDate}
          onChange={handleOrderDateChange}
          className="ml-4 p-2 border rounded"
        />
        <input
          type="number"
          value={totalAmount}
          onChange={handleTotalAmountChange}
          placeholder="Enter total amount"
          className="ml-4 p-2 border rounded"
        />
        {items.map((item, index) => (
          <div key={item.id} className="mb-2">
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleItemsChange(index, "name", e.target.value)}
              placeholder="Item Name"
              className="p-2 border rounded"
            />
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleItemsChange(index, "quantity", Number(e.target.value))}
              placeholder="Quantity"
              className="ml-2 p-2 border rounded"
            />
            <input
              type="number"
              value={item.price}
              onChange={(e) => handleItemsChange(index, "price", Number(e.target.value))}
              placeholder="Price"
              className="ml-2 p-2 border rounded"
            />
          </div>
        ))}
        <button
          onClick={() => setItems([...items, { id: Date.now(), name: "", quantity: 0, price: 0 }])}
          className="ml-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Item
        </button>
        <button
          onClick={addNewOrder}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add New Order
        </button>
      </div>

      <table className="min-w-full border">
        <thead>
          <tr className="border-b text-sm font-semibold text-gray-900">
            <th className="px-6 py-3 text-left">Order ID</th>
            <th className="px-6 py-3 text-left">Customer</th>
            <th className="px-6 py-3 text-left">Date</th>
            <th className="px-6 py-3 text-left">Total</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="px-6 py-3 text-sm font-medium text-gray-900">{order.id}</td>
              <td className="px-6 py-3 text-sm text-gray-600">{order.customer.name}</td>
              <td className="px-6 py-3 text-sm text-gray-600">{formatDate(order.orderDate)}</td>
              <td className="px-6 py-3 text-sm text-gray-600">Rs {order.total.toFixed(2)}</td>
              <td className="px-6 py-3 text-sm text-gray-600">{order.status}</td>
              <td className="px-6 py-3 text-sm font-medium">
                <button onClick={() => setSelectedOrder(order)} className="text-purple-500 hover:text-purple-700">
                  View Details
                </button>
                <button onClick={() => updateOrderStatus(order.id, "Completed")} className="ml-4 text-green-600 hover:text-green-700">
                  Mark as Completed
                </button>
                <button onClick={() => updateOrderStatus(order.id, "Returned")} className="ml-4 text-red-600 hover:text-red-700">
                  Mark as Returned
                </button>
                <button onClick={() => deleteOrder(order.id)} className="ml-4 text-red-600 hover:text-red-700">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded">
            <h2 className="text-xl font-bold">Order Details</h2>
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Customer:</strong> {selectedOrder.customer.name}</p>
            <p><strong>Date:</strong> {formatDate(selectedOrder.orderDate)}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Total:</strong> Rs {selectedOrder.total.toFixed(2)}</p>
            <h3 className="font-semibold mt-4">Items:</h3>
            <ul>
              {selectedOrder.items.map((item) => (
                <li key={item.id}>{item.name} - {item.quantity} x Rs {item.price}</li>
              ))}
            </ul>

            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-700">Customer Information</h3>
              <p className="text-sm text-gray-600"><strong>Name:</strong> {selectedOrder.customer.name}</p>
              <p className="text-sm text-gray-600"><strong>Email:</strong> {selectedOrder.customer.email}</p>
              <p className="text-sm text-gray-600"><strong>Phone:</strong> {selectedOrder.customer.phone}</p>
              <p className="text-sm text-gray-600"><strong>Address:</strong> {selectedOrder.customer.address}</p>
              <p className="text-sm text-gray-600"><strong>City:</strong> {selectedOrder.customer.city}</p>
              {selectedOrder.customer.notes && (
                <p className="text-sm text-gray-600"><strong>Notes:</strong> {selectedOrder.customer.notes}</p>
              )}
            </div>

            <button onClick={() => setSelectedOrder(null)} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
