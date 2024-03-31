// displays basic info about a company
// it will be used within the company list component
import React from "react";
import { Link } from 'react-router-dom';

function CompanyCard({ name, description, handle }) {
    return (
        <div>
            <Link to={`/companies/${handle}`}>
                <h2>{name}</h2>
            </Link>
            <p>{description}</p>
        </div>

    )
}

export default CompanyCard;