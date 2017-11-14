define(['zepto','template','plupload'],function($,template,plupload){
	var Upload = {
		config:{
			html:('<div><input type="text" value="{{url}}"><button id="">选择文件</button></div>')
		},
		create:function(){
			console.log(Upload)
			$('.upload').html(template.compile(Upload.config.html,{url:''}));
			$('.upload').find('button').attr('id')
		}
	}
	return Upload
})