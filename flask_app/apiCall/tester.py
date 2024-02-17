from AppCall import AppCall
import sys
import json
##########################
def main(loc):
    new = {}
    url = "https://sky-scrapper.p.rapidapi.com/api/v1"
    key = "d5a66d03bamsh50759c21ff62689p1884f5jsn80ade6452abe"
    host = "sky-scrapper.p.rapidapi.com" 
    caller = AppCall(url,key,host)
    info = getapid(caller,loc)
    print(len(info['data']))
    for i in range(0,len(info["data"])):
        new[info['data'][i]['skyId']] = allaps(info['data'][i])
    for k,v in new.items():
        print(type(k),k)
        print(type(v),v[k]['entityId'])  

def allaps(data):
    title = data['presentation']['suggestionTitle']
    skyId = data['skyId']
    entityId = data['entityId']
    big = {skyId:{"title":title,"entityId":entityId}}
    return big
def getapid(caller,location):
    out = caller.getaps(location)
    return out
def sep(x = 3):
    ck = "#################"
    for i in range(0,x):
        print(ck)
if __name__ == "__main__":
    # Parse arguments
    loc = "new"
    main(loc)
    # Process arguments and print JSON data
    
