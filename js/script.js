let sourceAddress =  'https://free-api.heweather.net/s6/weather/'
let tmpnow = document.querySelector('.weather .today .tmpnow')
let fl = document.querySelector('.weather .today .fl')
let tmp = document.querySelector('.weather .today .tmp')
let hum = document.querySelector('.weather .today .hum')
let pcpn = document.querySelector('.weather .today .pcpn')
let cloud = document.querySelector('.weather .today .cloud')
let currentLocation = document.querySelector('.weather .today .tmp .location')
let inputLocation = localStorage.loc ? JSON.parse(localStorage.loc) : 'beijing'
let search = document.querySelector('.input')
let shade = document.querySelector('.shade')
let input = document.querySelector('input')
let day1 = document.querySelector('.forecast .day1')
let day2 = document.querySelector('.forecast .day2')
let day3 = document.querySelector('.forecast .day3')
let comf = document.querySelector('.comf')
let uv = document.querySelector('.uv')
let air = document.querySelector('.air')
let drsg = document.querySelector('.drsg')
let sport = document.querySelector('.sport')
let flu = document.querySelector('.flu')
let cw = document.querySelector('.cw')

function Ajax(url,fn) {
	//创建 XHR 对象
	let xhr = new XMLHttpRequest()
	//设置发送的服务器地址和方法
	xhr.open("GET",url)
	//发送
	xhr.send()
	//xhr状态改变的事件进行监听
	xhr.onreadystatechange = function () {
		//readystate == 4 表示进入到获取阶段， status == 200 表示接收完成
		if(xhr.readyState == 4 && xhr.status == 200){
			fn(xhr)
		}
	}
}

//初始化
refresh()

//search
currentLocation.onclick = function() {
	search.style.top = '0'
	shade.style.display = 'block'
	input.onkeypress = function (e) {
		if(e.key == 'Enter' && input.value != null){
			inputLocation = input.value
			refresh()
			input.value = ''
			search.style.top = '-100%'
			shade.style.display = 'none'
			input.onkeypress = null
			localStorage.loc = JSON.stringify(inputLocation)
		}
	}
}
shade.onclick = function () {
	search.style.top = '-100%'
	shade.style.display = 'none'
}

function refresh() {
	//today
	Ajax(sourceAddress + `now?location=${inputLocation}&key=fb19706d95d64bd5874583447837d151`,function (xhr) {
		let result = JSON.parse(xhr.responseText)
		tmpnow.innerHTML = `${result.HeWeather6[0].now.tmp} ℃`
		fl.innerHTML = `体感温度 ${result.HeWeather6[0].now.fl} ℃，${result.HeWeather6[0].now.wind_dir}，风向：${result.HeWeather6[0].now.wind_deg}°`
		tmp.style.backgroundImage = `url(https://cdn.heweather.com/cond_icon/${result.HeWeather6[0].now.cond_code}.png)`
		hum.innerHTML = `湿度：${result.HeWeather6[0].now.hum}`
		pcpn.innerHTML = `降水量：${result.HeWeather6[0].now.pcpn}`
		cloud.innerHTML = `云量：${result.HeWeather6[0].now.cloud}`
		currentLocation.innerHTML = `${result.HeWeather6[0].basic.location}`
	})

	//forecast
	Ajax(sourceAddress + `forecast?location=${inputLocation}&key=fb19706d95d64bd5874583447837d151`,function(xhr) {
		let result = JSON.parse(xhr.responseText).HeWeather6[0].daily_forecast
		day1.innerHTML = `今天：${result[0].tmp_min} ℃-${result[0].tmp_max} ℃<br>${result[0].cond_txt_d} 转 ${result[0].cond_txt_n}`
		day1.style.backgroundImage = `url(https://cdn.heweather.com/cond_icon/${result[0].cond_code_d}.png)`
		day2.innerHTML = `明天：${result[1].tmp_min} ℃-${result[1].tmp_max} ℃<br>${result[1].cond_txt_d} 转 ${result[1].cond_txt_n}`
		day2.style.backgroundImage = `url(https://cdn.heweather.com/cond_icon/${result[1].cond_code_d}.png)`
		day3.innerHTML = `后天：${result[2].tmp_min} ℃-${result[2].tmp_max} ℃<br>${result[2].cond_txt_d} 转 ${result[2].cond_txt_n}`
		day3.style.backgroundImage = `url(https://cdn.heweather.com/cond_icon/${result[2].cond_code_d}.png)`

	})

	//lifestyle
	Ajax(sourceAddress + `lifestyle?location=${inputLocation}&key=fb19706d95d64bd5874583447837d151`,function(xhr) {
		let result = JSON.parse(xhr.responseText).HeWeather6[0].lifestyle
		comf.innerHTML = `舒适度指数：${result[0].brf}。${result[0].txt}`
		uv.innerHTML = `紫外线指数：${result[5].brf}。${result[5].txt}`
		air.innerHTML = `空气污染指数：${result[7].brf}。${result[7].txt}`
		drsg.innerHTML = `穿衣指数：${result[1].brf}。${result[1].txt}`
		sport.innerHTML = `运动指数：${result[3].brf}。${result[3].txt}`
		flu.innerHTML = `流感指数：${result[2].brf}。${result[2].txt}`
		cw.innerHTML = `洗车指数：${result[6].brf}。${result[6].txt}`
	})
}



