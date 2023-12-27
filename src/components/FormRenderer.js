// src/components/FormRenderer.js
import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import Switch from "react-switch";

const FormRenderer = ({ uiSchema }) => {

  
  const [isSwitchChecked, setSwitchChecked] = useState(false);
  const [isSwitchChecked2, setSwitchChecked2] = useState(false);
  const [selectedButtonOption, setSelectedButtonOption] = useState(null);

  const [isChecked, setIsChecked] = useState(true);

   if (!uiSchema) {
     console.error("uiSchema is undefined");
     return null;
   }

  const handleChange2 = () => {
    setSwitchChecked2(!isSwitchChecked2);
  };

  const renderElement = (element) => {
    const isRequired = element.validate && element.validate.required;

    const info = (element) => (element.description === "" ? false : true);

    const hidedetails = element.hideDetails;

    const defaultSelectedOption =
      element.uiType === "Radio" ? element.validate.defaultValue : null;

    const handleRadioChange = (value) => {
      setSelectedButtonOption((prevValue) => {
        if (prevValue === value) {
          return null;
        } else {
          return value;
        }
      });
      //console.log("Selected Button Option:", selectedButtonOption);
    };

    const handleChecked = () => {
      setIsChecked(!isChecked);
    }

    const handleChange = () => {
      setSwitchChecked(!isSwitchChecked);
    };

    const shouldHideElement = isSwitchChecked2 && !isRequired;

    switch (element.uiType) {
      case "Input":
        return (
          <div
            className={`name div ${shouldHideElement ? "hidden" : ""}`}
            key={element.jsonKey}
          >
            <label htmlFor={element.jsonKey}>
              {element.label}
              {isRequired && <span className="required-indicator">*</span>}
              {info(element) && (
                <div className="tooltip">
                  <FaInfoCircle />
                  <div className="tooltiptext">
                    <span>{element.label}</span>
                    <hr />
                    <span>{element.description}</span>
                  </div>
                </div>
              )}
            </label>
            <input
              type="text"
              id={element.jsonKey}
              placeholder={element.placeholder}
              required={isRequired}
            />
          </div>
        );
      case "Group":
        return (
          <div
            key={element.jsonKey}
            className={`Group ${shouldHideElement ? "hidden" : ""}`}
          >
            <label>
              {element.label}
              {isRequired && <span className="required-indicator">*</span>}
              {info(element) && (
                <div className="tooltip">
                  <FaInfoCircle />
                  <div className="tooltiptext">
                    <span>{element.label}</span>
                    <hr />
                    <span>{element.description}</span>
                  </div>
                </div>
              )}
            </label>
            <hr />
            {element.subParameters &&
              element.subParameters.map((subElement) =>
                renderElement(subElement)
              )}
            
          </div>
        );
      case "Select":
        return (
          <div
            key={element.jsonKey}
            className={`select ${shouldHideElement ? "hidden" : ""}`}
          >
            <label htmlFor={element.jsonKey}>
              {element.label}
              {isRequired && <span className="required-indicator">*</span>}
            </label>
            <select id={element.jsonKey} required={isRequired}>
              {element.validate.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      case "Radio":
        return (
          <div
            key={element.jsonKey}
            className={`radio ${shouldHideElement ? "hidden" : ""}`}
          >
            <label>
              {element.label}
              {isRequired && <span className="required-indicator">*</span>}
            </label>
            {element.validate.options.map((option) => (
              <div
                key={option.value}
                className={`opt ${
                  (selectedButtonOption === option.value ||
                    (defaultSelectedOption === option.value &&
                      selectedButtonOption === null)) &&
                  "selected"
                }`}
              >
                <input
                  type="button"
                  id={option.value}
                  name={element.jsonKey}
                  value={option.label}
                  onClick={() => handleRadioChange(option.value)}
                  required={isRequired}
                  checked={
                    selectedButtonOption === option.value ||
                    defaultSelectedOption === option.value
                  }
                />
                {(selectedButtonOption === option.value ||
                  defaultSelectedOption === option.value) &&
                  element.subParameters &&
                  element.subParameters.map((subElement) =>
                    renderElement(subElement)
                  )}
              </div>
            ))}
          </div>
        );
      case "Ignore":
        //console.log("Conditions:", element.conditions);
        //console.log("Selected Button Option:", selectedButtonOption);
        const isConditionMet = element.conditions.some((condition) => {
          return (
            condition.jsonKey === "pizza_type.type" &&
            condition.op === "==" &&
            condition.value === selectedButtonOption &&
            condition.action === "enable"
          );
        });
        return (
          <div
            key={element.jsonKey}
            className={`ignore ${shouldHideElement ? "hidden" : ""}`}
          >
            {isConditionMet &&
              element.subParameters &&
              element.subParameters.map((subElement) =>
                renderElement(subElement)
              )}
          </div>
        );
      case "Switch":
        return (
          <div
            key={element.jsonKey}
            className={`switch ${shouldHideElement ? "hidden" : ""}`}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleChecked}
            />
            <label htmlFor={element.jsonKey}>
              {element.label}
              {isRequired && <span className="required-indicator">*</span>}
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form>
      {uiSchema.map((element) => renderElement(element))}
      <div className="final">
        <div className="hideDetails">
          <span>Hide Advanced Details </span>
          <span>
            <Switch
              onColor="#87CEFA"
              onHandleColor="#87CEFA"
              checked={isSwitchChecked2}
              onChange={handleChange2}
            />
          </span>
        </div>
        <div className="div2">
          <button className="btn cancel">Cancel</button>
          <button className="btn submit">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default FormRenderer;
