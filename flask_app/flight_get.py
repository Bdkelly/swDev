from AppCall import AppCall
import sys
import json
##########################################
def main(depcity,depDate,arrcity,retDate):
    vals = {}
    count = 0
    caller = login()
    info = {"depC":depcity,"arrCity":arrcity,"depDate":depDate,"retDate":retDate}
    data = caller.flightSearch(info)
    for line in data['data']['itineraries']:
        count = count + 1
        for k,v in line.items():
            if k == "legs":
                org = v[0]['origin']['city']
                dest = v[0]['destination']['city']
                if len(v) == 2:
                    toLeg,toTime= getLegs(v[0])
                    backLeg,backTime = getLegs(v[1])
                    vals[line["id"]] = {"Origin":org,"Destination":dest,"Price":line['price']['formatted'],"Score":line['score'],"toTime":toTime,"flightTo":toLeg,"backTime":backTime,"flightFrom":backLeg}
                else:
                    toLeg,toTime= getLegs(v[0])
                    vals[line["id"]] = {"Origin":org,"Destination":dest,"Price":line['price']['formatted'],"Score":line['score'],"flightTo":toLeg,"toTime":toTime}
            else:
                pass
        if count == 11:
            return json.dumps(vals)
def getLegs(data):
    legData = {}
    count = 0
    totalTime = data["durationInMinutes"]
    for i in data['segments']:
        count += 1
        off = i['origin']['parent']['name']
        land = i['destination']['parent']['name']
        legData["Stop{0}".format(count)] = {"start":off,"end":land,"durationInMinutes":i["durationInMinutes"],"carrier":i["operatingCarrier"]['name']}
        #print("{0} -> {1}".format(off,land))
    return legData,totalTime

def login():
    url = "https://sky-scrapper.p.rapidapi.com/api/v1"
    key = "d5a66d03bamsh50759c21ff62689p1884f5jsn80ade6452abe"
    host = "sky-scrapper.p.rapidapi.com"
    caller = AppCall(url,key,host)
    return caller

if __name__ == "__main__": 
    
    if sys.argv[4] == None:
        retDate = ""
    else:    
        depcity = list(sys.argv[1].split(","))
        arrcity = list(sys.argv[2].split(","))
        depDate = sys.argv[3]
        retDate = sys.argv[4]
    '''
    lst = [['LHR', '95565050'], ["ORY", "95565040"],'2024-02-26', ""]
    depcity = lst[0]
    arrcity = lst[1]
    depDate = lst[2]
    retDate = lst[3]
    '''
    
    print(main(depcity,depDate,arrcity,retDate))


