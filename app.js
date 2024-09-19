const searchBtn=document.querySelector('#search-btn');
const searchInp=document.querySelector('#search-inp');
const resultSection=document.querySelector('#result-container');

function createImage(imageUrl){
    const image=document.createElement('img');
    image.setAttribute('src', imageUrl);
    image.setAttribute('alt', 'show-search-result');
    return image;
}

function displayResult(showlist){
    for(item of showlist){
        if(item.show.image){
            const image=createImage(item.show.image.medium);
            resultSection.append(image);
        }
    }
}

function removePrevResult(){
    while(resultSection.firstChild){
        resultSection.firstChild.remove();
    }
}

async function fetchShows(showName){
    try{
        const FETCH_SHOW_URL=` https://api.tvmaze.com/search/shows?q=${showName}`;
        const response= await axios.get(FETCH_SHOW_URL);
        removePrevResult();
        displayResult(response.data);
    }
    catch(err){
        console.log(err);
    }
}

searchBtn.addEventListener('click', function(){
    fetchShows(searchInp.value);
});
searchInp.addEventListener('keyup', function(event){
    if(event.key==='Enter'){
        fetchShows(searchInp.value);
    }
});
