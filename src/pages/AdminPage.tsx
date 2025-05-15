
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { 
  Package, Users, CreditCard, ShoppingBag, Truck, ShieldCheck, Activity, 
  CheckCircle, XCircle, Clock, Search, MoreVertical, Shirt, Tag
} from "lucide-react";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdminTab, User, Order } from "@/types";

// Sample data
const recentOrders: Order[] = [
  { 
    id: "ORD-1234", 
    userId: "1", 
    items: [], 
    total: 24500, 
    status: "delivered", 
    createdAt: "2025-05-10", 
    shippingAddress: {
      fullName: "John Doe",
      street: "123 Main St",
      city: "Lagos",
      state: "Lagos",
      zipCode: "100001",
      country: "Nigeria",
      phone: "+234123456789"
    },
    paymentMethod: "card",
    trackingNumber: "TRK12345",
    deliveryEstimate: "May 12, 2025"
  },
  { 
    id: "ORD-1235", 
    userId: "2", 
    items: [], 
    total: 12300, 
    status: "processing", 
    createdAt: "2025-05-08", 
    shippingAddress: {
      fullName: "Jane Smith",
      street: "456 Oak Ave",
      city: "Abuja",
      state: "FCT",
      zipCode: "900001",
      country: "Nigeria",
      phone: "+234987654321"
    },
    paymentMethod: "cash",
    trackingNumber: "TRK12346",
    deliveryEstimate: "May 14, 2025"
  },
];

const users: User[] = [
  { 
    id: "1", 
    name: "John Doe", 
    email: "john@example.com", 
    role: "user",
    createdAt: "2025-01-15",
    lastLogin: "2025-05-12",
    ordersCount: 5,
    totalSpent: 45000
  },
  { 
    id: "2", 
    name: "Jane Smith", 
    email: "jane@example.com", 
    role: "user",
    createdAt: "2025-02-20",
    lastLogin: "2025-05-10",
    ordersCount: 3,
    totalSpent: 28000
  },
  { 
    id: "3", 
    name: "Admin User", 
    email: "admin@sajuma.com", 
    role: "admin",
    createdAt: "2025-01-01",
    lastLogin: "2025-05-15",
    ordersCount: 0,
    totalSpent: 0
  },
];

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
];

const categoryData = [
  { name: 'Groceries', value: 45 },
  { name: 'Clothing', value: 25 },
  { name: 'Electronics', value: 15 },
  { name: 'Home Goods', value: 10 },
  { name: 'Beauty', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const StatusBadge = ({ status }: { status: Order['status'] }) => {
  const statusMap: Record<Order['status'], { color: string, label: string }> = {
    pending: { color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200", label: "Pending" },
    processing: { color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", label: "Processing" },
    delivered: { color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", label: "Delivered" },
    canceled: { color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200", label: "Canceled" },
  };
  
  const { color, label } = statusMap[status];
  
  return (
    <span className={`inline-block px-2 py-1 rounded-full text-xs ${color}`}>
      {label}
    </span>
  );
};

const AdminPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  
  // Redirect if not authenticated or not an admin
  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your store, users, and orders</p>
        </div>
        
        <Tabs defaultValue="dashboard" className="w-full" onValueChange={(value) => setActiveTab(value as AdminTab)}>
          <TabsList className="mb-8 bg-background border dark:border-gray-700">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-sajuma" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₦1,245,650</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    New Customers
                  </CardTitle>
                  <Users className="h-4 w-4 text-sajuma" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+45</div>
                  <p className="text-xs text-muted-foreground">
                    +8% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Products Sold
                  </CardTitle>
                  <ShoppingBag className="h-4 w-4 text-sajuma" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">342</div>
                  <p className="text-xs text-muted-foreground">
                    +18% from last month
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
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    Currently in processing
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                  <CardDescription>Monthly sales for the last 5 months</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`₦${value}`, 'Sales']}
                        contentStyle={{ 
                          backgroundColor: 'var(--background)', 
                          border: '1px solid var(--border)',
                          borderRadius: '0.5rem' 
                        }}
                      />
                      <Legend />
                      <Bar dataKey="sales" fill="var(--primary)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                  <CardDescription>Product category distribution</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Percentage']}
                        contentStyle={{ 
                          backgroundColor: 'var(--background)', 
                          border: '1px solid var(--border)',
                          borderRadius: '0.5rem' 
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Latest orders across the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.shippingAddress.fullName}</TableCell>
                          <TableCell>{order.createdAt}</TableCell>
                          <TableCell>
                            <StatusBadge status={order.status} />
                          </TableCell>
                          <TableCell className="text-right">₦{order.total.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 max-w-sm">
                <Input placeholder="Search products..." />
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="fruits">Fruits & Vegetables</SelectItem>
                    <SelectItem value="dairy">Dairy & Eggs</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded overflow-hidden">
                            <img 
                              src="https://images.unsplash.com/photo-1519162808019-7de1683fa2ad" 
                              alt="Organic Avocado" 
                              className="object-cover w-full h-full" 
                            />
                          </div>
                          <div>
                            <p className="font-medium">Organic Avocado</p>
                            <p className="text-xs text-muted-foreground">SKU: PRD001</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100">Fruits</Badge>
                      </TableCell>
                      <TableCell>45 units</TableCell>
                      <TableCell>₦2,990</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100">In Stock</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded overflow-hidden">
                            <img 
                              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f" 
                              alt="Traditional Ankara Shirt" 
                              className="object-cover w-full h-full" 
                            />
                          </div>
                          <div>
                            <p className="font-medium">Traditional Ankara Shirt</p>
                            <p className="text-xs text-muted-foreground">SKU: CLT001</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100">Clothing</Badge>
                      </TableCell>
                      <TableCell>28 units</TableCell>
                      <TableCell>₦12,500</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100">In Stock</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">Showing 2 of 120 products</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 max-w-sm">
                <Input placeholder="Search orders..." />
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.shippingAddress.fullName}</TableCell>
                        <TableCell>{order.createdAt}</TableCell>
                        <TableCell>₦{order.total.toLocaleString()}</TableCell>
                        <TableCell>
                          <StatusBadge status={order.status} />
                        </TableCell>
                        <TableCell className="capitalize">{order.paymentMethod}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Update Status</DropdownMenuItem>
                              <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">Showing 2 of 56 orders</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 max-w-sm">
                <Input placeholder="Search users..." />
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="font-medium">{user.name}</div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge className={
                            user.role === "admin" 
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100" 
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                          }>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.createdAt}</TableCell>
                        <TableCell>{user.ordersCount}</TableCell>
                        <TableCell>₦{user.totalSpent?.toLocaleString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit User</DropdownMenuItem>
                              <DropdownMenuItem>Send Email</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">Showing 3 of 1,204 users</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="delivery" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Overview</CardTitle>
                  <CardDescription>Current delivery statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1">
                      <span className="text-muted-foreground text-sm">Active Deliveries</span>
                      <div className="flex items-center gap-2">
                        <Truck className="h-5 w-5 text-sajuma-accent" />
                        <span className="text-2xl font-bold">24</span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span className="text-muted-foreground text-sm">Completed Today</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-2xl font-bold">18</span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span className="text-muted-foreground text-sm">Delayed</span>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-yellow-500" />
                        <span className="text-2xl font-bold">3</span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span className="text-muted-foreground text-sm">Issues</span>
                      <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span className="text-2xl font-bold">1</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Zones</CardTitle>
                  <CardDescription>Manage delivery pricing by zone</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Lagos Mainland</p>
                        <p className="text-sm text-muted-foreground">1-2 business days</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₦1,500</p>
                        <Badge>Active</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Lagos Island</p>
                        <p className="text-sm text-muted-foreground">1-2 business days</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₦2,000</p>
                        <Badge>Active</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Abuja</p>
                        <p className="text-sm text-muted-foreground">2-3 business days</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₦2,500</p>
                        <Badge>Active</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Other States</p>
                        <p className="text-sm text-muted-foreground">3-5 business days</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₦3,000</p>
                        <Badge>Active</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Manage Delivery Zones
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Active Deliveries</CardTitle>
                  <CardDescription>
                    Track ongoing deliveries
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Activity className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Delivery Status</TableHead>
                        <TableHead>Estimated Delivery</TableHead>
                        <TableHead className="w-[80px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">ORD-1235</TableCell>
                        <TableCell>Jane Smith</TableCell>
                        <TableCell>Abuja, FCT</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">In Transit</Badge>
                          </div>
                        </TableCell>
                        <TableCell>May 14, 2025</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Update
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">ORD-1238</TableCell>
                        <TableCell>Oluwaseun Adeyemi</TableCell>
                        <TableCell>Lagos, Mainland</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Processing</Badge>
                          </div>
                        </TableCell>
                        <TableCell>May 15, 2025</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Update
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">Showing 2 of 24 active deliveries</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;
