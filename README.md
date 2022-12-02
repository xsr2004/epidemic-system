# 疫情查询系统

实现功能：

1.实时查询全国各省疫情数据（表格，类似于腾讯新闻）

2.实时查询全国疫情总新增数据（卡片，类似于腾讯新闻）

3.根据全国各地疫情病例多少来绘制echarts图表（类似于腾讯新闻）

4.实时查询全国高风险地区

后台接口：

1.腾讯新闻前端向后端请求的url：

https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=localCityNCOVDataList,diseaseh5Shelf

2.国务院前端向后端请求的url(已经破解成功):

http://bmfw.www.gov.cn/bjww/interface/interfaceJson

俩个接口安全持久有效，均可达到秒级传输

最后会打包成一个网站放到开源项目

利用技术：

vue+element-ui+axios+echarts+JavaScript API GL(百度地图提供)+node

核心vue和axios(ajax框架)

