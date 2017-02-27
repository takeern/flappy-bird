# flappy-bird
笨鸟先飞
## 效果
![](https://github.com/takeern/flappy-bird/blob/master/bird/flybird.png)
## 技术栈
网上很多使用js构建的bird，经过比较，css3动画相对js来说:

- css3可以很便捷的实现一些动画效果，相对js它使用极少的代码构建。
- 在性能上会稍微好一些,css3可以利用硬件加速。
- 浏览器可对动画做优化。
 
缺点也非常明显:

 - 兼容性不好。
 - js动画控制能力非常强大。
 那么简单动画选择css3，结合less也会很强大，不能认为复杂动画皆适用js，如果动画中间过程无需控制，css3反而更加合适。
 
## 爬坑

 - 重新Element更改class，Element重绘，按照你给的css，导致添加第二个动画时更改class，就会重绘，那么即使第一个动画完成保持到最后一桢，当你改变class时，它就会重绘 ，你保持了也没用回到开始。
  - 首先思考不改classname，更改css里面的animalation-name，发现还是会重绘，重绘将会导致回流。
  - 发现不行，查了一下有种方式是更改元素的animalation-play-state，这也是更改样式，也应该会导致重绘（可能记录它的style了再重绘），但是更改了之后它暂停只能两个一起暂停，so pass。
  - 后只能用最不愿意的方法，记录elementStyle，创建一个新的Element，相当于保存最后一桢状态，再改变动画，感觉更改animalation-play-state，也是这样做的只是他保持最初的。.
  - 了获取当前element的位置getBoundingClientRect（）获取该元素位置，然后给替换他的element，top会小8px，left会大3px;(搞不明白！！！(找到原因 body的marg为8px)).
 - 每次构建柱子产生的监视器，使用一个队列保存监视器ID，柱子离开即时删除监视器。
 - 为何不用cloneNODE方法获取节点，clone方式不是即时的，他调用的类似style是节点开始时的，运动后的style没有保存，所以需要即时复制DOM。
 
## 例子

```JavaScript
var bird=require('bird');
bird.fly();
```


