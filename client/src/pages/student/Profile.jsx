

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import Course from "./Course";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // New state for email
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [role, setRole] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    { data: updateUserData, isLoading: updateUserIsLoading, isError, error, isSuccess },
  ] = useUpdateUserMutation();

  const user = data?.user;

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    if (!name && !email && !profilePhoto && !role) {
      toast.error("Please provide name, email, role or profile photo to update.");
      return;
    }

    const formData = new FormData();
    if (name) formData.append("name", name);
    if (email) formData.append("email", email);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);
    if (role) formData.append("role", role);

    await updateUser(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data?.message || "Profile updated.");
      setIsDialogOpen(false);
      setProfilePhoto(null);
    }
    if (isError) {
      toast.error(error?.message || "Failed to update profile");
    }
  }, [error, updateUserData, isSuccess, isError]);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/purchased-courses", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        setPurchasedCourses(data.purchasedCourse || []);
      } catch (err) {
        console.error("❌ Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedCourses();
  }, []);

  if (isLoading) return <h1>Profile Loading...</h1>;

  return (
    //<div className="max-w-4xl mx-auto px-4 my-10">
  //<div className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black pt-16 pb-20 px-4 sm:px-8 text-center transition-all duration-500">
  //<div className="max-w-4xl mx-auto mb-10 px-4 md:px-0 flex flex-col items-center gap-6">
  //<div className="max-w-4xl mx-auto px-4 my-10">
  <div className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black pt-16 pb-20 px-4 sm:px-8 transition-all duration-500">
  <div className="max-w-4xl mx-auto mb-10 px-4 md:px-0">
    
      <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage
              src={user?.photoUrl || "https://github.com/shadcn.png"}
              alt="profile"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.name}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.email}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.role?.toUpperCase()}
              </span>
            </h1>
          </div>

          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (open && user) {
                setName(user.name || "");
                setEmail(user.email || "");
                setRole(user.role || "");
              }
            }}
          >
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter new name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter new email"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Role</Label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="col-span-3 rounded border border-gray-300 dark:border-gray-600 p-2 bg-background text-foreground"
                  >
                    <option value="">Select role</option>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input
                    onChange={onChangeHandler}
                    type="file"
                    accept="image/*"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button disabled={updateUserIsLoading} onClick={updateUserHandler}>
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      

      {/* Enrolled Courses Section */}
      <div className="my-5">
        {loading ? (
          <MyLearningSkeleton />
        ) : purchasedCourses.length === 0 ? (
          <p>You are not enrolled in any course.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {purchasedCourses.map((item, index) => (
              <Course
                key={index}
                course={item.courseId || { courseTitle: "Unknown Course" }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Profile;

// Skeleton loader
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


