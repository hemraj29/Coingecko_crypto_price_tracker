// widget-script.js

// Function to fetch CoinGecko token details
async function getTokenDetails(tokenName) {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/${tokenName}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.warn(data);
        return data;
    } catch (error) {
        console.error('Error fetching token details:', error);
        return null;
    }
}

// Function to render token details in the widget container
function renderTokenDetails(container, tokenDetails) {
    if (!tokenDetails) {
        container.innerHTML = 'Error fetching token details.';
        return;
    }

    // Extract relevant details
    const { name, market_cap_rank, market_data,image,tickers,watchlist_portfolio_users,public_interest_score
    } = tokenDetails;
    const { market_cap, current_price, total_volume , price_change_percentage_1h_in_currency} = market_data;

    // Render details in the container
    container.innerHTML = `
    <div class='main-c'>
    <div class='name-container' >
    <img src=${image.small}/> <h2><span>${name} </h2>  
    

    <p> <span>past 1h </span> ${price_change_percentage_1h_in_currency.usd} % (usd)</p>
    
    </div>
       
    
       
        
       <div class='details'>
                <div class='f'>
        <p>Market Cap Rank: ${market_cap_rank}</p>
                </div>
        <hr/>
                <div class='f'>
        <p>Market Cap: $${market_cap.usd}</p>
                </div>
        </div>

        
        
        
        <div class='details'>
        
        
        <div class='f'>
        <p>Current Price: $${current_price.usd}</p>
        
        </div>
        
        <hr/>
        <div class='f'>
        <p>24h Trading Volume: $${total_volume.usd}</p>
        </div>
        </div>
        
                <div class='details'>
        
        
                       <div class='f'>
                <p>Watchlist_Portfolio_Users: ${watchlist_portfolio_users}</p>
          
                       </div>
                 
                       <hr/>
                       <div class='f'>
                <p>Public_Interest_Score: ${public_interest_score}</p>
                       </div>
                </div>
        



        
        <p> powered by<span> coingecko-widget </span></p>
    </div> 
    `;
}

// Get the token name from the script tag and render details
const container = document.getElementById('coingecko-widget-container');
const scriptTag = document.currentScript;
const tokenName = scriptTag.getAttribute('data-token');

if (tokenName) {
    getTokenDetails(tokenName)
        .then(tokenDetails => renderTokenDetails(container, tokenDetails))
        .catch(error => console.error('Error:', error));
} else {
    container.innerHTML = 'Token name not provided.';
}
