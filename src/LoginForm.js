import Axios from "axios";
import React, { useState } from "react";
import ErrorPasswordMessage from "./ErrorPasswordMessage";

const LoginForm = ({ onSuccess, setUsername,setUserRole,username }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //till you will get the realy api
  const handleLoginFormForTheMeantime = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = Object.fromEntries(formData.entries());

    setUsername(entries.username); 
    setPassword(entries.password); 
    if(entries.password==='12345')
      setUserRole("admin")
    if (entries.password === '1234'||entries.password==='12345') {
        onSuccess();
    } else {
        setError("אין הרשאה");
        // setTimeout(() => {
        //     window.location.href = "http://manage.ridosoft.com";
        // }, 300);
    }
};

  

  const handleLoginForm = async (e) => {
    e.preventDefault();

    // קבלת הנתונים מהטופס בעת שליחה
    const formData = new FormData(e.target);
    const entries = Object.fromEntries(formData.entries());
   setUsername(entries.username)
    const password = entries.password; // שליפת הסיסמה מהטופס

    try {
      const { data } = await Axios.post("url/to/check/if/its/a/valid/password", { 
        password, 
        username 
      });
    
      if (data === true) {
        onSuccess();
      } else {
        setError("אין הרשאה!");
      }
    } catch (error) {
      console.error("שגיאה בחיבור לשרת:", error);
      setError("שגיאה בחיבור לשרת.");
    }
    
  };

  return (
    <form className="password-container" onSubmit={handleLoginFormForTheMeantime}>
      
      {error && <ErrorPasswordMessage message={error} />}
      <h1>כניסה</h1>
      <input name="username" placeholder="הכנס שם משתמש" required />
      
      <input name="password" required type="password" placeholder="הכנס סיסמה" />
      
      <button type="submit">כניסה</button>
    </form>
  );
};

export default LoginForm;
