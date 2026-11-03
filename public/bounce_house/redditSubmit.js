async function searchReddit(){
    let suggestion = document.querySelector('#sug').value.trim().replaceAll(" ", "+");
    let search_url = `https://www.reddit.com/r/tifu/search/?q=${suggestion}&type=posts&sort=top`;
    // alert(search_url);
    // window.location.href = search_url;
    try{
        const params = new URLSearchParams();
        params.append("suggestion", suggestion);
        const response = await fetch(`/suggestion?${params}`);
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        
        story_links = result.map(r => {
            let item = document.createElement('li');
            item.innerHTML = `<h1> <a href="${r.href}"> ${r.title} </a> </h1>`
            return item;
        });

        console.log(story_links);
        document.querySelector('#results').replaceChildren(...story_links);
    }
    catch (e){
        console.error(e.message);
    }
}

function searchRedditHuman(){
    let suggestion = document.querySelector('#sug').value.trim().replaceAll(" ", "+");
    let search_url = `https://www.reddit.com/r/tifu/search/?q=${suggestion}&type=posts&sort=top`;
    window.open(search_url);
}