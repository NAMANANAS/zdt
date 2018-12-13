#zdt

## 环境依赖

- node ~4.0
- python 2.7（node-sass需要使用）

## 因未发布到npm。所以，目前的使用方式如下：

- 下载zdt包，源码地址：https://github.com/NAMANANAS/zdt.git       
        
- 进入根目录，npm全局安装。（可能需要管理员权限）

        注意！windows下需要安装两次才能成功。
        因为node-sass默认会编译libsass，而编译需要visualStudio,所以第一次会失败。但是编译是非必需的，若失败，则node-sass自动回退使用第三方编译好的文件。
        第二次安装时，因为已经可以正常编译sass，所以直接跳过编译函数。进而顺利执行其他的安装步骤。

        npm install -g ./

- 如果报以下错误

  ```
  fs.js:143
      throw err;
      ^

  Error: ENOENT: no such file or directory, scandir '/Users/zcool/Documents/zdt/node_modules/node-sass/vendor'
      at Object.fs.readdirSync (fs.js:893:3)
      at Object.getInstalledBinaries (/Users/zcool/Documents/zdt/node_modules/node-sass/lib/extensions.js:130:13)
      at foundBinariesList (/Users/zcool/Documents/zdt/node_modules/node-sass/lib/errors.js:20:15)
      at foundBinaries (/Users/zcool/Documents/zdt/node_modules/node-sass/lib/errors.js:15:5)
      at Object.module.exports.missingBinary (/Users/zcool/Documents/zdt/node_modules/node-sass/lib/errors.js:45:5)
      at module.exports (/Users/zcool/Documents/zdt/node_modules/node-sass/lib/binding.js:15:30)
      at Object.<anonymous> (/Users/zcool/Documents/zdt/node_modules/node-sass/lib/index.js:14:35)
      at Module._compile (internal/modules/cjs/loader.js:702:30)
      at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)
      at Module.load (internal/modules/cjs/loader.js:612:32)
  ```
## 执行以下
  **删掉node-modules**
    ```
    npm install
    ```       

        
## 使用方法

- 进入到项目的根目录，然后运行命令即可

        cd project/folder
        zdt
        
### livereload 需下载插件使用
- 修改文件 zdt-config.js 配置项： liveReload: true。

- 下载安装插件。chrome商店地址：[https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)

- 启动zdt后 点击插件图标开启调试即可。
