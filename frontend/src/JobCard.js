// displays basic info about a job
// it will be used within the job list component

function JobCard({ title, company_handle, salary }) {
    return (
        <div>
            <h2>{title}</h2>
            <p>{company_handle}</p>
            <p>{salary}</p>
        </div>
    )
}

export default JobCard;