using System;
using System.Collections.Generic;

namespace Services.Models
{
    public partial class ChannelV2
    {
        public int Id { get; set; }
        public string ChannelName { get; set; } = null!;
        public string? ChannelDescription { get; set; }
        public bool Active { get; set; }
        public int NumberOfRep { get; set; }
        public int NumberOfAds { get; set; }
        public int AdsPercentage { get; set; }
        public string Nation { get; set; } = null!;
        public int? KeyWordCategoryId { get; set; }
        public string? Browser { get; set; }
    }
}
