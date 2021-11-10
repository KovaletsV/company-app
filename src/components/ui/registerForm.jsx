import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import API from "../../API";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkboxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        license: false,
    });
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState({});
    const [errors, setErrors] = useState({});
    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfessions(data));
        API.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "isRequired",
            },
            isEmail: {
                message: "Email is not correct",
            },
        },
        password: {
            isRequired: {
                message: "isRequired",
            },
            isCapitalSymbol: {
                message: "Password must have a capital letter",
            },
            isConfigDigit: {
                message: "Password must have a number",
            },
            min: {
                message: "Password must been include 8 or more symbols",
                value: 8,
            },
        },
        profession: {
            isRequired: {
                message: "is Required",
            },
        },
        qualities: {
            isRequired: {
                message: "is Required",
            },
        },
        license: {
            isRequired: {
                message:
                    "You can not use our service without license agreement",
            },
        },
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return isValid;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Password"
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                defaultOption="Choose..."
                label="Choose your profession"
                value={data.profession}
                onChange={handleChange}
                error={errors.profession}
                options={professions}
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" },
                ]}
                value={data.sex}
                onChange={handleChange}
                name="sex"
                label="Choose your male"
            />
            <MultiSelectField
                options={qualities}
                onChange={handleChange}
                name="qualities"
                label="Choose your qualities"
                defaultValue={data.qualities}
                error={errors.qualities}
            />
            <CheckBoxField
                value={data.license}
                onChange={handleChange}
                name="license"
            >
                Сonfirm the <a>license agreement</a>
            </CheckBoxField>
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Send
            </button>
        </form>
    );
};

export default RegisterForm;
