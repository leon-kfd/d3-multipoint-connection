# Demo for d3-shape/curves

## 1. Mulitpoint-connect - 使用D3.js将离散的点形成平滑曲线

### Demo
[Online Demo](https://kongfandong.cn/demo/d3-multipoint-connection/index.html)

+ LineType：切换不同的D3内置的连线类型
+ Add Random Point: 你可以添加更多的点进行连线
+ 各个点可以拖拽更改当前位置
+ 部分连线算法可以修改系数参数(bundle、cardinal、catmullRom)

*PS:PC端支持拖拽更改点位置，移动端暂不支持*

## 2. Adjust-line - Canvas画图曲线自动校正

### Demo
[Online Demo](https://kongfandong.cn/demo/d3-adjust-line/index.html)

+ Canvas简易画板
+ 设置的AdjustAngel配置偏移角度
+ 通过AdjustAngel进行点的取样，然后使用D3js的连线算法进行重连


官方文档：<a href="https://d3js.org.cn/document/d3-shape/#curves" target="_blank">https://d3js.org.cn/document/d3-shape/#curves</a>
