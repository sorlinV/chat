/**
 * Grab Snaffles and try to throw them through the opponent's goal!
 * Move towards a Snaffle and use your team id to determine where you need to throw it.
 **/

class wiz {
    constructor(id, x, y, vx, vy, state) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.state = state;
    }
}

class sna {
    constructor(id, x, y, vx, vy, state) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.state = state;
        this.taked = false;
    }
}

class blu {
    constructor(id, x, y, vx, vy, state) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.state = state;
        this.taked = false;
    }
}

class opp {
    constructor(id, x, y, vx, vy, state) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.state = state;
        this.taked = false;
    }
}

function get_close_but(snas, myTeamId) {
    let min = snas[0];
    let save_i = 0;
    for (let i = 0; i < snas.length; i++) {
        if (myTeamId === 1 && snas[i].taked === false && (min === null || min.x < snas[i].x)) {
            min = snas[i];
            save_i = i;
        } else if (myTeamId === 0 && snas[i].taked === false && (min === null || min.x > snas[i].x)) {
            min = snas[i];
            save_i = i;
        }
    }
    snas[save_i].taked = true;
    return min;
}

function get_close(wiz, snas) {
    let min = snas[0];
    let min_range = -1;
    let save_i = 0;
    for (let i = 0; i < snas.length; i++) {
        let range = Math.sqrt(Math.pow(snas[i].x - wiz.x, 2) + Math.pow(snas[i].y - wiz.y, 2));
        if (snas[i].state !== 1 && snas[i].taked === false && (range < min_range || min_range === -1)) {
            min_range = range;
            min = snas[i];
            save_i = i;
        }
    }
    if (snas.length > 1) {
        snas[save_i].taked = true;
    }
    return min;
}

function in_cage(wiz, snas, myTeamId) {
    for (let sna of snas) {
        let a = (sna.y - wiz.y) / (sna.x - wiz.x);
        let b = wiz.y - a * wiz.x;
        let value = a * wiz.y + b;
        if (value > 2100 && value < 5400) {
            return sna;
        }
    }
    return false;
}

var myTeamId = parseInt(readline()); // if 0 you need to score on the right of the map, if 1 you need to score on the left
// game loop
while (true) {
    var inputs = readline().split(' ');
    var myScore = parseInt(inputs[0]);
    var myMagic = parseInt(inputs[1]);
    var inputs = readline().split(' ');
    var opponentScore = parseInt(inputs[0]);
    var opponentMagic = parseInt(inputs[1]);
    var entities = parseInt(readline()); // number of entities still in game
    let wizs = [];
    let snas = [];
    let blus = [];
    let opps = [];
    for (var i = 0; i < entities; i++) {
        var inputs = readline().split(' ');
        var entityId = parseInt(inputs[0]); // entity identifier
        var entityType = inputs[1]; // "WIZARD", "OPPONENT_WIZARD" or "SNAFFLE" (or "BLUDGER" after first league)
        var x = parseInt(inputs[2]); // position
        var y = parseInt(inputs[3]); // position
        var vx = parseInt(inputs[4]); // velocity
        var vy = parseInt(inputs[5]); // velocity
        var state = parseInt(inputs[6]); // 1 if the wizard is holding a Snaffle,0 otherwise
        if (entityType === "WIZARD") {
            wizs.push(new wiz(entityId, x, y, vx, vy, state));
        } else if (entityType === "SNAFFLE") {
            snas.push(new sna(entityId, x, y, vx, vy, state));
        } else if (entityType === "BLUDGER") {
            blus.push(new blu(entityId, x, y, vx, vy, state));
        } else if (entityType === "OPPONENT_WIZARD") {
            opps.push(new opp(entityId, x, y, vx, vy, state));
        }
    }

    let forcage;
    if (myMagic >= 20 && (forcage = in_cage(wizs[0], snas, myTeamId)) !== false) {
        let range_flip = Math.sqrt(Math.pow(wizs[0].x - forcage.x, 2) + Math.pow(wizs[0].y - forcage.y, 2));
        if (myTeamId === 1 && forcage.x < wizs[0].x && range_flip < 1000) {
            printErr("FLIPENDO");
            print('FLIPENDO ' + forcage.id);
        } else if (myTeamId === 0 && forcage.x > wizs[0].x && range_flip < 1000) {
            printErr("FLIPENDO");
            print('FLIPENDO ' + forcage.id);
        } else {
            if (wizs[0].state === 1) {
                if (myTeamId === 0) {
                    print('THROW 16000 3500 500 je lance la balle');
                } else {
                    print('THROW 0 3500 500 je lance la balle');
                }
            } else {
                let close;
                close = get_close_but(snas, myTeamId);
                let range_sna = Math.sqrt(Math.pow(close.x - (myTeamId * 16000), 2) + Math.pow(close.y - 3500, 2));
                let range_wiz = Math.sqrt(Math.pow(wizs[0].x - (myTeamId * 16000), 2) + Math.pow(wizs[0].y - 3500, 2));
                let wiz_sna = Math.sqrt(Math.pow(wizs[0].x - close.x, 2) + Math.pow(wizs[0].y - close.y, 2));
                if (myMagic > 20 && (close.state !== 1 || snas.length <= 1) && wiz_sna < 6000 && range_sna + 1000 < range_wiz) {
                    print('ACCIO ' + close.id + ' Acciiooo !!!');
                } else {
                    close = get_close(wizs[0], snas, myTeamId);
                    print('MOVE ' + close.x + ' ' + close.y + ' 150');
                }
            }
        }
    } else {
        if (wizs[0].state === 1) {
            if (myTeamId === 0) {
                print('THROW 16000 3500 500 je lance la balle');
            } else {
                print('THROW 0 3500 500 je lance la balle');
            }
        } else {
            let close;
            close = get_close_but(snas, myTeamId);
            let range_sna = Math.sqrt(Math.pow(close.x - (myTeamId * 16000), 2) + Math.pow(close.y - 3500, 2));
            let range_wiz = Math.sqrt(Math.pow(wizs[0].x - (myTeamId * 16000), 2) + Math.pow(wizs[0].y - 3500, 2));
            let wiz_sna = Math.sqrt(Math.pow(wizs[0].x - close.x, 2) + Math.pow(wizs[0].y - close.y, 2));
            if (myMagic > 20 && (close.state !== 1 || snas.length <= 1) && wiz_sna < 6000 && range_sna + 1000 < range_wiz) {
                print('ACCIO ' + close.id + ' Acciiooo !!!');
            } else {
                close = get_close(wizs[0], snas, myTeamId);
                print('MOVE ' + close.x + ' ' + close.y + ' 150');
            }
        }
    }

    if (myMagic >= 20 && (forcage = in_cage(wizs[1], snas, myTeamId)) !== false) {
        let range_flip = Math.sqrt(Math.pow(wizs[1].x - forcage.x, 2) + Math.pow(wizs[1].y - forcage.y, 2));
        if (myTeamId === 1 && forcage.x < wizs[1].x && range_flip < 1000) {
            printErr("FLIPENDO");
            print('FLIPENDO ' + forcage.id);
        } else if (myTeamId === 0 && forcage.x > wizs[1].x && range_flip < 1000) {
            printErr("FLIPENDO");
            print('FLIPENDO ' + forcage.id);
        } else {
            if (wizs[1].state === 1) {
                if (myTeamId === 0) {
                    print('THROW 16000 3500 500 je lance la balle');
                } else {
                    print('THROW 0 3500 500 je lance la balle');
                }
            } else {
                let close;
                close = get_close_but(snas, myTeamId);
                let range_sna = Math.sqrt(Math.pow(close.x - (myTeamId * 16000), 2) + Math.pow(close.y - 3500, 2));
                let range_wiz = Math.sqrt(Math.pow(wizs[1].x - (myTeamId * 16000), 2) + Math.pow(wizs[1].y - 3500, 2));
                let wiz_sna = Math.sqrt(Math.pow(wizs[1].x - close.x, 2) + Math.pow(wizs[1].y - close.y, 2));
                if (myMagic > 20 && (close.state !== 1 || snas.length <= 1) && wiz_sna < 6000 && range_sna + 1000 < range_wiz) {
                    print('ACCIO ' + close.id + ' Acciiooo !!!');
                } else {
                    close = get_close(wizs[1], snas, myTeamId);
                    print('MOVE ' + close.x + ' ' + close.y + ' 150');
                }
            }
        }
    } else {
        if (wizs[1].state === 1) {
            if (myTeamId === 0) {
                print('THROW 16000 3500 500 je lance la balle');
            } else {
                print('THROW 0 3500 500 je lance la balle');
            }
        } else {
            let close;
            close = get_close_but(snas, myTeamId);
            let range_sna = Math.sqrt(Math.pow(close.x - (myTeamId * 16000), 2) + Math.pow(close.y - 3500, 2));
            let range_wiz = Math.sqrt(Math.pow(wizs[1].x - (myTeamId * 16000), 2) + Math.pow(wizs[1].y - 3500, 2));
            let wiz_sna = Math.sqrt(Math.pow(wizs[1].x - close.x, 2) + Math.pow(wizs[1].y - close.y, 2));
            if (myMagic > 20 && (close.state !== 1 || snas.length <= 1) && wiz_sna < 6000 && range_sna + 1000 < range_wiz) {
                print('ACCIO ' + close.id + ' Acciiooo !!!');
            } else {
                close = get_close(wizs[1], snas, myTeamId);
                print('MOVE ' + close.x + ' ' + close.y + ' 150');
            }
        }
    }
}