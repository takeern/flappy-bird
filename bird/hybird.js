/**
 * Created by Administrator on 2017/2/19.
 */



var flyBird={
    'setColumn':' ',
    "columnQueue":[],
    'checkState':' ',
    'columnNumber':'',
    'setGrade':'',
    "vw":document.body.clientWidth,
    'vh':document.body.offsetHeight,
    "bird_wrapper":document.getElementById('bird_wrapper'),
    showColumn:function(column){//监视柱子位置
        var box=column.getBoundingClientRect();
        var bird=document.getElementById('bird');
        bird=bird.getBoundingClientRect();
        if((box.left<0.12*this.vw||box.left===0.12*this.vw)&&box.right>bird.right){//判断柱子到达bird位置
            if(bird.top<column.rand*this.vh*0.01||bird.bottom>(column.rand+20)*this.vh*0.01){//检测bird是否死了
                this.stopColumn();
            }
        }
        if(box.right<=0){//如果柱子离开视口，删除该柱子并注销监测
            var que=this.columnQueue.shift();
            if(column&&column.parentNode){
                column.parentNode.removeChild(column);
            }
            clearInterval(que);
        }
    },
    setBird:function(){//初始化bird
        var newBird=document.getElementById('bird');
        newBird.id='bird';
        newBird.style.zIndex='10';
        newBird.style.width='2vw';
        newBird.style.height='2vw';
        newBird.style.position='absolute';
        newBird.style.top='30vh';
        newBird.style.left='10vw';
    },
    stopColumn:function(){
        var bird=document.getElementById('bird'),que;
        bird.style.animationPlayState='paused';
        clearInterval(flyBird.setColumn);
        this.columnQueue.map(function(item){
            clearInterval(item);
        });
        this.columnQueue=[];
        var column=document.getElementsByClassName('column');
        for ( i=0;i<column.length;i++){
            column[i].style.animationPlayState='paused';
        };
        clearInterval(this.checkState);
        clearInterval(this.setGrade);
        this.bird_wrapper.removeEventListener('click',flyBird.listenerWrapper);
        this.bird_wrapper.addEventListener('click',flyBird.flyAgain,false);
    },
    copyBird:function (box,bird){//复制一个新的dom代替当前dom
        var newBird=document.createElement('img');
        newBird.id='bird';
        newBird.style.width='2vw';
        newBird.style.zIndex='10';
        newBird.style.height='2vw';
        newBird.style.position='absolute';
        newBird.setAttribute('src','bird/bird.jpg');
        newBird.style.top=box.top+'px';
        newBird.style.left='10vw';
        return newBird;
    },
    moveChange:function(state){
        var bird=document.getElementById('bird');
        box=bird.getBoundingClientRect();
        var newBird=this.copyBird(box,bird);
        bird.parentNode.replaceChild(newBird,bird);
        bird=document.getElementById('bird');
        if(state==='top'){
            bird.className='move-top';
            bird.addEventListener('webkitAnimationEnd',function(){  flyBird.moveChange('bottom')},false);
        }
        else {
            bird.className='move-right';
        }
    },
    getColumn:function(i){//初始化柱子
        var comlun=document.createElement('div');
        comlun.id='column'+i;
        var bird_wrapper=document.getElementById('bird_wrapper');
        comlun.style.width='10vw';
        comlun.style.height='100vh';
        comlun.style.zIndex='1';
        comlun.style.position='absolute';
        comlun.style.left='100%';
        var rand=parseInt(Math.random()*40+20);
        var rand1=rand+20;
        comlun.rand=rand;
        comlun.style.background='linear-gradient(mediumaquamarine '+rand+'vh'+" ,white "+rand+'vh,white '+rand1+'vh,mediumaquamarine '+rand1+'vh)';
        comlun.className='column-move column';
        bird_wrapper.appendChild(comlun);
        var m=setInterval(function(){flyBird.showColumn(comlun)},100);
        this.columnQueue.push(m);
    },
    listenerWrapper:function(){
        flyBird.moveChange('top');
    },
    showBird:function(){
        var bird=document.getElementById('bird');
        var box=bird.getBoundingClientRect();
        if(box.top<0||box.bottom>this.vh){
            this.stopColumn();
        }
    },
    'flyAgain':function(){
        var column=document.getElementsByClassName('column');
        for(var i=0;i<=column.length+2;i++){
            if(column[0].parentNode){
                column[0].parentNode.removeChild(column[0]);
            }
        }
        flyBird.fly();
    },
    'getGrade':function(){
        var grade=this.columnNumber-this.columnQueue.length;
        var gradeSpan=document.getElementById('grade');
        gradeSpan.innerText=grade;
    },
    'fly':function(){
        this.setBird();
        this.columnNumber=0;
        this.checkState=setInterval(function(){flyBird.showBird();},100);
        this.setColumn=setInterval(function(){
            var rand=parseInt(Math.random()*1000000000000000);
            flyBird.columnNumber++;
            flyBird.getColumn(rand);
        },2000);
        this.setGrade=setInterval(function(){flyBird.getGrade()},400);
        this.bird_wrapper.removeEventListener('click',flyBird.flyAgain);
        this.bird_wrapper.addEventListener('click',flyBird.listenerWrapper,false);
    }
}
flyBird.fly();
