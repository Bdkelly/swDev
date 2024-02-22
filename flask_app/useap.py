from AppCall import AppCall
import json
###########################
###
def main():
    '''
    url = "https://sky-scrapper.p.rapidapi.com/api/v1"
    key = "d5a66d03bamsh50759c21ff62689p1884f5jsn80ade6452abe"
    host = "sky-scrapper.p.rapidapi.com"
    caller = AppCall(url,key,host)
    return json.dumps(check(caller))
    '''
    vals = {"NAME":"BEMBELLY"}
    return json.dumps(vals)
###
def check(caller):
    status = caller.seviceCheck()
    return status
##########################
if __name__ == "__main__":
    print(main())
