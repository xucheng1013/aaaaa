//提取css到单独的css文件模块
var extractTextPlugin = require("extract-text-webpack-plugin");
//自动生成主页面的模块
var htmlWebpackPlugin = require("html-webpack-plugin");

module.exports  =  {
	plugins : [

		new htmlWebpackPlugin({
			//使用自定义的模版文件生成主页
			template : "./index.html"
		}),
	    new extractTextPlugin("[hash]-bundle.css")
	],
	//文件主入口文件
	entry : {
		main : "./main.js"
	},
	output : {
		//目的地路径
		path : "./build/",
		filename : "[hash]-bundle.js"
	},
	module : {
		loaders : [
           {
           	//要加载哪些扩展文件
           	  test : /.css$/,
           	  //指定具体的加载器
           	  loader : extractTextPlugin.extract("css")//参数是具体的加载器名称
           },
           {
           	  test : /.html/,
           	  loader : "html"
           },
           {
           	//匹配图片
           	  test : /.(png|gif|jpg)/,
           	  //最终图片会被打包到images目录下
           	  //name=images/[name].[ext]"
           	  loader : "file-loader?name=images/[name].[ext]"
           }
		]
	}
}