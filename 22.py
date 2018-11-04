# -*- coding: UTF-8 -*-
import json
import re

with open('newhot.txt',encoding='utf-8') as f:
    content = f.readlines()
    # print json.dumps(data, ensure_ascii=False)
print(content)

with open("a.txt", 'w+') as fp:
    for i in content:
        pattern = re.compile(r"img/.+jpg")
        # print(i)
        result1 = pattern.findall(i)
        pattern2 = re.compile(r"[\d]+[_][\d]+")
        result2 = pattern2.findall(i)
        print(result1,result2)
        insertdata = "insert into goodsdatail(goodsid, manImg, detailImg1, detailImg2, detailImg3, detailImg4, detailImg5, detailImg6, detailImg7, colorImg1, colorImg2, colorImg3, colorImg4)values('%s','%s','img/goods/11.bmp','img/goods/12.bmp','img/goods/13.bmp','img/goods/14.bmp','img/goods/15.bmp','img/goods/16.bmp','img/goods/17.bmp','img/goods/11.bmp','img/goods/16.bmp','img/goods/17.bmp','img/goods/18.bmp');\n "%(result2[0],result1[0])
        fp.write(insertdata)
# with open("data.txt",'w+') as f:
#     data = json.loads(a)['goods']
#     for i in data:
#         insertData = "insert into newhot(id,img,name,originaPrice,presentPrice)values('%s','%s','%s','%s','%s');\n"%(i['id'],i['img'],i['name'],i['originalPrice'],i['presentPrice'])
#         f.write(insertData)
# f.close()

