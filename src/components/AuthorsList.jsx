import { Typography } from "@material-tailwind/react";

export function AuthorsList({ authrorsList }) {
    return (
        <div className="flex gap-1">
            {authrorsList?.map((author, index) => <Typography key={author} variant="">
                {author}{`${index == authrorsList.length - 1 ? '' : ','}`}
            </Typography>
            )}
        </div>
    );
}
