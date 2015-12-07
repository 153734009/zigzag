String.prototype.HTML_encode = function(){
	str = this.replace(/</g,"&lt;");
	str = str.replace(/>/g,"&gt;");  
	str = str.replace(/ /g,"&nbsp;");  
	str = str.replace(/\'/g,"'");  
	str = str.replace(/\"/g,"&quot;");  
	str = str.replace(/\n/g,"<br />");  
	return str;
};
String.prototype.HTML_decode = function(){
	str = this.replace(/&lt;/g,"<");
	str = str.replace(/&gt;/g,">");  
	str = str.replace(/&nbsp;/g," ");  
	str = str.replace(/'/g,"\'");  
	str = str.replace(/&quot;/g,"\"");  
	str = str.replace(/<br \/>/g,"\n");str = str.replace(/<br>/g,"\n");
	return str;
};
Date.prototype.format = function(format){
	var Y=this.getFullYear(),
		y=Y.toString().substring(2)
		m=this.getMonth()+1,
		d=this.getDate(),
		h=this.getHours(),
		i=this.getMinutes(),
		s=this.getSeconds();
	switch( format ){
		case 'yyyy-mm-dd':
			return Y+'-'+(m<10?'0':'')+m+'-'+(d< 10 ? '0' : '') + d;
			break;
		case 'yyyy-mm-dd hh:ii:ss':
			return Y+'-'+(m<10?'0':'')+m+'-'+(d<10?'0':'')+d+' '+(h<10?'0':'')+h+':'+(i<10?'0':'')+i+':'+(s<10?'0':'')+s;
			break;
		case 'yy-m-d':
			return y+'-'+m+'-'+d;
			break;
		default:
			console.log('日期对象暂不支持此种格式的解析！');
			return '';
	}
};
Array.prototype.remove = function(value){
	var dx=-1;
	for(var i=0;i<this.length;i++){
		if (this[i]==value){
			dx=i;
			break;
		}
	}
	if (dx!=-1){
		for(var i=0,n=0;i<this.length;i++){ 
			if(this[i]!=this[dx])  this[n++]=this[i];
		} 
		this.length-=1 
	}
	return this;
};
Array.prototype.combine = function(arr, decollator){
	if(this.length==0){
		return arr;
	}else if(arr.length==0){
		return this;
	}else{
		var combined = new Array();
		for(var i=0; i<this.length; i++) {
			for(var j=0; j<arr.length; j++) {
				combined.push(this[i] + decollator + arr[j]);
			}
		}
		return combined;
	}
}

function isMobile(tel){
	var patt = /^1[^1267][0-9][ ]?[0-9]{4}[ ]?[0-9]{4}$/;
	return patt.test(tel);
}
function isTel(tel){
	var patt = new RegExp("^[0-9]{3,4}[ -]{0,1}[0-9]{7,8}$");
	return patt.test(tel);
}
function isChinaId(id){
	var patt = new RegExp("^[0-9]{15}$|^[0-9]{17}[0-9Xx]$");
	return patt.test(id)
}
function isEAN13(str){
	if ( str.length!=13 ){
		return false;
	}
	var odd = 0,even = 0;
	for(i=0; i<12; i++){
		i%2==1 ? even+=parseInt(str[i]*3) : odd+=parseInt(str[i]);
	}
	verify = (odd+even)%10==0 ? 10:(odd+even)%10;
	return ( str[12] == 10-verify );
}
//浮点数运算
function floatAdd(arg1,arg2){//加法
	var r1,r2,m;
	try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
	try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
	m=Math.pow(10,Math.max(r1,r2));//pow(X,y)就是计算X的Y次方
	return (arg1*m+arg2*m)/m
}
Number.prototype.floatAdd = function (arg){return floatAdd(arg, this);} 
function floatSub(arg1,arg2){//减法
	var r1,r2,m,n;
	try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
	try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
	m=Math.pow(10,Math.max(r1,r2));
	n=(r1>=r2)?r1:r2;//动态控制精度长度
	var res = ((arg1*m-arg2*m)/m).toFixed(n);
	return parseFloat(res);
}
Number.prototype.floatSub = function (arg){return floatSub(this, arg);}
function floatMul(arg1,arg2){//乘法
	var m=0,s1=arg1.toString(),s2=arg2.toString();
	try{m+=s1.split(".")[1].length}catch(e){}
	try{m+=s2.split(".")[1].length}catch(e){}
	return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}
Number.prototype.floatMul = function (arg){return floatMul(this, arg);}
function floatDiv(arg1,arg2){//除法
	var t1=0,t2=0,r1,r2;
	try{t1=arg1.toString().split(".")[1].length}catch(e){}
	try{t2=arg2.toString().split(".")[1].length}catch(e){}
	with(Math){
		r1=Number(arg1.toString().replace(".",""))
		r2=Number(arg2.toString().replace(".",""))
		return (r1/r2)*pow(10,t2-t1);
	}
}   
Number.prototype.floatDiv = function (arg){return floatDiv(this, arg);}

$.validator && $.extend( $.validator, {
	messages: {
		required: "该项是必填项，请填写.",
		remote: "Please fix this field.",
		email: "请填写有效的 email 地址.",
		url: "请填写有效的 URL 地址.",
		date: "请填写有效的 日期.",
		dateISO: "Please enter a valid date ( ISO ).",
		number: "请填写有效的 数字.",
		digits: "Please enter only digits.",
		creditcard: "请填写有效的 信用卡号.",
		equalTo: "您填写的内容不一致.",
		maxlength: $.validator.format( "最多只能填写 {0} 个字符." ),
		minlength: $.validator.format( "至少要填写 {0} 个字符." ),
		rangelength: $.validator.format( "请填写 {0} - {1} 个字符." ),
		range: $.validator.format( "请填写 {0} - {1} 之间的值." ),
		max: $.validator.format( "请填写小于 {0} 的值." ),
		min: $.validator.format( "请填写大于 {0} 的值." )
	},
});

/* ===================================================
 * zigzag.js v0.3.1126
 * jQuery上扩展出静态类 zigzag 。（未考虑命名冲突，须完善）
 * http://www.eweiwei.com/zigzag/
 *
 * 日志：
 * 1. 事件使用和bootstrap一样的命名空间 data-api
 * 2. 新增validator的中文消息支持			20141127 
 * 3. 新增工具方法：ajaxFormCheckReturn		20141128
 *	  新增记住账号扩展
 * ===================================================
 * Copyright 2014
 */
if (typeof jQuery === 'undefined') { throw new Error('Zigzag\'s JavaScript requires jQuery') }
;jQuery.extend({
	// 使用 $.zigzag.checkAjaxData( arguments ) 直接调用。
	zigzag:{
		checkAjaxData:function(data){
			if (typeof(data) === 'string') {
				throw new Error( "The expected data type is obj,but string return!");
			}else if (data.errcode) {
				//alert(data.errmsg+' ['+data.errcode+']');
				throw new Error( data.errmsg+' ['+data.errcode+']' );
			}
		},
		ajaxFormCheckReturn:function($form, data){
			$form.click(function(){$('#'+$(this).attr("id")+"-error").remove();});
			var id = $form.attr("id");
			if (typeof(data) == 'string') {
				$form.after('<label id="'+id+'-error'+'" class="error" for="'+id+'">意外错误.</label>');
				console.warn(data);
				throw new Error("意外错误");
			}else if (data.errcode) {
				var str = data.errmsg+'('+data.errcode+')';
				$form.after('<label id="'+id+'-error'+'" class="error" for="'+id+'">'+str+'</label>');
				console.info( str );
				throw new Error(str);
			}else if(data.errcode === 0){
				if(typeof($form.data("trigger"))!='undefined'){
					$form.trigger($.Event($form.data("trigger")+'.ok'));
				}else{
					location.reload(true);
				}
			}else{
				throw new Error("数据错误");
			}
		},
		finalStyle:function(obj, name) {
			if(obj.currentStyle){//IE 未详细测试
				return obj.currentStyle[name];
			}else{
				if ( name ) {
					return getComputedStyle(obj, false)[name];
				}else{
					return getComputedStyle(obj);
				}
			}
		},
		submit:function(url, data){
			var	f= document.createElement('form');
				f.noAjaxForm = 'noAjax';
				f.action = url;
			f.method = 'post';
			document.body.appendChild(f);
			for(var key in data){  
				if(typeof data[key]  === 'string'||'number'){
					var temp=document.createElement('input');
					temp.type= 'hidden';
					temp.name= key ;
					temp.value= data[key];	
					f.appendChild(temp);
				}
			}
			f.submit();
			f.remove();
		},
		var_dump:function(obj){
			var str;
			if(typeof(obj) == "object"){
				var txt = '';
				for(key in obj){
					//在此迭代 递归
					if(typeof(obj.key) == "object"){
					}
					txt += key + '=' + obj[key] + ',\n';
				}
				str = "Type: "+typeof(obj)+((obj.constructor) ? "\nConstructor: "+obj.constructor : "")+"\nValue: " + txt;
			}else{
				str = "Type: "+typeof(obj)+"\nValue: "+obj;
			}
			str = str.HTML_encode();
			document.write("<pre>"+str+"<pre>");
		},
		isHanzi:function(str){
			return /^[\u4e00-\u9fa5]+$/.test(str);
		},
		isEAN13:function(str){	//检验是否EAN13标准的条形码
			if ( str.length!=13 ){
				return false;
			}
			var odd = 0,even = 0;
			for(i=0; i<12; i++){
				i%2==1 ? even+=parseInt(str[i]*3) : odd+=parseInt(str[i]);
			}
			verify = (odd+even)%10==0 ? 10:(odd+even)%10;
			return ( str[12] == 10-verify );
		},
		newListorder : function(big, small){
			small = small==undefined ? 0:small;
			if(!big && small == 0){return 100;}
			else if(!big){return parseInt(small) + 1;}
			else{
				var r1, r2, m;
				try{r1 = big.toString().split(".")[1].length}catch(e){r1 = 0}
				try {r2 = small.toString().split(".")[1].length}catch(e){r2 = 0}
				m = Math.pow(10, Math.max(r1, r2));
				if ((big * m - small * m) == 1) {
					m = m * 10;
				}
				return (big * m - 1) / m;
			}
		}
	}
});


/**
 *	data-toggle='zAjax'
 * @param	string		url
 * @param	json		data	
 * @param	function	callback
 *	============================
 *	设计是根据想怎么用以及怎么用合理来的
 *	$("#zAjax").zAjax({options对象})
 */
//;(function($, window, document, undefined) {
//	'use strict';
//	var ZAjax = function(element, options){ //这里是类所以首字母大写;用于下面的插件定义Plugin
//		this.$element = $(element),
//        this.defaults = {
//            'url': $(element).data("action") || '',
//            'data': $.parseJSON( "{"+($(element).data("data")||'')+"}" ) || {},
//            'callback': function(){location.reload(true);},
//			'debug': false,
//        },
//        this.options = $.extend({}, this.defaults, options);
//		this.$element.on('click.zAjax.zg.data-api', $.proxy(this.execute, this));
//	}
//	ZAjax.prototype.execute = function(){
//		if( this.options.debug===true ){
//			$.zigzag.submit(this.options.url, this.options.data);
//			return;
//		}
//
//		var eventOwner = this.$element,
//			e = $.Event('beforeExecute.zAjax.zg');
//		eventOwner.trigger(e);
//
//		if( !this.options.url ){
//			console.warn("the ajax [url] is required。");
//			console.info("出错节点："+this.$element[0].outerHTML);
//			return;
//		}
//		var callback= this.options.callback;
//		$.post(this.options.url, this.options.data, function(data){
//			try{
//				$.zigzag.checkAjaxData(data);
//			}catch(err){
//				console.warn(err);
//				return;
//			}
//			var e	= $.Event('correctExecuted.zAjax.zg');
//			e.zgData =data;
//			eventOwner.trigger(e);
//			if( $.isFunction(callback) ){
//				callback(data);
//			}
//		});
//	}
//    
//	// 插件定义，在插件中使用ZAjax对象
//	// ===============================
//	function Plugin(option){
//		return this.each(function(){
//			var zAjax = $(this).data('zg.zAjax');
//			if( !zAjax ){
//				$(this).data('zg.zAjax', (zAjax=new ZAjax(this, option)));
//			}
//			if( typeof option === 'string' ){
//				zAjax[option]();
//			}
//		})
//	}
//
//	// 解决名称冲突
//	// ============
//	var old = $.fn.zAjax;
//	$.fn.zAjax				= Plugin;
//	$.fn.zAjax.Constructor	= ZAjax;
//	$.fn.zAjax.noConflict	= function () {
//		$.fn.zAjax = old;
//		return this;
//	}
//	
//	// DATA-API
//	$(document).on('click.zAjax.zg.data-api', '[data-toggle="zAjax"]', function(e){
//		ZAjax.prototype.execute();
//	});
//})(jQuery, window, document);

// use strict 模式下的保留字
//1. implements,interface,let,package,private,public,static,yield
//2. $.proxy可用于改变上下文关系
//3. console.info("这是info"); console.debug("这是debug"); console.warn("这是warn"); console.error("这是error");



/**
 *	data-toggle='zSort'
 * @param	string		url
 * @param	ASC/DESC	sort	
 * @param	$node		items
 * @param	$node		connectWitch
 *	============================
 * 依赖jquer UI的sortable。sortable.js(http://jqueryui.com/)
 */
;(function($, window, document, undefined) {
	'use strict';
	var ZSort = function(element, options){
		this.$element = $(element),
        this.defaults = {
            'url': $(element).data("action") || '',
			'sort': $(element).data("sort") || 'ASC',
			'items': $(element).data("items") || 'li:not(.unsortable)',
			'connectWith': $(element).data("connectwith") || '',
//'debug':true
        },
        this.options = $.extend({}, this.defaults, options);
		this.$element.on('mouseover.zSort.zg.data-api', $.proxy(this.execute, this));
	}
	ZSort.prototype.newListorder = function(big, small){
		small = small==undefined ? 0:small;
		if(!big && small == 0){return 100;}
		else if(!big){return parseInt(small) + 1;}
		else{
			var r1, r2, m;
			try{r1 = big.toString().split(".")[1].length}catch(e){r1 = 0}
			try {r2 = small.toString().split(".")[1].length}catch(e){r2 = 0}
			m = Math.pow(10, Math.max(r1, r2));
			if ((big * m - small * m) == 1) {
				m = m * 10;
			}
			return (big * m - 1) / m;
		}
	}
	ZSort.prototype.execute = function(){
		var me = this;
		this.$element.sortable({items: this.options.items,
			connectWith: this.options.connectWith,
			stop: function(event, ui) {
				var	prev = ui.item.prev().data("sort"),
					next = ui.item.next().data("sort"),
					newSort = (me.options.sort == 'ASC')?
						newSort = ZSort.prototype.newListorder(next, prev)
						: newSort = ZSort.prototype.newListorder(prev, next),
					id = ui.item.attr("id"),
					pid = ui.item.closest("ul").closest("li").data("id");//可能会修改，写死了ul li结构
				if( me.options.debug===true ){
					$.zigzag.submit(me.options.url, {id:id, listorder:newSort, pid:pid});
					return;
				}
				if (id && newSort) {
					ui.item.attr("data-sort", newSort).data("sort", newSort);
					$.post(me.options.url, {id:id, listorder:newSort, pid:pid});
				}
			}
		});

	}
	// 插件定义，在插件中使用ZAjax对象
	// ===============================
	function Plugin(option){
		return this.each(function(){
			var zSort = $(this).data('zg.zSort');
			if( !zSort ){
				$(this).data('zg.zSort', (zSort=new ZSort(this, option)));
			}
			if( typeof option === 'string' ){
				zSort[option]();
			}
		})
	}
	// 解决名称冲突
	// ============
	var old = $.fn.zSort;
	$.fn.zSort				= Plugin;
	$.fn.zSort.Constructor	= ZSort;
	$.fn.zSort.noConflict	= function () {
		$.fn.zSort = old;
		return this;
	}
	// DATA-API
	$(document).on('mouseover.zSort.zg.data-api', '[data-toggle="zSort"]', function(e){
		var zSort = new ZSort(this);
		//var zSort = new ZSort(this);zSort.execute();
	});
})(jQuery, window, document);

/**
 *	data-toggle='zRemember'
 * @param	string		name
 * @param	$node		target
 *	============================
 * 只支持checkbox。依赖于html5的localStorage
 */
;(function($, window, document, undefined) {// 这个一般不会用，权当笔记
	'use strict';
	var ZRStatic   = function (el) {
		$(el).on('click', '[data-toggle="ZRStatic"]', this.remember);
	}
	ZRStatic.prototype.remember = function(e){
		var me = $(e.target),
			$target = $(me.data("target")),
			name = me.data("ls-name");
		var isChecked = me.attr("checked")=='checked';
		if(!isChecked){
			this.$element.attr("checked", true);// 由false要转为true
			localStorage["isRemember"+name]="true";
		}else{
			this.$element.attr("checked", false);
			localStorage["isRemember"+name]="false";
		}
	}
	$(document).on('click.ZRStatic.zg.data-api', '[data-toggle="zRStatic"]', ZRStatic.prototype.remember);
})(jQuery, window, document);

;(function($, window, document, undefined) {
	'use strict';
	var ZRemember = function(element, options){
		this.$element = $(element),
        this.defaults = {
            'name': $(element).data("ls-name") || '',
            'target': $(element).data("target") || '',
        },
        this.options = $.extend({}, this.defaults, options);
		if( !this.options.name || !this.options.target ){
			console.warn("ZRemember初始化失败，name和target必须。");
			return false;
		}
		this.load();
		this.monitor();
		this.$element.on('click.zAjax.zg.data-api', $.proxy(this.execute, this));
	};
	ZRemember.prototype.execute = function(){
		var isChecked = this.$element.attr("checked")=='checked';
		if(!isChecked){
			this.$element.attr("checked", true);// 由false要转为true
			localStorage["isRemember"+this.options.name]="true";
		}else{
			this.$element.attr("checked", false);
			localStorage["isRemember"+this.options.name]="false";
		}
	};
	ZRemember.prototype.load = function(){// 读取本地数据库
		var name = this.options.name,
			$target = $(this.options.target);
		if( localStorage["isRemember"+name]=="true" ){
			this.$element.attr("checked", true);
			$target.val( localStorage[name] );
		}else{
			this.$element.attr("checked", false);
		}
	};
	ZRemember.prototype.monitor = function(){// 写入本地数据库
		var name = this.options.name,
			$target = $(this.options.target);
			$target.change(function(){
				localStorage[name] = $target.val();
			});
	};
	// 插件定义，在插件中使用ZAjax对象
	// ===============================
	function Plugin(option){
		return this.each(function(){
			var zRemember = $(this).data('zg.zRemember');
			if( !zRemember ){
				$(this).data('zg.zRemember', (zRemember=new ZRemember(this, option)));
			}
			if( typeof option === 'string' ){
				zRemember[option]();
			}
		})
	};
	// 解决名称冲突
	// ============
	var old = $.fn.zRemember;
	$.fn.zRemember				= Plugin;
	$.fn.zRemember.Constructor	= ZRemember;
	$.fn.zRemember.noConflict	= function () {
		$.fn.zRemember = old;
		return this;
	}
	// DATA-API
	$('[data-toggle="zRemember"]').each(function(){
		new ZRemember(this);
	});
})(jQuery, window, document);

/**
 *	data-toggle='ZScrollToTop'
 * @param	string		name
 * @param	$node		target
 *	============================
 * 只支持checkbox。依赖于html5的localStorage
 */
;(function($, window, document, undefined) {// 这个一般不会用，权当笔记
	'use strict';
	var ZScrollToTop   = function (el) {
		$(el).on('click', '[data-toggle="ZScrollToTop"]', function{
            $("body, html").animate({
                scrollTop : 0
            }, 800);
        });
	}
    // DATA-API
	$('[data-toggle="zScrollToTop"]').each(function(){
		new ZScrollToTop(this);
	});
})(jQuery, window, document);




;(function($, window, document, undefined) {
	// 全局性的一些动作
	//1. form全部validate
	$.validate && $("form:not([noValidate])").each(function(){
		if($(this).hasClass("form-horizontal")){
			$(this).validate({
				errorPlacement: function(error, element) {
					error.appendTo(element.closest(".controls"));
					error.appendTo(element.closest(".error-append"));
				}
			});
		}else{
			$(this).validate();
		}
	})
	//$("form:not([noValidate])").validate();
	//2. form全部ajaxForm
	$.ajaxForm && $("form:not([noAjaxForm])").ajaxForm({
		success: function(data, status, xhr, $form){
			try{$.zigzag.ajaxFormCheckReturn($form, data)}catch(e){return false;};
			//这里可以抛事件
		}
	})
	//3. 点击form，form的错误去除。可能改为3秒后自动去除
	$(document).on('click', "form", function(){
		$('#'+$(this).attr("id")+"-error").remove();
	});
	//4. 下拉框含自定义
	$("option[value='custom']").closest("select").change(function(){
		var target = $($(this).find("[value='custom']").data("target")),
		$form = $(this).closest("form");
	$(this).val()=='custom' ? $form.find(target).show() : $form.find(target).hide();
	})
})(jQuery, window, document);

