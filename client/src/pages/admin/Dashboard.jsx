import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ShoppingCart, DollarSign } from "lucide-react";

const Dashboard = () => {
  const { data, isSuccess, isError, isLoading, refetch } = useGetPurchasedCoursesQuery();

  React.useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1 className="text-red-500">Failed to get purchased course</h1>;

  const { purchasedCourse = [] } = data || {};

  if (purchasedCourse.length === 0) {
    return <h1 className="text-gray-500 text-lg">No course purchases yet.</h1>;
  }

  const courseData = purchasedCourse.map((course) => ({
    name: course.courseId?.courseTitle || "Unnamed Course",
    price: course.courseId?.coursePrice || 0,
  }));

  const totalRevenue = purchasedCourse.reduce(
    (acc, element) => acc + (element.amount || 0),
    0
  );
  const totalSales = purchasedCourse.length;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black py-10 px-4 sm:px-8 transition-all duration-500">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Total Purchased Courses Card */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex items-center gap-2">
            <ShoppingCart className="text-blue-600" />
            <CardTitle>Total Purchased Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
          </CardContent>
        </Card>

        {/* Total Money Spent Card */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex items-center gap-2">
            <DollarSign className="text-green-600" />
            <CardTitle>Total Money Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              ₹{totalRevenue.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        {/* Chart Card */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-full">
          <CardHeader>
            <CardTitle className="text-2xl font-extrabold text-blue-700 dark:text-blue-300">
              Purchased Courses & Prices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={courseData}
                margin={{ top: 20, right: 30, left: 20, bottom: 120 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  angle={-40}
                  textAnchor="end"
                  interval={0}
                  height={80}
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="#6b7280" />
                <Tooltip formatter={(value) => `₹${value}`} />
                <Bar dataKey="price" fill="#844ae2" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

