import React, { useEffect, useState } from "react";
import Course from "./Course";

const MyLearning = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
<<<<<<< HEAD
        const response = await fetch("https://eduflex-6csh.onrender.com/api/v1/purchase/purchased-courses", {
=======
        const response = await fetch("http://localhost:8080/api/v1/purchase/purchased-courses", {
>>>>>>> c8e1c5d48b398424d8e8955d4dc6c570f6bcdb5a
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        console.log("✅ Purchased courses response:", data);

        setPurchasedCourses(data.purchasedCourse || []);
      } catch (err) {
        console.error("❌ Error fetching courses:", err);
        setError("Something went wrong while fetching your learning data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedCourses();
  }, []);
  console.log("📦 purchasedCourses", purchasedCourses);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black pt-16 pb-20 px-4 sm:px-8 text-center transition-all duration-500">
      <div className="max-w-4xl mx-auto mt-0 mb-10 px-4 md:px-0">
        <h1 className="font-bold text-2xl text-gray-900 dark:text-white">MY LEARNING</h1>
        <div className="my-5">
          {loading ? (
            <MyLearningSkeleton />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : purchasedCourses.length === 0 ? (
            <p>You are not enrolled in any course.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {purchasedCourses.map((item, index) => (
                <Course
                  key={index}
                  course={item.courseId} // courseId is fully populated now
                  
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLearning;

const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);






















// import React, { useEffect, useState } from "react";
// import Course from "./Course";

// const MyLearning = () => {
//   const [purchasedCourses, setPurchasedCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); // Optional error message

//  useEffect(() => {
//   const fetchPurchasedCourses = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/api/purchased-courses", {
//         method: "GET",
//         credentials: "include", // 🔐 This allows sending cookies (for auth)
//       });

//       const data = await response.json();
//       console.log(data)
//       console.log("✅ Purchased courses response:", data); // Debug output

//       // If your backend sends { purchasedCourse: [...] }
//       setPurchasedCourses(data.purchasedCourse || []);
//     } catch (err) {
//       console.error("❌ Error fetching courses:", err);
//     } finally {
//       setLoading(false); // Done loading
//     }
//   };

//   fetchPurchasedCourses();
// }, []);


// // bg-[#666b78] dark:bg-gray-900 py-20 px-4 sm:px-8 transition
//   return (
//     // <div className="relative overflow-hidde bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black py-32 px-4 sm:px-8 text-center transition-all duration-500">
//     // <div className="max-w-4xl mx-auto my-10 px-4 md:px-0 ">
//     <div className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black pt-16 pb-20 px-4 sm:px-8 text-center transition-all duration-500">
//   <div className="max-w-4xl mx-auto mt-0 mb-10 px-4 md:px-0">

//       <h1 className="font-bold text-2xl">MY LEARNING</h1>
//       <div className="my-5">
//         {loading ? (
//           <MyLearningSkeleton />
//         ) : error ? (
//           <p className="text-red-500">{error}</p>
//         ) : purchasedCourses.length === 0 ? (
//           <p>You are not enrolled in any course.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {purchasedCourses.map((item, index) => (
//               <Course
//                 key={index}
//                 course={item.courseId || { courseTitle: "Unknown Course" }} // Fallback
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default MyLearning;

// // Skeleton loader
// const MyLearningSkeleton = () => (
  
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//     {[...Array(3)].map((_, index) => (
//       <div
//         key={index}
//         className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
//       ></div>
//     ))}
//   </div>
// );


