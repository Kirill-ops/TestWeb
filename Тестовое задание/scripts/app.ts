
function TSButton() {
    let name: string = "Fred";
    document.getElementById("out").innerHTML = greeter(user);
}

class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Fred", "M.", "Smith");





type CreateUserResponse = {
    appkey: string;
    login: string;
    password: string;
};

type AuthorizedUser = {
    data: Data;
}

type Data = {
    sessionID: string;
}

type GetSearchSettlements = {
    cities: Array<City>;
}

type City = {
    code: string;
    aString: string;
    region_name: string;
    searchString: string;
    RegionID: number;
    CityID: number;
}


type PostCalc = {
    appkey: string
}

type Delivery = {
    deliveryType: DeliveryType;
}

type DeliveryType = {
    type: string;
    arrival: DerivalArrival;
    derival: DerivalArrival;
}

type DerivalArrival = {
    produceDate: string;
    variant: string;
    terminalID: string;
    city: string;
}

type Cargo = {
    quantity: number;
    length: number;
    width: number;
    height: number;
    totalVolume: number;
    totalWeight: number;
    hazardClass: number;
    }

type GetCalc = {
    data: DataCalc;
}

type DataCalc = {
    price: string;
    orderDates: OrderDates;

}


type OrderDates = {
    derivalFromOspSender: string;
    giveoutFromOspReceiver: string;
}

async function createUser() {
    
        const response = await fetch('http://localhost:5031/test/page');
        var result = (await response.json()) as AuthorizedUser;
        document.getElementById("out").innerHTML = result.data.sessionID;
        console.log('result is: ', JSON.stringify(result, null, 4));
        return result;
}

async function getSessionId() {
    const response = await fetch('http://localhost:5031/test/page');
    var result = (await response.json()) as AuthorizedUser;
    return result;
}

async function getSearchCodeCity(str: string) {
    const response = await fetch('http://localhost:5031/test/citiesDerivial?str=' + str);
    var result = (await response.json()) as GetSearchSettlements;
    if (result.cities.length > 0)
        return result.cities[0].code;
}



async function getCitiesDerivial(element) {

    const response = await fetch('http://localhost:5031/test/citiesDerivial?str=' + element.value);
    var result = (await response.json()) as GetSearchSettlements;
    var options = "";

    for (var i = 0; i < result.cities.length; i++) {
        options += '<option value=" ' + result.cities[i].searchString + '" label="' + result.cities[i].region_name + '">';
    }
    document.getElementById('listDerivial').innerHTML = options;
}


async function calculate() {

    var str_out = (document.getElementById('CityOut') as HTMLInputElement).value; // название населённого пункта
    var code = await getSearchCodeCity(str_out);    // получаем код населённого пункта
    var response = await fetch('http://localhost:5031/test/calc?code=' + code);

    var result = (await response.json()) as GetCalc;

    const strDateDerival = result.data.orderDates.derivalFromOspSender;
    const strDateArrival = result.data.orderDates.giveoutFromOspReceiver;

    var dateDerival = new Date(strDateDerival);
    var dateArrival = new Date(strDateArrival);

    var diff = Math.abs(dateDerival.valueOf() - dateArrival.valueOf());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    document.getElementById('result').innerHTML = 'Цена: ' + result.data.price + ' руб.' +
        '<br/>Дата отправки: ' + dateDerival.toLocaleString() +
        '<br/>Дата прибытия: ' + dateArrival.toLocaleString() +
        '<br/>Срок в днях: ' + diffDays;
}

        