export const GetRepos = async({username}) => { 
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    console.log(res.status);
    if (res.status === 200) {
        const data = await res.json();
        return data;
    } else {
        throw new Error("Something went wrong");
    }
    }
export const GetTags = async({link}) => {
    console.log(link);
    const res = await fetch(link);
    console.log(res);
    const data = await res.json();
    return data;
    }