%% Human vs. Monkeys analysis
% This is a test script. The idea is to compare three null models to
% various datasets of match-to-sample data. The data should be in two
% possible configurations. Either:
%
% A,B,C,... are possible stimuli, and the subjects were shown either AA
% (match) or AB/C (non-match).
%
% Or the possible stimuli are irrelevant, and instead the match and
% non-match trials vary on some arbitrary dimension. 

%% Null model
% The null model assumes that each combination of stimuli results in chance
% guesses for prob match choices. 

null = [0.5 0.5 0.5
        -1  0.5 0.5
        -1  -1  0.5];
    
%% RL model
% The rl model assumes that the probability of a match choice is a
% function of the trials you've seen so far, *for each combination of A-B*.
% The rate of learning is controlled by a parameter alpha.

alpha = 0.1;

rl = null; % starts at null

%% Generalization model
% The generlation model assumes taht the probability of a match choice is
% tied to a single value, and is reinforced by all of the available
% evidence.

g = 1; % core percentage
gexp = expandGen(g,size(null,1),size(null,2));

%% Generate datasets
% For each model, we'll generate reps datasets (just A,B,choice,correct).
% Then we're going to fit all three models to the data (maximum likelihood)
reps = 10;


%% Compare learning!

h = figure;
lk = [];
for i = 1:100
    col = randi(3);
    row = randi(3);
    rl_choice = rand<getProb(rl,col,row);
    rl_correct = rl_choice == (col==row);
    g_choice = rand<getProb(gexp,col,row);
    g_correct = g_choice == (col==row);
    rl = rl_learn(rl,col,row,rl_choice,rl_correct,alpha);
%     g = g_learn(g,g_choice,g_correct,alpha);
    gexp = expandGen(g,size(gexp,1),size(gexp,2));
    
%     lk(end+1,:) = [0.5 rl_choice g_choice];
    
    subplot(131)
    imagesc(null);
    colormap('gray');
    caxis([0 1]);
    subplot(132)
    imagesc(rl);
    colormap('gray');
    caxis([0 1]);
    subplot(133)
    imagesc(gexp);
    colormap('gray');
    caxis([0 1]);
    pause(0.1)
end