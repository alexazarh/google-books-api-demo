import { Input, Typography, Button } from "@material-tailwind/react";
import {useState} from 'react';
import { BookSearchResultItem } from "./BookSearchResultItem";
import { SearchMetada } from "./SearchMetada";

const pageSize = 10;

export default function SearchMain() {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [responseTime, setResponseTime] = useState(0);
    const [searchResult, setSearchResult] = useState(null);

    const onQueryChange = ({ target }) => setQuery(target.value);

    const search = async () => {
        setPage(0);
        getPageData();
    }

    const getPageData = async () => {        
        var startTime = window.performance.now();
        const response  = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${page}&maxResults=${pageSize}&orderBy=newest`);
        var endTime = window.performance.now();
        var duration = endTime - startTime;        
        setResponseTime(duration);

        const data = await response.json();
        console.log(data)
        setSearchResult(data);

        setTotalPages(calcTotalPages(data?.totalItems));
    }
    
    const pageBack = () => {
        if(page == 0) return;

        setPage(page-1);
        getPageData();
    }

    const pageNext = () => {
        setPage(page+1);
        getPageData();
    }

    const calcTotalPages = (totalItems) => {
        if(!totalItems) return 0;

        if(totalItems % pageSize == 0) 
            return totalItems / pageSize;
        else
            return Math.floor(totalItems / pageSize) + 1;
    }

    return(
        <div className="flex flex-col w-full">
            <div className="flex flex-row">
                <div className="relative flex w-full">
                    <Input
                        type="search"
                        label="Enter Search Query"
                        value={query}
                        onChange={onQueryChange}
                        className="pr-20"
                        containerProps={{
                            className: "min-w-0",
                        }}
                    />
                    <Button
                        size="sm"
                        color={query ? "gray" : "blue-gray"}
                        disabled={!query}
                        className="!absolute right-1 top-1 rounded"
                        onClick={search}
                    >
                        Search
                    </Button>
                </div>
            </div>

            {searchResult &&
                (<>
                    <div className="pb-4 pt-6"> 
                        <SearchMetada data={searchResult} responseTime={responseTime}/>
                    </div>
                    <div className="pb-4 pt-6">
                        <Typography variant="h5">Search Results</Typography>
                    </div>                    
                
                    <div className="flex flex-col">
                        <ol>
                            {
                                searchResult?.items?.map((item, index) => <BookSearchResultItem item={item} key={item.etag} />)
                            }
                        </ol>
                    </div>

                    <div className="flex flex-row pt-4 items-center">
                        <div className="basis-10">
                            <Button variant="text" onClick={pageBack} disabled={page == 0}>Back</Button>
                        </div>
                        <div className="flex-shrink flex-grow text-center align-middle ">
                            <Typography variant="small">Page {page+1} / {totalPages}</Typography>
                        </div>
                        <div className="basis-10">
                            <Button variant="text" onClick={pageNext} disabled={page >= totalPages - 1}>Next</Button>
                        </div>
                    </div>
                </>)
            }
        </div>
    )
}
