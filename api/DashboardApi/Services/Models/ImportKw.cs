using System;
using System.Collections.Generic;

namespace Services.Models
{
    public partial class ImportKw
    {
        public string Keyword { get; set; } = null!;
        public int? Volume { get; set; }
        public int? KeywordDifficulty { get; set; }
        public double CpcUsd { get; set; }
        public double CompetitiveDensity { get; set; }
        public long? NumberOfResults { get; set; }
        public string? Intent { get; set; }
        public string? SerpFeatures { get; set; }
        public string Trend { get; set; } = null!;
    }
}
