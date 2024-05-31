import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from 'react';

export function SearchMetada({ data, responseTime }) {
    const [commonAuthor, setCommonAuthor] = useState(0);

    useEffect(() => {
        if (!data) return;

        const authors = extractAuthors(data.items);
        const commonAuthor = findMostCommonAuthor(authors);
        setCommonAuthor(commonAuthor);
    },
        [data]);

    const findMostCommonAuthor = (authors) => {
        if (authors.length === 0) return null;

        const authorCounts = authors.reduce((counts, author) => {
            counts[author] = (counts[author] || 0) + 1;
            return counts;
        }, {});

        return Object.keys(authorCounts).reduce((mostCommon, currentAuthor) => (authorCounts[mostCommon] > authorCounts[currentAuthor] ? mostCommon : currentAuthor));
    };

    function extractAuthors(books) {
        return books.flatMap(book => book.volumeInfo?.authors || []);
    }


    return (
        <div className="flex flex-col">
            <div>
                <Typography>Search Results: {data?.totalItems}</Typography>
            </div>
            <div>
                <Typography>Search Response Time: {responseTime} ms</Typography>
            </div>
            <div>
                <Typography>Earliest Publication Date: {data?.items[data?.items.length - 1].volumeInfo?.publishedDate}</Typography>
            </div>
            <div>
                <Typography>Latest Publication Date: {data?.items[0].volumeInfo?.publishedDate}</Typography>
            </div>
            <div>
                <Typography>Most Common Author: {commonAuthor}</Typography>
            </div>
        </div>
    );
}
