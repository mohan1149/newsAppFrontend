import React, { useState, useEffect } from 'react';
import { useStore } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNews } from '../../apis/apis';

const Home = (props) => {
    const store = useStore();
    const [news, setNews] = useState(store.getState().app.news);
    const [filerted, setFiltered] = useState(store.getState().app.news);
    const [showSidebar, setShowSidebar] = useState(false);
    const [render, setRender] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filterOptions, setFilterOptions] = useState([]);
    const [sort, setSort] = useState('asc');
    const [date, setDate] = useState(new Date().toJSON().slice(0, 10));
    const [page, setPage] = useState(1);
    useEffect(() => {
        store.subscribe(() => {
            setNews(store.getState().app.news);
            setFiltered(store.getState().app.news);
            setRender(!render);
        });
    }, [news]);

    let authors = store.getState().app.authors;
    authors = authors.filter(value => value !== null);
    authors = authors.filter((value, index, self) => {
        return value !== null && index === self.indexOf(value);
    });
    let sources = store.getState().app.sources;
    sources = sources.filter(value => value !== null);
    sources = sources.filter((value, index, self) => {
        return value !== null && index === self.indexOf(value);
    });
    let categories = store.getState().app.categories;
    categories = categories.filter(value => value !== null);
    categories = categories.filter((value, index, self) => {
        return value !== null && index === self.indexOf(value);
    });

    const addFilter = (option) => {
        let index = filterOptions.indexOf(option);
        let options = filterOptions;
        if (index === -1) {
            options.push(option);
        } else {
            options.splice(index, 1);
        }
        setFilterOptions(options);
    }
    const filterNews = () => {
        let arr = news;
        if (sort === "desc") {
            arr = arr.slice().sort((a, b) => new Date(a.publishedAt) > new Date(b.publishedAt));
        } else {
            arr = arr.slice().sort((a, b) => new Date(a.publishedAt) < new Date(b.publishedAt));
        }
        if (filterOptions.length !== 0) {
            let moreFiltred = arr.filter((item) => {
                if (filterOptions.includes(item.author) || filterOptions.includes(item.source) || filterOptions.includes(item.category)) {
                    return true;
                } else {
                    return false;
                }
            })
            setFiltered(moreFiltred);
        } else {
            setFiltered(arr);
        }
        setShowSidebar(!showSidebar);
    }
    const reloadNews = () => {
        let data = {
            date: date,
            uid: localStorage.getItem('_uid') !== null ? localStorage.getItem('_uid') : 0,
            page: page,
        }
        setLoading(true);
        getNews(data)
            .then((res) => {
                setNews(res.data);
                setFiltered(res.data);
                setLoading(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

    }


    return (
        <div>
            <div className="w3-sidebar w3-card w3-animate-right"
                style={{
                    width: '50%',
                    display: showSidebar ? 'block' : 'none',
                    right: 0,
                    height: '85vh'
                }}
            >
                <div className='w3-theme-d2 w3-padding-16 w3-margin w3-margin-bottom'>
                    <h2 className='w3-opacity'><strong>Filter News</strong></h2>
                    <button
                        onClick={() => {
                            setShowSidebar(!showSidebar);
                        }}
                        className='w3-red w3-btn w3-right'>Close</button>
                    <div>
                        <h5>
                            <strong>
                                Filter News By Published Date
                            </strong>
                        </h5>
                        <span className='w3-margin'>
                            <input type="checkbox" className="w3-check w3-margin-right" id={"asc"}
                                onChange={() => {
                                    setSort('asc');
                                }}
                                checked={sort === "asc" ? true : false}
                            />
                            <label htmlFor={"asc"}>{"Newest First"}</label>
                        </span>
                        <span className='w3-margin'>
                            <input type="checkbox" className="w3-check w3-margin-right" id={"desc"}
                                onChange={() => {
                                    setSort('desc');
                                }}
                                checked={sort === "desc" ? true : false}
                            />
                            <label htmlFor={"desc"}>{"Oldest First"}</label>
                        </span>
                        <span className='w3-margin'>
                            <label htmlFor="">Date</label>
                            <input type="date"
                                onChange={(e) => {
                                    setDate(e.target.value);
                                }}
                            />
                            <button className='w3-btn w3-teal w3-margin'
                                onClick={() => {
                                    reloadNews();
                                }}
                            >Apply{loading && <i className="fa fa-spinner w3-spin"></i>}</button>
                        </span>
                    </div>
                    <h3>Authors</h3>
                    {
                        authors.map((author, index) => {
                            return (
                                <div key={index} className="w3-margin">
                                    <input type="checkbox" className="w3-check w3-margin-right" id={"author_" + index}
                                        onChange={() => {
                                            addFilter(author);
                                        }}
                                    />
                                    <label htmlFor={"author_" + index}>{author}</label>
                                </div>
                            );
                        })
                    }
                    <h3>Sources</h3>
                    {
                        sources.map((source, index) => {
                            return (
                                <div key={index} className="w3-margin">
                                    <input type="checkbox" className="w3-check w3-margin-right" id={"source_" + index}
                                        onChange={() => {
                                            addFilter(source);
                                        }}
                                    />
                                    <label htmlFor={"source_" + index}>{source}</label>
                                </div>
                            );
                        })
                    }
                    <h3>Categories</h3>
                    {
                        categories.map((category, index) => {
                            return (
                                <div key={index} className="w3-margin">
                                    <input type="checkbox" className="w3-check w3-margin-right" id={"category_" + index}
                                        onChange={() => {
                                            addFilter(category);
                                        }}
                                    />
                                    <label htmlFor={"category_" + index}>{category}</label>
                                </div>
                            );
                        })
                    }
                    <button className='w3-teal w3-btn w3-margin'
                        onClick={() => {
                            filterNews();
                        }}
                    >Apply Filter</button>
                    <button className='w3-red w3-btn w3-margin'
                        onClick={() => {
                            setFilterOptions([]);
                            setFiltered(news);
                            var checkboxes = document.querySelectorAll("input[type='checkbox']");
                            checkboxes.forEach(function (checkbox) {
                                checkbox.checked = false;
                            });
                            setShowSidebar(!showSidebar);
                        }}
                    >Reset Filter</button>
                </div>
            </div>

            <h1 className='w3-padding-16 w3-margin'>Welcome to Innoscripta News</h1>
            <button className='w3-fixed w3-btn w3-teal w3-right'
                onClick={() => {
                    setShowSidebar(!showSidebar);
                }}
                style={{
                    position: 'fixed',
                    right: 15,
                    top: 150,
                }}
            >Filters</button>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>

                {
                    filerted.map((item, index) => {
                        return (
                            <div key={index} className={"news-item " + (index % 5 === 0 ? "w3-half" : "w3-quarter")}>
                                <div class="w3-card"
                                    style={{
                                        margin: 10,
                                        height: 500,
                                        overflow: 'hidden'
                                    }}
                                >
                                    <img src={item.urlToImage}
                                        style={{
                                            width: "100%",
                                            height: 300,
                                        }} class="w3-margin-bottom" />
                                    <span className='category-label'>{item.category}</span>

                                    <div class="limited-text">
                                        {item.title}
                                    </div>
                                    <p><strong className='w3-text-bold'>- {new Date(item.publishedAt).toLocaleString()}</strong></p>
                                    <Link to={"/view/" + encodeURIComponent(JSON.stringify(item))} className='w3-btn w3-teal'>More</Link>
                                </div>
                            </div>

                        );
                    })
                }
            </div>
            <div className='w3-padding-64 w3-center'>
                <button className='w3-btn w3-blue w3-large w3-margin'
                    onClick={() => {
                        if (page > 1) {
                            setPage(page - 1);
                            reloadNews();
                        }
                    }}
                >Prev {loading && <i className="fa fa-spinner w3-spin"></i>}</button>
                <button className='w3-btn w3-blue w3-large w3-margin'
                    onClick={() => {
                        setPage(page + 1);
                        reloadNews();
                    }}
                >Next  {loading && <i className="fa fa-spinner w3-spin"></i>}</button>
            </div>
        </div>
    );
}
export default Home;