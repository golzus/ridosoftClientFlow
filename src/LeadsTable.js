// Code for the LeadsTable component
import React, { useState } from "react";
import PropTypes from "prop-types";

const LeadsTable = ({ leads, setLeads }) => {
  const [editableLead, setEditableLead] = useState(null);
  const [formData, setFormData] = useState({ name: "", status: "", date: "" });

  const handleEdit = (lead) => {
    setEditableLead(lead.id);
    setFormData({ name: lead.name, status: lead.status, date: lead.date });
  };

  const handleSave = (leadId) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId ? { ...lead, ...formData } : lead
      )
    );
    setEditableLead(null);
  };

  const handleDelete = (leadId) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את הליד?")) {
      setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== leadId));
    }
  };

  const addLead = () => {
    const newLead = {
      id: Date.now(),
      name: "לקוח חדש",
      status: "מתעניין",
      date: new Date().toISOString().split("T")[0],
    };
    setLeads((prevLeads) => [...prevLeads, newLead]);
    handleEdit(newLead)  };

  const getRowClass = (status) => {
    switch (status) {
      case "נדחה":
        return "rejected";
      case "משלם":
        return "paid";
      case "מתקדם":
        return "advanced";
      default:
        return "interested";
    }
  };

  return (
    <>
      <table className="lead-table">
        <thead>
          <tr>
            <th>#</th>
            <th>שם</th>
            <th>סטטוס</th>
            <th>עדכון אחרון</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <tr key={lead.id} className={getRowClass(lead.status)}>
              <td>{index + 1}</td>
              <td>
                {editableLead === lead.id ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                ) : (
                  <strong>{lead.name}</strong>
                )}
              </td>
              <td>
                {editableLead === lead.id ? (
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="מתעניין">מתעניין</option>
                    <option value="מתקדם">מתקדם</option>
                    <option value="משלם">משלם</option>
                    <option value="נדחה">נדחה</option>
                  </select>
                ) : (
                  lead.status
                )}
              </td>
              <td>
                {editableLead === lead.id ? (
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                ) : (
                  lead.date
                )}
              </td>
              <td className="actions">
                {editableLead === lead.id ? (
                  <button className="save-btn" onClick={() => handleSave(lead.id)}>
                    שמור
                  </button>
                ) : (
                  <button className="edit-btn" onClick={() => handleEdit(lead)}>עדכן</button>
                )}
                <button className="delete-btn" onClick={() => handleDelete(lead.id)}>מחק</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-lead-btn" onClick={addLead}>הוסף ליד</button>
    </>
  );
};


export default LeadsTable;
