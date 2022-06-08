using System;
using System.Collections.Generic;

namespace Services.Models
{
    public partial class Monitor
    {
        public long Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string MachineName { get; set; } = null!;
        public Guid TestId { get; set; }
        public string? Url { get; set; }
        public string? KeyWord { get; set; }
        public string? UserAgent { get; set; }
        public string? ScreenSize { get; set; }
        public bool? AdsClicked { get; set; }
        public string? Exception { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? UrlAfterProxy { get; set; }
        public DateTime? BrowserOpenTime { get; set; }
        public DateTime? MasterPageLoaded { get; set; }
        public DateTime? BeforeAdsClick { get; set; }
        public DateTime? AfterAdsClick { get; set; }
        public string? Channel { get; set; }
        public string? ProxyServer { get; set; }
        public string? Ip { get; set; }
        public int? IpsearchCount { get; set; }
    }
}
