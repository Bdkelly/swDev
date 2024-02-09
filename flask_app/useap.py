from AppCall import AppCall
import sys
import json
###########################
###
def main(city):
    url = "https://sky-scrapper.p.rapidapi.com/api/v1"
    key = "d5a66d03bamsh50759c21ff62689p1884f5jsn80ade6452abe"
    host = "sky-scrapper.p.rapidapi.com"
    caller = AppCall(url,key,host)
    resp = flightget(caller,city)
    jsoner = json.dumps(resp)
    print(jsoner)
###
def getapid(caller,location):
    out = caller.getaps(location)
    return out['data'][0]
###
def flightget(caller,city):
    cityid = getapid(caller,city)
    return(cityid)
###
def check(caller):
    status = caller.seviceCheck()
    print(status)
##########################
if __name__ == "__main__":
    city = sys.argv[1]
    '''
    arrcity = sys.argv[1]    
    depdate = sys.argv[2]
    retdate = sys.argv[3]
    '''
    main(city)
