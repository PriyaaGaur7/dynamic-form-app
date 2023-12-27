// src/App.js
import React, { useState } from "react";
import JsonEditor from "../components/JsonEditor";
import FormRenderer from "../components/FormRenderer";
import "../App.css";

function App() {
  const [uiSchema, setUiSchema] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleJsonSubmit = (newUiSchema) => {
    setUiSchema(newUiSchema);
    setSubmitted(true);
  };

  return (
    <div className="app-container">
      <div className="json-editor">
        <JsonEditor onJsonSubmit={handleJsonSubmit} />
      </div>
      {submitted && (
        <div className="form-renderer">
          <FormRenderer uiSchema={uiSchema} />
        </div>
      )}
    </div>
  );
}

export default App;
