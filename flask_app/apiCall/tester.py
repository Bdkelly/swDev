from AppCall import AppCall
import sys
import json
##########################
def main(depcity,arrcity):
    url = "https://sky-scrapper.p.rapidapi.com/api/v1"
    key = "d5a66d03bamsh50759c21ff62689p1884f5jsn80ade6452abe"
    host = "sky-scrapper.p.rapidapi.com"
    
    caller = AppCall(url,key,host)
    return json.dumps(flightget(caller,depcity,arrcity))

def getapid(caller,location):
    out = caller.getaps(location)
    return out['data'][0]

def flightget(caller,fromap = "LOND",toap = "new"):
    fromapid = getapid(caller,fromap)
    #toapid = getapid(caller,toap)
    return (fromapid)

if __name__ == "__main__":
    # Parse arguments
    arrcity = sys.argv[2]
    depcity = sys.argv[1]
    print(main(depcity,arrcity))
    # Process arguments and print JSON data
    
