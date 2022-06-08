using System;
using System.Collections.Generic;

namespace Services.Models
{
    public partial class BlockedIp
    {
        public int Id { get; set; }
        public string Ip { get; set; } = null!;
        public bool Active { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
