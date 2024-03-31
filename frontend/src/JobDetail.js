import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './api';

function JobDetail() {
    const [job, setJob] = useState(null);
    // extract handle from URL params
    const { id } = useParams();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const jobData = await JoblyApi.getJob(id);
                // update state with fetched company
                setJob(jobData);
            } catch (err) {
                console.error('Error fetching job', err);
            }
        };
    
        fetchJob();
    }, [id]);

    if (!job) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{job.title}</h2>
            <p>{job.salary}</p>
            <p>{job.company.handle}</p>
        </div>
    )
}

export default JobDetail;