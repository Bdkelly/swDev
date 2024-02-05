from AppCall import AppCall
###########################
###
def main():
    url = "https://sky-scrapper.p.rapidapi.com/api/v1"
    key = "d5a66d03bamsh50759c21ff62689p1884f5jsn80ade6452abe"
    host = "sky-scrapper.p.rapidapi.com"
    caller = AppCall(url,key,host)
    flightget(caller)
###
def getapid(caller,location):
    out = caller.getaps(location)
    return out['data'][0]
###
def flightget(caller,fromap = "LOND",toap = "new"):
    fromapid = getapid(caller,fromap)
    toapid = getapid(caller,toap)
    for k,v in fromapid.items():
        print(k,v)
    print("###############")
    for k,v in toapid.items():
        print(k,v)
###
def check(caller):
    status = caller.seviceCheck()
    print(status)
##########################
if __name__ == "__main__":
    main()
