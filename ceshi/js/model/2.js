define(['jquery','layui','template','larea','lareadata','time'],function($,lay,templay,site,sitedata,time){
	var Form = {
		confing:{
			html_text:	'<div class="layui-form-item" value="{{default_value}}" data-ui_type="{{ui_type}}" {{if ui_type==4}}data-pattern="{{pattern}}"{{/if}} _id = {{id}}>'+
							'<label class="layui-form-label">{{if (required==1)}}<b>*</b>{{/if}}{{name}}</label>'+
							'{{if(desc!="")}}<p class="layui-form-p">{{desc}}</p>{{/if}}'+
						    '<div class="layui-input-block">'+
						      	'<input type="text" id="{{id}}" name="{{id}}" {{if ui_type==4||ui_type==7||ui_type==8}}readonly{{/if}} placeholder={{if ui_type==7||ui_type==8}}"请选择默认值"{{else if ui_type==3}}"请输入数字"{{else if ui_type==4}}请选择时间{{else if ui_type==1}}请输入文本{{/if}} value="{{default_value}}" lay-filter="change" class="layui-input {{if ui_type==7||ui_type==8}}lay_options {{/if}}{{if ui_type==4}}lay_time{{else if pattern||ui_type==3||required==1}}lay_form{{/if}}" lay-verify="{{if (required==1)}}required{{if (pattern)}}|{{/if}}{{/if}}{{if (pattern=="邮编")}}postcode'+
						      	'{{else if(pattern=="手机号码")}}phone'+
						      	'{{else if(pattern=="电话号码")}}call'+
						      	'{{else if(pattern=="身份证号")}}identity'+
						      	'{{else if(pattern=="邮箱")}}email'+
						      	'{{else if(ui_type=="3")}}number'+
						      	'{{else if(required=="1")}}nulls'+
						      	'{{/if}}">'+
						    '</div>'+
					    '</div>',
		    html_textarea:'<div class="layui-form-item layui-form-text" value="{{default_value}}" data-ui_type="{{ui_type}}" _id = {{id}}>'+
							    '<label class="layui-form-label">{{if (required==1)}}<b>*</b>{{/if}}{{name}}</label>'+
								'{{if(desc!="")}}<p class="layui-form-p">{{desc}}</p>{{/if}}'+
							    '<div class="layui-input-block">'+
							      	'<textarea placeholder="请输入文本" name="{{id}}" class="{{if ui_type==2}}layui-input {{/if}}layui-textarea {{if (required==1)}}lay_form{{/if}}" style="resize:none" {{if required==1}}lay-verify="nulls"{{/if}}>{{default_value}}</textarea>'+
							    '</div>'+
						  '</div>',
			html_checked:'<div class="layui-form-item" pane="" value="{{default_value}}" data-ui_type="{{ui_type}}" _id = {{id}}>'+
					    	'<label class="layui-form-label">{{if (required==1)}}<b>*</b>{{/if}}{{name}}</label>'+
					    	'{{if(desc!="")}}<p class="layui-form-p">{{desc}}</p>{{/if}}'+
					    	'<div class="layui-input-block layui-input-fff">'+
					    		'{{each item}}{{if ui_type==5}}<input type="radio" name="{{id}}" value="{{$value.name}}" title="{{$value.name}}" {{if $value.name==default_value}}checked=""{{/if}}>{{else if ui_type==6}}<input type="checkbox" name="{{id}}" lay-skin="primary" title="{{$value.name}}" {{if default_value}}<% for(var j = 0; j < default_value.split(",").length; j++){ %> {{if default_value.split(",")[j]==$value.name}}checked=""{{/if}} <% } %> {{/if}}>{{/if}}{{/each}}'+
						    '</div>'+
					  	'</div>',
			html_division:	'<div class="layui-form-item" value="{{default_value}}" data-ui_type="{{ui_type}}" _id = {{id}}>'+
								'{{if name}}<fieldset class="layui-elem-field layui-field-title"><legend>{{name}}</legend></fieldset>{{/if}}'+
								'{{if(desc!="")}}<p class="layui-form-p">{{desc}}</p>{{/if}}'+
							'</div>',
			html_dz:'<div class="layui-form-item layui-form-text" value="{{default_value}}" data-ui_type="{{ui_type}}" _id = {{id}}>'+
					    '<label class="layui-form-label">{{if (required==1)}}<b>*</b>{{/if}}{{name}}</label>'+
						'{{if(desc!="")}}<p class="layui-form-p">{{desc}}</p>{{/if}}'+
					    '<div class="layui-input-block">'+
					    	'<input class="layui-input site_show" name="{{id}}" id="site_show{{id}}" type="text" readonly placeholder="请选择城市"  value="{{name}}"/><input class="site_show"  id="site_hide{{id}}" type="hidden" 	/>'+
					      	'{{if pattern==0}}<textarea placeholder="请输入详细地址" name="{{id}}_all" class="layui-textarea {{if (required==1)}}lay_form{{/if}}" style="resize:none">{{default_value}}</textarea>{{/if}}'+
					    '</div>'+
			 	 	'</div>',
	 	 	html_upload:'<div class="layui-upload layui-form-item">'+
	 	 					'<button class="layui-btn upload">{{name}}</button>'+
						  	'{{if ui_type==12}}<input type="file" id="{{id}}" name="{{id}}" style="display:none" accept="image/png,image/jpg,image/jpeg,image/BMP,image/EPS,image/DCS,image/GIF,image/PDF,image/PCX,image/Raw,image/PICT,image/PXR,image/SCT,image/TIFF,image/Targa">{{else}}<input type="file" name="{{id}}" id="{{id}}" accept="*" style="display:none" >{{/if}}'+
						  	'<div class="layui-upload-list">'+
							    '<img class="layui-upload-img" id="img{{id}">'+
							    '<p id="demoText"></p>'+
						  	'</div>'+
						'</div>',
			html_people:'<div class="layui-form-item layui-form-type" value="{{default_value}}" data-ui_type="{{ui_type}}" _id = {{id}}>'+
						    '<label class="layui-form-label">{{if (required==1)}}<b>*</b>{{/if}}{{name}}</label>'+
							'{{if(desc!="")}}<p class="layui-form-p">{{desc}}</p>{{/if}}'+
						    '<div name="{{id}}" class="lay_peobre layui-input-block{{if ui_type==17||ui_type==19}} layui-input-height{{/if}}">'+
						    	'{{if true_default_value}}{{each true_default_value.split(",")}}<span><i class="icon">{{if (ui_type==16||ui_type==17)}}&#xe64d;{{else}}&#xe60e;{{/if}}</i>{{$value}}</span>{{/each}}{{else}}{{if ui_type==16||ui_type==17}}<h1>点击选择人员</h1>{{else}}<h1>点击选择部门</h1>{{/if}}{{/if}}'+
						    '</div>'+
			 	 		'</div>'
		},
		create:function(){
			var html = '';
			$.each(data,function(i,e){
				switch(e.ui_type*1){
					case 1:
					case 3:
					case 4:
					case 7:
					case 8:
						html += templay.render(Form.confing.html_text,e);
					break;
					case 2:
						html += templay.render(Form.confing.html_textarea,e);
					break;
					case 5:
					case 6:
						html += templay.render(Form.confing.html_checked,e);
					break;
					case 9:
						html += templay.render(Form.confing.html_division,e);
					break;
					case 10:
						html += templay.render(Form.confing.html_dz,e);
					break;
					case 12:
					case 13:
						html += templay.render(Form.confing.html_upload,e);
					break;
					case 18:
					case 19:
					case 16:
					case 17:
						html += templay.render(Form.confing.html_people,e);
					break;
				}
			})
			$('.layui-form').html(html+'<button lay-submit="" class="lay_ver" lay-filter="demo1" style="display:none"></button><div class="layui-form-item layui-form-submit"><button class="layui-btn submit" lay-submit="" lay-filter="submit">提交</button></div>');
			layui.use(['form','upload','layer'], function () { 
		        var form = layui.form;
		        var upload = layui.upload;
		        var layer = layui.layer;
				//提交
				form.on('submit(submit)',function(data){
					alert('提交')
					console.log(data)
				    return false;
			  	});
				//提交end		        
		        //验证
		       	form.verify({
		       		postcode : function(value, item){
		       			$('.item').focus();
					    if(!new RegExp(/^[0-6]\d{5}$/).test(value)){
					      return '请输入正确的邮编';
					    }
				  	}
		       	})
		       	$('.lay_form').on('change',function(){
		       		form.on('submit(demo1)',function(data){
					    return false;
				  	});
		       		$('.lay_ver').click()
		       	})
		       	//验证end
		       	//上传
		       	$('.upload').on('click',function(){
		       		$(this).next().click();
		       		load('#'+$(this).next().attr('id'))
		       	})
		       	function load(obj){
		       		var uploadInst = upload.render({
					    elem: obj
					    ,url: '/upload/'
					    ,before: function(obj){
					      //预读本地文件示例，不支持ie8
					      	obj.preview(function(index, file, result){
						        $('#demo1').attr('src', result); //图片链接（base64）
					      	});
					    }
					    ,done: function(res){
					      	//如果上传失败
					      	if(res.code > 0){
					        	return layer.msg('上传失败');
					      	}
					      	//上传成功
					    }
					    ,error: function(){
					      //演示失败状态，并实现重传
					      	var demoText = $('#demoText');
					      	demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
					      	demoText.find('.demo-reload').on('click', function(){
					        	uploadInst.upload();
					      	});
				    	}
			       	})
		       	}
	       		
		       	//上传end
		    })
			$(function(){
				$('.layui-input').on('change',function(){
					var $that = $(this).closest('.layui-form-item');
				})
				//时间
				$('.lay_time').each(function(){
					var _id = $(this).attr('id');
					if($(this).closest('.layui-form-item').data('pattern')=='日期'){
						$('#'+_id).shijian({
							Hour:false,
							Minute:false,
							Seconds:false
						})
					}else{
						$('#'+_id).shijian()
					}
					var $that = $(this).closest('.layui-form-item');
				})
				//时间end
				//地址
				$('.site_show').each(function(i,e){
					var areas = 'arrs'+i
					areas= new LArea();
				    areas.init({
				        'trigger': '#'+$(this).attr('id'), //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
				        'valueTo': '#'+$(this).next().attr('id'), //选择完毕后id属性输出到该位置
				        'keys': {
				            id: 'id',
				            name: 'name'
				        }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
				        'type': 1, //数据源类型
				        'data': LAreaData //数据源
				    });
				})
				//地址end
				//下拉框
				$('.lay_options').on('click',function(){
					var dt = {};
					var i = $(this).closest('.layui-form-item').index();
					var $that = $(this).closest('.layui-form-item');
					var arr = $that.attr('value')!=''?$that.attr('value').split(','):[];
					var html = '<div class="header"><button class="x-btn nav-left">清空</button><button class="x-btn nav-right">确定</button></div><div class="content"><div class="combo-search-header"><input class="combo-search" placeholder="搜索"></div><div class="combo-list">'
					+'{{each item}}<div class="combo-item {{if value}}<% for(var i = 0; i < value.split(",").length;i++) { %>'
    					+'{{if $value.name==value.split(",")[i]}}select{{/if}}'
						+'<% } %>{{/if}}" id={{$value.id}}>{{$value.name}}</div>{{/each}}'
					+'</div>{{if item.length>50}}<div class="combo-load-more x-ui-hidden">点击加载更多</div>{{/if}}</div>';
					$.extend(dt, data[i],{value:$that.attr('value')});
					shade({name:$(this),html:templay.render(html,dt),fun:function(){
						$('.combo-item').on('click',function(){
							switch($that.data('ui_type')*1){
								case 7:
									$that.attr('value',$(this).text()).find('.layui-input').val($(this).text());
									shadeR();
								break;
								case 8:
									var that = this;
									$(this).toggleClass('select');
									if($(this).hasClass('select')){
										if(arr.length!=0){
											$.each(arr,function(i,e){
												if(e!=$(that).text()){
													arr.push($(that).text());
													return false;
												}
											})
										}else{
											arr.push($(that).text());
										}
									}else{
										$.each(arr,function(i,e){
											if(e==$(that).text()){
												arr.splice(i,1)
											}
										})
									}
								break;
							}
						})
						$('.nav-right').on('click',function(){
							$that.attr('value',String(arr));shadeR();
							updata($that)
						})	
						$('.nav-left').on('click',function(){
							arr = [];
							$that.attr('value',String(arr));shadeR();
							updata($that)
						})
						$('.combo-search').on('input',function(){
							seek($('.combo-list'),$(this).val())
						})
					}})
				})
				//下拉框end
				//人员单选-部门多选
				$('.lay_peobre').on('click',function(){
					var _parent = $(this).closest('.layui-form-item');
					var $that = $(this);
					var _type = _parent.data('ui_type');
					var _val = _parent.attr('value');
					var ass = [];
					$(this).children('span').each(function(){
						ass.push($(this).text().substr(1));
					})
					
					$.get('json/bm.json',function(info){
						var arr = {};
						$.extend(arr,info.info,{ui_type:_type,_value:_val,_name:ass});
						console.log(info)
						var _content = '';
						$.each(arr.branch_list,function(i,e){
							var n = 0 ;
							function con(_data,_val,_type){
								var _val = _val||''
								var _con = '<ul class="_child">';
								if(_data._child){
									$.each(_data._child,function(s,_x){
										var _nas = '';
										var _clas = '';
										var icons = '';
										var _htmls = '';
										if(_type==16||_type==18){_nas = "select_radio",icons=''}else{_nas = "select_checked" ,icons = "&#xe605;"};
										for(var j = 0; j <_val.split(',').length;j++){
											if(_val.split(',')[j] == _x.id){
												_clas = ' checkeds'
											}
										}
										if(_type==18||_type==19){
											_htmls = 	'<div class="select-btn '+_nas+'">'
														+'<i class="'+_x.id+_clas+' layui-icon">'+icons+'</i>'
														+'</div>'
										}
										_con +='<li class="depart-item" id="'+_x.id+'">'
										+_htmls
										+'<span class="depart-icon">'
										+'<i class="icon">&#xe60e;</i>'
										+'</span>'
										+'<span class="depart-text">'+_x.branch_name+'</span>'
										if(_x._child){
											_con +='<span class="_btn"></span></li>'+con(_x,_val,_type)
											console.log(_type)
										}else{
											_con +='</li>'
										}
									})
								}	
								_con +='</ul>';
								return _con
							}
							var _na = '';
							var _cla = '';
							var icon = '';
							var _html = '';
							if(_type==16||_type==18){_na = "select_radio",icon=""}else{_na = "select_checked",icon="&#xe605;"};
							for(var j = 0; j <_val.split(',').length;j++){
								if(_val.split(',')[j] == e.id){
									_cla = ' checkeds'
								}
							}
							if(_type==18||_type==19){
								_html+=	'<div class="select-btn '+_na+'">'
										+'<i class="'+e.id+_cla+' layui-icon">'+icon+'</i>'
										+'</div>'
							}
							_content +='<li class="depart-item " id="'+e.id+'">'
								+_html
								+'<span class="depart-icon">'
									+'<i class="icon">&#xe60e;</i>'
								+'</span>'
								+'<span class="depart-text">'+e.branch_name+'</span>';
							if(e._child){_content += ('<span class="_btn"></span></li>'+con(e,_val,_type))}else{
								_content += '</li>'
							};
						})
						
						var html = '<div class="select-set-pane" value="{{_value}}" type="{{ui_type}}">'+
							'<div class="select-search">'+
								'<div class="search-input x-text">'+
									'<input type="search" autocomplete="off" autocorrect="off" placeholder="搜索内容">'
								+'</div>'
							+'</div>'
							+'<ul class="select-list {{if ui_type==17||ui_type==19}}selects-list{{/if}}" type="ui_type">'
								+'{{if _value}}{{each _value.split(",")}}<li class="select-item {{$value}}"><i class="icon icon-department">{{if ui_type==16||ui_type==17}}&#xe64d;{{else}}&#xe60e;{{/if}}</i><span>{{_name[$index]}}</span><span class="remove-btn"><i>✖</i></span></li>{{/each}}{{/if}}'
							+'</ul>'
							+'<div class="set-list {{if ui_type==17||ui_type==19}}sets-list{{/if}}">'
							+'{{if ui_type==16||ui_type==17}}<ul class="select-path"><li><span>我的部门</span></li></ul>{{/if}}'
//								+'<div class="depart-title">我的部门</div>'
//								+'<ul class="select-depart current-depart">'
//									+'<li class="depart-item">'
//										+'<div class="select-btn">'
//											+'<i class="icon {{id}}">{{if ui_type==18}}{{/if}}</i>'
//										+'</div>'
//										+'<span class="depart-icon">'
//											+'<i class="icon-department"></i>'
//										+'</span>'
//										+'<span >{{branch_name}}</span>'
//									+'</li>'
//								+'</ul>'
								+'<ul class="select-depart">'
									+_content
								+'</ul>'
								+'{{if ui_type==16||ui_type==17}}<ul class="select-user">'
								+'{{each data}}<li class="user-item" id="{{$value.id}}">'//缺少数据
								+'<span class="depart-icon"><i class="icon">&#xe64d;</i></span><span class="depart-text">{{$value.real_name}}</span>'
								+'<div class="select-btn {{if ui_type==16}}select_radio{{else}}select_checked{{/if}}">'
								+'<i class="{{$value.id}} {{if _value}}<% for(var i = 0;i < _value.split(",").length; i++){ %>{{if _value.split(",")[i]==$value.id}} checkeds{{/if}}<% }%>{{/if}} layui-icon">{{if ui_type==17}}&#xe605;{{/if}}</i>'
								+'</div>'
								+'</li>{{/each}}</ul>{{/if}}'//缺少数据end
							+'</div>'
							+'<div class="set-btn-pane">'
								+'<div class="set-btn"><button class="x-btn style-grey" role="cancel">取消</button></div>'
								+'<div class="set-btn"><button class="x-btn style-blue" role="confirm">确定</button></div>'
							+'</div>'
						+'</div>';
						shade({html:templay.render(html,arr),fun:function(){
							$('._btn').on('click',function(e){
								e.stopPropagation();
								$(this).toggleClass('_xz').parent().next('._child').toggle(300).children('.depart-item').show();
							})
							function click(){
								if($(this).closest('.select-set-pane').attr('type')=='18'||$(this).closest('.select-set-pane').attr('type')=='16'){
									$('.select_radio').children('i').removeClass('checkeds');
									$('.select-list').children().remove();
								}
								$('.select-btn').find('i.'+$(this).attr('id')).toggleClass('checkeds');
								if($(this).children('.select-btn').find('i').hasClass('checkeds')){
									switch($('.select-set-pane').attr('type')*1){
										case 17:
										case 16:
											var icon = "&#xe64d;"
										break;
										case 18:
										case 19:
											var icon = "&#xe60e;"
										break;
									}
									$('<li class="select-item '+$(this).attr("id")+'"><i class="icon icon-department">'+icon+'</i><span>'+$(this).children(".depart-text").text()+'</span><span class="remove-btn"><i>✖</i></span></li>').appendTo('.select-list')
								}else{
									$('.select-list .'+$(this).attr('id')+' .remove-btn').click();
								}
							}
							if($('.select-set-pane').attr('type')==18||$('.select-set-pane').attr('type')==19){
								$('.depart-item').on('click',function(e){//元素点击事件部门
									click.call(this);
								})
							}else{
								var old ='';
								$('.depart-item').on('click',function(e){//人员部门点击事件
									if($(this).attr('id')!=old){
										old = $(this).attr('id');
										$(this).siblings().hide();
										//面包屑
										var arr_break = [$(this).children('.depart-text').text()];
										var arr_break_id = [$(this).attr('id')],obj_extend={};
										bread(this);
										function bread(obj){
											if($(obj).closest('._child').prev('.depart-item').length!=0){
												var name = $(obj).closest('._child').prev('.depart-item').children('.depart-text').text();
												var _id = $(obj).closest('._child').prev('.depart-item').attr('id');
												arr_break.push(name);
												arr_break_id.push(_id);
												$(obj).closest('._child').siblings().hide().end().prev().show();
												bread($(obj).closest('._child').prev('.depart-item'));
											}
										}
										$.extend(obj_extend,{_name:arr_break.reverse(),_id:arr_break_id.reverse()});
										var html_break ='<li class="path-item"><span>我的团队</span><i class="icon">&#xe608;</i></li>'
													   +'{{each _id}}{{if $index==_id.length-1}}<li><span>{{_name[$index]}}</span></li>{{else}}<li _id="{{$value}}" class="path-item"><span>{{_name[$index]}}</span><i class="icon">&#xe608;</i></li>{{/if}}{{/each}}'
										$('.select-path').html(templay.render(html_break,obj_extend));
										$('.path-item').on('click',function(){
											$('._btn').removeClass('_xz');
											if($(this).attr('_id')){
												$("#"+$(this).attr('_id')).children('._btn').addClass('_xz').end().siblings('._child').hide().end().next('._child').show().children('.depart-item').show().siblings('._child').hide();;
											}else{
												$('._child').hide();
												$('.select-depart').children('.depart-item ').show();
											}
											$(this).removeClass('path-item').nextAll().remove().end().children('.icon').remove()
										})
										//面包屑end
										$.get('json/ry.json',function(info){
											var html_people = '';
											$.extend(info,{ui_type:_type,_value:_val,_name:ass});
											html_people += '{{each data}}<li class="user-item" id="{{$value.id}}">'
														+'<span class="depart-icon"><i class="icon">&#xe64d;</i></span><span class="depart-text">{{$value.real_name}}</span>'
														+'<div class="select-btn {{if ui_type==16}}select_radio{{else}}select_checked{{/if}}">'
														+'<i class="{{$value.id}} {{if _value}}<% for(var i = 0;i < _value.split(",").length; i++){ %>{{if _value.split(",")[i]==$value.id}} checkeds{{/if}}<% }%>{{/if}} layui-icon">{{if ui_type==17}}&#xe605;{{/if}}</i>'
														+'</div>'
														+'</li>{{/each}}';
											$('.select-user').html(templay.render(html_people,info));
										})
									}
								})
								$('.select-user').on('click','.user-item',function(){//人员点击事件
									click.call(this);
								})
							}
						}});
						$('.select-set-pane').on('click','.remove-btn',function(){//小图标关闭事件
							$(this).closest('.select-item').remove();
							$('#'+$(this).parent().attr('class').split(' ')[1]).find('.select-btn').children('i').removeClass('checkeds');
						})
						$('.style-blue[role="confirm"]').on('click',function(){//人员单选-部门多选确定事件
							var add=[];
							var html = '';
							switch($('.select-set-pane').attr('type')*1){
								case 17:
								case 16:
									var icon = "&#xe64d;";
									var _html = "<h1>点击选择人员</h1>";
								break;
								case 18:
								case 19:
									var icon = "&#xe60e;";
									var _html = "<h1>点击选择部门</h1>";
								break;
							}
							$('.select-list').children().each(function(){
								add.push($(this).attr('class').split(' ')[1]);
								html += '<span><i class="icon">'+icon+'</i>'+$(this).children().eq(1).text()+'</span>'
							});
							if(html==''){
								html = _html
							}
							$that.html(html);_parent.attr('value',String(add));
							shadeR();
						})
						$('.style-grey[role="cancel"]').on('click',shadeR)//人员单选-部门多选取消事件
						$('.search-input').children().on('input',function(){
							var val = $(this).val();
							if(val == ''){
								$('.select-depart').children().show();
							}
							$('.select-depart').children().each(function(){
								if($(this).find('.depart-text').text().indexOf(val)!=-1){
									$(this).show();
								}else{
									$(this).hide();
								}
							})
						})
					})
				})
				//人员单选-部门多选end
				var shadeR = function(){//删除遮罩
					$('.shade').remove();
				}
				function shade(_obj){//生成遮罩
					var shade = $('<div class="shade"></div>').appendTo('body');
					shade.css({background:"rgba(0,0,0,.5)",position:'fixed',width:'100%',height:'100%',top:0,zIndex:99,left:0});
					$('<div>').html(_obj.html).appendTo(shade).css({width:'80%',height:'100%',position: 'absolute',right:'-80%',background:'#fff'}).animate({right:0},300).on('click',stop);
					shade.on('click',function(e){
						shadeR()
					})
					function stop(e){e.stopPropagation()};
					_obj.fun();
				}
				window.updata = function(obj,flag){//数据更新
					var flag = flag?1:0;
					if(obj){
						if(flag == 0){
							$(obj).find('input').val($(obj).attr('value'))
						}else{
							$(obj).attr('value',$(obj).find('input').val())
						}
					}else{
						$('.layui-form-item').each(function(){
							$(this).find('input').val($(this).attr('value'))
						})
					}
				}
				window.seek = function(obj,val){
					if(val!=''){
						if($(obj).children().length<50){
							$(obj).children().each(function(){
								if($(this).text().indexOf(val)!=-1){
									$(this).show();
								}else{
									$(this).hide();
								}
							})
						}else{
							//$.get()   //发送请求
						}
					}else{
						$(obj).children().show();
					}
				}
			})
		}
	}
	return Form
})