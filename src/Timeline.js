import React from "react";

const lessons = [
  { title: "שיעור ראשון", subtitle: "כינויי גוף בשילוב עברית", color: "#FFD700", icon: "✈️" },
  { title: "שיעור שני", subtitle: "פעלים נפוצים", color: "#FFFFFF", icon: "📚" },
  { title: "שיעור שלישי", subtitle: "תארים", color: "#FFD700", icon: "📝" },
  { title: "שיעור רביעי", subtitle: "שימושים נוספים בשפה", color: "#FFFFFF", icon: "💬" },
];

const Timeline = () => {
  return (
    <div style={{
      background: "linear-gradient(to bottom, #000428, #004e92)",
      padding: "20px",
      minHeight: "100vh",
      textAlign: "center",
    }}>
      {lessons.map((lesson, index) => (
        <div key={index} style={{
          background: lesson.color,
          color: "#000",
          padding: "10px",
          borderRadius: "50%",
          width: "100px",
          height: "100px",
          margin: "20px auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          position: "relative",
        }}>
          <div style={{ fontSize: "24px" }}>{lesson.icon}</div>
          <div>{lesson.title}</div>
          <div style={{ fontSize: "12px" }}>{lesson.subtitle}</div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
