function probs = rl_learn(probs,col,row,choice,correct,alpha)

% invert if necessary
if probs(col,row)==-1
    hold = col;
    col = row;
    row = hold;
end

cval = getProb(probs,col,row);

if correct
    nval = cval + alpha * (choice - cval);
else
    nval = cval + alpha * ((1-choice) - cval);
end

probs(col,row) = nval;