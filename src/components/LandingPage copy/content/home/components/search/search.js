import { useEffect, useState } from 'react';
import './search.css'

export default function Search(props) {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    // Use effect hook to fetch the data from an API or a local source
    useEffect(() => {
        // Fetch the data here and update the state
        setData(props.users);
    }, [props.users]);

    // Use effect hook to update the filtered results based on the query
    useEffect(() => {
        // Filter the data by checking if the query is included in any of the object values
        const results = data.filter((item) =>
            Object.values(item).some((key, value) =>
                value.toString().toLowerCase().includes(query.toLowerCase())
            )
        );
        // Update the state with the filtered results
        setFilteredData(results);
    }, [query]);

    // A function to handle the input change and update the query state
    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div className="divMainBodySearchPage">
            <input className='divMainBodyUserSearch' type="text" placeholder='Procurar por Usuário' value={query} onChange={handleChange} />
            <div className='divMainBodySearchPageUsersMap'>
                {filteredData.map((item) => (
                    <div className='divSearchFilteredContentUser' key={item.id}>
                        <img src={require(`../../../../assets/images/borders/${item.moldura}_border.png`)}/>
                        <img src={item.icon} alt={item.username + "_icon"}/>
                        <label className='divSearchFilteredNameUser'>{item.username}</label>
                        <label className='divSearchFilteredTitulo'>{item.titulo}</label>

                        <div className='divSearchFilteredBackground' onMouseLeave={(e) => {e.target.parentNode.style.backgroundColor = '#313131'; console.log(e)}} onMouseEnter={(e) => e.target.parentNode.style.backgroundColor = '#101010'}/>
                    </div>
                ))}
            </div>
        </div>
    );
}