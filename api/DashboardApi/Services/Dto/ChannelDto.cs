using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Dto
{
    public class ChannelDto
    {
        public int Id { get; set; }
        public string ChannelName { get; set; }
        public string? ChannelDescription { get; set; }
        public bool Active { get; set; }
        public int NumberOfRep { get; set; }
        public int NumberOfAds { get; set; }
        public int AdsPercentage { get; set; }
        public string Nation { get; set; }
        public int? KeywordCategoryId { get; set; }
        public string CategoryName { get; set; }
        public string? Browser { get; set; }
    }
}
