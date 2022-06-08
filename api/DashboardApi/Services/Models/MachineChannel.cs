using System;
using System.Collections.Generic;

namespace Services.Models
{
    public partial class MachineChannel
    {
        public int MachineChannelId { get; set; }
        public int MachineId { get; set; }
        public int ChannelId { get; set; }
    }
}
