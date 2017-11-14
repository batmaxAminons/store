requirejs.s.contexts._.config.config = config
require.config({
	packages: [{
            name: '2',
            location: 'model',
            main: '2'
        }
    ],
	baseUrl: 'js',
	paths:{
		'jquery':'lib/jquery',
		'template':'lib/template',
		'layui':'lib/layui/layui',
		'lareadata':'lib/site/LAreaData',
		'larea':'lib/site/LArea.min',
		'time':'lib/jquer_shijian',
		'2':'model/2',
	},
	shim:{
		'plupload': {
            deps: ['lib/plupload/js/moxie.min'],
            exports: "plupload"
        },
	}
})

define(['jquery','layui','2'],function($,o,x){
	var Config = requirejs.s.contexts._.config.config;
	$(function () {
        //加载相应模块
    	require(['layui'],function(lay){
	        if (Config.jsname) {
	        	$.get('json/data.json',function(data){
	        		window.data = data;
	        		require([Config.jsname], function (Controller) {
		            	console.log(Controller)
		                Controller[Config.actionname] != undefined && Controller[Config.actionname]();
		            }, function (e) {
		                console.error(e);
		                // 这里可捕获模块加载的错误
		            });
	        	})
        		
	        }
    	})
    });
	
//	console.log(x.create())
})