import { useEffect, useState } from "react";
import axios from "axios";
import { Employee } from "@/lib/types"; // Assuming this is where the Employee type is defined
import EmployeeDetail from "@/components/EmployeeDetails";

const EmployeeDashboard = () => {
  const [data, setData] = useState<Employee | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Employee>("http://localhost:3000/api/v1/employee/1");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <EmployeeDetail employee={data} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EmployeeDashboard;