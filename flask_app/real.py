from AppCall import AppCall
import sys
import json
import requests

def main(cit):
    finlist = {}
    url,key,host = login()
    caller = AppCall(url,key,host)
    for k,v in cit.items():
        finlist[k] = runner(caller,v)
    return json.dumps(finlist)
def runner(caller,city):
    apinfo = {}
    out = caller.getaps(city)
    for i in range(0,len(out["data"])):
        apinfo[out['data'][i]['skyId']] = allaps(out['data'][i])
    return apinfo
#################
def allaps(data):
    title = data['presentation']['suggestionTitle']
    skyId = data['skyId']
    entityId = data['entityId']
    big = {"skyId":skyId,"title":title,"entityId":entityId}
    return big

def login():
    url = "https://sky-scrapper.p.rapidapi.com/api/v1"
    key = "d5a66d03bamsh50759c21ff62689p1884f5jsn80ade6452abe"
    host = "sky-scrapper.p.rapidapi.com"
    return url,key,host

if __name__ == "__main__":
    fromcity = sys.argv[1]
    tocity = sys.argv[2]
    cit = {"from":fromcity,"to":tocity}
    print(main(cit))