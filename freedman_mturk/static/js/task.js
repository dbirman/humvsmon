$(document).ready(function() {
	cohcon();
});

function cohcon() {

  	window.myscreen = initScreen();

	var instructionPages = [ // add as a list as many pages as you like
		"instructions/instruct-1.html",
		"instructions/instruct-2.html",
		"instructions/instruct-3.html",
		"instructions/instruct-4.html",
		"instructions/instruct-5.html",
		"instructions/instruct-ready.html"
	];

	var pracTrials = Infinity;

	// Trial Phases:
	// wait = wait for spacebar press
	// fixation = 667 ms wait
	// stimulus = 667 ms
	// delay = 1013 ms
	// test = 667 ms

	var taskDir = 1; // 1 = directions, 2 = categories

	var phases = {};
	phases.survey1 = 0;
	phases.survey2 = 1;
	phases.instructions = 2;
	if (taskDir==1) {
		phases.task = [3,5,7];
		phases.post0 = 8;
		phases.teachRule1 = 9;
		phases.post00 = 10;
		phases.ending1 = 11;
		phases.dirKnown = [12];
		phases.post3 = 13;
	} else if (taskDir==2) {
		phases.catTask = [3,5,7,9,11,13,15,17,19,21];
		phases.post1 = 22;
		phases.teachRule = 23;
		phases.post2 = 24;
		phases.ending = 25;
		phases.catKnown = [26,28];
		phases.post3 = 29;
	}

	var segs = {};
	segs.wait = 0;
	segs.fixation = 1;
	segs.stimulus = 2;
	segs.delay = 3;
	segs.test = 4;
	segs.resp = 5;
	segs.fback = 6;

	var params = {};
	params.directions = [0,1,2,3,4,5,6,7]
	params.trials = 30;

	window.task = [];
	task[0] = [];
	task[0][phases.survey1] = initSurvey();
	task[0][phases.survey1].html = "surveyDemo.html";

	task[0][phases.survey2] = initSurvey();
	task[0][phases.survey2].html = "surveyScreen.html";

	task[0][phases.instructions] = initInstructions(instructionPages);

	window.stimulus = {};
	initStimulus('stimulus');
	myInitStimulus(task);
	// stimulus.categories = randomElement([0,1]);
	stimulus.categories = -1;
	stimulus.categoryGroups = [[0,1,2,3],[4,5,6,7]];
	stimulus.seg = segs;

	if (taskDir==1) {
		///////// BLOCK: DIRECTIONS //////////

		var readylen = [1.25, 0, 0];
		var resptime = [2.5,2.25,1.75];
		var resplen = [1.5,1,1];
		var getred = [1,0,0];

		for (var i = 0; i < phases.task.length; i++) {
			ct = phases.task[i];

			task[0][ct] = {};
			task[0][ct].waitForBacktick = 0;
			task[0][ct].seglen = [readylen[i], .650, .650, 1.000, .65,resptime[i],resplen[i]];
			task[0][ct].numTrials = params.trials;
			task[0][ct].parameter = {};
			task[0][ct].parameter.match = [0,1];
			task[0][ct].parameter.categories = 0;
			task[0][ct].parameter.known = 0;
			task[0][ct].parameter.showresp = 1;
			task[0][ct].parameter.getready = getred[i];
			task[0][ct].parameter.block = i;
			if (task[0][ct].parameter.categories==1) {
				task[0][ct].parameter.direction = [0,1];
				task[0][ct].parameter.nomatchdir = [0];
			} else {
				task[0][ct].parameter.direction = params.directions;
				task[0][ct].parameter.nomatchdir = [-Math.PI*3/8,-Math.PI*2/8,-Math.PI*1/8,Math.PI*1/8,Math.PI*2/8,Math.PI*3/8];
			}
			task[0][ct].random = 1;
			task[0][ct].usingScreen = 1;
			task[0][ct].getResponse = [0,0,0,0,0,1,0];
			task[0][ct].html = "canvas.html";

			task[0][ct] = initTask(task[0][ct], startSegmentCallback, screenUpdateCallback, getResponseCallback, startTrialCallback,endTrialCallbackPrac,startBlockCallback,blockRandomization);

			if (i < phases.task.length-1) {
				task[0][ct+1] = initSurvey();
				task[0][ct+1].html = "break.html";
			}

		}

		task[0][phases.post0] = initSurvey();
		task[0][phases.post0].html = "post0.html";
		task[0][phases.teachRule1] = initSurvey();
		task[0][phases.teachRule1].html = "teachRule1.html";
		task[0][phases.post00] = initSurvey();
		task[0][phases.post00].html = "post00.html";
		task[0][phases.ending1] = initSurvey();
		task[0][phases.ending1].html = "ending1.html";

		for (var i = 0; i < phases.dirKnown.length; i++) {
			ct = phases.dirKnown[i];

			task[0][ct] = {};
			task[0][ct].waitForBacktick = 0;
			task[0][ct].seglen = [0, .650, .650, 1.000, .65,1.75,1];
			task[0][ct].numTrials = params.trials;
			task[0][ct].parameter = {};
			task[0][ct].parameter.match = [0,1];
			task[0][ct].parameter.categories = 0;
			task[0][ct].parameter.known = 1;
			task[0][ct].parameter.showresp = 0;
			task[0][ct].parameter.getready = 0;
			task[0][ct].parameter.block = i;
			if (task[0][ct].parameter.categories==1) {
				task[0][ct].parameter.direction = [0,1];
				task[0][ct].parameter.nomatchdir = [0];
			} else {
				task[0][ct].parameter.direction = params.directions;
				task[0][ct].parameter.nomatchdir = [-Math.PI*3/8,-Math.PI*2/8,-Math.PI*1/8,Math.PI*1/8,Math.PI*2/8,Math.PI*3/8];
			}
			task[0][ct].random = 1;
			task[0][ct].usingScreen = 1;
			task[0][ct].getResponse = [0,0,0,0,0,1,0];
			task[0][ct].html = "canvas.html";

			task[0][ct] = initTask(task[0][ct], startSegmentCallback, screenUpdateCallback, getResponseCallback, startTrialCallback,endTrialCallbackPrac,startBlockCallback,blockRandomization);

			if (i < phases.dirKnown.length-1) {
				task[0][ct+1] = initSurvey();
				task[0][ct+1].html = "break.html";
			}

		}
	} else if (taskDir==2) {

		var readylen = [1.25, 0, 0,0,0,0,0,0,0,0,0,0];
		var resptime = [2.5,2.25,1.75,1.5,1.5,1.25,1.25,1.25,1.25,1.2,1.2,1.2];
		var resplen = [1.5,1,.75,.75,.75,.75,.6,.6,.6,.6,.6,.55,.55];
		var getred = [1,0,0,0,0,0,0,0,0,0,0,0,0];


		for (var i = 0; i < phases.catTask.length; i++) {
			ct = phases.catTask[i];

			task[0][ct] = {};
			task[0][ct].waitForBacktick = 0;
			task[0][ct].seglen = [readylen[i], .650, .650, 1.000, .65,resptime[i],resplen[i]];
			task[0][ct].numTrials = params.trials;
			task[0][ct].parameter = {};
			task[0][ct].parameter.match = [0,1,1,0];
			task[0][ct].parameter.categories = 1;
			task[0][ct].parameter.known = 0;
			task[0][ct].parameter.showresp = 1;
			task[0][ct].parameter.getready = getred[i];
			task[0][ct].parameter.block = i;
			if (task[0][ct].parameter.categories==1) {
				task[0][ct].parameter.direction = [0,1,0,1];
				task[0][ct].parameter.nomatchdir = [0];
			} else {
				task[0][ct].parameter.direction = params.directions;
				task[0][ct].parameter.nomatchdir = [-Math.PI*4/8,-Math.PI*3/8,-Math.PI*2/8,Math.PI*2/8,Math.PI*3/8,Math.PI*4/8];
			}
			task[0][ct].random = 1;
			task[0][ct].usingScreen = 1;
			task[0][ct].getResponse = [0,0,0,0,0,1,0];
			task[0][ct].html = "canvas.html";

			task[0][ct] = initTask(task[0][ct], startSegmentCallback, screenUpdateCallback, getResponseCallback, startTrialCallback,endTrialCallbackPrac,startBlockCallback,blockRandomization);

			if (i < phases.catTask.length-1) {
				task[0][ct+1] = initSurvey();
				task[0][ct+1].html = "break.html";
			}

		}
		task[0][phases.post1] = initSurvey();
		task[0][phases.post1].html = "post1.html";
		task[0][phases.teachRule] = initSurvey();
		task[0][phases.teachRule].html = "teachRule.html";
		task[0][phases.post2] = initSurvey();
		task[0][phases.post2].html = "post2.html";
		task[0][phases.ending] = initSurvey();
		task[0][phases.ending].html = "ending.html";

		//////FINAL STAGE

		for (var i = 0; i < phases.catKnown.length; i++) {
			ct = phases.catKnown[i];

			task[0][ct] = {};
			task[0][ct].waitForBacktick = 0;
			task[0][ct].seglen = [0, .650, .650, 1.000, .65,1.2,.55];
			task[0][ct].numTrials = params.trials;
			task[0][ct].parameter = {};
			task[0][ct].parameter.match = [0,1,1,0];
			task[0][ct].parameter.categories = 1;
			task[0][ct].parameter.known = 1;
			task[0][ct].parameter.showresp = 0;
			task[0][ct].parameter.getready = 0;
			task[0][ct].parameter.block = i;
			if (task[0][ct].parameter.categories==1) {
				task[0][ct].parameter.direction = [0,1,0,1];
				task[0][ct].parameter.nomatchdir = [0];
			} else {
				task[0][ct].parameter.direction = params.directions;
				task[0][ct].parameter.nomatchdir = [-Math.PI*4/8,-Math.PI*3/8,-Math.PI*2/8,Math.PI*2/8,Math.PI*3/8,Math.PI*4/8];
			}
			task[0][ct].random = 1;
			task[0][ct].usingScreen = 1;
			task[0][ct].getResponse = [0,0,0,0,0,1,0];
			task[0][ct].html = "canvas.html";

			task[0][ct] = initTask(task[0][ct], startSegmentCallback, screenUpdateCallback, getResponseCallback, startTrialCallback,endTrialCallbackPrac,startBlockCallback,blockRandomization);

			if (i < phases.catKnown.length-1) {
				task[0][ct+1] = initSurvey();
				task[0][ct+1].html = "break.html";
			}

		}
	}

	task[0][phases.post3] = initSurvey();
	task[0][phases.post3].html = "post3.html";

	/////

	initTurk();

	//response related
	jglData.responses = [];
	jglData.correct = [];
	jglData.direction = [];
	jglData.categories = [];
	jglData.postSurvey = {};
	jglData.match = [];
	jglData.rot1 = [];
	jglData.rot2 = [];
	jglData.known = [];
	jglData.trial = [];
	jglData.block = [];
	jglData.corrLimit = 1;
	jglData.dirC = zeros(64);
	jglData.dirN = zeros(64);
	stimulus.lastFrame = jglGetSecs();


	startPhase(task[0]);
}

var rot2ind = function(a,b) {
	return a*8+b;
}
var ind2rot = function(ind) {
	var a = floor(ind/8);
	var b = ind % 8;
	return [a,b];
}

var startBlockCallback = function(task, myscreen) {
	//savePartialData();
	//myscreen.psiTurk.saveData();
	return [task, myscreen];
}

var endTrialCallbackPrac = function(task,myscreen) {
	jglData.correct[jglData.correct.length-1] = stimulus.gotResp;
	var ind = rot2ind(stimulus.num1,stimulus.num2);
	if (stimulus.gotResp==1) {jglData.dirC[ind] += 1;}
	return [task,myscreen];
}

var startTrialCallback = function(task, myscreen) {
	stimulus.categories = task.thistrial.categories;

	jglData.responses.push(-1);
	jglData.correct.push(0);
	jglData.direction.push(task.thistrial.direction);
	jglData.categories.push(stimulus.categories);
	jglData.known.push(task.thistrial.known);
	jglData.match.push(task.thistrial.match);
	jglData.trial.push(task.trialnum);
	jglData.block.push(task.thistrial.block);
	stimulus.gotResp = 0;

	if (!any(lessThan(jglData.dirC,jglData.corrLimit))) {jglData.corrLimit += 1;}

	var repick = true;
		
	var retry = 0;
	while (repick) {		
		var flip = [1, 0];
		if (stimulus.categories==1) {
			// pick two directions
			stimulus.num1 = randomElement(stimulus.categoryGroups[task.thistrial.direction]);
			if (task.thistrial.match==1) {
				// matching trial, use same category
				stimulus.num2 = randomElement(stimulus.categoryGroups[task.thistrial.direction]);
			} else {
				stimulus.num2 = randomElement(stimulus.categoryGroups[flip[task.thistrial.direction]]);
			}
			if (jglData.correct.length < 224) {
				// we picked two numbers, check to see if they are in the available indexes we haven't succeded at
				failInds = find(lessThan(jglData.dirC,jglData.corrLimit));
				var curInd = rot2ind(stimulus.num1,stimulus.num2);
				for (var i in failInds) {
					val = failInds[i];
					if (curInd==val) {
						repick = false; // we found our index in the avail, no repick needed
						break
					}
				}
			} else {
				repick = false;
			}
		} else {
			stimulus.num1 = task.thistrial.direction;
			if (task.thistrial.match==1) {
				stimulus.num2 = stimulus.num1;
			} else {
				stimulus.num2 = task.thistrial.direction + task.thistrial.nomatchdir;
			}
			repick = false;
		}
		retry += 1;
		if (retry > 80) {repick = false;}
	}
	var curInd = rot2ind(stimulus.num1,stimulus.num2);
	jglData.dirN[curInd] += 1;

	stimulus.rot1 = stimulus.num1 * Math.PI * 2 / 8;
	stimulus.rot2 = stimulus.num2 * Math.PI * 2 / 8;
	jglData.rot1.push(stimulus.rot1);
	jglData.rot2.push(stimulus.rot2);

	stimulus.lastFrame = jglGetSecs();


	// contrast
	// convert to hex color

  	return [task, myscreen];
}

var getResponseCallback = function(task, myscreen) {
	jumpSegment(task,0);
	
	if (jglData.keys[jglData.keys.length - 1].keyCode == 32) {
		jglData.responses[jglData.responses.length-1] = 1;
		if (task.thistrial.match==1) {
			stimulus.gotResp = 1;
		} else {
			stimulus.gotResp = -1;
		}
	}
	return [task, myscreen];
}

var startSegmentCallback = function(task, myscreen) {
	switch (task.thistrial.thisseg) {
		case stimulus.seg.stimulus:
			stimulus.rot = stimulus.rot1;
			break;
		case stimulus.seg.test:
			stimulus.rot = stimulus.rot2;
			break;
		case stimulus.seg.fback:
			if (stimulus.gotResp==0) {
				// no response yet
				if (task.thistrial.match==0) {
					stimulus.gotResp=1;
				} else {
					stimulus.gotResp = -1;
				}

			}
			break;
	}

  	return [task, myscreen];
}

var screenUpdateCallback = function(task, myscreen) {
	var now = jglGetSecs();
	var elapsed = now - stimulus.lastFrame;
	stimulus.lastFrame = now;
	jglClearScreen(0);

	var segs = stimulus.seg;

	switch (task.thistrial.thisseg) {
		case segs.wait:
			if (task.thistrial.getready) {upText('Get Ready!','#ffffff');}
			break;
		case segs.fixation:
			upFix('#ffffff');
			break;
		case segs.stimulus:
			upDots(task,elapsed);
			break;
		case segs.delay:
			upFix('#ffffff');
			break;
		case segs.test:
			upDots(task,elapsed);
			break;
		case segs.resp:
			if (task.thistrial.showresp && task.thistrial.block < 2) {
				upNowRespondText();
			}
			upFix('#ffff00');
			break;
		case segs.fback:
			switch (stimulus.gotResp) {
				case -1: // incorrect
					upFix('#ff0000');
					upCorrectText();
					break;
				case 1: // incorrect
					upFix('#00ff00');
					upCorrectText();
					break;
				case 0:
					upFix('#000000');
					upCorrectText();
					break;
			}
			break;
	}

	return [task, myscreen];

}

function upCorrectText() {	
	if (stimulus.gotResp==-1) {
		upText('Wrong','#ff0000');
	} else if (stimulus.gotResp==1) {
		upText('Correct','#00ff00');
	} else if (stimulus.gotResp==0) {
		upText('Failed to Respond','#ffffff');
	}
}


function upNowRespondText() {	
	jglTextSet('Arial',1,'#ffff00',0,0);
	jglTextDraw('Respond Now',14 * - .25,-2.75);
	jglTextDraw('Press Space - or Do Nothing',27 * - .25,-1.75);
}

function upText(text, color) {
	jglTextSet('Arial',1,color,0,0);
	jglTextDraw(text,text.length * - .25,-1.75);

}

function upFix(color) {
	jglFixationCross(1,0.1,color,[0,0]);
}

function upDots(task,elapsed) {
	stimulus.dots = updateDots(task,stimulus.dots,elapsed);

	jglPoints2(stimulus.dots.x, stimulus.dots.y, 0.2, '#ffffff');
}
