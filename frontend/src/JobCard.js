// displays basic info about a job
// it will be used within the job list component
import { Link } from 'react-router-dom';

function JobCard({ id, title, companyHandle, salary }) {
    return (
        <div>
            <Link to={`/jobs/${id}`}>
                <h2>{title}</h2>
            </Link>
            <p>{companyHandle}</p>
            <p>{salary}</p>
        </div>
    )
}

export default JobCard;