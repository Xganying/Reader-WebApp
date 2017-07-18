// index.js 连接界面和后台数据接口文件（即：前后端数据交互）
$.get('/ajax/index', function(d){
	new Vue({
		el:'#app',
		data:{
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
					this.position = (-734);
					this.header_positon = 277;
					this.tab_2_class = "Swipe-tab_on";
					this.tab_1_class = "";
				}
			}
		}
	});
},'json');