// JsonEditor.js
import React, { useState } from "react";
import FormRenderer from "../components/FormRenderer";

const JsonEditor = ({ onJsonSubmit }) => {
  const [jsonText, setJsonText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleOnChange = (event) => {
    setJsonText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const parsedJson = JSON.parse(jsonText);
      onJsonSubmit(parsedJson);
      setSubmitted(true);
    } catch (error) {
      // Handle JSON parsing error, if needed
      console.error("Error parsing JSON:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={10}
          cols={50}
          value={jsonText}
          onChange={handleOnChange}
          placeholder="Paste your UI Schema JSON here"
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <button
            type="submit"
            style={{
              height: "35px",
              width: "80px",
              fontSize: "20px",
              backgroundColor: "green",
              color: "white",
              borderRadius: "5px",
            }}
          >
            Submit
          </button>
        </div>
      </form>
      {submitted && <FormRenderer />}
    </div>
  );
};

export default JsonEditor;
