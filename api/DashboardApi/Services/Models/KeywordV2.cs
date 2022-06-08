using System;
using System.Collections.Generic;

namespace Services.Models
{
    public partial class KeywordV2
    {
        public int Id { get; set; }
        public string Keyword { get; set; } = null!;
        public string Nation { get; set; } = null!;
        public bool Active { get; set; }
        public int NumberOfRep { get; set; }
        public DateTime? Date { get; set; }
        public bool? Organic { get; set; }
        public int? NumberOfAdsClicks { get; set; }
        public bool? AdsOnly { get; set; }
        public int CategoryId { get; set; }
        public int? Volume { get; set; }
        public int? KeywordDifficulty { get; set; }
        public double? CpcUsd { get; set; }
        public double? CompetitiveDensity { get; set; }
        public long? NumberOfResults { get; set; }
        public string? Intent { get; set; }
        public string? SerpFeatures { get; set; }
        public string? Trend { get; set; }
    }
}
