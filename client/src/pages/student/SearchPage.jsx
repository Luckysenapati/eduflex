import React, { useState } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories, setSelectedCatgories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice,
  });

  const isEmpty = !isLoading && data?.courses.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCatgories(categories);
    setSortByPrice(price);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="my-6">
        <h1 className="font-bold text-xl md:text-2xl text-gray-800 dark:text-white">
          Results for "{query}"
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Showing results for{" "}
          <span className="text-blue-800 dark:text-blue-400 font-bold italic">
            {query}
          </span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <Filter handleFilterChange={handleFilterChange} />

        <div className="flex-1 space-y-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <CourseSkeleton key={idx} />
            ))
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            data?.courses?.map((course) => (
              <SearchResult key={course._id} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-gradient-to-r from-red-100 via-pink-100 to-orange-100 dark:from-gray-800 dark:via-gray-900 dark:to-black rounded-xl shadow-md text-center">
      <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
      <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-white mb-2">
        Course Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
        Sorry, we couldn't find the course you're looking for.
      </p>
      <Link to="/" className="italic">
        <Button variant="link" className="text-blue-600 dark:text-blue-400">
          Browse All Courses
        </Button>
      </Link>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col md:flex-row justify-between border-b border-gray-300 dark:border-gray-700 py-6 animate-pulse bg-white dark:bg-gray-900 rounded-xl shadow-sm">
      <div className="h-32 w-full md:w-64 overflow-hidden rounded-lg">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="flex flex-col gap-3 flex-1 px-4 py-2">
        <Skeleton className="h-6 w-3/4 rounded" />
        <Skeleton className="h-4 w-1/2 rounded" />
        <Skeleton className="h-4 w-1/3 rounded" />
        <Skeleton className="h-6 w-24 mt-2 rounded" />
      </div>

      <div className="flex flex-col items-end justify-between mt-4 md:mt-0 px-4">
        <Skeleton className="h-6 w-16 rounded" />
      </div>
    </div>
  );
};


