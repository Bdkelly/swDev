import sys
import json
import requests
##################
def main(depcity):
    headers, url = login()
    end = "/flights/searchAirport"
    page = url + end
    query = {"query":depcity}
    return json.dumps(getstuff(headers,page,query))
####################################
def getstuff(headers,page,query):
    response = requests.get(page, headers=headers,params=query)
    return response
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
    depcity = sys.argv[1]
    print(main(depcity))