// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { ShoppingCart, DollarSign } from "lucide-react";

// const Dashboardstudent = () => {
//   const [purchasedCourses, setPurchasedCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPurchasedCourses = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/api/purchased-courses", {
//           method: "GET",
//           credentials: "include",
//         });

//         const data = await response.json();
//         console.log("✅ Purchased courses response:", data);
//         setPurchasedCourses(data.purchasedCourse || []);
//       } catch (err) {
//         console.error("❌ Error fetching purchased courses:", err);
//         setError("Failed to fetch data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPurchasedCourses();
//   }, []);

//   if (loading) return <h1>Loading...</h1>;
//   if (error) return <h1 className="text-red-500">{error}</h1>;
//   if (purchasedCourses.length === 0) {
//     return <h1 className="text-gray-500 text-lg">No course purchases yet.</h1>;
//   }

//   const courseData = purchasedCourses.map((item) => ({
//     name: item?.courseId?.courseTitle || "Unknown",
//     price: item?.courseId?.coursePrice || 0,
//   }));

//   const totalRevenue = purchasedCourses.reduce(
//     (acc, element) => acc + (element.amount || 0),
//     0
//   );
//   const totalSales = purchasedCourses.length;

//   return (
//     <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//       {/* Total Sales Card */}
//       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
//         <CardHeader className="flex items-center gap-2">
//           <ShoppingCart className="text-blue-600" />
//           <CardTitle>Total Purchased Courses</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
//         </CardContent>
//       </Card>

//       {/* Total Revenue Card */}
//       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
//         <CardHeader className="flex items-center gap-2">
//           <DollarSign className="text-green-600" />
//           <CardTitle>Total Money Spent</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-3xl font-bold text-green-600">
//             ₹{totalRevenue.toLocaleString()}
//           </p>
//         </CardContent>
//       </Card>

//       {/* Course Prices Bar Chart */}
//       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-full">
//         <CardHeader>
//           <CardTitle className="text-2xl font-extrabold text-blue-700">
//             Purchased Courses & Prices
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart
//               data={courseData}
//               margin={{ top: 20, right: 30, left: 20, bottom: 120 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//               <XAxis
//                 dataKey="name"
//                 angle={-40}
//                 textAnchor="end"
//                 interval={0}
//                 height={80} // fixed height for rotated labels
//                 tick={{ fontSize: 12 }}
//                 stroke="#6b7280"
//               />
//               <YAxis stroke="#6b7280" />
//               <Tooltip formatter={(value) => `₹${value}`} />
//               <Bar dataKey="price" fill="#844ae2" barSize={40} />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Dashboardstudent;



















/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const Dashboardstudent = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const response = await fetch("https://eduflex-6csh.onrender.com/api/purchased-courses", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        console.log("✅ Purchased courses response:", data);
        setPurchasedCourses(data.purchasedCourse || []);
      } catch (err) {
        console.error("❌ Error fetching purchased courses:", err);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedCourses();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1 className="text-red-500">{error}</h1>;
  if (purchasedCourses.length === 0) {
    return <h1 className="text-gray-500 text-lg">No course purchases yet.</h1>;
  }

  const courseData = purchasedCourses.map((item) => ({
    name: item.courseId?.courseTitle || "Unknown",
    price: item.courseId?.coursePrice || 0,
  }));

  const totalRevenue = purchasedCourses.reduce(
    (acc, element) => acc + (element.amount || 0),
    0
  );
  const totalSales = purchasedCourses.length;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black py-10 px-4 sm:px-8 transition-all duration-500">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Total Purchased Courses */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex items-center gap-2">
            <ShoppingCart className="text-blue-600" />
            <CardTitle>Total Purchased Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
          </CardContent>
        </Card>

        {/* Total Revenue */}
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

        {/* Bar Chart */}
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
                  angle={-40}
                  textAnchor="end"
                  interval={0}
                  height={80}
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
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

export default Dashboardstudent;

