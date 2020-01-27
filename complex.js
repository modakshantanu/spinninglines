class Complex {
    constructor(re = 0, im = 0, ret = 0, imt = 0) {
        this.re = re;
        this.im = im;
        this.ret = ret;
        this.imt = imt;
    }

    conj() {
        return new Complex(this.re , -this.im);
    }

    mod() {
        return Math.sqrt(this.re*this.re + this.im*this.im);
    }

    isVariable() {
        return this.ret != 0 || this.imt != 0;
    }

    polar() {
        return {
            r: this.mod(),
            theta: Math.atan2(this.im, this.re)
        }
    }

    toString(precision = 2) {
        return (this.re + 1e-9 > 0? ' ' : '') + (this.re + 1e-9).toFixed(precision) + (this.im < -(1e-9)? ' - ' : ' + ') + Math.abs(this.im).toFixed(precision) + 'i';
    }
}

function addComplex(a , b) {
    return new Complex(
        a.re + b.re,
        a.im + b.im,
        a.ret + b.ret,
        a.imt + b.imt
    );
}

function subComplex(a , b) {
    return new Complex(
        a.re - b.re,
        a.im - b.im,
        a.ret - b.ret,
        a.imt - b.imt
    );
}

function mulComplex(a , b) {
    return new Complex (
        a.re*b.re - a.im*b.im,
        a.re*b.im + b.re*a.im,
        a.re*b.ret - a.im*b.imt + b.re*a.ret - b.im*a.imt,
        a.im*b.ret + a.re*b.imt + b.re*a.imt + b.im*a.ret
    );
}

function scalarMul(s , a) {
    return new Complex(s*a.re , s*a.im , s*a.ret , s*a.imt);
}

function divComplex(a , b) {
    return scalarMul((1/(b.conj().mod()**2)) , mulComplex (a, b.conj()));
}

// Sin and cos only work on real numbers
function sinComplex(a) {
    return new Complex(sin(a.re));
}
function cosComplex(a) {
    return new Complex(cos(a.re));
}

function expComplex(a) {
    // e ^ a+ib = e^a * e^ib;
    let mag = Math.exp(a.re); // e^a
    // e^ib = cosb + isinb
    return new Complex(mag*Math.cos(a.im) , mag*Math.sin(a.im));
}

