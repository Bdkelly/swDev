import sys
import json
import requests
##################
def main(dep):
    headers, url = login()
    end = "/flights/searchAirport"
    page = url + end
    query = {"query":dep}
    resp = getstuff(headers,page,query)
    data = resp.json()
    return json.dumps(data) 
####################################
def getstuff(headers,page,query):
    return requests.get(page, headers=headers,params=query)
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
    # Parse arguments
    dep = sys.argv[1]
    print(main(dep))