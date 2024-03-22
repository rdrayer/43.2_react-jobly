import React, { useState, useEffect, } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";

function CompanyList() {
    console.debug("CompanyList");
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // to fetch the list of companies from the backend when the component mounts
    useEffect(function getCompaniesOnMount() {
        console.debug("CompanyList useEffect getCompaniesOnMount");
        search();
    }, []);

    // triggered by search form submit, reloads companies
    async function search(name) {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }

    //if (!companies) return (<p>help</p>);

    const handleSearch = async (evt) => {
        evt.preventDefault();
        // todo
        setSearchTerm(evt.target.value);
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
            {companies.length
                ? (
                    <div>
                        {companies.map(c => (
                            <CompanyCard 
                                key={c.handle} 
                                handle={c.handle}
                                name={c.name} 
                            />
                        ))}
                    </div>
                ) : (
                    <p>Sorry, no results</p>
                )}
        </div>
    );
}

export default CompanyList;