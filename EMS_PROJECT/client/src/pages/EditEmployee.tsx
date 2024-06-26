import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface EmployeeDetails {
  employee_code?: string;
  name?: string;
  email?: string;
  password?: string;
  is_admin?: boolean;
  full_name?: string;
  date_of_birth?: string;
  gender?: "Male" | "Female" | "Other";
  age?: number;
  current_address?: string;
  permanent_address?: string;
  mobile?: string;
  personal_mail?: string;
  emergency_contact_name?: string;
  emergency_contact_mobile?: string;
  company_mail?: string;
  office_phone?: string;
  city?: string;
  office_address?: string;
  reporting_manager?: string;
  hr_name?: string;
  employment_history?: string;
  date_of_joining?: string;
  project_code?: string;
  project_start_date?: string;
  project_end_date?: string;
  client_name?: string;
  project_reporting_manager?: string;
  pancard?: string;
  aadharcard?: string;
  bank_name?: string;
  branch?: string;
  ifsc_code?: string;
  ctc_breakup?: string;
}

const EditEmployee = ({ employeeId }: { employeeId: string }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<EmployeeDetails>();
  const [employeeData, setEmployeeData] = useState<EmployeeDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/employee/${employeeId}`);
        const fetchedData: EmployeeDetails = response.data;
        setEmployeeData(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee details:", error);
        setError("Failed to fetch employee details");
        setLoading(false);
      }
    };

    if (employeeId) {
      fetchEmployeeDetails();
    }
  }, [employeeId]);

  useEffect(() => {
    if (employeeData) {
      // Set form values when employeeData changes
      Object.keys(employeeData).forEach((key) => {
        const employeeKey = key as keyof EmployeeDetails;
        setValue(employeeKey, employeeData[employeeKey]);
      });
    }
  }, [employeeData, setValue]);

  const onSubmit = async (data: EmployeeDetails) => {
    console.log(data);
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/employee/${employeeId}`,
        data
      );
      console.log("Employee updated successfully:", response.data);
      alert("Employee updated successfully");
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-8">
      {/* User Details */}
      <section className="p-4 border rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">User Details</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-2">Employee Code</label>
            <input
              type="text"
              {...register("employee_code")}
              defaultValue={employeeData?.employee_code || ""}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              defaultValue={employeeData?.name || ""}
              className="w-full p-2 border rounded"
            />
            {errors.name && <p className="text-red-500">This field is required</p>}
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              defaultValue={employeeData?.email || ""}
              className="w-full p-2 border rounded"
            />
            {errors.email && <p className="text-red-500">This field is required</p>}
          </div>
          <div>
            <label className="block mb-2">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              defaultValue={employeeData?.password || ""}
              className="w-full p-2 border rounded"
            />
            {errors.password && <p className="text-red-500">This field is required</p>}
          </div>
          <div>
            <label className="block mb-2">Is Admin</label>
            <input
              type="checkbox"
              {...register("is_admin")}
              defaultChecked={employeeData?.is_admin || false}
              className="p-2 border rounded"
            />
          </div>
        </div>
      </section>

      {/* Other sections similar to above */}
      
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Update
      </button>
    </form>
  );
};

export default EditEmployee;
