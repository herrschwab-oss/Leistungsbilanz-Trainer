// Basic Engine for BoP
class BookingEngine {
    constructor() {
        this.reset();
    }

    reset() {
        this.balances = {
            hb: 0, db: 0, pe: 0, se: 0, // LB
            vb: 0,                      // VB
            di: 0, wa: 0, sk: 0, wr: 0, // KB
            rp: 0                       // RP
        };
    }

    book(id, type, amount) {
        // Sign logic according to textbook (LB+VB+KB=0):
        // Credit = Plus, Debit = Minus
        if (type === 'Credit') {
            this.balances[id] += amount;
        } else {
            this.balances[id] -= amount;
        }
    }

    getTotals() {
        const lb = this.balances.hb + this.balances.db + this.balances.pe + this.balances.se;
        const vb = this.balances.vb;
        const kb = this.balances.di + this.balances.wa + this.balances.sk + this.balances.wr;
        const rp = this.balances.rp;
        return { lb, vb, kb, rp };
    }
}
