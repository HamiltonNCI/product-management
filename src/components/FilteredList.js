function FilteredList(props) {

    const userData = props.filteredUsers;

    if (userData.length) {
        return (
            <div>
                <ul>
                    {
                        userData.map((userName, index) => (
                            <li key={index} onClick={props.handleClick}>
                                {userName}
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    } else {
        return null;
    }
}

export default FilteredList;