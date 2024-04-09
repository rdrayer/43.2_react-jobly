import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './api';

function CompanyDetail() {
    const [company, setCompany] = useState(null);
    // extract handle from URL params
    const { handle } = useParams();

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const companyData = await JoblyApi.getCompany(handle);
                // update state with fetched company
                setCompany(companyData);
            } catch (err) {
                console.error('Error fetching company', err);
            }
        };
    
        fetchCompany();
    }, [handle]);

    if (!company) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{company.name}</h2>
            <p>{company.description}</p>
            {company.logoURL && <img src={company.logoURL} alt={`${company.name} logo`} />}
            {company.jobs.map(j => (
                <div>{j.title}, {j.salary} <button>Apply</button></div>
            ))}
        </div>
    )
}

export default CompanyDetail;