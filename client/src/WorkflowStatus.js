// CostCalculator.js - הקומפוננטה הראשית שמחברת את הכל
import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import './WorkflowStatus.css'
import Axios from "axios";
import LeadsTable from "./LeadsTable";


const WorkflowStatus = () => {
 const leadsDemo=[

    { id: 1, name: "דוד כהן", status: "מתעניין", date: "2025-02-01" },
    { id: 2, name: "שרה לוי", status: "מתקדם", date: "2025-02-10" },
    { id: 3, name: "משה ישראלי", status: "משלם", date: "2025-02-15" },
    { id: 4, name: "רועי אלון", status: "נדחה", date: "2025-01-28" },
{ id: 5, name: "דוד כהן", status: "מתעניין", date: "2025-02-01" },
{ id: 6, name: "שרה לוי", status: "מתקדם", date: "2025-02-10" },
{ id: 7, name: "משה ישראלי", status: "משלם", date: "2025-02-15" },
{ id: 8, name: "רועי אלון", status: "נדחה", date: "2025-01-28" },
{ id: 9, name: "דוד כהן", status: "מתעניין", date: "2025-02-01" },
{ id: 10, name: "שרה לוי", status: "מתקדם", date: "2025-02-10" },
{ id: 11, name: "משה ישראלי", status: "משלם", date: "2025-02-15" },
  ];


 const [userRole,setUserRole]=useState("customer")
  const [validPassword, setValidPassword] = useState(false);
 const [leads,setLeads]=useState(leadsDemo)
 const [username,setUsername]=useState()

  const fetchTasks = async () => {
    try {
      const { data } = await Axios.get('http://localhost:1000/api/customers-details');
      console.log(data.data,"data");
      setLeads(data.data)
      // setTasks(data);
    } catch (e) {
      console.log(e, "error at fetching data");
    }
  };
 
 

  useEffect(() => {
    fetchTasks()
  }, [validPassword]);
 
 if(!leads)return <h5>no leads</h5>
  return (
    <div className="container">
   <div className="header"  ><h1> סטטוס לידים</h1>
      <h3>מעקב לידים – מהתעניינות לסגירה</h3></div>
    <div className="content">  {!validPassword&&<LoginForm username={username}setUsername={setUsername}setUserRole={setUserRole} onSuccess={() => setValidPassword(true)} />}
{validPassword&&<LeadsTable leads={leads} setLeads={setLeads} userRole={userRole}/>     
}   
      
{ validPassword&&  <div className="buttons-container"> <button className="logOutBtn" onClick={(e)=>{setValidPassword(false)}}>יציאה</button>   
</div>}    </div></div>
  );
};

export default WorkflowStatus;
