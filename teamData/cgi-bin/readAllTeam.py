#!/Program Files/Anaconda2/python
# -*- coding: utf-8 -*-
import requests
from bs4 import BeautifulSoup
import cgi, cgitb
import json

form = cgi.FieldStorage()

data = form.getvalue('data1')

teamDic = {}

def readAllTeam():
    res = requests.get('http://nba.sports.sina.com.cn/teams.php?dpc=1')
    res.encoding = 'gbk'
    pageCode = res.text
    # print pageCode
    soup = BeautifulSoup(pageCode, "lxml")

    for item in soup.select('.text'):
        for a in item.select('a'):
            hre = a['href']
            name = hre.split('/')[-1].replace('.shtml', '')
            lowerName = name.lower()
            #         text = a.text
            teamDic[lowerName] = name

    return "1"

def getTeamDic():
    return teamDic

response = readAllTeam()
print "Content-type:text/html\n"
print teamDic.keys()