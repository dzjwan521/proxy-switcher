# 终端代理切换

> 目前只支持macOS,windows的话使用这样的命令 ```setx 变量名 "代理地址" ```
```
//例如
setx http_proxy "127.0.0.1"
setx https_proxy "127.0.0.1"
```
### 使用方法

Usage: proxys [options] [command]

  Options:

    -v, --version  output the version number
    -l, --list     从配置文件列出已存储的列表
    -y, --yes      默认回复yes
    -h, --help     output usage information

  Commands:

    clean          清除代理
    init           初始化
    add [url]      设置url为代理,并存储到配置文件
    rm [url]       设置url为代理

