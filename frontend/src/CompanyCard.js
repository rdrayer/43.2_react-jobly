// displays basic info about a company
// it will be used within the company list component

function CompanyCard({ name, description, logoURL }) {
    return (
        <div>
            <h2>{name}</h2>
            <p>{description}</p>
        </div>
    )
}

export default CompanyCard;