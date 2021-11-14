import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, label, onChange, name, defaultValue }) => {
    const defaultValueToArray = defaultValue.map(value => ({
        label: value.name,
        value: value._id,
    }));
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map(optionName => ({
                  label: options[optionName].name,
                  value: options[optionName]._id,
              }))
            : options;
    const handleChange = value => {
        onChange({ name: name, value });
    };
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                value={defaultValueToArray}
                closeMenuOnSelect={false}
                options={optionsArray}
                onChange={handleChange}
                name={name}
                className="basic-multi-select"
                classNamePrefix="select"
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    defaultValue: PropTypes.array,
};

export default MultiSelectField;
