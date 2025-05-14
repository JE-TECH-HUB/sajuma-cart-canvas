
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Users, CreditCard, Package } from "lucide-react";

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Mock data
  const recentOrders = [
    { id: "ORD-1234", date: "2025-05-10", status: "Delivered", total: "₦24,500" },
    { id: "ORD-1235", date: "2025-05-08", status: "Processing", total: "₦12,300" },
    { id: "ORD-1236", date: "2025-05-05", status: "Delivered", total: "₦8,700" },
  ];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
        </div>
        
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            {user?.role === "admin" && <TabsTrigger value="admin">Admin Panel</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Orders
                  </CardTitle>
                  <ShoppingBag className="h-4 w-4 text-sajuma" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Spent
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-sajuma" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₦45,500</div>
                  <p className="text-xs text-muted-foreground">
                    +₦12,300 from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Orders
                  </CardTitle>
                  <Package className="h-4 w-4 text-sajuma-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-xs text-muted-foreground">
                    Currently in processing
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Loyalty Points
                  </CardTitle>
                  <Users className="h-4 w-4 text-sajuma-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">455</div>
                  <p className="text-xs text-muted-foreground">
                    Get a ₦500 discount at 500 points
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Your last 3 orders are displayed here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left font-medium">Order ID</th>
                        <th className="px-4 py-2 text-left font-medium">Date</th>
                        <th className="px-4 py-2 text-left font-medium">Status</th>
                        <th className="px-4 py-2 text-right font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="px-4 py-2 text-sajuma">{order.id}</td>
                          <td className="px-4 py-2">{order.date}</td>
                          <td className="px-4 py-2">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                              order.status === "Delivered" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-right font-medium">{order.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                  View all your past orders and their statuses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left font-medium">Order ID</th>
                        <th className="px-4 py-2 text-left font-medium">Date</th>
                        <th className="px-4 py-2 text-left font-medium">Status</th>
                        <th className="px-4 py-2 text-left font-medium">Items</th>
                        <th className="px-4 py-2 text-right font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...recentOrders].map((order, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-2 text-sajuma">{order.id}</td>
                          <td className="px-4 py-2">{order.date}</td>
                          <td className="px-4 py-2">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                              order.status === "Delivered" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-2">{index === 0 ? 5 : index === 1 ? 3 : 2} items</td>
                          <td className="px-4 py-2 text-right font-medium">{order.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <p className="text-sm text-muted-foreground">
                  Total spent: <span className="font-bold">₦45,500</span>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Manage your account details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Full Name</p>
                  <p>{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Email Address</p>
                  <p>{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Account Type</p>
                  <p className="capitalize">{user?.role}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Member Since</p>
                  <p>May 2025</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {user?.role === "admin" && (
            <TabsContent value="admin">
              <Card>
                <CardHeader>
                  <CardTitle>Admin Dashboard</CardTitle>
                  <CardDescription>
                    Manage products, orders, and users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Products</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">428</div>
                        <p className="text-sm text-muted-foreground">
                          Active products in inventory
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Orders</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">52</div>
                        <p className="text-sm text-muted-foreground">
                          Orders this week
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Users</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">1,204</div>
                        <p className="text-sm text-muted-foreground">
                          Registered customers
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
