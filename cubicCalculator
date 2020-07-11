
import requests


MAX_PAGES = 5
filter_type = "Air Conditioners"

API_URL = "http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com/api/products/1"

def getCubicWieght(item):
    # cm to meteres multipled by 250 gives 4000 as diivident factor
    return (float(item["height"])* float(item["width"])*float(item["length"]))/ 4000;

def getJsonData(getUrl):
    has_next_key = False
    nextKey = ""
    response = requests.get(getUrl)
    jsonData = response.json()

    if "next" in jsonData:
        has_next_key = True
        nextKey = jsonData["next"]

    count = 0
    while has_next_key and count< MAX_PAGES:
        ## this should do GET request for the third page and so on...
        count = count +1
        URL = "http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com"+nextKey
        try:
            req = requests.get(URL).json()

            # adding only required objects
            for x in req["objects"]:
                if x['category'] == filter_type:
                    jsonData["objects"].append(x)


            if "next" in req:
                nextKey = req["next"]

            else:
                has_next_key = False
                # no next_key, stop the loop
        except:
            return jsonData
    return jsonData
try:

    # call
    data = getJsonData(API_URL)
    print(data)
    data = data["objects"]

    filtered_data = [x for x in data if x['category'] == filter_type]

    # initializng  total wieght
    total_wieght = 0.0;

    # get average wieght
    for item in filtered_data:
        total_wieght = total_wieght + getCubicWieght(item["size"])

    average_wieght = total_wieght / len(filtered_data)

    print(average_wieght)
except:
    exit()
