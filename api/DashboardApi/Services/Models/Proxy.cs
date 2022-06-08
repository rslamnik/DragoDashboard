using System;
using System.Collections.Generic;

namespace Services.Models
{
    public partial class Proxy
    {
        public string ProxyName { get; set; } = null!;
        public string ProxyServer { get; set; } = null!;
        public string? ProxyUsername { get; set; }
        public string? ProxyPassword { get; set; }
        public int ProxyId { get; set; }
    }
}
