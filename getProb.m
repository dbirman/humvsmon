function val = getProb(probs,col,row)

if probs(row,col)==-1
    val = probs(col,row);
else
    val = probs(row,col);
end