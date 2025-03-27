import React, { useState } from "react";

const LeadsDiagram = () => {
  const [leads, setLeads] = useState([
    { id: 1, name: "משה", status: "מתעניין", wantsZoom: "✔", notes: "" },
    { id: 2, name: "שמעון", status: "לא סגור", wantsZoom: "", notes: "" },
  ]);
  
  const [fields, setFields] = useState(["status", "wantsZoom", "notes"]);

  // הוספת ליד חדש
  const addLead = () => {
    const newLead = { id: Date.now(), name: "ליד חדש" };
    fields.forEach(field => newLead[field] = "");
    setLeads([...leads, newLead]);
  };

  // עדכון ליד קיים
  const updateLead = (id, field, value) => {
    setLeads(leads.map(lead => 
      lead.id === id ? { ...lead, [field]: value } : lead
    ));
  };

  // הוספת מאפיין חדש לכל הלידים
  const addField = () => {
    const newField = prompt("שם המאפיין החדש:");
    if (newField && !fields.includes(newField)) {
      setFields([...fields, newField]);
      setLeads(leads.map(lead => ({ ...lead, [newField]: "" })));
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {leads.map((lead) => (
        <div key={lead.id} style={{ border: "1px solid black", padding: "10px", minWidth: "150px" }}>
          <h3>{lead.name}</h3>
          {fields.map((field) => (
            <div key={field}>
              <label>{field}: </label>
              <input 
                value={lead[field] || ""} 
                onChange={(e) => updateLead(lead.id, field, e.target.value)} 
              />
            </div>
          ))}
        </div>
      ))}
      <button onClick={addLead}>➕ הוסף ליד</button>
      <button onClick={addField}>➕ הוסף מאפיין</button>
    </div>
  );
};

export default LeadsDiagram;
