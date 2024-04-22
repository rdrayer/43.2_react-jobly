import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import { UserContext } from "./App";

function JobsList() {
    const { currentUser } = useContext(UserContext);
    const [jobs, setJobs] = useState([]);
    const [appliedJobIds, setAppliedJobIds] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(function getJobsOnMount() {
        console.debug("JobsList useEffect getJobsOnMount");
        search();
        getAppliedJobs();
    }, []);

    async function getAppliedJobs() {
        let appliedJobs = await JoblyApi.getCurrentUser(currentUser.username);
        let userJobs = appliedJobs.applications;
        setAppliedJobIds(userJobs);
    }

    async function search(name) {
        let jobs = await JoblyApi.getJobs(name);
        setJobs(jobs);
    }

    const handleSearch = async (evt) => {
        evt.preventDefault();
        await search(searchTerm);
    };

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
            <form onSubmit={handleSearch}>
                <input 
                    type="text"
                    placeholder="Enter search term..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {jobs.length
                ? (
                    <div>
                        {jobs.map(j => (
                            <JobCard 
                                key={j.id} 
                                id={j.id}
                                companyHandle={j.companyHandle}
                                title={j.title}
                                salary={j.salary}
                                hasApplied={appliedJobIds.includes(j.id)}
                                applyForJob={applyForJob}
                            />
                        ))}
                    </div>
                ) : (
                    <p>Sorry, no results</p>
                )}
        </div>
    )
}

export default JobsList;