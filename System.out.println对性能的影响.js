讲讲你不知道的System.out.println
在开发或者调试bug的过程中，有些同学经常用到System.out.println语句，输出到控制台，用来查看数据是否正常。

开发或者调试完毕，很可能就忘记删除，直接就发布到生产中去了。

 

在一些对性能要求比较高的项目当中，忘记删除的这些代码，就成为将为需要清除优化的对象了。

 

System.out.println 这个语句 对性能有影响吗？  答案是肯定的，下面用实例给大家验证一下：

废话不多说，上代码：

public class Test01 {
 
    public static void main(String[] args) {
        long startTime1 = System.currentTimeMillis();
        for (int i = 0; i <100000; i++) {
            System.out.println("i="+i);
        }
        long endTime1 = System.currentTimeMillis();
        System.out.println("使用System.out.print输出语句的耗时为："+(endTime1-startTime1));
        long startTime2 = System.currentTimeMillis();
        for (int i = 0; i <100000; i++) {
 
        }
        long endTime2 = System.currentTimeMillis();
        System.out.println("不使用System.out.print输出语句的耗时为："+(endTime2-startTime2));
    }
 
}
输出结果：



从打印结果我们可以看到，循环10w次的打印时间需要耗时1619毫秒，没有打印的循环几乎等于0毫秒。

 

原理分析：

为什么System.out.println语句会这么耗费性能呢？

我们看一下System.out.println语句的源码就知道答案了。

 public void println(String x) {
        synchronized (this) {
            print(x);
            newLine();
        }
    }
从源码可以看到，在一开始就使用synchronized同步锁给锁起来了，所以System.out.println是一个同步方法，在高并发的情况下，会严重影响性能。

 

总结：

在日常开发或者调试的过程中，尽量使用log4j2或者logback这些异步的方法，进行日志的统一收集，少用甚至是禁止用System.out.println.

项目上线前也要进行全局扫描，防止有人误提交带有System.out.println的代码。

 

最后扩展几个知识点：

1.System.out.println会输出到tomcat容器的catalina.out文件中吗？

答：默认是不输出到tomcat的日志文件中的，但是如果想要输出到tomcat的日志文件中，可以修改tomcat的配置文件，

conf-web.xml中，把defult-value的值改为1（默认不输出的时候值为0）。

2.System.out.println在error级别的日志中，会输出日志吗？

我测试的时候使用的是logback，在配置文件中把日志级别设置为error，控制台是有输出的。

3.System.out.println在IDEA中的快捷键符号是啥？

sout