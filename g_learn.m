function g = g_learn(g,choice,correct,alpha)

% g represents the probability of making match decisions
if correct
    if choice==1
        g = g + alpha * (choice - g);
    else
        g = g - alpha * (choice - g);
    end
else
    if choice==1
        g = g + alpha * ((1-choice) - g);
    else
        g = g - alpha * ((1-choice)-g);
    end
end