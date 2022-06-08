using System;
using System.Collections.Generic;

namespace Services.Models
{
    public partial class ProxyNation
    {
        public int ProxyId { get; set; }
        public string Nation { get; set; } = null!;
        public string ProxyServer { get; set; } = null!;
        public string? ProxyUsername { get; set; }
        public string? ProxyPassword { get; set; }
    }
}
