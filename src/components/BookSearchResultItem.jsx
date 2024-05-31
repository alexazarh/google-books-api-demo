import { Typography, Collapse } from "@material-tailwind/react";
import { useState } from 'react';
import { AuthorsList } from "./AuthorsList";

export function BookSearchResultItem({ item }) {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen(!open);

    return (
        <li>
            <div className="flex py-2 gap-2 hover:cursor-pointer hover:text-blue-600" onClick={toggleOpen}>
                <div>
                    <AuthorsList authrorsList={item?.volumeInfo?.authors} />
                </div>
                <div><Typography variant="">-</Typography></div>
                <div><Typography variant="">{item?.volumeInfo?.title}</Typography></div>
            </div>
            <Collapse open={open} className={`${open ? 'mb-4' : ''}`}>
                <Typography variant="small">
                    {item?.volumeInfo?.description
                        ? item.volumeInfo.description
                        : "No description found"}
                </Typography>
            </Collapse>
        </li>
    );
}
