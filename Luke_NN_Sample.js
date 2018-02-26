/*
	2018 02 26
	Created by Luke
*/

// req's
var log = require('../core/log.js');
var config = require('../core/util.js').getConfig();
var convnetjs = require('convnetjs');
var math = require('mathjs');

// strategy
var strat = {

	/* INIT */
	init: function()
	{
		// core
		this.name = 'NN_Sample';
		this.requiredHistory = config.tradingAdvisor.historySize;

		this.addIndicator('neuralnet', 'NN', this.settings.neuralnet);

		// debug stuff
		this.startTime = new Date();
		/* MESSAGES */

		// message the user about required history
		log.info("====================================");
		log.info('Running', this.name);
		log.info('====================================');
		log.info("Make sure your warmup period matches SMA_long and that Gekko downloads data if needed");

	}, // init()

	/* CHECK */
	check: function()
	{
			// sell
			if(this.indicators.neuralnet.result.meanAlpha && this.indicators.neuralnet.result.meanAlpha < -1) {
				this.advice('short');
			}

			if (this.indicators.neuralnet.result.meanAlpha && this.indicators.neuralnet.result.meanAlpha > 1) {
				this.advice('long');
			} // buy

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
