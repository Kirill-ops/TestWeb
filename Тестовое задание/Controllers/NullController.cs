using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text;
using Microsoft.Extensions.Options;
using System.Data;

namespace TestWeb.Controllers
{

    public class AuthorizationUser
    {
        public string AppKey { get; set; } = "";
        public string Login { get; set; } = "";
        public string Password { get; set; } = "";
    }

    public class AuthorizedUser
    {
        //public Data Data { get; set; }
    }


    public class GetSearchSettlements
    {
        public List<City>? Cities { get; set; } = new();
    }

    public class PostSearchSettlements
    {
        public string appkey { get; set; } = "";
        public string q { get; set; }

    }

    public class City
    {
        public string Code { get; set; }
        public string aString { get; set; }
        public string Region_name { get; set; }
        public string SearchString { get; set; }
        public int RegionID { get; set; }
        public int CityID { get; set; }

    }

    public class PostCalc
    {
        public string appkey { get; set; } = "";
        public Delivery delivery { get; set; }  
        public Cargo cargo {  get; set; }

    }

    public class Delivery
    {
        public DeliveryType deliveryType { get; set; }
        public Arrival arrival { get; set; }
        public Derival derival { get; set; }
    }

    public class DeliveryType
    {
        public string type { get; set; }
    }

    public class Arrival
    {
        public string variant {  get; set; }
        public string city { get; set; }
    }

    public class Derival
    {
        public string produceDate { get; set; }
        public string variant { get; set; }
        public string terminalID { get; set; }
    }


    public class Cargo
    {
        public float length { get; set; }
        public float width { get; set; }
        public float height { get; set; }
        public int quantity {  get; set; }
        public float totalVolume {  get; set; }
        public float totalWeight {  get; set; }
        public float hazardClass {  get; set; }
    }

    public class GetCalc
    {
        public Data data {  get; set; }
    }

    public class Data
    {
        public float price { get; set;}
        public OrderDates orderDates { get; set; }
    }

    public class OrderDates
    {
        public string derivalFromOspSender { get; set; }
        public string giveoutFromOspReceiver { get; set; }
    }


    [Route("test")]
    public class NullController : Controller
    {
        

        [Route("citiesDerivial")]
        [HttpGet]
        public IActionResult GetCitiesDerivial(string str)
        {
            var searchSettlementsUri = new Uri("https://api.dellin.ru/v2/public/kladr.json");
            var appkey = "BC830187-A186-485A-AC80-2354B6D9EDF5";

            var postSearchSettlements = new PostSearchSettlements
            {
                appkey = appkey,
                q = str
            };

            var client = new HttpClient();
            var json = JsonSerializer.Serialize(postSearchSettlements);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = client.PostAsync(searchSettlementsUri, content).Result;
            if (response.IsSuccessStatusCode)
            {
                var responseContent = response.Content.ReadAsStringAsync().Result;
                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                var getSearchSettlements = JsonSerializer.Deserialize<GetSearchSettlements>(responseContent, options);
                return Ok(getSearchSettlements);
            }
            else
                return NoContent();
        }



        [Route("calc")]
        [HttpGet]
        public IActionResult GetCalc(string code)
        {
            var Uri = new Uri(" https://api.dellin.ru/v2/calculator.json ");
            var appkey = "BC830187-A186-485A-AC80-2354B6D9EDF5";

            var post = new PostCalc
            {
                appkey = appkey,
                delivery = new Delivery
                {
                    deliveryType = new DeliveryType
                    {
                        type = "auto"
                    },
                    arrival = new Arrival
                    {
                        variant = "terminal",
                        city = code
                    },
                    derival = new Derival
                    {
                        produceDate = $"{DateTime.Now.ToString("yyyy-MM-dd")}",
                        variant = "terminal",
                        terminalID = "104"
                    }

                },
                cargo = new Cargo
                {
                    quantity = 1,
                    totalVolume = 1f, 
                    totalWeight = 200, 
                    hazardClass = 0 
                },
            };

            var client = new HttpClient();
            var json = JsonSerializer.Serialize(post);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = client.PostAsync(Uri, content).Result;
            if (response.IsSuccessStatusCode)
            {
                var responseContent = response.Content.ReadAsStringAsync().Result;
                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                var getCalc = JsonSerializer.Deserialize<GetCalc>(responseContent, options);

                return Ok(getCalc);
            }

            return NoContent();
        }

    }
}
