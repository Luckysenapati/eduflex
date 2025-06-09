import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  const creatorName = course?.creator?.name ?? "Unknown";
  const creatorPhoto = course?.creator?.photoUrl ?? "https://github.com/shadcn.png";
  const courseLevel = course?.courseLevel ?? null;
  const coursePrice = course?.coursePrice ?? null;
  console.log("course data", course);


  return (
    <Link to={`/course-detail/${course._id}`}>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <img
            src={course.courseThumbnail}
            alt={course.courseTitle}
            className="w-full h-36 object-cover rounded-t-lg"
          />
        </div>

        <CardContent className="px-5 py-4 space-y-3">
          <h1 className="hover:underline font-bold text-lg truncate">
            {course.courseTitle}
          </h1>

          {/* Only show creator if available */}
          {course?.creator && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={creatorPhoto} alt={creatorName} />
                  <AvatarFallback>
                    {creatorName[0]?.toUpperCase() || "C"}
                  </AvatarFallback>
                </Avatar>
                <h1 className="font-medium text-sm">{creatorName}</h1>
              </div>

              {/* Only show badge if course level is available */}
              {courseLevel && (
                <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
                  {courseLevel}
                </Badge>
              )}
            </div>
          )}

          {/* Show price if available */}
          {coursePrice !== null && (
            <div className="text-lg font-bold">₹{coursePrice}</div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;


















// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import React from "react";
// import { Link } from "react-router-dom";

// const Course = ({ course }) => {
//   const creatorName = course?.creator?.name || "Unknown";
//   const creatorPhoto = course?.creator?.photoUrl || "https://github.com/shadcn.png";

//   return (
//     <Link to={`/course-detail/${course._id}`}>
//       <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
//         <div className="relative">
//           <img
//             src={course.courseThumbnail}
//             alt={course.courseTitle}
//             className="w-full h-36 object-cover rounded-t-lg"
//           />
//         </div>

//         <CardContent className="px-5 py-4 space-y-3">
//           <h1 className="hover:underline font-bold text-lg truncate">
//             {course.courseTitle}
//           </h1>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <Avatar className="h-8 w-8">
//                 <AvatarImage src={creatorPhoto} alt={creatorName} />
//                 <AvatarFallback>
//                   {creatorName[0]?.toUpperCase() || "C"}
//                 </AvatarFallback>
//               </Avatar>
//               <h1 className="font-medium text-sm">{creatorName}</h1>
//             </div>

//             <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
//               {course.courseLevel}
//             </Badge>
//           </div>

//           <div className="text-lg font-bold">₹{course.coursePrice}</div>
//         </CardContent>
//       </Card>
//     </Link>
//   );
// };

// export default Course;

















// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import React from "react";
// import { Link } from "react-router-dom";

// const Course = ({ course }) => {
//   return (
//     <Link to={`/course-detail/${course._id}`}>
//       <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
//         <div className="relative">
//           <img
//             src={course.courseThumbnail}
//             alt={course.courseTitle}
//             className="w-full h-36 object-cover rounded-t-lg"
//           />
//         </div>

//         <CardContent className="px-5 py-4 space-y-3">
//           {/* Course Title */}
//           <h1 className="hover:underline font-bold text-lg truncate">
//             {course.courseTitle}
//           </h1>

//           {/* Creator Info and Level */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <Avatar className="h-8 w-8">
//                 <AvatarImage
//                   src={course.creator?.photoUrl || "https://github.com/shadcn.png"}
//                   alt={course.creator?.name || "Creator"}
//                 />
//                 <AvatarFallback>
//                   {course.creator?.name?.[0]?.toUpperCase() || "C"}
//                 </AvatarFallback>
//               </Avatar>
//               <h1 className="font-medium text-sm">{course.creator?.name}</h1>
//             </div>

//             <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
//               {course.courseLevel}
//             </Badge>
//           </div>

//           {/* Course Price */}
//           <div className="text-lg font-bold">₹{course.coursePrice}</div>
//         </CardContent>
//       </Card>
//     </Link>
//   );
// };

// export default Course;

