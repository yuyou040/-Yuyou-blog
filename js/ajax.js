$(function() {
	/*获取标签*/
	function biaoqian() {
		var url = 'http://101.43.93.193/asp/app.asp?action=read';
		$.ajax(url, {
			dataType: 'json',
			async: true,
			type: 'get',
			headers: {
				'Content-Type': undefined
			},
			timeout: 5000,
			success: function(data) {
				var title = data.data
				for (var i = 0; i < 9; i++) {
					$('.left_bar_f ul').append($('<li>' + title[i] + '</li>'))
				}
				$('.left_bar_f ul li').css({
					"padding": "0 8px 0 8px"
				})
			},
			error: function(xhr, type, errorThrown) {
				console.log(errorThrown)
			}
		});
	}
	biaoqian();



	// 获取博客分类
	function category() {
		var url = 'http://101.43.93.193/asp/category.asp?action=read_category';
		$.ajax(url, {
			dataType: 'json',
			async: true,
			type: 'get',
			headers: {
				'Content-Type': undefined
			},
			timeout: 5000,
			success: function(data) {
				var categoryhtml = `
                    <li>${data.technology}</li>
                    <li>${data.note}</li>
                    <li>${data.creation}</li>
                    <li>${data.selfwords}</li>
                    <li>${data.share}</li>
                    <li>${data.others}</li>
                `
				$("#asd").html(categoryhtml)
			},
			error: function(xhr, type, errorThrown) {
				console.log(errorThrown)
			}
		});
	}
	category()

	function formatNumber(number) {
		var numberString = number.toString();
		if (number <= 9999) {
			return numberString;
		}
		var formattedNumber = (number / 10000).toFixed(2) + '万';
		return formattedNumber;
	}

	// 获取博客分类
	function user() {
		var url = 'http://101.43.93.193/asp/category.asp?action=head_card';
		$.ajax(url, {
			dataType: 'json',
			async: true,
			type: 'get',
			headers: {
				'Content-Type': undefined
			},
			timeout: 5000,
			success: function(data) {
				var leftbarh = `<img src="img/761e022dbfaeee51bcbaac259c7311b.jpg"/>
						<p>Yuyou</p>
						<p>永远热爱，永远热泪盈眶</p>
						<ul >
							<li>${data.wenzhang}</li>
							<li>6</li>
							<li>${data.biaoqian}</li>
							<li>${formatNumber(data.zishu)}</li>
							<li>文章</li>
							<li>分类</li>
							<li>标签</li>
							<li>万字</li>
						</ul>`
				$(".left_bar_h").html(leftbarh)
			},
			error: function(xhr, type, errorThrown) {
				console.log(errorThrown)
			}
		});
	}
	user()

	//获取归档api
	function archive() {
		var url = 'http://101.43.93.193/asp/category.asp?action=create_date';
		$.ajax(url, {
			dataType: 'json',
			async: false,
			type: 'get',
			headers: {
				'Content-Type': undefined
			},
			timeout: 5000,
			success: function(data) {
				var archivehtml = `
                    <li>${data.yiba}</li>
                    <li>${data.yijiu}</li>
                    <li>${data.erling}</li>
                    <li>${data.erli}</li>
                    <li>${data.erer}</li>
                `
				$("#zxc").html(archivehtml)
			},
			error: function(xhr, type, errorThrown) {
				console.log(errorThrown)
			}
		});
	}
	archive()
	//获取最近文章的接口
	function actlately() {
		var url = 'http://101.43.93.193/asp/content.asp?articles=lately';
		$.ajax(url, {
			dataType: 'json',
			async: false,
			type: 'get',
			headers: {
				'Content-Type': undefined
			},
			timeout: 5000,
			success: function(data) {
				var actlately = data.AdminList
				var actlatelyhtml = '';
				$.each(actlately, function(i, value) {
					actlatelyhtml += `
                        <div class="zuijin">
                        	<p class="create_date" style="margin-bottom:10px;">${value.create_date}</p>
                        	<p>${value.title}</p>
                            <span style="display:none">${value.id}</span>
                        	<hr />
                        </div>
                  `
				})

				$("#rightbarh").html(actlatelyhtml)

			},
			error: function(xhr, type, errorThrown) {
				console.log(errorThrown)
			}
		});
	}
	actlately()

	// 搜索查询代码
	let timeout = null
	$(document).on('input propertychange', '#sicon input', function() {
		clearTimeout(timeout)
		//先清理
		var sval = $("#sicon input").val()
		if (sval.trim().length === 0) {
			$("#stext p").text("这里是Yuyou'blog的站内搜索引擎")
			$('.zuiclass').empty()
			return
		}
		timeout = setTimeout(() => {

			var url = 'http://101.43.93.193/asp/content.asp?action=search&searchvalue=' + sval;
			$.ajax(url, {
				dataType: 'json',
				async: false,
				type: 'get',
				headers: {
					'Content-Type': undefined
				},
				timeout: 5000,
				success: function(data) {
					var content = data.AdminList
					var contentHtml = '';
					if (content.length === 0) {
						$("#stext p").text("很抱歉！暂无关于" + sval + "的搜索结果")
						return
					}
					$.each(content, function(i, value) {
						contentHtml += `
                            <div class="center">
                             <p style="display:none;" class="valueid">${value.id}</p>
                               						<img  data-original= ${value.imgaes}/>
                               						<h4>${value.title}</h4>
                               						<p>${value.brief}</p>
                               						<div class="xiaobiao">
                               						<span>${value.create_date}</span><a>${value.label}</a>
                               						<a href="#" class="jixuyuedu">继续阅读</a>
                               						</div>
                               					</div>
                            `
					})
					$("#stext p").text("以下是关于" + sval + "的搜索结果")
					$(".zuiclass").html(contentHtml)
					$("img").lazyload();
				},
				error: function(xhr, type, errorThrown) {
					console.log(errorThrown)
				}
			});
		}, 1000)
	})


})
