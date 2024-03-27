import { useEffect, useState } from "react";

function LoadItems() {
    const iItemsCount = 100;
    const [count, setCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        retrieveItems();
    }, [count]);

    const retrieveItems = async function () {
        setIsLoading(true);
        try {
            const incomingData = await fetch(`https://dummyjson.com/products?limit=8&skip=${count === 0 ? 0 : count * 8}`);
            const parsedData = await incomingData.json();

            if (parsedData.products) {
                setProducts((previousData) => [...previousData, ...parsedData.products]);
                if (products.length >= iItemsCount) {
                    setButtonDisabled(true);
                }
                setError("");
            }
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    }

    function handleClick(e) {
        e.preventDefault();
        setCount(count + 1);

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
    } else if (products.length) {
        return (
            <div className="mainContainer">
                <div className="productContainer">
                    {
                        products.map((item) => (
                            <div className="product" key={item.id}>
                                <img src={item.thumbnail} alt={item.description} />
                                <p>{item.title}</p>
                            </div>
                        ))
                    }
                </div>
                <hr /><br />
                <button onClick={handleClick} disabled={buttonDisabled}>Load more items</button>
                {buttonDisabled ? <p>No more items are available at the moment</p> : null}
            </div>
        );
    } else {
        return (
            <h1>No items are available at the moment. Please try again later!</h1>
        );
    }
}

export default LoadItems;