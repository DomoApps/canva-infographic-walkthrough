// map structure to link DOM item to dataset column
const mapDomColumns = [
  { id: 'title', key: 'city', column: 'city' },
  { id: 'title', key: 'zip', column: 'zip' },
  { id: 'homes-listed', key: 'num_homes_listed', column: 'num_homes_listed' },
  { id: 'avg-dom', key: 'avg_dom', column: 'avg_dom' },
  { id: 'median-list-price', key: 'median_list_price', column: 'median_list_price', price: true },
  { id: 'price-change', key: 'price_change_pct', column: 'price_change_pct' },
  { id: 'market-type', key: 'market_type', column: 'market_type' },
];

// function to fetch the dataset
const fetchData = async () => domo.get('/data/v2/infographicData?limit=100&useBeastMode=true');

// formatting price number
const formatPrice = (price) => {
  return isNaN(Number(price)) ? price : new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(price));
}

// function to interpolate the data into the HTML template
const interpolateData = (data) => {
  const row = data[0];
  mapDomColumns.forEach(value => {
    const defaultValue = document.getElementById(value.id).innerHTML.toString();
    const columnValue = value.price ? formatPrice(row[value.column]) : row[value.column];
    const newValue = defaultValue.replaceAll(`{${value.key}}`, columnValue);
    document.getElementById(value.id).innerHTML = newValue;
  });
}

const init = async () => {
  const data = await fetchData();
  console.log("data: ", data);
  interpolateData(data);
}
