import { useState } from "react";
import { useEffect } from "react";
import FilteredList from "./FilteredList";

function UserSearch(props) {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        retrieveUsersList();
    }, []);

    const retrieveUsersList = async function () {
        try {
            const incomingData = await fetch("https://dummyjson.com/users");
            const parsedData = await incomingData.json();

            if (parsedData.users) {
                const usersFirstNameList = parsedData.users.map((user) => user.firstName);
                setUsers(usersFirstNameList);
                setError("");
            }
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    }

    function handleChange(e) {
        e.preventDefault();
        const query = e.target.value.toLowerCase();
        setQuery(query);

        if (query.length && users.length) {
            const filteredData = users.filter((item) => item.toLowerCase().indexOf(query) >= 0);
            setFilteredUsers(filteredData);
        } else {
            setFilteredUsers([]);
        }
    }

    function handleClick(e) {
        e.preventDefault();
        setQuery(e.target.innerText);
        setFilteredUsers([]);

    }

    if (isLoading) {
        return (
            <div>
                <h1>Loading data from server! Please wait...</h1>
            </div>
        );
    } else if (error) {
        return (
            <div>
                <h1>{error}</h1>
            </div>
        );
    } else {
        return (
            <div>
                <h3>Search and select your username below</h3>
                <input value={query} onChange={handleChange} />
                <FilteredList filteredUsers={filteredUsers} handleClick={handleClick} />
                <br /><hr />
            </div>
        );
    }
}

export default UserSearch;