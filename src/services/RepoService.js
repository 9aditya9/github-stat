export const GetRepos = async ({ username, limit = 10, currentPage = 1 }) => {
    const res = await fetch(
        `https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=${limit}`
    );
    // console.log("heere is headers")
    // pagination functionality
    // console.log(parseInt(getLink("last").split("=")[1].split("&")[0]));
    // console.log(res.headers.get('Link').trim().split(',').forEach((item)=>console.log(item.split(';')[1].split('=')[1].includes("last"))));
    if (res.status === 200) {
        function getLink(rel) {
            console.log(res.headers.get("Link"));
            const links =
                res.headers.get("Link") != null
                    ? res.headers.get("Link").split(",")
                    : [];
            for (let i = 0; i < links.length; i++) {
                const link = links[i].split(";");
                if (link[1].includes(rel)) {
                    return link[0].slice(2, -1);
                }
            }
            return null;
        }
        if(getLink("last")!=null){
        const next = getLink("next");
        const prev = getLink("prev");
        const first = getLink("first");
        const last = parseInt(getLink("last").split("=")[1].split("&")[0]);
        const data = await res.json();
        return {
            data: data,
            headers: res.headers,
            next: next,
            prev: prev,
            first: first,
            last: last,
        };
    }
    else{
        const data = await res.json();
        return {
            data: data,
            headers: res.headers,
        };
    }
}
     else {
        throw new Error("Something went wrong");
    }
};
export const GetTags = async ({ link }) => {
    // console.log(link);
    const res = await fetch(link);
    // console.log(res);
    const data = await res.json();
    return data;
};

export const fetchRepos = async ({ username, limit, selectedPage }) => {
    const res = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=${limit}&page=${selectedPage}`
    );
    console.log(res.status);
    if (res.status === 200) {
        const data = await res.json();
        // console.log("fetched repos");
        // console.log(data);
        return data;
    } else {
        throw new Error("Something went wrong");
    }
};
