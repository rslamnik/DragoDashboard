using System;
using System.Collections.Generic;

namespace Services.Models
{
    public partial class Channel
    {
        public int Id { get; set; }
        public string ChannelName { get; set; } = null!;
        public string? ChannelDescription { get; set; }
        public bool Active { get; set; }
        public int NumberOfRep { get; set; }
    }
}
