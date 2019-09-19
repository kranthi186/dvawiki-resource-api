$(document).on('ready', function() {
  $(".dollar-rates").slick({
    dots: false,
    vertical: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
  	autoplaySpeed: 500,
  	arrows: false,
  	variableWidth: true
  });

  var initialRates = setTimeout(getRates, 1000);
  
  var periodRates = setInterval(getRates, 43200000);

  function getRates() {
  	clearTimeout(initialRates);

  	var date = new Date();
  	var yy = date.getUTCFullYear();
  	var mm = date.getUTCMonth() + 1;
  	var dd = date.getUTCDate();

  	date.setDate(date.getDate() - 1);
  	var yyYes = date.getUTCFullYear();
  	var mmYes = date.getUTCMonth() + 1;
  	var ddYes = date.getUTCDate();

  	var dateString = [yy, (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('-');
  	var yesterdayString = [yyYes, (mmYes>9 ? '' : '0') + mmYes, (ddYes>9 ? '' : '0') + ddYes].join('-');

  	// Get data from API server
  	$.ajax({
			url:"https://data.fixer.io/api/" + dateString,
			dataType: 'jsonp',
			type: 'get',
			data: {access_key: 'a27299ad390418fbaf29697aab91d3f2', base: 'USD', symbols: 'EUR,MXN,PYG,INR,CNY,BRL,ARS,COP,PEN,UAH,ZAR'},
			success:function(resp){
				$.ajax({
					url:"https://data.fixer.io/api/" + yesterdayString,
					dataType: 'jsonp',
					type: 'get',
					data: {access_key: 'a27299ad390418fbaf29697aab91d3f2', base: 'USD', symbols: 'EUR,MXN,PYG,INR,CNY,BRL,ARS,COP,PEN,UAH,ZAR'},
					success:function(yesterdayRES){
						console.log(resp);
						$('.dollar-rates .euro').text(resp.rates.EUR.toFixed(2));
						$('.dollar-rates .mxn').text(resp.rates.MXN.toFixed(2));
						$('.dollar-rates .pyg').text(resp.rates.PYG.toFixed(2));
						$('.dollar-rates .inr').text(resp.rates.INR.toFixed(2));
						$('.dollar-rates .cny').text(resp.rates.CNY.toFixed(2));
						$('.dollar-rates .brl').text(resp.rates.BRL.toFixed(2));
						$('.dollar-rates .ars').text(resp.rates.ARS.toFixed(2));
						$('.dollar-rates .cop').text(resp.rates.COP.toFixed(2));
						$('.dollar-rates .pen').text(resp.rates.PEN.toFixed(2));
						$('.dollar-rates .uah').text(resp.rates.UAH.toFixed(2));
						$('.dollar-rates .zar').text(resp.rates.ZAR.toFixed(2));

						if (resp.rates.EUR >= yesterdayRES.rates.EUR) {
							$('.euro-n.navi--negative').css('display', 'inline-block');
							$('.dollar-rates .euro').css('color', 'red');
						} else {
							$('.euro-n.navi--positive').css('display', 'inline-block');
						}

						if (resp.rates.MXN >= yesterdayRES.rates.MXN) {
							$('.mxn-n.navi--positive').css('display', 'inline-block');
						} else {
							$('.mxn-n.navi--negative').css('display', 'inline-block');
							$('.dollar-rates .mxn').css('color', 'red');
						}

						if (resp.rates.PYG >= yesterdayRES.rates.PYG) {
							$('.pyg-n.navi--positive').css('display', 'inline-block');
						} else {
							$('.pyg-n.navi--negative').css('display', 'inline-block');
							$('.dollar-rates .pyg').css('color', 'red');
						}
						if (resp.rates.INR >= yesterdayRES.rates.INR) {
							$('.inr-n.navi--positive').css('display', 'inline-block');
						} else {
							$('.inr-n.navi--negative').css('display', 'inline-block');
							$('.dollar-rates .inr').css('color', 'red');
						}
						if (resp.rates.CNY >= yesterdayRES.rates.CNY) {
							$('.cny-n.navi--positive').css('display', 'inline-block');
						} else {
							$('.cny-n.navi--negative').css('display', 'inline-block');
							$('.dollar-rates .cny').css('color', 'red');
						}
						if (resp.rates.BRL >= yesterdayRES.rates.BRL) {
							$('.brl-n.navi--positive').css('display', 'inline-block');
						} else {
							$('.brl-n.navi--negative').css('display', 'inline-block');
							$('.dollar-rates .brl').css('color', 'red');
						}
						if (resp.rates.ARS >= yesterdayRES.rates.ARS) {
							$('.ars-n.navi--positive').css('display', 'inline-block');
						} else {
							$('.ars-n.navi--negative').css('display', 'inline-block');
							$('.dollar-rates .ars').css('color', 'red');
						}
						if (resp.rates.COP >= yesterdayRES.rates.COP) {
							$('.cop-n.navi--positive').css('display', 'inline-block');
						} else {
							$('.cop-n.navi--negative').css('display', 'inline-block');
							$('.dollar-rates .cop').css('color', 'red');
						}
						if (resp.rates.PEN >= yesterdayRES.rates.PEN) {
							$('.pen-n.navi--positive').css('display', 'inline-block');
						} else {
							$('.pen-n.navi--negative').css('display', 'inline-block');
							$('.dollar-rates .pen').css('color', 'red');
						}
						if (resp.rates.UAH >= yesterdayRES.rates.UAH) {
							$('.uah-n.navi--positive').css('display', 'inline-block');
						} else {
							$('.uah-n.navi--negative').css('display', 'inline-block');
							$('.dollar-rates .uah').css('color', 'red');
						}
						if (resp.rates.ZAR >= yesterdayRES.rates.ZAR) {
							$('.zar-n.navi--positive').css('display', 'inline-block');
						} else {
							$('.zar-n.navi--negative').css('display', 'inline-block');
							$('.dollar-rates .zar').css('color', 'red');
						}

						$('.dollar-rates').css('visibility', 'visible');
					},
					error:function(error){
					  console.log('Error by API: ', error);
					}      
				});
			},
			error:function(error){
			   console.log('Error by API: ', error);
			}      
		});
  }
});