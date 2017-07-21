// index.js 连接界面和后台数据接口文件（即：前后端数据交互）
$.get('/ajax/index', function(d){
	// 获取屏幕宽度
	var windowWidth = $(window).width();
	if(windowWidth < 320){
		windowWidth = 320;
	}
	// 获取书城文字下小滑动条的大小
	var  offset = $($('.Swipe-tab').find('a')[0]).offset();
	var  index_header_tab_width = offset.width;

	new Vue({
		el:'#app',
		data:{
			screen_width: windowWidth,
			double_screen_width: windowWidth *2,
			index_header_tab_width: index_header_tab_width,
			top: d.items[0].data.data,
			hot: d.items[1].data.data,
			recommend: d.items[2].data.data,
			female: d.items[3].data.data,
			male: d.items[4].data.data,
			free: d.items[5].data.data,
			topic: d.items[6].data.data,
			duration:0,
			position:0,
			header_positon:0,
			header_duration:0,
			tab_1_class: 'Swipe-tab_on',
			tab_2_class:' '
		},
		methods:{
			tabSwitch: function(pos){
				this.duration = 0.5;
				this.header_duration = 0.5;
				if(pos){
					this.position = 0;
					this.header_positon = 0;
					this.tab_1_class = "Swipe-tab_on";
					this.tab_2_class = "";
				}else{
					this.position = (-windowWidth);
					this.header_positon = index_header_tab_width;
					this.tab_2_class = "Swipe-tab_on";
					this.tab_1_class = "";
				}
			}
		}
	});
},'json');