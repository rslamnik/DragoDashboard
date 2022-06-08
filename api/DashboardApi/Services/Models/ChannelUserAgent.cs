using System;
using System.Collections.Generic;

namespace Services.Models
{
    public partial class ChannelUserAgent
    {
        public int ChannelUserAgentId { get; set; }
        public int ChannelId { get; set; }
        public int UserAgentId { get; set; }
    }
}
