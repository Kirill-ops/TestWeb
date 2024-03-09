using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TestWeb.Models
{
    public class Cargo
    {
        public string Id { get; set; }
        public string CityDeparture { get; set; }
        public string CityDestination { get; set; }
        public int Weight {  get; set; }
        public int NumberSeats {  get; set; }
        public int Volume {  get; set; }

        public Cargo() 
        {
            CityDeparture = "Чита";
            CityDestination = "";
            Weight = 1;
            NumberSeats = 1;
            Volume = 1;
        } 
        



    }
}
