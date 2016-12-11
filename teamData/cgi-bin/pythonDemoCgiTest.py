#!/Program Files/Anaconda2/python
# -*- coding: utf-8 -*-
import requests
from bs4 import BeautifulSoup
import json
import cgi, cgitb

form = cgi.FieldStorage()

cgiTeamName = form.getvalue('teamName')

res = requests.get('http://nba.sports.sina.com.cn/teams.php?dpc=1')
res.encoding = 'gbk'
pageCode = res.text
# print pageCode
soup = BeautifulSoup(pageCode, "lxml")

teamDic = {}
for item in soup.select('.text'):
    for a in item.select('a'):
        hre = a['href']
        name = hre.split('/')[-1].replace('.shtml', '')
        lowerName = name.lower()
        #         text = a.text
        teamDic[lowerName] = name

# print teamDic
# print json.dumps(teamDic, ensure_ascii=False, encoding='UTF-8')
temp = 0
# teamName = raw_input("Enter your like team name:")
teamName = cgiTeamName.lower()

if teamName.lower() == "trail blazers":
    teamName = "trail%20blazers"

if teamName.lower() not in teamDic:
    print "Content-type:text/html\n"
    print "0"
    exit(1)

teamId = teamDic[teamName]
teamPage = requests.get('http://nba.sports.sina.com.cn/team/' + teamId + '.shtml')
teamPage.encoding = 'gbk'
teamPageCode = teamPage.text
teamSoup = BeautifulSoup(teamPageCode, "lxml")

# 队伍的所有资料字典
teamInfo = {}

# 队伍基本资料数组
teamBasicInfoList = []

# 队伍的基本资料字典
teamBasicInfoDic = {}

teamBasicInfo = teamSoup.select('#table730middle')[0]
teamBasicInfoDic['队名'] = teamBasicInfo.select('tr')[0].select('td')[1].text.encode('utf-8')
teamBasicInfoDic['城市'] = teamBasicInfo.select('tr')[1].select('td')[1].text.encode('utf-8')
teamBasicInfoDic['分区'] = teamBasicInfo.select('tr')[7].select('td')[1].text.encode('utf-8')
teamBasicInfoDic['老板'] = teamBasicInfo.select('tr')[8].select('td')[1].text.encode('utf-8')
teamBasicInfoDic['球场'] = teamBasicInfo.select('tr')[9].select('td')[1].text.encode('utf-8')
teamBasicInfoDic['进入NBA'] = teamBasicInfo.select('tr')[10].select('td')[1].text.encode('utf-8')
teamBasicInfoDic['夺冠次数'] = teamBasicInfo.select('tr')[11].select('td')[1].text.encode('utf-8')
teamBasicInfoDic['当前排名'] = teamBasicInfo.select('tr')[12].select('td')[1].text.encode('utf-8')
teamBasicInfoDic['主教练'] = teamBasicInfo.select('tr')[1].select('img')[0]['alt'].encode('utf-8')

# 将队伍的基本资料插入到队伍的所有资料数组中，以方便写入json文件
teamBasicInfoList.append(teamBasicInfoDic)

teamInfo['basicInfo'] = teamBasicInfoList

# print json.dumps(teamInfo,ensure_ascii=False)

# 爬取近期比赛数据
teamRecentGameList = []

teamRecentGame = teamSoup.select('#table250middle')[1]
recentGameLastF = teamRecentGame.select('tr')
# lastFive = recentGameLastF[0].text.encode('utf-8')

# 获取前五场比赛数据
for game in range(1, 6):
    teamRecentGameDic = {}
    date = recentGameLastF[game].select('td')[0].text.encode('utf-8')
    data = recentGameLastF[game].select('td')[1].text.strip().encode('utf-8')
    teamRecentGameDic['日期'] = date
    teamRecentGameDic['数据'] = data
    teamRecentGameList.append(teamRecentGameDic)

teamInfo['lastFiveGames'] = teamRecentGameList

# 获取后五场比赛数据

for game in range(7, 12):
    teamRecentGameDic = {}
    date = recentGameLastF[game].select('td')[0].text.encode('utf-8')
    data = recentGameLastF[game].select('td')[1].text.strip().encode('utf-8')
    teamRecentGameDic['日期'] = date
    teamRecentGameDic['数据'] = data
    teamRecentGameList.append(teamRecentGameDic)

teamInfo['nextFiveGames'] = teamRecentGameList

# 获取队员数据

playerDataList = []
dataName = {}
count = 0

playerData = teamSoup.select('#table730middle')[2]
playerDataName = playerData.select('tr')[0].select('td')

dataName[count] = playerDataName[0].text.encode('utf-8')
count += 1
dataName[count] = playerDataName[5].text.encode('utf-8')
count += 1
dataName[count] = playerDataName[9].text.encode('utf-8')
count += 1
dataName[count] = playerDataName[10].text.encode('utf-8')
count += 1
dataName[count] = playerDataName[11].text.encode('utf-8')
count += 1
dataName[count] = playerDataName[12].text.encode('utf-8')
count += 1
dataName[count] = playerDataName[15].text.encode('utf-8')
# for name in playerDataName.select('td'):
#     dataName[count] = name.text.encode('utf-8')
#     count += 1

for i in range(1, 16):
    playerDataDic = {}
    count = 0
    tr = playerData.select('tr')
    td = tr[i].select('td')
    listName = dataName[count]
    playerDataDic[listName] = td[0].text.strip().encode('utf-8')
    count += 1
    listName = dataName[count]
    playerDataDic[listName] = td[5].text.encode('utf-8')
    count += 1
    listName = dataName[count]
    playerDataDic[listName] = td[9].text.encode('utf-8')
    count += 1
    listName = dataName[count]
    playerDataDic[listName] = td[10].text.encode('utf-8')
    count += 1
    listName = dataName[count]
    playerDataDic[listName] = td[11].text.encode('utf-8')
    count += 1
    listName = dataName[count]
    playerDataDic[listName] = td[12].text.encode('utf-8')
    count += 1
    listName = dataName[count]
    playerDataDic[listName] = td[15].text.encode('utf-8')
    playerDataList.append(playerDataDic)

teamInfo['playersAveragedData'] = playerDataList

# print json.dumps(playerDataList,ensure_ascii=False)

#获取取数据王

dataKing = []

dataKingDiv = teamSoup.select("#table250middle")[3].select('tr')

for i in range(0,6,2):
    for j in range(0,2):
        dataKingDic = {}
        dataKingName = dataKingDiv[i].select('td')[j].text.encode('utf-8')
        dataKingImg = dataKingDiv[i+1].select('td')[j].select('img')[0]['src']
        dataKingPlayer = dataKingDiv[i+1].select('td')[j].text.encode('utf-8')
        dataKingDic['数据名称'] = dataKingName
        dataKingDic['球员照片'] = dataKingImg
        dataKingDic['球员数据'] = dataKingPlayer
        dataKing.append(dataKingDic)
teamInfo['dataKing'] = dataKing
# print json.dumps(dataKing,ensure_ascii=False)
# print json.dumps(teamInfo, ensure_ascii=False, indent=4)

with open('C:\\wamp\www\\lyj\\python-teamDemo\\teamData\\teamData.json', 'w') as f:
    f.write(json.dumps(teamInfo, ensure_ascii=False, indent=4))

print "Content-type:text/html\n"
print "1"
# print "Please click on this page to view the information of your favorite team."
# print "http://localhost/lyj/python-teamDemo/teamData/teamData.html"




