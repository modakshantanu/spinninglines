function parseText(text) {
    resetGraphData();
    let vectorLines = [];
    let textLines = text.split('\n');
    let res = true;

    for (let line of textLines) {
        res &= parseLine(line) !== false;
    }
    return res;

}

function parseLine(str) {
    if (str.length == 0  || str.substring(0,2) == '//') {
        return true;
    }
    let tokens = tokenize(str);
    if (!tokens) {
        return false;
    }

    let postfix = infixToPostfix(tokens);
    if (!postfix) {
        return false;
    }
    let finalLines = evalPostfix(postfix);
    if (!finalLines) {
        return false;
    }
    lines.push(...finalLines);
    return true;
}

function tokenize(string) {
    let tokens = [];
    for (let i = 0; i < string.length; i++) {
        if (string[i] == ' ') {
            continue;
        }
        let substr = string.substring(i,i+3);
        if (substr == 'cos' || substr == 'sin' || substr == 'exp') {
            tokens.push(substr[0]);
            i += 2;
            continue;
        }
        if (isOperator(string[i])) {
            tokens.push(string[i]);
            continue;
        } 
        if (isSpecialOperator(string[i])) {
            let cnum;
            switch(string[i]) {
                case 'p': cnum = new Complex(PI); break;
                case 'i': cnum = new Complex(0,1); break;
                case 't': cnum = new Complex(0,0,1,0); break;
            }
            tokens.push(cnum);
            continue;
        }
        if (isNumeric(string[i])) {
            let j = i+1;
            while (j < string.length && isNumeric(string[j])) {
                j++;
            }
            let substr = string.substring(i,j);
            let num = parseFloat(substr);
            tokens.push(new Complex(num));
            i = j-1;
        }
    }
    
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] == '-' || tokens[i] == '+') {
            if (i == 0 || ['(','+', '-' , '*','/'].includes(tokens[i-1])) {
                tokens[i] = tokens[i] == '+' ? '|' : '~'; // unary + and -
            }
        }
        if (i < string.length - 1 && tokens[i] instanceof Complex && tokens[i+1] instanceof Complex) {
            // Insert a multiplication between 2 adjacent numbers 
            tokens.splice(i+1,0,'&'); // Use different operator for higher priority
        }
    
    }
    return tokens;
}

function infixToPostfix(tokens) {
    // Check number of opening and closing brackets
    let bracketCheck = 0;
    for (let tok of tokens) {
        if (tok == '(') {
            bracketCheck++;
        } else if (tok == ')') {
            bracketCheck--;
        }
    }
    if (bracketCheck != 0) {
        return false;
    }


    let stack = ['#'];
    let postfix = [];
    for (let tok of tokens) {
        if (tok instanceof Complex) {
            postfix.push(tok);
        } else if (tok == '(') {
            stack.push(tok);
        } else if (tok == ')') {
            while (stack.length > 0 && stack[stack.length-1] != '(') {
                postfix.push(stack.pop());
            }
            stack.pop();
        } else {
            if (operatorPrecedence(tok) > operatorPrecedence(stack[stack.length-1])) {
                stack.push(tok);
            } else {
                while (stack.length > 0 
                        && operatorPrecedence(stack[stack.length-1]) >= operatorPrecedence(tok)) {
                    postfix.push(stack.pop());
                }
                stack.push(tok);
            }
        }
    }
    while (stack.length > 1) {
        postfix.push(stack.pop());
    }
    return postfix;
}

function evalPostfix(postfix) {
    let varExp = null;
    let stack = [];
    for (let tok of postfix) {
        if (tok instanceof Complex) {
            stack.push(tok);
        } else if (['s','c','e'].includes(tok)){
            let a = stack.pop();
            if (a.isVariable()) {
                varExp = {
                    op:tok,
                    num:a
                }
                stack.push(new Complex(1));
            } else {
                switch(tok) {
                    case 's': stack.push(sinComplex(a)); break;
                    case 'c': stack.push(cosComplex(a)); break;
                    case 'e': stack.push(expComplex(a)); break;
                }
            }
        } else if (['~','|'].includes(tok)) {
            // unary operators
            let a = stack.pop();
            let res;
            switch(tok) {
                case '~': res = scalarMul(-1,a); break;
                case '|': res = a; break;
            }
            stack.push(res);
        } else {
            // binary operators
            let b = stack.pop();
            let a = stack.pop();
            let res;
            switch(tok) {
                case '+': res = addComplex(a,b); break;
                case '-': res = subComplex(a,b); break;
                case '*': case '&': res = mulComplex(a,b); break;
                case '/': res = divComplex(a,b); break;
            }
            stack.push(res);
        }
    }
    // If only a constant expression
    if (varExp == null) {
        let ans = stack[0].polar();
        return [{
            A:ans.r,
            f:0,
            ph: ans.theta
        }]
    }
    let pol = stack[0].polar();
    if (varExp.op == 's' || varExp.op == 'c') {
        let freq = varExp.num.ret;
        let amp = pol.r;
        let ph = pol.theta + varExp.num.re;
        if (varExp.op == 'c') {
            ph += PI/2; // convert cos(x) to sin(PI/2+ x);
        }
        return [
            {A : amp/2 , f: -freq, ph: PI/2 - ph},
            {A : amp/2 , f: freq, ph: -PI/2 + ph}
        ];
    } else {
        // (a + ib) * exp (c + id + eit)
        // There should be no real t component
        let amp = pol.r * Math.exp(varExp.num.re);
        let freq = varExp.num.imt;
        let phase = pol.theta + varExp.num.im;
        return [{A: amp, f: freq , ph:phase }];
    }
}

function isOperator(char) {
    return ['(',')','+','-','*','/'].includes(char);
}

function isSpecialOperator(char) {
    return ['p','t','i'].includes(char);
}

function isNumeric(char) {
    return (char <= '9' && char >= '0') || char == '.';
}

function operatorPrecedence(op) {
    if (op == '+' || op == '-') {
        return 1;
    } else if (op == '*' || op == '/') {
        return 2;
    } else if (op == '|' || op == '~' || op == '&') {
        // unary +- or special multiply
        return 3;
    } else if (op == 's' || op == 'c' || op == 'e') {
        return 4; // sin, cos, tan 
    }
    return 0;
}