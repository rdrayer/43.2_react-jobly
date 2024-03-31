import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";

function JobsList() {
    console.debug("jobs list");
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(function getJobsOnMount() {
        console.debug("JobsList useEffect getJobsOnMount");
        search();
    }, []);

    async function search(name) {
        let jobs = await JoblyApi.getJobs(name);
        setJobs(jobs);
    }

    const handleSearch = async (evt) => {
        evt.preventDefault();
        await search(searchTerm);
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