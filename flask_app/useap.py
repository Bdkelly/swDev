from AppCall import AppCall
import json
###########################
###
def main(city):
    url = "https://sky-scrapper.p.rapidapi.com/api/v1"
    key = "d5a66d03bamsh50759c21ff62689p1884f5jsn80ade6452abe"
    host = "sky-scrapper.p.rapidapi.com"
    caller = AppCall(url,key,host)
    return json.dumps(check(caller))
###
def check(caller):
    status = caller.seviceCheck()
    return status
##########################
if __name__ == "__main__":
    print(main())
