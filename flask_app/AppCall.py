import requests
import json
import time
##############
class AppCall:
        ###
        def __init__(self,url,key,host):
                self.url = url
                self.key = key
                self.host = host
                self.headers = {
	                "X-RapidAPI-Key": self.key,
	                "X-RapidAPI-Host": self.host
                }
        ###
        def seviceCheck(self):
            end = "/checkServer"
            return self.getrequest(end)
        ###
        def getaps(self,location):
            end = "/flights/searchAirport"
            query = {"query":location}
            return self.getrequest(end,query)
        ###    
        def getrequest(self,end,query = ""):
                time.sleep(1)
                ###
                def withparams(page, query):
                    try:
                        response = requests.get(page, headers=self.headers,params=query)
                        return self.datapull(response)
                    except:
                        pass
                ###
                def noparams(page):
                    try:
                        response = requests.get(page, headers=self.headers)
                        return self.datapull(response)
                    except:
                        pass
                page = self.url + end
                if query == "":
                    return noparams(page)
                else:
                    return withparams(page,query)
        ###
        def err(self,msg):
                pass
        ###
        def datapull(self,resp):
            parsed = json.dumps(resp.json(), indent=4)
            return json.loads(parsed)
