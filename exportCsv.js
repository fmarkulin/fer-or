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
var fs = require("fs");
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
var handleCommas = function (input) {
    if (typeof input === "string" && input.includes(","))
        return "\"".concat(input, "\"");
    else
        return input;
};
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var booksRef, booksSnapshot, books_1, authorsRef, authorsSnapshot, authors_1, booksExport, header, rows, csv, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 5]);
                console.log("getting books...");
                booksRef = (0, firestore_1.collection)(db, "books");
                return [4 /*yield*/, (0, firestore_1.getDocs)(booksRef)];
            case 1:
                booksSnapshot = _a.sent();
                books_1 = [];
                booksSnapshot.forEach(function (doc) {
                    books_1.push(doc.data());
                });
                console.log("getting authors...");
                authorsRef = (0, firestore_1.collection)(db, "authors");
                return [4 /*yield*/, (0, firestore_1.getDocs)(authorsRef)];
            case 2:
                authorsSnapshot = _a.sent();
                authors_1 = [];
                authorsSnapshot.forEach(function (doc) {
                    authors_1.push(doc.data());
                });
                console.log("combining...");
                booksExport = books_1.map(function (book) {
                    var bookAuthors = book.authors.map(function (author) {
                        return authors_1.find(function (a) { return a.key === author; });
                    });
                    return __assign(__assign({}, book), { authors: bookAuthors });
                });
                console.log("formatting for csv...");
                header = "last_modified,publisher,title,author_key,author_type,author_revision,author_last_modified,author_name,publish_date,type,key,subject,latest_revision,revision,number_of_pages\n";
                rows = booksExport.flatMap(function (book) {
                    return book.publishers.flatMap(function (publisher) {
                        return book.authors.flatMap(function (author) {
                            return book.subjects.map(function (subject) { return [
                                handleCommas(book.last_modified),
                                handleCommas(publisher),
                                handleCommas(book.title),
                                handleCommas(author === null || author === void 0 ? void 0 : author.key),
                                handleCommas(author === null || author === void 0 ? void 0 : author.type),
                                handleCommas(author === null || author === void 0 ? void 0 : author.revision),
                                handleCommas(author === null || author === void 0 ? void 0 : author.last_modified),
                                handleCommas(author === null || author === void 0 ? void 0 : author.name),
                                handleCommas(book.publish_date),
                                handleCommas(book.type),
                                handleCommas(book.key),
                                handleCommas(subject),
                                handleCommas(book.latest_revision),
                                handleCommas(book.revision),
                                handleCommas(book.number_of_pages),
                            ]; });
                        });
                    });
                });
                csv = header + rows.map(function (row) { return row.join(","); }).join("\n");
                console.log("writing to export.csv...");
                fs.writeFileSync("export.csv", csv, "utf-8");
                console.log("csv export successful!");
                return [3 /*break*/, 5];
            case 3:
                e_1 = _a.sent();
                console.log("error exportin data", e_1);
                return [3 /*break*/, 5];
            case 4:
                (0, app_1.deleteApp)(app);
                console.log("exiting...");
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); })();
