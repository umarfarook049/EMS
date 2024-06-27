import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface EditEmployeeProps {
  // Define props here if needed
}

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

const EditEmployee: React.FC<EditEmployeeProps> = () => {
  const { id } = useParams<{ id: string }>(); // Retrieve id parameter from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EmployeeDetails>();

  useEffect(() => {
    if (id) {
      fetchEmployeeDetails(id);
    }
  }, [id]);

  const fetchEmployeeDetails = async (employeeId: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/employee/${employeeId}`);
      const employeeData: EmployeeDetails = response.data;
      Object.keys(employeeData).forEach((key) => {
        const typedKey = key as keyof EmployeeDetails; // Cast key to keyof EmployeeDetails
        setValue(typedKey, employeeData[typedKey]);
      });
    } catch (error) {
      console.error("Error fetching employee details:", error);
      alert("Failed to fetch employee details");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: EmployeeDetails) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/employee/${id}`,
        data
      );
      console.log("Employee updated successfully:", response.data);
      alert("Employee updated successfully");
      navigate("/employees"); // Redirect to employee list or appropriate page
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-8">
      

      {/* Personal Details */}
      <section className="p-4 border rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Personal Details</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-2">Full Name</label>
            <input
              type="text"
              {...register("full_name")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Date of Birth</label>
            <input
              type="date"
              {...register("date_of_birth")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Gender</label>
            <select
              {...register("gender")}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Age</label>
            <input
              type="number"
              {...register("age", { min: 0, max: 999 })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Current Address</label>
            <input
              type="text"
              {...register("current_address")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Permanent Address</label>
            <input
              type="text"
              {...register("permanent_address")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Mobile</label>
            <input
              type="text"
              {...register("mobile")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Personal Email</label>
            <input
              type="email"
              {...register("personal_mail")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Emergency Contact Name</label>
            <input
              type="text"
              {...register("emergency_contact_name")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Emergency Contact Mobile</label>
            <input
              type="text"
              {...register("emergency_contact_mobile")}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </section>

      {/* Professional Details */}
      <section className="p-4 border rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Professional Details</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-2">Company Email</label>
            <input
              type="email"
              {...register("company_mail")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Office Phone</label>
            <input
              type="text"
              {...register("office_phone")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">City</label>
            <input
              type="text"
              {...register("city")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Office Address</label>
            <input
              type="text"
              {...register("office_address")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Reporting Manager</label>
            <input
              type="text"
              {...register("reporting_manager")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">HR Name</label>
            <input
              type="text"
              {...register("hr_name")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Employment History</label>
            <textarea
              {...register("employment_history")}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
          <div>
            <label className="block mb-2">Date of Joining</label>
            <input
              type="date"
              {...register("date_of_joining")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Project Code</label>
            <input
              type="text"
              {...register("project_code")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Project Start Date</label>
            <input
              type="date"
              {...register("project_start_date")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Project End Date</label>
            <input
              type="date"
              {...register("project_end_date")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Client Name</label>
            <input
              type="text"
              {...register("client_name")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Project Reporting Manager</label>
            <input
              type="text"
              {...register("project_reporting_manager")}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </section>

      {/* Additional Details */}
      <section className="p-4 border rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Additional Details</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-2">PAN Card</label>
            <input
              type="text"
              {...register("pancard")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Aadhar Card</label>
            <input
              type="text"
              {...register("aadharcard")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Bank Name</label>
            <input
              type="text"
              {...register("bank_name")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Branch</label>
            <input
              type="text"
              {...register("branch")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">IFSC Code</label>
            <input
              type="text"
              {...register("ifsc_code")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">CTC Breakup</label>
            <input
              type="text"
              {...register("ctc_breakup")}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </section>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Update
      </button>
    </form>
  );
};

export default EditEmployee;
