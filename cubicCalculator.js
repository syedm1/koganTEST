
const proxy = "https://cors-anywhere.herokuapp.com/";
const targetUrl = "http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com";
const baseUrl = proxy + targetUrl;
const next = "/api/products/1";
const filterKey = "Air Conditioners";

let filteredData = [];
const filterItems = (data)=> {
  const filtered = data.objects.filter((value) => value.category === filterKey);
  filteredData.push(...filtered);
}

const cubicWieghtSum = (sum, cur) =>
	// cm to meters conversion requires divident to 1000000 multiplied by 250 gives 4000
  sum + (cur.size.width * cur.size.length * cur.size.height) / 4000;

function calculateCubicWeight() {
  const averageCubicWeight = filteredData.reduce(cubicWieghtSum, 0)/ filteredData.length; 
  console.log(`Average cubic weight is ${averageCubicWeight}`);
}


async function getCubicWieght (next) {
  const response = await fetch(baseUrl + next);
  const data = await response.json();
  filterItems(data);
  if (data.next != null) {
    getCubicWieght(data.next);
  } else {
    calculateCubicWeight();
  }
  
}

getCubicWieght(next);
