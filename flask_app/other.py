import sys
import json
import requests
##################
def main(fromcity,tocity):
    cities = {"from":fromcity,"to":tocity}
    out = {}
    for kind,place in cities.items():
        resp = runner(kind,place)
        newstuff = resp.json()['data'][0]
        out[kind] = newstuff
    return json.dumps(out)
######################spot
def runner(place):
    headers, url = login()
    end = "/flights/searchAirport"
    page = url + end
    query = {"query":place}
    resp = getstuff(headers,page,query)
    return resp
#################################
def getstuff(headers,page,query):
    return requests.get(page, headers=headers,params=query)
###################
def datapull(resp):
    parsed = json.dumps(resp.json(), indent=4)
    return json.loads(parsed)
############
def login():
    url = "https://sky-scrapper.p.rapidapi.com/api/v1"
    key = "d5a66d03bamsh50759c21ff62689p1884f5jsn80ade6452abe"
    host = "sky-scrapper.p.rapidapi.com"
    headers = {
	                "X-RapidAPI-Key": key,
	                "X-RapidAPI-Host": host
                }
    return headers,url
##########################
if __name__ == "__main__":
    fromcity = sys.argv[1]
    tocity = sys.argv[2]
    # Parse arguments
    print(main(fromcity,tocity))