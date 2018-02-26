/*
	2018 02 26
	Created by Luke
*/

// req's
var log = require('../core/log.js');
var config = require('../core/util.js').getConfig();

// strategy
var strat = {

	/* INIT */
	init: function()
	{
		// core
		this.name = 'NN_Sample';

		this.addIndicator('neuralnet', 'NN', this.settings.neuralnet);

		this.startTime = new Date();

		log.info("====================================");
		log.info('Running', this.name);
		log.info('====================================');

	}, // init()

	/* CHECK */
	check: function()
	{
			// sell
			if(this.indicators.neuralnet.result.meanAlpha && this.indicators.neuralnet.result.meanAlpha < -1) {
				this.advice('short');
			}

			// buy
			if (this.indicators.neuralnet.result.meanAlpha && this.indicators.neuralnet.result.meanAlpha > 1) {
				this.advice('long');
			}

	}, // check()

	/* END backtest */
	end: function()
	{
		let seconds = ((new Date()- this.startTime)/1000),
			minutes = seconds/60,
			str;

		minutes < 1 ? str = seconds.toFixed(2) + ' seconds' : str = minutes.toFixed(2) + ' minutes';

		log.info('====================================');
		log.info('Finished in ' + str);
		log.info('====================================');
	}
};

module.exports = strat;
