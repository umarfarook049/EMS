import React from "react";
import { useNavigate } from "react-router-dom";
import { Employee } from "@/lib/types";
import { useRecoilValue } from "recoil";
import { userInfo } from "@/store/atom";

interface EmployeeDetailProps {
  employee: Employee | undefined;
}

const EmployeeDetail: React.FC<EmployeeDetailProps> = ({
  employee,
}: EmployeeDetailProps) => {
  const user = useRecoilValue(userInfo);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <>
      {employee ? (
        <div className="container mx-auto p-6 bg-white shadow-md rounded-md mt-24"> {/* Adjusted margin-top */}
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Employee Details
          </h1>
          {user?.IsAdmin && (
            <div className="mb-6">
              <button onClick={handleBackClick} className="text-blue-600 hover:underline">
                &larr; Back to List
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-100">
            <div className="border p-6 rounded-lg bg-white shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 gap-y-2">
                <DetailItem label="Full Name" value={employee.full_name} />
                <DetailItem label="Gender" value={employee.gender} />
                <DetailItem
                  label="Date of Birth"
                  value={new Date(employee.date_of_birth).toLocaleDateString()}
                />
                <DetailItem label="Age" value={employee.age} />
                <DetailItem
                  label="Current Address"
                  value={employee.current_address}
                />
                <DetailItem
                  label="Permanent Address"
                  value={employee.permanent_address}
                />
                <DetailItem label="Mobile" value={employee.mobile} />
                <DetailItem
                  label="Personal Email"
                  value={employee.personal_mail}
                />
                <DetailItem
                  label="Emergency Contact Name"
                  value={employee.emergency_contact_name}
                />
                <DetailItem
                  label="Emergency Contact Mobile"
                  value={employee.emergency_contact_mobile}
                />
              </div>
            </div>
            <div className="border p-6 rounded-lg bg-white shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Company Information
              </h2>
              <div className="grid grid-cols-1 gap-y-2">
                <DetailItem label="Employee Code" value={employee.employee_code} />
                <DetailItem label="Company Email" value={employee.company_mail} />
                <DetailItem label="Office Phone" value={employee.office_phone} />
                <DetailItem label="City" value={employee.city} />
                <DetailItem label="Office Address" value={employee.office_address} />
                <DetailItem
                  label="Professional Reporting Manager"
                  value={employee.professional_reporting_manager}
                />
                <DetailItem label="HR Name" value={employee.hr_name} />
                <DetailItem
                  label="Employment History"
                  value={employee.employment_history}
                />
                <DetailItem
                  label="Date of Joining"
                  value={new Date(employee.date_of_joining).toLocaleDateString()}
                />
              </div>
            </div>
            <div className="border p-6 rounded-lg bg-white shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Project Information
              </h2>
              <div className="grid grid-cols-1 gap-y-2">
                <DetailItem label="Project Code" value={employee.project_code} />
                <DetailItem
                  label="Project Start Date"
                  value={
                    new Date(employee.project_start_date).toLocaleDateString()
                  }
                />
                <DetailItem
                  label="Project End Date"
                  value={
                    employee.project_end_date
                      ? new Date(employee.project_end_date).toLocaleDateString()
                      : "Ongoing"
                  }
                />
                <DetailItem label="Client Name" value={employee.client_name} />
                <DetailItem
                  label="Project Reporting Manager"
                  value={employee.project_reporting_manager}
                />
              </div>
            </div>
            <div className="border p-6 rounded-lg bg-white shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Additional Information
              </h2>
              <div className="grid grid-cols-1 gap-y-2">
                <DetailItem label="PAN Card" value={employee.pancard} />
                <DetailItem label="Aadhar Card" value={employee.aadharcard} />
                <DetailItem label="Bank Name" value={employee.bank_name} />
                <DetailItem label="Branch" value={employee.branch} />
                <DetailItem label="IFSC Code" value={employee.ifsc_code} />
                <DetailItem label="CTC Breakup" value={employee.ctc_breakup} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

interface DetailItemProps {
  label: string;
  value: string | number | undefined;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value }: DetailItemProps) => {
  return (
    <div className="flex">
      <p className="w-1/2 font-bold">{label}:</p>
      <p className="w-1/2">{value}</p>
    </div>
  );
};

export default EmployeeDetail;
