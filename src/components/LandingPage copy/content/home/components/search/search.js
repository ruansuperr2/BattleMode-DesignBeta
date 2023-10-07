import { useEffect, useState } from 'react';
import './search.css'

export default function Search(props) {
    const [queryUser, setQueryUser] = useState("");
    const [filteredUser, setFilteredUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);

    // Renderiza os jogos na página atual
    const usersAtual = filteredUser.slice(
        (currentPage - 1) * 10,
        currentPage * 10
    );

    useEffect(() => {
        const results = props.users.filter((item) =>
            item.username.toLowerCase().includes(queryUser.toLowerCase())
        );
        setFilteredUser(results);
        setNumberOfPages(Math.ceil(results.length / 10)); // 10 is the number of items per page
    }, [queryUser]);

    const handleChangeUser = (e) => {
        setQueryUser(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const [queryTeam, setQueryTeam] = useState("");
    const [filteredTeam, setFilteredTeam] = useState([]);
    const [currentTeamPage, setCurrentTeamPage] = useState(1);
    const [numberOfTeamPages, setNumberOfTeamPages] = useState(0);

    const timesAtual = filteredTeam.slice(
        (currentTeamPage - 1) * 10,
        currentTeamPage * 10
    );

    useEffect(() => {
        const results = props.times.filter((item) =>
            item.nome.toLowerCase().includes(queryTeam.toLowerCase())
        );
        setFilteredTeam(results);
        setNumberOfTeamPages(Math.ceil(results.length / 10)); // 10 is the number of items per page
    }, [queryTeam]);

    const handleChangeTeam = (e) => {
        setQueryTeam(e.target.value);
        setCurrentTeamPage(1);
    };

    const handlePageTeamChange = (newPage) => {
        setCurrentTeamPage(newPage);
    };
    return (
        <div className="divMainBodySearchPage">
            <div className="divMainBodyUsers">
                <input className='divMainBodyUserSearch' type="text" placeholder='Procurar por Usuário' value={queryUser} onChange={handleChangeUser} />
                <div className='divMainBodySearchPageUsersMap'>
                    {usersAtual.map((item) => (
                        <div className='divSearchFilteredContentUser' key={item.id}>
                            <img src={require(`../../../../assets/images/borders/${item.moldura}_border.png`)} />
                            <img src={item.icon} alt={item.username + "_icon"} />
                            <label className='divSearchFilteredNameUser'>{item.username}</label>
                            <label className='divSearchFilteredTitulo'>{item.titulo}</label>
                            <div className='divSearchFilteredBackground' onClick={(e) => props.setToUser(item.id)} onMouseLeave={(e) => { e.target.parentNode.style.backgroundColor = '#313131' }} onMouseEnter={(e) => e.target.parentNode.style.backgroundColor = '#101010'} />

                        </div>
                    ))}
                </div>
                <div className='pageSearch'>
                    <button disabled={currentPage === 1} className='btnPgDn btnPgCh' onClick={() => setCurrentPage(currentPage - 1)}>
                        {'<'}
                    </button>
                    <div className="paginacao">
                        {[...Array(numberOfPages)].map((_, i) => (
                            <div key={i}>
                                <button
                                    href="#"
                                    onClick={() => handlePageChange(i + 1)}
                                    className={currentPage === i + 1 ? "active" : ""}
                                    disabled={i === currentPage - 1}
                                    style={
                                        i === currentPage
                                            ? { backgroundColor: "#111111", color: "white" }
                                            : {}
                                    }
                                >
                                    {i + 1}
                                </button>
                            </div>
                        ))}
                    </div>
                    <button disabled={currentPage === Array(numberOfPages).fill(null).length} className='btnPgUp btnPgCh' onClick={() => setCurrentPage(currentPage + 1)}>
                        {'>'}
                    </button>
                </div>
            </div>
            <div className="divMainBodyTimes">
                <input className='divMainBodyTeamSearch' type="text" placeholder='Procurar por Equipe' value={queryTeam} onChange={handleChangeTeam} />
                <div className='divMainBodySearchPageUsersMap'>
                    {timesAtual.map((item) => (
                        <div className='divSearchFilteredContentTime' key={item.id} style={{ backgroundImage: `url(${item.imgFundo})` }}>
                            <img src={item.logo} alt={item.nome + "_icon"} />
                            <label className='divSearchFilteredNameTime'>{item.nome}</label>
                            <label className='divSearchFilteredTag'>{item.tag}</label>

                            <div className='divSearchFilteredBackground' onMouseLeave={(e) => { e.target.parentNode.style.backgroundColor = '#313131' }} onMouseEnter={(e) => e.target.parentNode.style.backgroundColor = '#101010'} />
                        </div>
                    ))}
                </div>
                <div className='pageSearch'>
                    <button disabled={currentTeamPage === 1} className='btnPgDn btnPgCh' onClick={() => setCurrentTeamPage(currentTeamPage - 1)}>
                        {'<'}
                    </button>
                    <div className="paginacao">
                        {[...Array(numberOfTeamPages)].map((_, i) => (
                            <div key={i}>
                                <button
                                    href="#"
                                    onClick={() => handlePageTeamChange(i + 1)}
                                    className={currentTeamPage === i + 1 ? "active" : ""}
                                    disabled={i === currentTeamPage - 1}
                                    style={
                                        i === currentTeamPage
                                            ? { backgroundColor: "#111111", color: "white" }
                                            : {}
                                    }
                                
                                >
                                    {i + 1}
                                </button>
                            </div>
                        ))}
                    </div>
                    <button disabled={currentTeamPage === Array(numberOfTeamPages).fill(null).length} className='btnPgUp btnPgCh' onClick={() => setCurrentTeamPage(currentTeamPage + 1)}>
                        {'>'}
                    </button>
                </div>
            </div>
        </div>
    );
}