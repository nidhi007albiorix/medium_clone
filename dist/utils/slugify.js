"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = void 0;
function slugify(title) {
    // title = "This is my first article"
    // return -> "this-is-my-first-article"
    let slugarr = [];
    for (let i = 0; i < title.length; i++) {
        if (i >= 30)
            break;
        let char = title[i].toLowerCase();
        if (char >= "a" && char <= "z") {
            slugarr.push(char);
        }
        else {
            slugarr.push("-");
        }
    }
    return slugarr.join('');
}
exports.slugify = slugify;
