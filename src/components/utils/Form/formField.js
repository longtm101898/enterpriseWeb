import React from "react";
import { hidden } from "ansi-colors";

const FormField = ({ formdata, change, id, type, showHide }) => {
  const showError = () => {
    let errorMessage = null;

    if (
      (formdata.validation.length && !formdata.valid) ||
      formdata.validationMessage
    ) {
      errorMessage = (
        <div className="alert alert-danger" role="alert">
          {formdata.validationMessage}
        </div>
      );
    }
    return errorMessage;
  };

  const renderTemplate = () => {
    let formTemplate = null;

    switch (formdata.element) {
      case "input":
        formTemplate = (
          <div className="form-group">
            <div className={showHide ? "input-group" : ""}>
              {formdata.showlabel ? (
                <div className="custom-control-label">
                  {formdata.config.label}
                </div>
              ) : null}
              <input
                {...formdata.config}
                type={type ? type : formdata.config.type}
                value={formdata.value ? formdata.value : ""}
                onBlur={event => change({ event, id, blur: true })}
                onChange={event => change({ event, id })}
              />
              {showHide ? showHide : ""}
            </div>
            {showError()}
          </div>
        );
        break;
      case "select":
        formTemplate = (
          <div className="form-group">
            {formdata.showlabel ? (
              <div className="custom-control-label">
                {formdata.config.label}
              </div>
            ) : null}
            <select
              className="form-control"
              value={formdata.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            >
              <option value="">Select</option>
              {formdata.config.options.map(item => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
            {showError()}
          </div>
        );
        break;
      case "textarea":
        formTemplate = (
          <div className="form-group">
            {formdata.showlabel ? (
              <div className="label_inputs">{formdata.config.label}</div>
            ) : null}
            <textarea
              {...formdata.config}
              value={formdata.value ? formdata.value : ""}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      default:
        formTemplate = null;
        break;
    }

    return formTemplate;
  };

  return <div>{renderTemplate()}</div>;
};

export default FormField;
