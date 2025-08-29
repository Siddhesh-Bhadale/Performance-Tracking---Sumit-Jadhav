Array.prototype.myMap() = function (cb) {
    let tempArr = [];
    for (let i = 0; i < this.length; i++) {
        tempArr.push(cb(this.i, i, this))
    }
    return tempArr;
}
