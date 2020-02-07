using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using EONETReact.Classes.Dto;
using EONETReact.Interfaces;
using Newtonsoft.Json;

namespace EONETReact.Classes
{
    public class EonetApiService : IEonetApiService
    {
        private HttpClient httpClient { get; set; }

        public EonetApiService()
        {
            httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri("https://eonet.sci.gsfc.nasa.gov/api/v2.1/");
        }

        public async Task<IEnumerable<DtoEvent>> GetEvents()
        {
            IEnumerable<DtoEvent> eventsOpen = await GetEventsOpen();
            IEnumerable<DtoEvent> eventsClosed = await GetEventsClosed();

            List<DtoEvent> events = new List<DtoEvent>();
            events.AddRange(eventsOpen);
            events.AddRange(eventsClosed);

            return events;
        }

        public async Task<IEnumerable<DtoEvent>> GetEventsOpen()
        {
            HttpResponseMessage response = await httpClient.GetAsync("events?status=open&limit=50&days=365");
            response.EnsureSuccessStatusCode();

            string events = await response.Content.ReadAsStringAsync();
            DtoEonetEventResponse dtoResponse = JsonConvert.DeserializeObject<DtoEonetEventResponse>(events);

            return dtoResponse.Events;
        }

        public async Task<IEnumerable<DtoEvent>> GetEventsClosed()
        {
            HttpResponseMessage response = await httpClient.GetAsync("events?status=closed&limit=50&days=365");
            response.EnsureSuccessStatusCode();

            string events = await response.Content.ReadAsStringAsync();
            DtoEonetEventResponse dtoResponse = JsonConvert.DeserializeObject<DtoEonetEventResponse>(events);

            return dtoResponse.Events;
        }

        public async Task<IEnumerable<DtoCategory>> GetCategories()
        {
            HttpResponseMessage response = await httpClient.GetAsync("categories");
            response.EnsureSuccessStatusCode();

            string categories = await response.Content.ReadAsStringAsync();
            DtoEonetCategoryResponse dtoResponse = JsonConvert.DeserializeObject<DtoEonetCategoryResponse>(categories);

            return dtoResponse.Categories;
        }

        public async Task<DtoEvent> GetEventById(string idEvent)
        {
            HttpResponseMessage response = await httpClient.GetAsync("events/" + idEvent);
            response.EnsureSuccessStatusCode();

            string eventResponse = await response.Content.ReadAsStringAsync();
            DtoEvent dtoResponse = JsonConvert.DeserializeObject<DtoEvent>(eventResponse);

            return dtoResponse;
        }
    }
}
