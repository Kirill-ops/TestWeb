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
function TSButton() {
    var name = "Fred";
    document.getElementById("out").innerHTML = greeter(user);
}
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("Fred", "M.", "Smith");
function createUser() {
    return __awaiter(this, void 0, void 0, function () {
        var response, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:5031/test/page')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = (_a.sent());
                    document.getElementById("out").innerHTML = result.data.sessionID;
                    console.log('result is: ', JSON.stringify(result, null, 4));
                    return [2 /*return*/, result];
            }
        });
    });
}
function getSessionId() {
    return __awaiter(this, void 0, void 0, function () {
        var response, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:5031/test/page')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = (_a.sent());
                    return [2 /*return*/, result];
            }
        });
    });
}
function getSearchCodeCity(str) {
    return __awaiter(this, void 0, void 0, function () {
        var response, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:5031/test/citiesDerivial?str=' + str)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = (_a.sent());
                    if (result.cities.length > 0)
                        return [2 /*return*/, result.cities[0].code];
                    return [2 /*return*/];
            }
        });
    });
}
function getCitiesDerivial(element) {
    return __awaiter(this, void 0, void 0, function () {
        var response, result, options, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:5031/test/citiesDerivial?str=' + element.value)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = (_a.sent());
                    options = "";
                    for (i = 0; i < result.cities.length; i++) {
                        options += '<option value=" ' + result.cities[i].searchString + '" label="' + result.cities[i].region_name + '">';
                    }
                    document.getElementById('listDerivial').innerHTML = options;
                    return [2 /*return*/];
            }
        });
    });
}
function calculate() {
    return __awaiter(this, void 0, void 0, function () {
        var str_out, code, response, result, strDateDerival, strDateArrival, dateDerival, dateArrival, diff, diffDays;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    str_out = document.getElementById('CityOut').value;
                    return [4 /*yield*/, getSearchCodeCity(str_out)];
                case 1:
                    code = _a.sent();
                    return [4 /*yield*/, fetch('http://localhost:5031/test/calc?code=' + code)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = (_a.sent());
                    strDateDerival = result.data.orderDates.derivalFromOspSender;
                    strDateArrival = result.data.orderDates.giveoutFromOspReceiver;
                    dateDerival = new Date(strDateDerival);
                    dateArrival = new Date(strDateArrival);
                    diff = Math.abs(dateDerival.valueOf() - dateArrival.valueOf());
                    diffDays = Math.ceil(diff / (1000 * 3600 * 24));
                    document.getElementById('result').innerHTML = 'Цена: ' + result.data.price + ' руб.' +
                        '<br/>Дата отправки: ' + dateDerival.toLocaleString() +
                        '<br/>Дата прибытия: ' + dateArrival.toLocaleString() +
                        '<br/>Срок в днях: ' + diffDays;
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=app.js.map