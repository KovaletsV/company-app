import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import API from "../../API";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";

const EditPage = () => {
    const { userId } = useParams();
    const [data, setData] = useState({
        name: "",
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
        API.users.getById(userId).then(user =>
            setData({
                ...user,
                email: user.email ? user.email : "",
            }),
        );
        API.professions.fetchAll().then(data => setProfessions(data));
        API.qualities.fetchAll().then(data => setQualities(data));
    }, []);
    const history = useHistory();
    const handleChange = target => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "isRequired",
            },
        },
        email: {
            isRequired: {
                message: "isRequired",
            },
            isEmail: {
                message: "Email is not correct",
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
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return isValid;
    };
    const getQualities = elements => {
        const qualitiesQrray = [];
        for (const elem of elements) {
            for (const qualy in qualities) {
                if (elem.value === qualities[qualy]._id) {
                    qualitiesQrray.push(qualities[qualy]);
                }
            }
        }
        return qualitiesQrray;
    };
    const getProfessionById = id => {
        for (const prof in professions) {
            const profData = professions[prof];
            if (profData._id === id) return profData;
        }
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = e => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        API.users
            .update(data._id, {
                ...data,
                profession: getProfessionById(data.profession),
                qualities: getQualities(data.qualities),
            })
            .then(() => history.push(`/users/${data._id}`));
    };
    return (
        <div className="input-group mb-3 d-flex justify-content-center">
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <TextField
                    label="Email"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
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
                <button
                    type="submit"
                    disabled={!isValid}
                    className="btn btn-primary w-100 mx-auto"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default EditPage;
