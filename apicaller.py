import requests

url = "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport"

querystring = {"query":"new"}

headers = {
	"X-RapidAPI-Key": "d5a66d03bamsh50759c21ff62689p1884f5jsn80ade6452abe",
	"X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())