import json

def main(file):
    data = dreader(file)
    for line in data:
        print("*****************")
        for k,v in line.items():
            if k == "legs":
                org = v[0]['origin']['city']
                dest = v[0]['destination']['city']
                if len(v) == 2:
                    toLeg = getLegs(v[0],dest)
                    backLeg = getLegs(v[1],org)
                    vals = {line["id"]:{"Price":line['price']['formatted'],"Score":line['score'],"flightTo":toLeg,"flightFrom":backLeg}}
                    print(vals)
                else:
                    toLeg = getLegs(v,org,dest)
                    vals = {line["id"]:{"Price":line['price']['formatted'],"Score":line['score'],"flightTo":toLeg}}
                    print(vals)
            else:
                pass
            
        #print(vals)
def getLegs(data,dest):
    legData = {}
    count = 0
    for i in data['segments']:
        count += 1
        off = i['origin']['parent']['name']
        land = i['destination']['parent']['name']
        legData["Stop{0}".format(count)] = {"start":off,"end":land,"durationInMinutes":i["durationInMinutes"],"carrier":i["operatingCarrier"]['name']}
        #print("{0} -> {1}".format(off,land))
    return legData
  
def dreader(file):
    with open(file,'r') as f:
        jData = json.load(f)
    return jData

def tt(f):
    print(type(f),f)

if __name__ == "__main__":
    file = 'C:\\Users\\bkelly\\swDev\\flask_app\\dataNOR.json'
    other = 'C:\\Users\\bkelly\\swDev\\flask_app\\data.json'
    main(other)