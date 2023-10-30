"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
var books = require("./books.json");
var authors = require("./authors.json");
var firebaseConfig = {
    apiKey: "AIzaSyBnMXECMZCVdBQCfs33imEYJ6k3YkhjUWs",
    authDomain: "fer-or.firebaseapp.com",
    projectId: "fer-or",
    storageBucket: "fer-or.appspot.com",
    messagingSenderId: "421079904660",
    appId: "1:421079904660:web:6142ef00b8f2503281df81",
};
var app = (0, app_1.initializeApp)(firebaseConfig);
var db = (0, firestore_1.getFirestore)(app);
var typedBooks = books;
var typedAuthors = authors;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _i, typedBooks_1, book, _a, typedAuthors_1, author, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, 10, 11]);
                _i = 0, typedBooks_1 = typedBooks;
                _b.label = 1;
            case 1:
                if (!(_i < typedBooks_1.length)) return [3 /*break*/, 4];
                book = typedBooks_1[_i];
                return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(db, "books", book.key), __assign({}, book))];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                _a = 0, typedAuthors_1 = typedAuthors;
                _b.label = 5;
            case 5:
                if (!(_a < typedAuthors_1.length)) return [3 /*break*/, 8];
                author = typedAuthors_1[_a];
                return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(db, "authors", author.key), __assign({}, author))];
            case 6:
                _b.sent();
                _b.label = 7;
            case 7:
                _a++;
                return [3 /*break*/, 5];
            case 8: return [3 /*break*/, 11];
            case 9:
                e_1 = _b.sent();
                console.log("error filling db", e_1);
                return [3 /*break*/, 11];
            case 10:
                (0, app_1.deleteApp)(app);
                return [7 /*endfinally*/];
            case 11: return [2 /*return*/];
        }
    });
}); })();
