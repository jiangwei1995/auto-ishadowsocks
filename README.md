# auto-ishadowsocks

## 修改start方法中调用startSSL方法的参数可以切换节点
## 分别是0 1 2三个节点
## 推荐使用方法 使用pm2后台启动 ，每到6 12 18 24点会换一次密码，需要手动执行pm2 restart 重启一下，也可以写一个crontab任务定时重启