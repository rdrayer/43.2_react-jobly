import { useState, useEffect, useContext } from "react";
import { UserContext } from "./App";

function Home() {
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const { currentUser, logout } = useContext(UserContext);

    useEffect(() => {
        const message = sessionStorage.getItem('welcomeMessage');
        if (message) {
            setWelcomeMessage(message);
            sessionStorage.removeItem('welcomeMessage'); // clear message
        }
    }, []);

    return (
        <div>
            <h1>Jobly</h1>
            <h3>All the jobs in one, convenient place.</h3>
            {welcomeMessage && <h2>{welcomeMessage}</h2>}
            {currentUser ? (
                <p>
                    Welcome {currentUser.username}
                </p>
            ) : (
                <>

                </>
            )}
        </div>
        
    );
}

export default Home;