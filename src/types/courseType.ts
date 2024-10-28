import { TUser } from "@/redux/features/auth/authSlice";

export type TCourse = {
    id:string;
    name: string;
    description?: string;
    price: number;
  };

  

  export type TEnrolledCourse={
    id:string;
    course:TCourse;
    user:TUser;
  }