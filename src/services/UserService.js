export const GetUser = async({username}) => {
    const res = await fetch(`https://api.github.com/users/${username}`, { headers: {
        'Accept' : 'application/vnd.github.v3+json'
    }});
    if (res.status === 200) {
        const data = await res.json();
        return data;
    } else {
        throw new Error("Something went wrong");
    }
    }