复习：
1：分页器封装原理？
知道当前是第几页:pageNo
知道分页器一共需要展示多少条数据，total
知道每一页需要展示数据个数:pageSize
total / pageSize (向上取整)分页器一共多少页：totalPage ----[总共多少页]
知道连续的页码数(奇数，保持对称)5|7


2)对于分页器
比如：当前是第5，当前页肯定在中间
3 4【5】6 7
比如：当前是第8页
6 7 【8】 9 10


3)分页器情况需要考虑的？-----
当前这个项目：连续的页码数 -----5（暗含条件，分页器至少五页）


4)特殊情况考虑进来?
pageNo:1

-1 0 【1】 2 3

pageNo:2
0 1 【2】 3 4


pageNo:33 ---[一共33]
31 32 【33】 34 35 -> 纠正 29 30 31 32 【33】

pageNo:32
30 31 【32】 33 34 -> 纠正 29 30 31 32 【33】


end:33
start:33 -5 +1 = 29




5)数据解释？-----售卖的属性
[
  {
    attr:'颜色',
    attrValue:['粉色'，'天蓝色','红色']
  },
  {
    attr:'版本',
    attrValue:['16'，'64']
  }
]