using System;
using System.Collections.Generic;

namespace Services.Models
{
    public partial class Statistic
    {
        public DateTime? Date { get; set; }
        public double? MonetizedSearches { get; set; }
        public double? Clicks { get; set; }
        public double? ClickThroughRate { get; set; }
        public double? MonetizedRpm { get; set; }
        public double? RevenuePerView { get; set; }
        public double? RevenuePerClick { get; set; }
        public double? Revenue { get; set; }
        public string? SearchChannel { get; set; }
        public double? TrafficQuality { get; set; }
    }
}
