function big = expandGen(g,cols,rows)

big = triu(ones(rows,cols),1)*(1-g);
big = big + eye(rows,cols)*g;
big(big==0)=-1;