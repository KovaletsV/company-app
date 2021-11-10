import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, label, onChange, name, error }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName].name,
                  value: options[optionName]._id,
              }))
            : options;
    const handleChange = (value) => {
        onChange({ name: name, value });
    };
    const getInputClasses = () => {
        return "basic-multi-select" + (error ? " is-invalid" : "");
    };
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                options={optionsArray}
                onChange={handleChange}
                name={name}
                className={getInputClasses()}
                classNamePrefix="select"
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
};

export default MultiSelectField;
