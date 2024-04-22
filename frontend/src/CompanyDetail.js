import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from './App';
import JoblyApi from './api';

function CompanyDetail() {
    const { currentUser } = useContext(UserContext);
    const [company, setCompany] = useState(null);
    const [appliedJobIds, setAppliedJobIds] = useState([]);
    // extract handle from URL params
    const { handle } = useParams();

    useEffect(() => {
        const fetchCompanyAndAppliedJobs = async () => {
            try {
                const companyData = await JoblyApi.getCompany(handle);
                const userData = await JoblyApi.getCurrentUser(currentUser.username);
                const userJobs = userData.applications;
                setCompany(companyData);
                setAppliedJobIds(userJobs);
            } catch (err) {
                console.error('Error fetching data', err);
            }
        };
    
        fetchCompanyAndAppliedJobs();
    }, [handle, currentUser.username]);
    

    if (!company) {
        return <div>Loading...</div>;
    }

    const applyForJob = async (jobId) => {
        if (appliedJobIds.includes(jobId)) {
            console.debug("Already applied to job", jobId);
            return;
        }
        try {
            await JoblyApi.applyToJob(currentUser.username, jobId);
            setAppliedJobIds(prevIds => [...prevIds, jobId]);
            console.debug("Applied to job", jobId);
        } catch (error) {
            console.error("Error applying to job", jobId, error);
        }
    };

    return (
        <div>
            <h2>{company.name}</h2>
            <p>{company.description}</p>
            {company.logoURL && <img src={company.logoURL} alt={`${company.name} logo`} />}
            {company.jobs.map(j => (
                <div key={j.id}>
                    <p>{j.title}, {j.salary} </p>
                    {appliedJobIds.includes(j.id) ? (
                        <button disabled>Applied</button>
                    ) : (
                        <button onClick={() => applyForJob(j.id)}>Apply</button>
                    )}
                </div>
            ))}
        </div>
    )
}

export default CompanyDetail;