from AppCall import AppCall
import sys
import json
import requests

def main(depcity,depDate,arrcity,retDate):
    simp = {'de':depcity,'deDate':depDate,'arr':arrcity,'retdate':retDate}
    return simp

if __name__ == "__main__":
    depcity = sys.argv[1]
    arrcity = sys.argv[2]
    depDate = sys.argv[3]
    retDate = sys.argv[4]
    print(main(depcity,depDate,arrcity,retDate))

