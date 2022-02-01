import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Quality = ({ qualities }) => {
    const { getQualities } = useQualities();
    const qual = getQualities(qualities);
    return (
        <>
            {qual.map(q => (
                <span
                    style={{ margin: "5px" }}
                    key={q._id}
                    className={`badge bg-${q.color}`}
                >
                    {q.name}
                </span>
            ))}
        </>
    );
};

Quality.propTypes = {
    qualities: PropTypes.array
};
export default Quality;
